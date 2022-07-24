import { useApiPost } from '@nobrainerlabs/react-material-ui';

import { User } from '../../interfaces/User';

export function useCreateUser() {
  const { data, isLoading, error, post } = useApiPost<User>('users');
  return { createdUser: data, isCreating: isLoading, error, createUser: post };
}
