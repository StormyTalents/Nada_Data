import { useApiPost } from '@nobrainerlabs/react-material-ui';

import { Content } from '../../interfaces/Content';

export function useCreateContent() {
  const { data, isLoading, error, post } = useApiPost<Content>('contents');
  return {
    createdContent: data,
    isCreating: isLoading,
    error,
    createContent: post,
  };
}
