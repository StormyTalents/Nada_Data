import { useApiGet } from '@nobrainerlabs/react-material-ui';
import { useEffect } from 'react';

import { Certification } from '../Certification';

export function useFindCertification(id: number, shouldFetchOnMount = false) {
  const { data, isLoading, error, get } = useApiGet<Certification>(
    `certifications/${id}`
  );
  useEffect(() => {
    if (shouldFetchOnMount) {
      get();
    }
  }, [get, id, shouldFetchOnMount]);
  return { certification: data, isLoading, error, findCertification: get };
}
