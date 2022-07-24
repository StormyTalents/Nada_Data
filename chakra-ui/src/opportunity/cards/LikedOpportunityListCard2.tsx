import {
  List,
  MenuItem,
  Select,
  TablePagination,
  TextField,
  Typography,
} from '@material-ui/core';
import slugify from 'slugify';
import { Autocomplete } from '@material-ui/lab';
import {
  InlineForm,
  InlineFormik,
  InlineSelectField,
} from '@nobrainerlabs/react-material-ui-formik';
import { format, formatDistance } from 'date-fns';
import { FormikValues } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { NumberParam, StringParam, useQueryParam } from 'use-query-params';
import * as Yup from 'yup';
import CertificationLabels from '../../certification/cards/CertificationLabels';
import FriendlyCertificationLabels from '../../certification/cards/FriendlyCertificationLabels';

import {
  Certification,
  getCertificationClass,
} from '../../certification/Certification';
import { useFindCertifications } from '../../certification/hooks/useFindCertifications';
import InlineMultiSelectChip from '../../common/inline/InlineMultiSelectChip';
import { useFindOpportunities } from '../../hooks/opportunities/useFindOpportunities';
import { useFindIndustrycodes } from '../../industrycode/hooks/useFindIndustrycodes';
import { Industrycode } from '../../industrycode/Industrycode';
import { Opportunity } from '../../interfaces/Opportunity';
import { useFindSources } from '../../source/hooks/useFindSources';
import { FavoriteOpportunity } from '../../common/home/FavoriteOpportunity';
import { useUserContext } from '../../user/UserContext';

interface SelectOption {
  value: number | string;
  label: string;
  groupBy?: string;
}

const StyledDiv = styled.div`
  width: 100%;
  background-color: white;
  .search-filters {
    margin-bottom: 40px;
  }
`;

