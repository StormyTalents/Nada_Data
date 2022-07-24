import { PaginatedList, useApiGet } from '@nobrainerlabs/react-material-ui';
import { useEffect } from 'react';

import { Contenttype } from '../Contenttype';

export function useFindContenttypes(shouldFetchOnMount = false) {
  const { data, isLoading, error, get } =
    useApiGet<PaginatedList<Contenttype>>('contenttypes');
  useEffect(() => {
    if (shouldFetchOnMount) {
      get();
    }
  }, [get, shouldFetchOnMount]);
  return { contenttypeList: data, isLoading, error, findContenttypes: get };
}
