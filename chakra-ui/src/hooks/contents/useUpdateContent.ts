import { useApiPut } from '@nobrainerlabs/react-material-ui';

import { Content } from '../../interfaces/Content';

export function useUpdateContent(id: number) {
  const { data, isLoading, error, put } = useApiPut<Partial<Content>>(
    `contents/${id}`
  );
  return {
    updatedContent: data,
    isUpdating: isLoading,
    error,
    updateContent: put,
  };
}
