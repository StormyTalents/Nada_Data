import React, { useContext, useEffect, useState } from 'react';

import { CircularProgress } from '@material-ui/core';
import { User } from '../interfaces/User';
import { api } from '@nobrainerlabs/react-material-ui';
import styled from 'styled-components';
import { useGetCurrentUser } from '../hooks/users/useGetCurrentUser';

const StyledSpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

export interface UserAppState {
  viewedMessageCount: number;
}

export type UserContextType = User | null | undefined;

export interface UserContextState {
  user?: UserContextType;
  appState: UserAppState;
  setUser: React.Dispatch<React.SetStateAction<UserContextType>>;
  setAppState: React.Dispatch<React.SetStateAction<UserAppState>>;
  refreshUser: () => void;
}

export const UserContext = React.createContext<UserContextState>(null!);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      'useUserContext must be used within the UserProvider component'
    );
  }
  return context;
};

interface UserProviderProps {
  children: JSX.Element;
}

export default function UserProvider(props: UserProviderProps): JSX.Element {
  const { children } = props;
  const [userContext, setUser] = useState<UserContextType>(undefined);
  const [appState, setAppState] = useState<UserAppState>({
    viewedMessageCount: 0,
  });
  const { currentUser, getCurrentUser } = useGetCurrentUser();
  const accessToken = api.getAccessToken();

  useEffect(() => {
    if (accessToken) {
      getCurrentUser();
    } else {
      setUser(null);
    }
  }, [accessToken, getCurrentUser]);

  useEffect(() => {
    setUser(currentUser);
  }, [setUser, currentUser]);

  if (userContext === undefined) {
    // Do not load the children of the provider if the user is undefined.
    // Lets further wait...
    // undefined = we have not determined the login state yet
    // null = not logged in
    // User value = logged in
    return (
      <StyledSpinnerContainer>
        <CircularProgress size={64} />
      </StyledSpinnerContainer>
    );
  }

  return (
    <UserContext.Provider
      value={{
        user: userContext,
        appState,
        setUser,
        setAppState,
        refreshUser: getCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
