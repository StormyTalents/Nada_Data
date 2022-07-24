import { PaginatedList, useApiGet } from '@nobrainerlabs/react-material-ui';
import { useEffect } from 'react';

import { Industrycode } from '../Industrycode';

export function useFindIndustrycodes(shouldFetchOnMount = false) {
  const { data, isLoading, error, get } =
    useApiGet<PaginatedList<Industrycode>>('industrycodes');
  useEffect(() => {
    if (shouldFetchOnMount) {
      get();
    }
  }, [get, shouldFetchOnMount]);
  return { industrycodeList: data, isLoading, error, findIndustrycodes: get };
}
