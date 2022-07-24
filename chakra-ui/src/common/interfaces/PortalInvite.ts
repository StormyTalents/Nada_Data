import { User } from '../../interfaces/User';

export interface PortalInviteRequestDto {
  shouldForceMatch?: boolean;
}

export interface PortalInviteResponseDto {
  isSent: boolean;
  conflictUser?: User;
}
