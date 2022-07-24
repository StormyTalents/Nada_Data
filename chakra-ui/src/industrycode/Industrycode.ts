import { User } from '../interfaces/User';
export interface CreateIndustrycodeDto {
  type: string;
  code: string;
  name: string;
}

export interface Industrycode {
  id: number;
  type: string;
  code: string;
  name: string;
  description: string;
  createdBy: User;
  created: Date;
  modifiedBy: User;
  modified: Date;
}

export const industrycodeOptions = ['NAICS', 'NACS'];
