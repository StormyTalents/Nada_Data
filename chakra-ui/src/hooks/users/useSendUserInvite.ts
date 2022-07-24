import { useApiPost } from '@nobrainerlabs/react-material-ui';
import { PortalInviteResponseDto } from '../../common/interfaces/PortalInvite';

export function useSendUserInvite(id: number) {
  const { data, isLoading, error, post } = useApiPost<PortalInviteResponseDto>(
    `users/${id}/invite`
  );
  return { inviteResponse: data, isInviting: isLoading, error, invite: post };
}
