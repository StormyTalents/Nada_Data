import { PaginatedList, useApiGet } from '@nobrainerlabs/react-material-ui';
import { useEffect } from 'react';

import { Source } from '../Source';

export function useFindSources(shouldFetchOnMount = false) {
  const { data, isLoading, error, get } =
    useApiGet<PaginatedList<Source>>('sources');
  useEffect(() => {
    if (shouldFetchOnMount) {
      get();
    }
  }, [get, shouldFetchOnMount]);
  return { sourceList: data, isLoading, error, findSources: get };
}
