import { PaginatedList, useApiGet } from '@nobrainerlabs/react-material-ui';

import { User } from '../../interfaces/User';

export function useFindOrganizationUsers(organizationId: number) {
  const { data, isLoading, error, get } = useApiGet<PaginatedList<User>>(
    `organizations/${organizationId}/users`
  );
  return {
    organizationUserList: data,
    isLoading,
    error,
    findOrganizationUsers: get,
  };
}
