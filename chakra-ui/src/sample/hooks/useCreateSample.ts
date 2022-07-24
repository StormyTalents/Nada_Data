import { useApiPost } from '@nobrainerlabs/react-material-ui';

import { Sample } from '../Sample';

export function useCreateSample() {
  const { data, isLoading, error, post } = useApiPost<Sample>('samples');
  return {
    createdSample: data,
    isCreating: isLoading,
    error,
    createSample: post,
  };
}
