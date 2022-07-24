import { Organization } from './Organization';
import { UserOrganization, UserOrganizationRole } from './UserOrganization';

export interface OrganizationInvite {
  id: number;
  userOrganizationId: number;
  userOrganization: UserOrganization;
  organizationId: number;
  organization: Organization;
  email: string;
  role: UserOrganizationRole;
  created: Date;
}
export interface OrganizationInviteRequest {
  userOrganizationId?: number;
  email: string;
  role: UserOrganizationRole;
}
