import { useApiPost } from '@nobrainerlabs/react-material-ui';
import { MailingList } from '../../interfaces/MailingList';

export function useCreateMailingList() {
  const { data, isLoading, error, post } = useApiPost<MailingList>(
    'mailing-list'
  );
  return {
    createdMailingList: data,
    isCreating: isLoading,
    emailError: error,
    createMailingList: post,
  };
}
