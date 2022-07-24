import { useApiPut } from '@nobrainerlabs/react-material-ui';

import { Industrycode } from '../Industrycode';

export function useUpdateIndustrycode(id: number) {
  const { data, isLoading, error, put } = useApiPut<Partial<Industrycode>>(
    `industrycodes/${id}`
  );
  return {
    updatedIndustrycode: data,
    isUpdating: isLoading,
    error,
    updateIndustrycode: put,
  };
}
