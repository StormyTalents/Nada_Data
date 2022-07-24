import { useApiPut } from '@nobrainerlabs/react-material-ui';

import { Certification } from '../Certification';

export function useUpdateCertification(id: number) {
  const { data, isLoading, error, put } = useApiPut<Partial<Certification>>(
    `certifications/${id}`
  );
  return {
    updatedCertification: data,
    isUpdating: isLoading,
    error,
    updateCertification: put,
  };
}
