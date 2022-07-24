import { api, useApiPost } from '@nobrainerlabs/react-material-ui';
import { clearAuthTokens, getAccessToken, setAuthTokens } from 'axios-jwt';

import { User } from '../../interfaces/User';
import { useCallback } from 'react';
import { useUserContext } from '../../user/UserContext';

export function useLogout() {
  const { setUser } = useUserContext();
  const { isLoading, error, post } = useApiPost<User>('users/logout');

  // useEffect(() => {
  //   if (response && response.ok) {
  //     console.log('user logged out', response.ok);
  //     api.removeAccessToken();
  //     setUser(null);
  //   }
  // }, [response, setUser]);

  const doLogout = useCallback(() => {
    post();
    // NOTE: logout endpoint doesn't return anything so above
    // useEffect() won't work
    api.removeAccessToken();
    clearAuthTokens();
    setUser(null);
  }, [post, setUser]);
  return { isLoading, error, doLogout };
}
