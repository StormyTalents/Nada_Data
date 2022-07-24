import { PaginatedList, useApiGet } from '@nobrainerlabs/react-material-ui';
import { useEffect } from 'react';

import { Keyword } from './Keyword';

export function useFindKeywords(shouldFetchOnMount = false) {
  const { data, isLoading, error, get } =
    useApiGet<PaginatedList<Keyword>>('keywords');
  useEffect(() => {
    if (shouldFetchOnMount) {
      get();
    }
  }, [get, shouldFetchOnMount]);
  return { keywordList: data, isLoading, error, findKeywords: get };
}
