import { useApiPost } from '@nobrainerlabs/react-material-ui';

import { Content } from '../../interfaces/Content';

export function useCreateComment(id: number) {
  const { data, isLoading, error, post } = useApiPost<Content>(
    `project/${id}/comments`
  );
  return {
    createdComment: data,
    isCreating: isLoading,
    error,
    createComment: post,
  };
}
