import { useApiPost } from '@nobrainerlabs/react-material-ui';

import { Certification } from '../Certification';

export function useCreateCertification() {
  const { data, isLoading, error, post } = useApiPost<Certification>(
    'certifications'
  );
  return {
    createdCertification: data,
    isCreating: isLoading,
    error,
    createCertification: post,
  };
}
