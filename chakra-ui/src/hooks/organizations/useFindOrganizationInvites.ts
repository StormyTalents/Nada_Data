import { PaginatedList, useApiGet } from '@nobrainerlabs/react-material-ui';
import { useEffect } from 'react';

import { Organization } from '../../interfaces/Organization';
import { OrganizationInvite } from '../../interfaces/OrganizationInvite';

export function useFindOrganizationInvites(shouldFetchOnMount = false) {
  const { data, isLoading, error, get } = useApiGet<OrganizationInvite[]>(
    'organizations'
  );
  useEffect(() => {
    if (shouldFetchOnMount) {
      get();
    }
  }, [get, shouldFetchOnMount]);
  return {
    organizationInvites: data,
    loadingInvites: isLoading,
    loadingInviteError: error,
    findOrganizationInvites: get,
  };
}
