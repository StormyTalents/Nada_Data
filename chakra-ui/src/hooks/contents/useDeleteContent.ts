import { useApiDelete } from '@nobrainerlabs/react-material-ui';

import { Content } from '../../interfaces/Content';

export function useDeleteContent(id: number) {
  const { data, isLoading, error, del } = useApiDelete<Partial<Content>>(
    `contents/${id}`
  );
  return {
    deletedContent: data,
    isDeleting: isLoading,
    error,
    deleteContent: del,
  };
}
