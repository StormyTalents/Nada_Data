import { useEffect } from 'react';

import { useApiGet } from '@nobrainerlabs/react-material-ui';

import { Industrycode } from '../Industrycode';

export function useFindIndustrycode(id: number, shouldFetchOnMount = false) {
  const { data, isLoading, error, get } = useApiGet<Industrycode>(
    `industrycodes/${id}`
  );
  useEffect(() => {
    if (shouldFetchOnMount) {
      get();
    }
  }, [get, id, shouldFetchOnMount]);
  return { industrycode: data, isLoading, error, findIndustrycode: get };
}
