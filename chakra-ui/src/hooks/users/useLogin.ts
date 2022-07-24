import { useCallback, useContext, useEffect, useState } from 'react';

import { api, useApiPost } from '@nobrainerlabs/react-material-ui';

import { UserJsonWebToken } from '@nobrainerlabs/core';
import { UserContext } from '../../user/UserContext';
import { User } from '../../interfaces/User';

export function useLogin() {
  const [jwtToken, setJwtToken] = useState<UserJsonWebToken<User>>();
  const { user, setUser } = useContext(UserContext);
  const { data, isLoading, error, post } = useApiPost('users/login');

  useEffect(() => {
    if (data) {
      const jwt = data as UserJsonWebToken<User>;
      setJwtToken(jwt);
      api.setAccessToken(jwt.accessToken);
      setUser(jwt.user);
    }
  }, [data, setUser]);

  const doLogin = useCallback(
    (email: string, password: string) => {
      post({ email, password });
    },
    [post]
  );
  return { jwtToken, user, isLoading, error, doLogin };
}
