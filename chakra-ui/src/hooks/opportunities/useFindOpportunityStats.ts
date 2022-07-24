import { useApiGet } from '@nobrainerlabs/react-material-ui';
import { useEffect } from 'react';

export function useFindOpportunityStats(shouldFetchOnMount = false) {
  const { data, isLoading, error, get } = useApiGet<{
    totalOpportunities: number;
    totalOpenOpportunities: number;
    closingIn2Days: number;
    scrapedToday: number;
  }>(`opportunities/stats`);
  useEffect(() => {
    if (shouldFetchOnMount) {
      get();
    }
  }, [get, shouldFetchOnMount]);

  return {
    opportunityStats: data,
    loadingOpportunityStats: isLoading,
    loadingError: error,
    findOpportunityStats: get,
  };
}
