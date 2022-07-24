import { Industrycode } from './../industrycode/Industrycode';
import { Certification } from '../certification/Certification';
import { Source } from '../source/Source';
import { Organization } from './Organization';
import { Keyword } from '../keyword/Keyword';

export interface CreateOpportunityDto {
  name: string;
}

export enum OpportunityStatus {
  Pending = 'Pending',
  Reviewing = 'Reviewing',
  Published = 'Published',
  Cancelled = 'Cancelled',
}

export enum OpportunityShowStatus {
  All = 'All',
  Open = 'Open',
  Closed = 'Closed',
}

export enum OpportunityType {
  SourcesSought = 'Sources Sought',
  Presolicitation = 'Presolicitation',
  Bid = 'Bid',
  Solicitation = 'Solicitation',
  IFB = 'IFB (Invitation for Bid)',
  RFI = 'RFI (Request for Information)',
  RFP = 'RFP (Request for Proposal)',
  RFQ = 'RFQ (Request for Quote)',
  RFX = 'RFX',
  CombinedSynopsis = 'Combined Synopsis/Solicitation',
  SpecialNotice = 'Special Notice',
  Award = 'Award',
}

export enum OpportunitySectorType {
  GovernmentOpportunity = 'Government Opportunity',
  SupplierDiversityOpportunity = 'Supplier Diversity Opportunity',
  SupplierDiversityProgram = 'Supplier Diversity Program',
  RelationshipOpportunity = 'Relationship Opportunity',
  FutureOpportunity = 'Future Opportunity',
}
export interface Opportunity {
  id: number;
  airId: string;
  refId: string;
  refName: string;
  organizationId: number;
  organization?: Organization;
  sourceId?: number;
  source?: Source;
  name: string;
  description: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  contactName2: string;
  contactPhone2: string;
  contactEmail2: string;
  status: OpportunityStatus;
  showStatus?: OpportunityShowStatus;
  imageUrl: string;
  refUrl: string;
  type?: OpportunityType;
  isPreBid?: boolean;
  preBidDate?: Date;
  placeOfPerformance?: string;
  address1?: string;
  city?: string;
  county?: string;
  state?: string;
  postalCode?: string;
  notes?: string;
  certifications?: Certification[];
  industrycodes?: Industrycode[];
  keywords?: Keyword[];
  sectorType?: OpportunitySectorType;
  postedDate?: Date;
  beginDate?: Date;
  endDate?: Date;
  secondaryUrl?: string;

  readonly deleted?: Date;
  readonly created?: Date;
  readonly createdBy?: number;
  readonly modified?: Date;
  readonly modifiedBy?: number;
}

export const opportunityStatusOptions = [
  { label: OpportunityStatus.Pending, value: OpportunityStatus.Pending },
  { label: OpportunityStatus.Reviewing, value: OpportunityStatus.Reviewing },
  { label: OpportunityStatus.Published, value: OpportunityStatus.Published },
  { label: OpportunityStatus.Cancelled, value: OpportunityStatus.Cancelled },
];
