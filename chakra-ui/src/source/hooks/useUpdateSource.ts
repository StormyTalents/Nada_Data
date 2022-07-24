import { useApiPut } from '@nobrainerlabs/react-material-ui';

import { Source } from '../Source';

export function useUpdateSource(id: number) {
  const { data, isLoading, error, put } = useApiPut<Partial<Source>>(
    `sources/${id}`
  );
  return {
    updatedSource: data,
    isUpdating: isLoading,
    error,
    updateSource: put,
  };
}
