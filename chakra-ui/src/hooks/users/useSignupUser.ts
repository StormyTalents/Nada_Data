import { useApiPost } from '@nobrainerlabs/react-material-ui';

import { User } from '../../interfaces/User';

export function useSignupUser() {
  const { data, isLoading, error, post } = useApiPost<User>('users/signup');
  return { createdUser: data, isCreating: isLoading, error, createUser: post };
}
