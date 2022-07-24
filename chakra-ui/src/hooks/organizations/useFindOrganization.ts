import { useEffect } from 'react';

import { useApiGet } from '@nobrainerlabs/react-material-ui';

import { Organization } from '../../interfaces/Organization';

export function useFindOrganization(id: number, shouldFetchOnMount = false) {
  const { data, isLoading, error, get } = useApiGet<Organization>(
    `organizations/${id}`
  );
  useEffect(() => {
    if (shouldFetchOnMount) {
      get();
    }
  }, [get, id, shouldFetchOnMount]);
  return { organization: data, isLoading, error, findOrganization: get };
}
