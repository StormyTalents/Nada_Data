import { PaginatedList, useApiGet } from '@nobrainerlabs/react-material-ui';
import { useEffect } from 'react';

import { Content } from '../../interfaces/Content';

export function useFindContents(shouldFetchOnMount = false) {
  const { data, isLoading, error, get } = useApiGet<PaginatedList<Content>>(
    'contents'
  );
  useEffect(() => {
    if (shouldFetchOnMount) {
      get();
    }
  }, [get, shouldFetchOnMount]);
  return { contentList: data, isLoading, error, findContents: get };
}
