import { useApiPut } from '@nobrainerlabs/react-material-ui';

import { UserOrganization } from '../../interfaces/UserOrganization';

export function useUpdateUserOrganization(userOrganizationId: number) {
  const { data, isLoading, error, put } = useApiPut<Partial<UserOrganization>>(
    `user-organizations/${userOrganizationId}`
  );
  return {
    updatedUserOrganization: data,
    isUpdating: isLoading,
    error,
    updateUserOrganization: put,
  };
}
