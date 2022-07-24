import { api, useApiGet } from '@nobrainerlabs/react-material-ui';

import { UserContextType } from '../../user/UserContext';

export function useGetCurrentUser() {
  const { data, isLoading, error, get } = useApiGet<UserContextType>(
    'users/me'
  );
  let currentUser = data;

  if (!api.getAccessToken() || error) {
    // if no access token set cached user to null
    currentUser = null; // user == null (not logged in)
  }
  return { currentUser, isLoading, error, getCurrentUser: get };
}
