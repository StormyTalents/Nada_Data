import { useApiPut } from '@nobrainerlabs/react-material-ui';

import { User } from '../../interfaces/User';

export function useUpdateInvestor(id: number) {
  const { data, isLoading, error, put } = useApiPut<Partial<User>>(
    `users/${id}/investor`
  );
  return { updatedUser: data, isUpdating: isLoading, error, updateUser: put };
}
