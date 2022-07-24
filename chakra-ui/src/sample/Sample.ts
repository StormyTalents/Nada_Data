import { User } from '../interfaces/User';

export interface CreateSampleDto {
  name: string;
}

export interface Sample {
  id: number;
  name: string;
  type: string;
  websiteUrl: string;
  logoUrl: string;
  description: string;
  createdBy: User;
  created: Date;
  modifiedBy: User;
  modified: Date;
}
