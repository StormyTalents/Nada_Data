import { useApiPost } from '@nobrainerlabs/react-material-ui';

import { Contenttype } from '../Contenttype';

export function useCreateContenttype() {
  const { data, isLoading, error, post } =
    useApiPost<Contenttype>('contenttypes');
  return {
    createdContenttype: data,
    isCreating: isLoading,
    error,
    createContenttype: post,
  };
}