const LikedOpportunityListCard2: React.FC<{
  showSearch?: boolean;
  showPagination?: boolean;
  perPage?: number;
}> = ({ showSearch = true, showPagination = true, perPage = 100 }) => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikValues>();
  const [search = '', setSearch] = useQueryParam('search', StringParam);
  const [page = 0, setPage] = useQueryParam('page', NumberParam);
  const [limit = perPage, setLimit] = useQueryParam('limit', NumberParam);
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
  const { user, refreshUser } = useUserContext();

  useEffect(() => {
    if (certificationList) {
      let certOptions = [];
      for (const cert of certificationList.data) {
        if (cert.friendlyNames) {
          for (const friendly of cert.friendlyNames) {
            certOptions.push({
              label: cert.name,
              value: cert.name,
              groupBy: friendly,
            });
          }
        }
      }
      certOptions = certOptions.sort((a, b) => {
        return a.groupBy.localeCompare(b.groupBy);
      });
      setCertificationOptions(certOptions);
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
            value: item.code,
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
    <StyledDiv>
      <div className='-my-2 w-full bg-white '>
        <div className='py-2 align-middle inline-block w-full'>
          <div
            className='shadow overflow-auto border-b border-gray-200'
            style={{ width: '100%' }}
          >
            <table
              className='w-full divide-y divide-gray-200'
              style={{ width: '100%' }}
            >
              <thead className='bg-green-100'>
                <tr>
                  <th scope='col'></th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4 truncate'
                  >
                    Name
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Certifications
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Location
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Status
                  </th>

                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Ends
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {loadingOpportunities && (
                  <tr>
                    <td colSpan={14}>
                      <div className='p-16 flex justify-center items-center'>
                        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500'></div>
                      </div>
                    </td>
                  </tr>
                )}
                {user?.likedOpportunities?.length === 0 && (
                  <tr>
                    <td colSpan={14} className={`p-24 text-center`}>
                      None found
                    </td>
                  </tr>
                )}
                {user?.likedOpportunities?.map((opportunity, i) => (
                  <tr key={i}>
                    <td className='text-center mx-auto'>
                      {user && (
                        <FavoriteOpportunity
                          user={user}
                          opportunityId={opportunity.id}
                          onUpdate={() => refreshUser()}
                        />
                      )}
                    </td>
                    <td className='w-1/2 px-6 py-4'>
                      <div className='flex items-center'>
                        <div className=' h-10 w-10'>
                          {opportunity.organization?.logoUrl && (
                            <img
                              className='w-32'
                              src={opportunity.organization?.logoUrl}
                              alt={opportunity.organization?.name}
                            />
                          )}
                          {!opportunity.organization?.logoUrl && (
                            <img
                              style={{ width: 128, marginBottom: 20 }}
                              src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX09PS+vr7Pz8/d3d3q6urv7+/y8vK7u7v39/ff39/MzMza2trGxsbBwcHk5OTz8/PU1NSV4ZV1AAAEA0lEQVR4nO2d6ZajIBBGFVmUTd7/aSfI4hLTY5x2wfnun24Odh/uIRGqipiqAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAXeqV3Qqwe+FebqfeiuvXrsm+Bkp2BdC3v14DdBzX5D1189+i1QsduwJuzq0W8BhjC8P8lQsS9QojxD8c3i1jYlGjYwnADDewHDNWB4L2C4Bgzvxf9n+Np1jp2cMZ4bfW6UbNh3UssuWVGntUsWXElN7BDVl2xo/e9Ghfmk0rdk0OiVb2jruwo2pDqEUkOisCWhK2RjbOgxXqpgQ2tiKOV7uIxx7vCiVaEhvPxTDKuZYfMMQx5emHoYeRukTNCleugioadYQ/9GFK/bSehizghRq3hnfc2vqGV4hxZsWFFFxoIE7wjpctbXOtIEpaINq7adbG7aZSv+UrThFmB4L2C4BgzvxdKQ8zFeqnrOJyXC3BgN+Q7Ocwss10NHnE1WrCFE5RFZJx2dGRpJvsfRk+uqiz2N37ikAj0bCuAuKnbve5p96JOL44voKbSChwsNFaKnYVMuNP9nw1qfe4rjX6KnvahTD3FsMGS/bUiuM2RyaJnwKo1SKlwXwn/5C6/SKw3DJJpmeqdJi94QLc7zNCUaVpakhJpX9Lm2tFr4NNxytdDfYe5g6Mc/7W7nrfgjGAr71UjblBa53PDvJMMvD7b1jzfkMDwGGK5RuOEPO//UVbQha9wkm2iVyotjRZXrZtnEIg2Z35vpuM5xZ3whKl5ofdcseirRMOxLhQlZ/Xg+rwnXDftSIf2UFmyYYoshRu3XKjP1JLYo2TBET7GY+DF6KtFwXiFdifFDWapgw6obGi526eGdF26tfPhYhukm0VORhlWja92kNKgv5Mu0drzurELOTiqUaVj10wxpxabZTc5i+FS24RZg+AEYHgQM14DhB2B4EDBco3jDntF32GSrU7hhS53U8h1Cx6x42YbUrJddxFi7LdxQfawrkbQNL9uQff70ukxR1WMNc/0dhh+4naHIbDRs35n1382QKBdRZINhT7vmnW56POhmhsb2+ZhWt8FQabPKeMb4fob5ktb+3dB+evNO/s99DTfMIZNLs0xeYwo31DCsYHgYv2w4vY0+0tAomyGPNNTTIPKhhvmP0tHGBxs+fw5heBYw9MAQhhEYHgQMPTCEYQSGBwFDDwz/V8O7RcDdm+GYj7CLse6cw2s/2ZWfQUuTYTc+cjbP4fwZtKLJV6TDxdpOHlQbDfNfsWsNzwSGMIThwvB8wdqdavhD5e8ozNmPjSCTMwknUOvuXMHXLO78jpKdNBd8t8nKKZEjOV8QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACr/AFpmWSuqvcLYwAAAABJRU5ErkJggg=='
                            />
                          )}
                        </div>
                        <div className='ml-4 '>
                          <Link
                            to={`/opportunities/${opportunity.id}/${slugify(
                              opportunity.name
                            )}`}
                          >
                            <div className='text-sm font-medium text-black mb-2'>
                              {opportunity.name}
                            </div>
                            {opportunity?.industrycodes &&
                              opportunity?.industrycodes.length > 0 && (
                                <div className='text-sm text-gray-900 line-clamp-2'>
                                  {opportunity?.industrycodes?.map(
                                    (industrycode, i) => (
                                      <div key={i}>
                                        {industrycode.code}: {industrycode.name}{' '}
                                        ({industrycode.type})
                                      </div>
                                    )
                                  )}
                                </div>
                              )}
                          </Link>
                          <Typography variant='caption'>
                            {opportunity.keywords
                              ?.map((keyword) => keyword.name)
                              .join(', ')}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <FriendlyCertificationLabels
                        certifications={opportunity?.certifications}
                      />
                    </td>
                    <td
                      className='px-6 py-4 whitespace-nowrap max-w-2'
                      style={{ maxWidth: 120, overflow: 'hidden' }}
                    >
                      {opportunity.placeOfPerformance
                        ? opportunity.placeOfPerformance.replace(
                            'undefined,',
                            ''
                          )
                        : opportunity.city &&
                          opportunity.state && (
                            <div className='text-sm text-gray-500'>
                              {opportunity.city &&
                                opportunity.city !== 'undefined' &&
                                opportunity.city + ', '}{' '}
                              {opportunity.state}
                            </div>
                          )}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {opportunity?.endDate &&
                      opportunity?.endDate > new Date() ? (
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800`}
                        >
                          Open
                        </span>
                      ) : (
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'}`}
                        >
                          Closed
                        </span>
                      )}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {opportunity?.endDate &&
                        formatDistance(opportunity.endDate, new Date(), {
                          addSuffix: true,
                        })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* {showPagination && (
              <div style={{ margin: 20, width: '70%' }}>
                {opportunities && (
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    align="center"
                    component="div"
                    count={opportunities.total}
                    rowsPerPage={limit}
                    page={page}
                    onPageChange={(_, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(event) => {
                      setLimit(+event.target.value);
                      setPage(0);
                    }}
                  />
                )}
              </div>
            )} */}
          </div>
        </div>
      </div>
    </StyledDiv>
  );
};

export default LikedOpportunityListCard2;
