
export interface MailingList {
  id: number;
  email: string;
  readonly created?: Date;
}

export interface MailingListCreateDto {
  id: number;
  email: string;
  created: string;
}
