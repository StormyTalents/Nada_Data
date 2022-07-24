import { Opportunity } from '../interfaces/Opportunity';

const getHavenDescriptionHandler = (opportunity: Opportunity) => {
  const friendlyNames: string[] =
    (opportunity &&
      opportunity?.certifications &&
      opportunity?.certifications[0]?.friendlyNames) ||
    [];
  const type = opportunity?.sectorType;

  if (type === 'Government Opportunity' && friendlyNames?.length > 1) {
    return 'This government opportunity is looking for all types of small businesses to buy from.';
  } else if (type === 'Relationship Opportunity' && friendlyNames?.length > 1) {
    return 'A relationship opportunity is our favorite type of opportunity. This one is extremely exciting because this company is looking to meet all types of suppliers to work with.';
  } else if (
    type === 'Government Opportunity' &&
    friendlyNames?.length === 1 &&
    friendlyNames[0] === 'Minority'
  ) {
    return 'This opportunity is a government contract that is meant for small businesses that are owned and run by a minority!';
  } else if (
    type === 'Relationship Opportunity' &&
    friendlyNames?.length === 1 &&
    friendlyNames[0] === 'Minority'
  ) {
    return 'This company still has to win the project. But they have other projects they are working on. If you are minority-owned small business, they would be happy to hear from you!';
  } else if (
    type === 'Government Opportunity' &&
    friendlyNames?.length === 1 &&
    friendlyNames[0] === 'LGBTQ+'
  ) {
    return 'This opportunity is a government solicitation that must be awarded to a LGBTQ+ owned small business. ';
  } else if (
    type === 'Relationship Opportunity' &&
    friendlyNames?.length === 1 &&
    friendlyNames[0] === 'LGBTQ+'
  ) {
    return 'The company listed here still has to win the project. But, they have more than one project in the works. If you’re a LGBTQ+-owned small business — give them a call!';
  } else if (
    type === 'Government Opportunity' &&
    friendlyNames?.length === 1 &&
    friendlyNames[0] === 'Native American'
  ) {
    return 'This opportunity is a government solicitation that must be awarded to a Native American-owned small business. ';
  } else if (
    type === 'Relationship Opportunity' &&
    friendlyNames?.length === 1 &&
    friendlyNames[0] === 'Native American'
  ) {
    return 'The company listed here still has to win the project. But, they have more than one project in the works. If you’re a Native American-owned small business — give them a call!';
  } else if (
    type === 'Government Opportunity' &&
    friendlyNames?.length === 1 &&
    friendlyNames[0] === 'HUBZone'
  ) {
    return 'This opportunity is a government contract reserved for small businesses from a historically underutilized business zone.';
  } else if (
    type === 'Relationship Opportunity' &&
    friendlyNames?.length === 1 &&
    friendlyNames[0] === 'HUBZone'
  ) {
    return 'The company listed here still has to win the project. But, they have more than one project in the works. If you’re a HUBZone certified small business — give them a ring!';
  } else if (
    type === 'Government Opportunity' &&
    friendlyNames?.length === 1 &&
    friendlyNames[0] === 'Women'
  ) {
    return 'This opportunity is a government solicitation that must be awarded to a women-owned small business. ';
  } else if (
    type === 'Relationship Opportunity' &&
    friendlyNames?.length === 1 &&
    friendlyNames[0] === 'Women'
  ) {
    return 'The company listed here still has to win the project. But, they have more than one project in the works. If you’re a women-owned business — give them a ring!';
  } else if (
    type === 'Government Opportunity' &&
    friendlyNames?.length === 1 &&
    friendlyNames[0] === 'Veteran'
  ) {
    return 'This opportunity is a government contract, meant only for small businesses that are owned by a veteran!';
  } else if (
    type === 'Relationship Opportunity' &&
    friendlyNames?.length === 1 &&
    friendlyNames[0] === 'Veteran'
  ) {
    return 'The company listed here still has to win the project. But, they have more than one project in the works. If you’re a veteran-owned business — give them a ring!';
  } else if (
    type === 'Government Opportunity' &&
    friendlyNames?.length === 1 &&
    friendlyNames[0] === 'Small Business'
  ) {
    return 'This opportunity is a government contract, that can only be awarded to a small business.';
  } else if (
    type === 'Relationship Opportunity' &&
    friendlyNames?.length === 1 &&
    friendlyNames[0] === 'Small Business'
  ) {
    return 'This opportunity is conditional, but it doesn’t mean it’s not valuable. Reach out and try and build a relationship with this buyer looking to partner with small businesses.';
  }
};

export default getHavenDescriptionHandler;
