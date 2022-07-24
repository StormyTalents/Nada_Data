import { useEffect } from 'react';

import { useApiGet, PaginatedList } from '@nobrainerlabs/react-material-ui';

import { Opportunity } from '../../interfaces/Opportunity';

export function useFindOpportunities(shouldFetchOnMount = false) {
  const { data, isLoading, error, get } = useApiGet<PaginatedList<Opportunity>>(
    `opportunities`
  );
  useEffect(() => {
    if (shouldFetchOnMount) {
      get();
    }
  }, [get, shouldFetchOnMount]);
  return {
    opportunities: data,
    loadingOpportunities: isLoading,
    loadingError: error,
    findOpportunities: get,
  };
}
