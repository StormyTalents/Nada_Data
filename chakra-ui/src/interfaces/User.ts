import { Opportunity } from './Opportunity';
import { OrganizationInvite } from './OrganizationInvite';
import { UserOrganization } from './UserOrganization';

export interface Role {
  id?: number;
  name?: string;
}

export interface User {
  id: number;
  email: string;
  password?: string;
  username: string;
  firstName: string;
  lastName: string;
  verified?: boolean;
  userOrganizations?: UserOrganization[];
  activeUserOrganizationId?: number;
  activeUserOrganization?: UserOrganization;
  likedOpportunities?: Opportunity[];

  readonly deleted?: Date;
  readonly created?: Date;
  readonly createdBy?: number;
  readonly modified?: Date;
  readonly modifiedBy?: number;
  roles?: Role[];
  isPasswordSet?: boolean;
  isInvited?: boolean;
  isSkipped?: boolean;

  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  countryCode?: string;
  imageUrl?: string;
  isAccreditedInvestor?: boolean;

  // @todo will move some to user organization after merge
  shortBio?: string;
  linkedinUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  isFirstTimeInvestor?: boolean;
  numInvestedCompanies?: number;
  avgInvestmentAmount?: number;
  largestInvestmentAmount?: number;
  organizationInvites?: OrganizationInvite[];
}

export interface UserCreateDto {
  firstName: string;
  lastName: string;
  email: string;
}

export const roleLabels = [{ name: 'Admin', label: 'Admin' }];
export const numInvestedCompaniesOptions = [
  { label: '1-2 Companies', value: '1' },
  { label: '3-5 Companies', value: '3' },
  { label: '6-10 Companies', value: '6' },
  { label: '10+ Companies', value: '10' },
];
export const avgInvestmentAmountOptions = [
  { label: '< $2k', value: '1' },
  { label: '$2k-$5k', value: '2' },
  { label: '$6k-$10k', value: '6' },
  { label: '$10k+', value: '11' },
];

export const largestInvestmentAmountOptions = [
  { label: '< $2k', value: '1' },
  { label: '$2k-$5k', value: '2' },
  { label: '$6k-$10k', value: '6' },
  { label: '$10k+', value: '11' },
];
