import { useApiPatch } from '@nobrainerlabs/react-material-ui';

import { User } from '../../interfaces/User';

export function useUpdateUserActiveOrganization(id: number) {
  const { data, isLoading, error, patch } = useApiPatch<Partial<User>>(
    `users/${id}/active-organization`
  );
  return {
    updatedUserActiveOrganization: data,
    isUpdating: isLoading,
    error,
    updateUserActiveOrganization: patch
  };
}
