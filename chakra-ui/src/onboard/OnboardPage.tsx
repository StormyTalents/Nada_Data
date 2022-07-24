import OnboardCertificationsCard from './cards/OnboardCertificationsCard';
import OnboardCompanyCard from './cards/OnboardCompanyCard';
import OnboardCompleteCard from './cards/OnboardCompleteCard';
import OnboardIndustryCodesCard from './cards/OnboardIndustryCodesCard';
import OnboardLayoutCard from './cards/OnboardLayoutCard';
import OnboardTypeCard from './cards/OnboardTypeCard';
import React from 'react';
import { useParams } from 'react-router-dom';

export const enum OnboardSteps {
  Type = 'type',
  Company = 'company',
  Certifications = 'certifications',
  IndustryCodes = 'industrycodes',
  Complete = 'complete',
}

export const enum OrganizationType {
  Buyer = 'buyer',
  Supplier = 'supplier',
}

const OnboardPage: React.FC = () => {
  const { step = OnboardSteps.Type } = useParams<{
    step: OnboardSteps;
  }>();

  return (
    <OnboardLayoutCard>
      {step === OnboardSteps.Type && <OnboardTypeCard />}
      {step === OnboardSteps.Company && <OnboardCompanyCard />}
      {step === OnboardSteps.Certifications && <OnboardCertificationsCard />}
      {step === OnboardSteps.IndustryCodes && <OnboardIndustryCodesCard />}
      {step === OnboardSteps.Complete && <OnboardCompleteCard />}
    </OnboardLayoutCard>
  );
};

export default OnboardPage;
