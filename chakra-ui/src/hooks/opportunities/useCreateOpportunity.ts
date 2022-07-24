import { useApiPost } from '@nobrainerlabs/react-material-ui';

import { Opportunity } from '../../interfaces/Opportunity';

export function useCreateOpportunity() {
  const { data, isLoading, error, post } = useApiPost<Opportunity>(
    'opportunities'
  );
  return {
    createdOpportunity: data,
    isCreating: isLoading,
    error,
    createOpportunity: post,
  };
}
