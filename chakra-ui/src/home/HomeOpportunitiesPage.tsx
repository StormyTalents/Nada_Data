import { FormikValues } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { NumberParam, StringParam, useQueryParam } from 'use-query-params';

import { useFindCertifications } from '../certification/hooks/useFindCertifications';
import { useFindOpportunities } from '../hooks/opportunities/useFindOpportunities';
import { useFindIndustrycodes } from '../industrycode/hooks/useFindIndustrycodes';
import { Opportunity } from '../interfaces/Opportunity';
import OpportunityListCard from '../opportunity/cards/OpportunityListCard';
import { useFindSources } from '../source/hooks/useFindSources';
import HomeLayout from './HomeLayout';

interface SelectOption {
  value: number | string;
  label: string;
  groupBy?: string;
}

const StyledDiv = styled.div`
  background-color: white;

  .search-filters {
    margin-bottom: 40px;
  }
`;

const HomeOpportunitiesPage: React.FC = () => {
  return (
    <HomeLayout>
      <Helmet>
        <title>Haven | MBE, DBE, and DVE opportunities </title>
      </Helmet>
      <StyledDiv>
        <OpportunityListCard />
      </StyledDiv>
    </HomeLayout>
  );
};

export default HomeOpportunitiesPage;
