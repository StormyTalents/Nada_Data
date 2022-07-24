import { PaginatedList, useApiGet } from '@nobrainerlabs/react-material-ui';

import { MailingList } from '../../interfaces/MailingList';

export function useFindMailingList() {
  const { data, isLoading, error, get } = useApiGet<PaginatedList<MailingList>>(
    'mailing-list'
  );
  return { mailingList: data, isLoading, error, findMailingList: get };
}
