import { Certification } from '../certification/Certification';
import { Industrycode } from '../industrycode/Industrycode';
import { OrganizationType } from '../onboard/OnboardPage';
import { Source } from '../source/Source';
import { User } from './User';

export interface CreateOrganizationDto {
  name: string;
}

export interface Organization {
  id: number;
  name: string;
  type: string;
  source: Source;
  description: string;
  foundedYear: string;
  websiteUrl: string;
  secondaryUrl?: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  countryCode: string;
  primaryIndustry: string;
  secondaryIndustry: string;
  logoUrl: string;
  numEmployees: string;
  role?: string;
  modifiedBy: User;
  modified: Date;
  interestedCertifications: Certification[];
  industryCodes: Industrycode[];
}

export interface CreateOrganizationByUserDto {
  userId: number;
  name: string;
  description: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  countryCode: string;
}

export const industryOptions = [
  { label: '-', value: '' },
  { label: 'Robotics', value: 'Robotics' },
  { label: 'Software', value: 'Software' },
];

export const numEmployeesOptions = [
  { label: '-', value: '' },
  { label: '1-10', value: '1-10' },
  { label: '11-50', value: '11-50' },
  { label: '51+', value: '51+' },
];
