import { api } from '@nobrainerlabs/react-material-ui';
import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useRef
} from 'react';
import io from 'socket.io-client';

import environment from '../environments';
import { useUserContext } from '../user/UserContext';

export enum SessionEvent {
  Disconnect = 'disconnect',
  Connect = 'connect',
  ConnectError = 'connect_error',
  Subscribe = 'subscribe',
  Unsubscribe = 'unsubscribe',
  Publish = 'publish'
}

// TODO: implement generics for message
export interface SessionSubscription {
  key: string;
  component: string;
  callback: (message: any) => void;
}

export interface SessionPublishMessage {
  key: string;
  message: any;
}

export type SessionCallback = (message: any) => void;

const { apiBaseUrl } = environment;

export interface ApiSessionContextState {
  socket?: SocketIOClient.Socket;
  connect: (roomName?: string, userName?: string) => void;
  disconnect: () => void;
  subscribe: (
    key: string,
    component: string,
    callback: SessionCallback
  ) => void;
  unsubscribe: (
    key: string,
    component: string,
    callback: SessionCallback
  ) => void;
  publish: <T>(key: string, message: T) => void;
}

export const SessionContext = createContext<ApiSessionContextState>(null!);

export interface SessionProviderProps {
  roomName?: string;
  userName?: string;
  connect?: boolean;
}

export const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error(
      'useSessionContext must be used within the SessionProvider'
    );
  }
  return context;
};

export const SessionProvider: React.FC<SessionProviderProps> = ({
  connect: shouldConnectOnMount,
  roomName,
  userName,
  children
}) => {
  const { user } = useUserContext();
  const subscriptionsRef = useRef<SessionSubscription[]>([]);
  const socketRef = useRef<SocketIOClient.Socket>();
  const publishQueueRef = useRef<SessionPublishMessage[]>([]);
  const connect = useCallback((roomName?: string, userName?: string) => {
    // console.log('connect', `${apiBaseUrl}session`);
    const query = {} as any;
    const token = api.getAccessToken();
    if (roomName) query.roomName = roomName;
    if (userName) query.userName = userName;
    if (token) query.token = token;
    // console.log('connect');
    socketRef.current = io(`${apiBaseUrl}session`, { query });
    socketRef.current
      .on(SessionEvent.Connect, () => {
        // console.log('socket on connect');
        // after reconnecting re-subscribe any existing notifications
        subscriptionsRef.current.forEach(s =>
          socketRef.current?.emit(SessionEvent.Subscribe, {
            key: s.key,
            component: s.component
          })
        );
        // publish any queued messages
        publishQueueRef.current.forEach(p => publish(p.key, p.message));
        publishQueueRef.current = [];
      })
      .on(SessionEvent.ConnectError, (error: any) => {
        console.log('onConnectError', error);
      })
      .on(SessionEvent.Disconnect, (reason: any) => {
        console.log('onDisconnect', reason);
      })
      .on(SessionEvent.Publish, (packet: { key: string; message: any }) => {
        console.log('Session publish received packet:', packet);
        const subscriptions = subscriptionsRef.current.filter(
          s => s.key === packet.key
        );
        subscriptions.forEach(s => s.callback(packet.message));
      });
  }, []);
  const disconnect = useCallback(() => {
    socketRef.current?.disconnect();
  }, []);
  const subscribe = useCallback(
    (key: string, component, callback: SessionCallback) => {
      console.log('subscribe', key, component);
      if (
        !subscriptionsRef.current.some(
          s => s.key === key && s.callback === callback
        )
      ) {
        subscriptionsRef.current.push({ key, component, callback });
      }
      if (socketRef.current?.connected) {
        // only emit if connected (onConnect will resend these subscribes); this
        // check prevents sending duplicate subscribes
        socketRef.current?.emit(SessionEvent.Subscribe, { key, component });
      }
    },
    []
  );

  const unsubscribe = useCallback(
    (key: string, component, callback: SessionCallback) => {
      console.log('unsubscribe', key, component);
      const index = subscriptionsRef.current.findIndex(
        s => s.key === key && s.callback === callback
      );
      if (index > -1) {
        subscriptionsRef.current.splice(index, 1);
      }
      socketRef.current?.emit(SessionEvent.Unsubscribe, { key, component });
    },
    []
  );
  const publish = useCallback((key: string, message: any) => {
    console.log('publish', key, message);
    if (socketRef.current?.connected) {
      socketRef.current?.emit(SessionEvent.Publish, { key, message });
    } else {
      publishQueueRef.current.push({ key, message });
    }
  }, []);
  useEffect(() => {
    const name = user ? `${user.firstName} ${user.lastName}` : userName;
    if (shouldConnectOnMount && name && (user || roomName)) {
      connect(roomName, name);
    }
    return () => {
      socketRef.current?.close(); // when component unmounts
    };
  }, [connect, roomName, shouldConnectOnMount, user, userName]);

  return (
    <SessionContext.Provider
      value={{
        socket: socketRef.current,
        connect,
        disconnect,
        subscribe,
        unsubscribe,
        publish
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
