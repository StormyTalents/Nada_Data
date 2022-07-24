import { useApiPut } from '@nobrainerlabs/react-material-ui';

import { UserOrganization } from '../../interfaces/UserOrganization';

export function useUpdateOrganizationUser(
  organizationId: number,
  userId: number
) {
  const { data, isLoading, error, put } = useApiPut<Partial<UserOrganization>>(
    `organizations/${organizationId}/users/${userId}`
  );
  return {
    updatedOrganizationUser: data,
    isUpdating: isLoading,
    error,
    updateOrganizationUser: put,
  };
}
