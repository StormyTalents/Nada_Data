import { PaginatedList, useApiGet } from '@nobrainerlabs/react-material-ui';

import { User } from '../../interfaces/User';

export function useFindUsers() {
  const { data, isLoading, error, get } = useApiGet<PaginatedList<User>>(
    'users'
  );
  return { userList: data, isLoading, error, findUsers: get };
}
