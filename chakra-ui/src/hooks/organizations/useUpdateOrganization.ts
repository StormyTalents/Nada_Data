import { useApiPut } from '@nobrainerlabs/react-material-ui';

import { Organization } from '../../interfaces/Organization';

export function useUpdateOrganization(id: number) {
  const { data, isLoading, error, put } = useApiPut<Partial<Organization>>(
    `organizations/${id}`
  );
  return {
    updatedOrganization: data,
    isUpdating: isLoading,
    error,
    updateOrganization: put,
  };
}
