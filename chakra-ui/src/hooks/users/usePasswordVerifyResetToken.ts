import { useCallback } from 'react';

import { useApiGet } from '@nobrainerlabs/react-material-ui';

export function usePasswordVerifyResetToken() {
  const { data: user, isLoading, error, get } = useApiGet<boolean>(
    'users/password/verify/reset-token'
  );

  const doVerifyResetToken = useCallback(
    (token: string) => {
      get({ token });
    },
    [get]
  );

  return { user, isLoading, error, doVerifyResetToken };
}
