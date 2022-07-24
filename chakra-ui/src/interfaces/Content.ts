import { Certification } from './../certification/Certification';
import { Keyword } from '../keyword/Keyword';
import { Contenttype } from './../contenttype/Contenttype';
import { User } from './User';

export interface CreateContentDto {
  title: string;
  html?: string;
}

export interface Content {
  id: number;
  contenttypeId: number;
  contenttype: Contenttype;
  title: string;
  summary?: string;
  html?: string;
  keywords?: Keyword[];
  certifications?: Certification[];
  eventTime?: Date;
  eventLocationType?: string;
  eventLocation?: string;
  readonly createdBy: User;
  readonly created: Date;
  readonly modifiedBy: User;
  readonly modified: Date;
}
