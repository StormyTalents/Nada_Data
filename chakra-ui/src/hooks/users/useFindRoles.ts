import { useEffect } from 'react';

import { useApiGet } from '@nobrainerlabs/react-material-ui';

import { Role } from '../../interfaces/User';

export function useFindRoles(shouldFetchOnMount = false) {
  const { data, isLoading, error, get } = useApiGet<Role[]>('roles');
  useEffect(() => {
    if (shouldFetchOnMount) {
      get();
    }
  }, [get, shouldFetchOnMount]);
  return { roles: data, isLoading, error, findRoles: get };
}
