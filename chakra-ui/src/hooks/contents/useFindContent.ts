import { useEffect } from 'react';

import { useApiGet } from '@nobrainerlabs/react-material-ui';

import { Content } from '../../interfaces/Content';

export function useFindContent(id: number, shouldFetchOnMount = false) {
  const { data, isLoading, error, get } = useApiGet<Content>(`contents/${id}`);
  useEffect(() => {
    if (shouldFetchOnMount) {
      get();
    }
  }, [get, id, shouldFetchOnMount]);
  return { content: data, isLoading, error, findContent: get };
}
