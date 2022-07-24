import {
  List,
  MenuItem,
  Select,
  TablePagination,
  TextField,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import {
  InlineForm,
  InlineFormik,
  InlineSelectField,
} from '@nobrainerlabs/react-material-ui-formik';
import { format, formatDistance } from 'date-fns';
import { FormikValues } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { NumberParam, StringParam, useQueryParam } from 'use-query-params';
import * as Yup from 'yup';
import CertificationLabels from '../certification/cards/CertificationLabels';

import {
  Certification,
  getCertificationClass,
} from '../certification/Certification';
import { useFindCertifications } from '../certification/hooks/useFindCertifications';
import InlineMultiSelectChip from '../common/inline/InlineMultiSelectChip';
import { useFindOpportunities } from '../hooks/opportunities/useFindOpportunities';
import { useFindIndustrycodes } from '../industrycode/hooks/useFindIndustrycodes';
import { Industrycode } from '../industrycode/Industrycode';
import { Opportunity } from '../interfaces/Opportunity';
import LikedOpportunityListCard from '../opportunity/cards/LikedOpportunityListCard';
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

const HomeLikedOpportunitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikValues>();
  const [search = '', setSearch] = useQueryParam('search', StringParam);
  const [page = 0, setPage] = useQueryParam('page', NumberParam);
  const [limit = 100, setLimit] = useQueryParam('limit', NumberParam);
  const [location = '', setLocation] = useQueryParam('location', StringParam);
  const [certifications = '', setCertifications] = useQueryParam(
    'certifications',
    StringParam
  );
  const [industrycodes = '', setIndustrycodes] = useQueryParam(
    'industrycodes',
    StringParam
  );
  const [selectedIndustrycodes, setSelectedIndustrycodes] = useState();
  const [sources = '', setSources] = useQueryParam('sources', StringParam);
  const [status = 'Open', setStatus] = useQueryParam('status', StringParam);
  const [order = 'opportunity.endDate', setOrder] = useQueryParam(
    'order',
    StringParam
  );
  const [direction = 'ASC', setDirection] = useQueryParam(
    'direction',
    StringParam
  );
  const [initialValues, setInitialValues] = useState<Partial<Opportunity>>();
  const [certificationOptions, setCertificationOptions] = useState<
    SelectOption[]
  >();
  const [
    selectedIndustrycode,
    setSelectedIndustrycode,
  ] = useState<SelectOption>();
  const [industrycodeOptions, setIndustrycodeOptions] = useState<
    SelectOption[]
  >();
  const [sourcesOptions, setSourcesOptions] = useState<SelectOption[]>();

  const { certificationList, findCertifications } = useFindCertifications(true);
  const { industrycodeList, findIndustrycodes } = useFindIndustrycodes(true);
  const { sourceList, findSources } = useFindSources(true);
  const {
    opportunities,
    findOpportunities,
    loadingError,
    loadingOpportunities,
  } = useFindOpportunities();

  useEffect(() => {
    if (certificationList) {
      const data: SelectOption[] = certificationList?.data.map((item) => {
        return { label: item.name, value: item.id };
      });
      setCertificationOptions(data);
    }
  }, [certificationList]);

  useEffect(() => {
    if (sourceList) {
      const data: SelectOption[] = sourceList?.data.map((item) => {
        return { label: item.name, value: item.id };
      });
      setSourcesOptions(data);
    }
  }, [sourceList]);

  useEffect(() => {
    if (industrycodeList?.data) {
      let data = (industrycodeList.data
        .filter((item) => item.code !== '')
        .map((item) => {
          return {
            label: `${item.code}: ${item.name}`,
            value: item.id,
            groupBy: item.type,
          };
        }) as unknown) as SelectOption[];

      data = data.sort((a, b) => {
        if (a.groupBy && b.groupBy) {
          return -b.groupBy.localeCompare(a.groupBy);
        }
        return 0;
      });
      setIndustrycodeOptions(data);
    }
  }, [industrycodeList, industrycodes]);

  useEffect(() => {
    findOpportunities({
      page,
      limit,
      certifications,
      industrycodes,
      search,
      location,
      status,
      sources,
      order,
      direction,
    });
  }, [
    certifications,
    industrycodes,
    search,
    page,
    limit,
    location,
    status,
    sources,
    findOpportunities,
  ]);
  return (
    <HomeLayout>
      <Helmet>
        <title>Haven | MBE, DBE, and DVE opportunities </title>
      </Helmet>
      <StyledDiv>
        <div className='lg:w-full w-full mx-auto bg-white p-8'>
          <div className='flex flex-col'>
            <div
              className='border-b border-gray-300 pt-12
             pb-10'
            >
              <h1 className='text-4xl font-extrabold tracking-tight text-gray-900'>
                My Favorite Opportunities
              </h1>
              <p className='mt-4 text-base text-gray-500'>
                Saved opportunities you are interested in
              </p>
            </div>

            <div>
              <LikedOpportunityListCard />
            </div>
          </div>
        </div>
      </StyledDiv>
    </HomeLayout>
  );
};

export default HomeLikedOpportunitiesPage;
