import { PaginatedList, useApiGet } from '@nobrainerlabs/react-material-ui';
import { useEffect } from 'react';

import { Certification } from '../Certification';

export function useFindCertifications(shouldFetchOnMount = false) {
  const { data, isLoading, error, get } =
    useApiGet<PaginatedList<Certification>>('certifications');
  useEffect(() => {
    if (shouldFetchOnMount) {
      get();
    }
  }, [get, shouldFetchOnMount]);
  return { certificationList: data, isLoading, error, findCertifications: get };
}
