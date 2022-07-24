import { useApiDelete } from '@nobrainerlabs/react-material-ui';

import { User } from '../../interfaces/User';

export function useDeleteUserLikedOpportunities(opportunityId: number) {
  const { data, isLoading, error, del } = useApiDelete<User>(
    `users/liked-opportunities/${opportunityId}`
  );
  return {
    deletedUserLikedOpportunities: data,
    isDeletingUserLikedOpportunities: isLoading,
    deleteUserLikedOpportunities: del,
    error,
  };
}
