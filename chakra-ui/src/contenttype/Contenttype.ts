import { User } from '../interfaces/User';

export interface CreateContenttypeDto {
  name: string;
}

export interface Contenttype {
  id: number;
  name: string;
  createdBy: User;
  created: Date;
  modifiedBy: User;
  modified: Date;
}
