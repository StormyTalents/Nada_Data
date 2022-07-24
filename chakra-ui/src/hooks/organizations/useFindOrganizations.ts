import { PaginatedList, useApiGet } from '@nobrainerlabs/react-material-ui';
import { useEffect } from 'react';

import { Organization } from '../../interfaces/Organization';

export function useFindOrganizations(shouldFetchOnMount = false) {
  const { data, isLoading, error, get } = useApiGet<
    PaginatedList<Organization>
  >('organizations');
  useEffect(() => {
    if (shouldFetchOnMount) {
      get();
    }
  }, [get, shouldFetchOnMount]);
  return { organizationList: data, isLoading, error, findOrganizations: get };
}
