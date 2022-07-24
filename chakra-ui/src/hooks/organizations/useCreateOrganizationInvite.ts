import { useApiPost } from '@nobrainerlabs/react-material-ui';

import { OrganizationInvite } from '../../interfaces/OrganizationInvite';

export function useCreateOrganizationInvite(organizationId: number) {
  const { data, isLoading, error, post } = useApiPost<OrganizationInvite>(
    `organizations/${organizationId}/invite`
  );
  return {
    createdOrganizationInvite: data,
    isCreating: isLoading,
    error,
    createOrganizationInvite: post,
  };
}
