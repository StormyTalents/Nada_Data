import { useEffect } from 'react';

import { useApiGet } from '@nobrainerlabs/react-material-ui';

import { Contenttype } from '../Contenttype';

export function useFindContenttype(id: number, shouldFetchOnMount = false) {
  const { data, isLoading, error, get } = useApiGet<Contenttype>(
    `contenttypes/${id}`
  );
  useEffect(() => {
    if (shouldFetchOnMount) {
      get();
    }
  }, [get, id, shouldFetchOnMount]);
  return { contenttype: data, isLoading, error, findContenttype: get };
}
