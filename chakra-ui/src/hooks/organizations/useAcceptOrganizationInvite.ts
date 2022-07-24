import { useCallback, useEffect, useState } from 'react';

import { useApiPost } from '@nobrainerlabs/react-material-ui';

import { UserOrganization } from '../../interfaces/UserOrganization';

export function useAcceptOrganizationInvite() {
  const [path, setPath] = useState('');
  const { data, isLoading, error, post } = useApiPost<UserOrganization>(path);
  // perform post call after setting path
  useEffect(() => {
    if (path) post();
  }, [path, post]);
  // reset path after getting results/error back
  useEffect(() => {
    if (data || error) setPath('');
  }, [data, error]);
  const acceptOrganizationInvite = useCallback((organizationId: number) => {
    setPath(`organizations/${organizationId}/accept-invite`);
  }, []);
  return {
    acceptedOrganizationInvite: data,
    isAccepting: isLoading,
    acceptError: error,
    acceptOrganizationInvite,
  };
}
