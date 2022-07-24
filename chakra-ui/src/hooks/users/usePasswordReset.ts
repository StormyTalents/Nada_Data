import { useCallback } from 'react';

import { useApiPut } from '@nobrainerlabs/react-material-ui';

import { usePasswordVerifyResetToken } from './usePasswordVerifyResetToken';

export function usePasswordReset() {
  const { user, doVerifyResetToken, ...verify } = usePasswordVerifyResetToken();

  let { data: success, isLoading, error, put } = useApiPut<boolean>(
    'users/password/reset'
  );

  isLoading = isLoading || verify.isLoading;

  const doPasswordReset = useCallback(
    (password: string, token: string) => {
      put({ password, token });
    },
    [put]
  );

  return {
    user,
    success,
    isLoading,
    error,
    verifyError: verify.error,
    doPasswordReset,
    doVerifyResetToken
  };
}
