import { useApiPut } from '@nobrainerlabs/react-material-ui';

import { User } from '../../interfaces/User';

export function useUpdateUser(id: number) {
  const { data, isLoading, error, put } = useApiPut<Partial<User>>(
    `users/${id}`
  );
  return { updatedUser: data, isUpdating: isLoading, error, updateUser: put };
}
