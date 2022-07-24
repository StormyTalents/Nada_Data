import { useApiPost } from '@nobrainerlabs/react-material-ui';

import { Industrycode } from '../Industrycode';

export function useCreateIndustrycode() {
  const { data, isLoading, error, post } =
    useApiPost<Industrycode>('industrycodes');
  return {
    createdIndustrycode: data,
    isCreating: isLoading,
    error,
    createIndustrycode: post,
  };
}
