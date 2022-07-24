import { useApiPost } from '@nobrainerlabs/react-material-ui';

import { Organization } from '../../interfaces/Organization';

export function useCreateOrganization() {
  const { data, isLoading, error, post } = useApiPost<Organization>(
    'organizations'
  );
  return {
    createdOrganization: data,
    isCreating: isLoading,
    error,
    createOrganization: post,
  };
}
