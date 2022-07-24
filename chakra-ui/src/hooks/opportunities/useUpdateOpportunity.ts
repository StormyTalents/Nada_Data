import { useApiPut } from '@nobrainerlabs/react-material-ui';

import { Opportunity } from '../../interfaces/Opportunity';

export function useUpdateOpportunity(id: number) {
  const { data, isLoading, error, put } = useApiPut<Partial<Opportunity>>(
    `opportunities/${id}`
  );
  return {
    updatedOpportunity: data,
    isUpdating: isLoading,
    error,
    updateOpportunity: put,
  };
}
