import { useEffect } from 'react';

import { useApiGet } from '@nobrainerlabs/react-material-ui';

import { Sample } from '../Sample';

export function useFindSample(id: number, shouldFetchOnMount = false) {
  const { data, isLoading, error, get } = useApiGet<Sample>(`samples/${id}`);
  useEffect(() => {
    if (shouldFetchOnMount) {
      get();
    }
  }, [get, id, shouldFetchOnMount]);
  return { sample: data, isLoading, error, findSample: get };
}
