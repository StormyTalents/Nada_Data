import { useApiGet } from '@nobrainerlabs/react-material-ui';
import { useEffect } from 'react';

export function useFindOpportunityCountByStatuses(shouldFetchOnMount = false) {
  const { data, isLoading, error, get } = useApiGet<
    {
      status: string;
      count: number;
    }[]
  >(`opportunities/count-by-statuses`);
  useEffect(() => {
    if (shouldFetchOnMount) {
      get();
    }
  }, [get, shouldFetchOnMount]);

  return {
    opportunityCountByStatuses: data,
    loadingOpportunityCountByStatuses: isLoading,
    opportunityCountByStatusesError: error,
    findOpportunityCountByStatuses: get,
  };
}
