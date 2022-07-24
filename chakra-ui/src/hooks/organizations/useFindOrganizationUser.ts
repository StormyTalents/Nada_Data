import { useEffect } from 'react';

import { useApiGet } from '@nobrainerlabs/react-material-ui';

import { User } from '../../interfaces/User';

export function useFindOrganizationUser(
  organizationId: number,
  userId: number,
  shouldFetchOnMount = false
) {
  const { data, isLoading, error, get } = useApiGet<User>(
    `organizations/${organizationId}/users/${userId}`
  );
  useEffect(() => {
    if (shouldFetchOnMount) {
      get();
    }
  }, [get, organizationId, userId, shouldFetchOnMount]);
  return {
    organizationUser: data,
    loadingOrganizationUser: isLoading,
    loadingError: error,
    findOrganizationUser: get,
  };
}
