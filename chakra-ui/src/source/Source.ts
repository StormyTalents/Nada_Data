import { User } from '../interfaces/User';

export interface CreateSourceDto {
  name: string;
}

export interface Source {
  id: number;
  name: string;
  type: string;
  websiteUrl: string;
  logoUrl: string;
  description: string;
  isVisible: boolean;
  createdBy: User;
  created: Date;
  modifiedBy: User;
  modified: Date;
}
