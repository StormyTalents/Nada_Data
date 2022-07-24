import { useApiPut } from '@nobrainerlabs/react-material-ui';

import { Contenttype } from '../Contenttype';

export function useUpdateContenttype(id: number) {
  const { data, isLoading, error, put } = useApiPut<Partial<Contenttype>>(
    `contenttypes/${id}`
  );
  return {
    updatedContenttype: data,
    isUpdating: isLoading,
    error,
    updateContenttype: put,
  };
}
