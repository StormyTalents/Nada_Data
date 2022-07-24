import { useCallback } from 'react';

import { useApiPost } from '@nobrainerlabs/react-material-ui';

export function usePasswordRecover() {
  const { data: success, isLoading, error, post } = useApiPost<boolean>(
    'users/password/recover'
  );

  const doPasswordRecover = useCallback(
    (email: string) => {
      post({ email });
    },
    [post]
  );

  return { success, isLoading, error, doPasswordRecover };
}
