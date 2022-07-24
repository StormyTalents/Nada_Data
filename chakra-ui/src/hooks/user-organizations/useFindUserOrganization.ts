import { useEffect } from 'react';

import { useApiGet } from '@nobrainerlabs/react-material-ui';

import { UserOrganization } from '../../interfaces/UserOrganization';

export function useFindUserOrganization(
  userOrganizationId: number,
  shouldFetchOnMount = false
) {
  const { data, isLoading, error, get } = useApiGet<UserOrganization>(
    `user-organizations/${userOrganizationId}`
  );
  useEffect(() => {
    if (shouldFetchOnMount) {
      get();
    }
  }, [get, userOrganizationId, shouldFetchOnMount]);
  return {
    userOrganization: data,
    loadingUserOrganization: isLoading,
    loadingError: error,
    findUserOrganization: get,
  };
}
