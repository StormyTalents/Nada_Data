import { User } from '../interfaces/User';

export interface CreateKeywordDto {
  name: string;
  description?: string;
}

export interface Keyword {
  id: number;
  name: string;
  description?: string;
  readonly createdBy: User;
  readonly created: Date;
  readonly modifiedBy: User;
  readonly modified: Date;
}
