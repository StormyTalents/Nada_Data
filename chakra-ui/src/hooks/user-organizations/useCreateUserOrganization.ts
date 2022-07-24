import { useApiPost } from '@nobrainerlabs/react-material-ui';

import { UserOrganization } from '../../interfaces/UserOrganization';

export function useCreateUserOrganization() {
  const { data, isLoading, error, post } = useApiPost<UserOrganization>(
    `user-organizations`
  );
  return {
    createdUserOrganization: data,
    isCreating: isLoading,
    error,
    createUserOrganization: post,
  };
}
