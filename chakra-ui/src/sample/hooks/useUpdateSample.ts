import { useApiPut } from '@nobrainerlabs/react-material-ui';

import { Sample } from '../Sample';

export function useUpdateSample(id: number) {
  const { data, isLoading, error, put } = useApiPut<Partial<Sample>>(
    `samples/${id}`
  );
  return {
    updatedSample: data,
    isUpdating: isLoading,
    error,
    updateSample: put,
  };
}
