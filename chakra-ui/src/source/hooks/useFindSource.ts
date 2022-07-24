import { useEffect } from 'react';

import { useApiGet } from '@nobrainerlabs/react-material-ui';

import { Source } from '../Source';

export function useFindSource(id: number, shouldFetchOnMount = false) {
  const { data, isLoading, error, get } = useApiGet<Source>(`sources/${id}`);
  useEffect(() => {
    if (shouldFetchOnMount) {
      get();
    }
  }, [get, id, shouldFetchOnMount]);
  return { source: data, isLoading, error, findSource: get };
}
