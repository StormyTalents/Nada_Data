import { useEffect } from 'react';

import { useApiGet } from '@nobrainerlabs/react-material-ui';

import { Opportunity } from '../../interfaces/Opportunity';

export function useFindOpportunity(id: number, shouldFetchOnMount = false) {
  const { data, isLoading, error, get } = useApiGet<Opportunity>(
    `opportunities/${id}`
  );
  useEffect(() => {
    if (shouldFetchOnMount) {
      get();
    }
  }, [get, id, shouldFetchOnMount]);

  return {
    opportunity: data,
    loadingOpportunity: isLoading,
    loadingError: error,
    findOpportunity: get,
  };
}
