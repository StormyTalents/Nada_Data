import { useApiGet } from '@nobrainerlabs/react-material-ui';

import { UserJsonWebToken } from '@nobrainerlabs/core';
import { User } from '../../interfaces/User';

export function useVerifyEmail() {
  const { data, isLoading, error, get } = useApiGet<UserJsonWebToken<User>>(
    'users/verify/email'
  );
  return { jwtToken: data, isLoading, error, verifyEmail: get };
}
