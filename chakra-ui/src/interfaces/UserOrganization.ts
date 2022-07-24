import { Organization } from './Organization';
import { User } from './User';

export enum UserOrganizationRole {
  Admin = 'Admin',
  User = 'User',
}

export const userOrganizationRoles = [
  { value: UserOrganizationRole.Admin, label: 'Admin' },
  { value: UserOrganizationRole.User, label: 'User' },
];
export interface UserOrganization {
  id: number;
  userId: number;
  organizationId: number;
  // userOrganizationConsent?: UserOrganizationConsent;
  organization: Organization;
  user?: User;
  role?: UserOrganizationRole;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  title?: string;
  shortBio?: string;
  linkedinUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  created?: Date;
  createdBy?: User;
  modified?: Date;
  modifiedBy?: User;
}
