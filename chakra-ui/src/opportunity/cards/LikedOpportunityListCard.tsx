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
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronDownIcon,
  SearchIcon,
} from '@heroicons/react/solid';
import { format, formatDistance } from 'date-fns';
import { FormikValues } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { NumberParam, StringParam, useQueryParam } from 'use-query-params';
import * as Yup from 'yup';
import CertificationLabels from '../../certification/cards/CertificationLabels';
import FriendlyCertificationLabels from '../../certification/cards/FriendlyCertificationLabels';
import CertificationsList from '../../certification/CertificationsList';
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
import { useReturnSectorTypeIcon } from '../../hooks/opportunities/useReturnSectorTypeIcon';
import { useCalculateExpirationForOpportunity } from '../../hooks/opportunities/usecalculateExpirationForOpportunity';

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

  .green-circle-expiration {
    background-color: #72c78e;
  }

  .orange-circle-expiration {
    background-color: #ff6920;
  }

  .yellow-circle-expiration {
    background-color: #fec337;
  }
`;

const LikedOpportunityListCard: React.FC<{
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

  const { changeIconForSectorType } = useReturnSectorTypeIcon();
  const {
    calculateExpirationForOpportunity,
  } = useCalculateExpirationForOpportunity();

  const { user, refreshUser } = useUserContext();

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
  }

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

  const handleSort = (column: string) => {
    setOrder(column);
    setDirection(direction === 'ASC' ? 'DESC' : 'ASC');
  };

  return (
    <StyledDiv>
      <div className='-my-2 w-full bg-white '>
        <div className='py-2 align-middle inline-block w-full'>
          <div
            className='shadow overflow-auto border-b border-gray-200'
            style={{ width: '100%' }}
          >
            <table className='min-w-full table-auto' style={{ width: '100%' }}>
              <thead className='bg-gray-50'>
                <tr>
                  <th
                    scope='col'
                    className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-300 sm:pl-6 buyer-wrapper'
                  >
                    <div className='flex justify-start items-center'>
                      <span>Opportunity</span>{' '}
                      <ArrowUpIcon className='w-4 h-4 ml-2' />
                    </div>
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-300 opportunities-th'
                  >
                    Location
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-300 opportunities-th'
                  >
                    Industry
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900 opportunities-th'
                  >
                    <button
                      type='button'
                      onClick={() => handleSort('opportunity.endDate')}
                      className='flex justify-start items-center'
                    >
                      <span className='font-bold'>Expires</span>{' '}
                      {direction === 'ASC' ? (
                        <ArrowDownIcon className='w-4 h-4 ml-2 expires-icon' />
                      ) : (
                        <ArrowUpIcon className='w-4 h-4 ml-2 expires-icon' />
                      )}
                    </button>
                  </th>
                  <th
                    scope='col'
                    className='w-2 px-3 py-3.5 text-left text-sm font-semibold certifications-title'
                  >
                    Certifications
                  </th>
                  <th
                    scope='col'
                    className='w-2 px-3 py-3.5 text-left text-sm font-semibold certifications-title'
                  >
                    Status
                  </th>
                  <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-6'>
                    <span className='sr-only'>Edit</span>
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
                {user?.likedOpportunities?.map((item, i) => (
                  <tr
                    key={item.id}
                    style={{
                      backgroundColor: i % 2 == 0 ? 'white' : '#F9FAFB',
                    }}
                  >
                    <td className='py-4 pl-4 pr-3 text-sm font-medium text-gray-900'>
                      <div className='flex justify-start items-start'>
                        <div
                          style={{ minHeight: 70, minWidth: 70 }}
                          className='mr-4'
                        >
                          <img
                            style={{ minHeight: 70, minWidth: 70 }}
                            src={'/assets/images/icons/building_icon.svg'}
                            alt='Workflow'
                          />
                        </div>
                        <div className='flex justify-start items-start ml-4'>
                          <div className='flex flex-col justify-start items-start'>
                            <p className='block text-gray-900 text-lg'>
                              <Link to={`/opportunities/${item.id}`}>
                                {item.name}
                              </Link>
                            </p>
                            <div className='flex justify-center items-center'>
                              <img
                                className='h-3 w-3'
                                src={`/assets/images/icons/${changeIconForSectorType(
                                  item.sectorType || undefined
                                )}.svg`}
                              />{' '}
                              <p className='whitespace-wrap block text-gray-500 ml-2'>
                                {item.placeOfPerformance
                                  ? item.placeOfPerformance.replace(
                                      'undefined,',
                                      ''
                                    )
                                  : item.city}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='px-3 py-4 text-sm'>
                      <div
                        className='flex flex-col justify-start items-start'
                        style={{ width: 140 }}
                      >
                        <p className='text-ellipsis  block  text-gray-900'>
                          {item.placeOfPerformance
                            ? item.placeOfPerformance.replace('undefined,', '')
                            : item.city}
                        </p>
                        <p className='text-ellipsis  block  text-gray-500'>
                          {item.state && item.state}
                        </p>
                      </div>
                    </td>
                    <td className='whitespace-wrap px-3  text-sm text-gray-900'>
                      <div
                        className='flex flex-col justify-start items-start'
                        style={{ width: 240 }}
                      >
                        {item.industrycodes?.[0] && (
                          <p className='whitespace-wrap block'>
                            {item.industrycodes[0].name}
                          </p>
                        )}

                        {item.industrycodes && item.industrycodes.length > 1 && (
                          <p
                            style={{ width: 240 }}
                            className='whitespace-wrap text-gray-500 block'
                          >
                            + {item.industrycodes.length} more
                          </p>
                        )}
                      </div>
                    </td>{' '}
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center'>
                      <div className='flex justify-center items-center w-full'>
                        <span
                          className={classNames(
                            'py-1 px-1 rounded-full mr-3',
                            calculateExpirationForOpportunity(item.endDate)
                          )}
                        />
                        <p className='text-ellipsis overflow-hidden whitespace-nowrap block'>
                          {item?.endDate &&
                            formatDistance(item.endDate, new Date(), {
                              addSuffix: false,
                            })}
                        </p>{' '}
                      </div>
                    </td>
                    <td className='py-4 pl-6 text-sm text-gray-500'>
                      {item?.certifications && (
                        <div className='mb-2' style={{ width: 200 }}>
                          {/* 
                        <FriendlyCertificationLabels
                          certifications={item?.certifications}
                        />*/}
                          <CertificationsList
                            indexKey={item?.id}
                            opportunity={item}
                          />
                        </div>
                      )}
                      {item?.certifications && (
                        <div className='mb-2'>
                          <CertificationLabels
                            certifications={item?.certifications}
                          />
                        </div>
                      )}
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center'>
                      {item?.endDate && new Date(item?.endDate) > new Date() ? (
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
                      )}{' '}
                    </td>
                    <td className='relative whitespace-nowrap p-4 text-right text-sm font-medium sm:pr-6'>
                      <div style={{ width: 80 }}>
                        {/* <PlusIcon className="w-5 h-5" /> */}
                        <FavoriteOpportunity
                          user={user || undefined}
                          opportunityId={item.id}
                          onUpdate={() => refreshUser()}
                        />
                      </div>
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

export default LikedOpportunityListCard;
