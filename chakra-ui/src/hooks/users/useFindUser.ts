import { useEffect } from 'react';

import { useApiGet } from '@nobrainerlabs/react-material-ui';

import { User } from '../../interfaces/User';

export function useFindUser(id: number, shouldFetchOnMount = false) {
  const { data, isLoading, error, get } = useApiGet<User>(`users/${id}`);
  useEffect(() => {
    if (shouldFetchOnMount) {
      get();
    }
  }, [get, id, shouldFetchOnMount]);
  return { user: data, isLoading, error, get };
}
