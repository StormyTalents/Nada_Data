import { useApiPost } from '@nobrainerlabs/react-material-ui';

import { User } from '../../interfaces/User';

export function useCreateUserLikedOpportunities(opportunityId: number) {
  const { data, isLoading, error, post } = useApiPost<User>(
    `users/liked-opportunities/${opportunityId}`
  );
  return {
    createdUserLikedOpportunities: data,
    isCreatingUserLikedOpportunities: isLoading,
    createUserLikedOpportunities: post,
    error,
  };
}
