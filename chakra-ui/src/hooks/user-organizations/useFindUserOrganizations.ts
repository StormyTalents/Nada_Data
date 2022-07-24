import { useEffect } from 'react';

import { PaginatedList, useApiGet } from '@nobrainerlabs/react-material-ui';

import { UserOrganization } from '../../interfaces/UserOrganization';

export function useFindUserOrganizations(shouldFetchOnMount = false) {
  const { data, isLoading, error, get } = useApiGet<
    PaginatedList<UserOrganization>
  >(`user-organizations`);
  useEffect(() => {
    if (shouldFetchOnMount) {
      get();
    }
  }, [get, shouldFetchOnMount]);
  return {
    userOrganizations: data,
    loadingUserOrganizations: isLoading,
    loadingUserOrganizationsError: error,
    findUserOrganizations: get,
  };
}
