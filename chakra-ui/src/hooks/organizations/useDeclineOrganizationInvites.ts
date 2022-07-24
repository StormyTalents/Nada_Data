import { useState, useEffect, useCallback } from 'react';
import { useApiPost } from '@nobrainerlabs/react-material-ui';

export function useDeclineOrganizationInvite() {
  const [path, setPath] = useState('');
  const { data, isLoading, error, post } = useApiPost<any>(path);
  // perform post call after setting path
  useEffect(() => {
    if (path) post();
  }, [path, post]);
  // reset path after getting results/error back
  useEffect(() => {
    if (data || error) setPath('');
  }, [data, error]);
  const declineOrganizationInvite = useCallback((organizationId: number) => {
    setPath(`organizations/${organizationId}/decline-invite`);
  }, []);
  return {
    declinedOrganizationInvite: data,
    isDeclining: isLoading,
    declineError: error,
    declineOrganizationInvite,
  };
}
