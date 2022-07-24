import { useApiPost } from '@nobrainerlabs/react-material-ui';

import { Source } from '../Source';

export function useCreateSource() {
  const { data, isLoading, error, post } = useApiPost<Source>('sources');
  return {
    createdSource: data,
    isCreating: isLoading,
    error,
    createSource: post,
  };
}
