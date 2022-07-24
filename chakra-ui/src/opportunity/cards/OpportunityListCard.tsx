import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronDownIcon,
  SearchIcon,
} from '@heroicons/react/solid';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TablePagination,
  TextField,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import {
  InlineForm,
  InlineFormik,
} from '@nobrainerlabs/react-material-ui-formik';
import {
  formatDistance,
  differenceInDays,
  differenceInCalendarDays,
} from 'date-fns';
import { FormikValues } from 'formik';
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { NumberParam, StringParam, useQueryParam } from 'use-query-params';
import * as Yup from 'yup';
import CertificationsList from '../../certification/CertificationsList';
import CertificationLabels from '../../certification/cards/CertificationLabels';
import FriendlyCertificationLabels from '../../certification/cards/FriendlyCertificationLabels';
import { useFindCertifications } from '../../certification/hooks/useFindCertifications';
import { FavoriteOpportunity } from '../../common/home/FavoriteOpportunity';
import { useFindOpportunities } from '../../hooks/opportunities/useFindOpportunities';
import { useFindIndustrycodes } from '../../industrycode/hooks/useFindIndustrycodes';
import {
  Opportunity,
  OpportunityShowStatus,
  OpportunityStatus,
} from '../../interfaces/Opportunity';
import { useFindSources } from '../../source/hooks/useFindSources';
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

  .sector-type-wrapper {
    min-width: 20px;
  }

  .icon-wrapper {
    min-width: 70px;
    min-height: 70px;
  }

  .organization-wrapper {
    width: 400px;
  }

  .location-wrapper {
    width: 140px;
  }

  .industry-code-wrapper {
    width: 240px;
  }

  .industry-codes-text {
    width: 200px;
  }

  .min-height-for-opportunity {
    min-height: 40px;
  }
`;

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export const shortenName = (fullName: any, source: any) => {
  if (source === 'SAM.gov') {
    const secondValue = fullName.split(',')[1];
    const thirdValue = fullName.split(',')[2];

    return secondValue === ' department of' ||
      secondValue === ' department of the'
      ? thirdValue.replace(/dept/gi, 'department')
      : secondValue.replace(/dept/gi, 'department');
  } else {
    return fullName.replace(/dept/gi, 'department');
  }
};

const OpportunityListCard: React.FC<{
  showSearch?: boolean;
  showPagination?: boolean;
  perPage?: number;
  showFriendlyCertifications?: boolean;
}> = ({
  showSearch = true,
  showPagination = true,
  showFriendlyCertifications = true,
  perPage = 50,
}) => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikValues>();
  const [search = '', setSearch] = useQueryParam('search', StringParam);
  const [fetchData, setFetchData] = useState(true);

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

  const [sources = '', setSources] = useQueryParam('sources', StringParam);
  const [showStatus = 'Open', setShowStatus] = useQueryParam(
    'showStatus',
    StringParam
  );
  const [created = '', setCreated] = useQueryParam('created', StringParam);
  const [ending = '', setEnding] = useQueryParam('ending', StringParam);
  const [order = 'opportunity.endDate', setOrder] = useQueryParam(
    'order',
    StringParam
  );
  const [direction = 'ASC', setDirection] = useQueryParam(
    'direction',
    StringParam
  );
  const [initialValues, setInitialValues] = useState<Partial<Opportunity>>();
  const [certificationOptions, setCertificationOptions] =
    useState<SelectOption[]>();
  const [selectedIndustrycode, setSelectedIndustrycode] =
    useState<SelectOption>();
  const [industrycodeOptions, setIndustrycodeOptions] =
    useState<SelectOption[]>();
  const [sourcesOptions, setSourcesOptions] = useState<SelectOption[]>();

  const [showCertifications, setShowCertifications] = useState(false);
  const [showSearchFilters, setShowSearchFilters] = useState(false);
  const { user, refreshUser } = useUserContext();

  const { certificationList, findCertifications } = useFindCertifications(true);
  const { industrycodeList, findIndustrycodes } = useFindIndustrycodes(true);
  const { sourceList, findSources } = useFindSources(true);
  const { changeIconForSectorType } = useReturnSectorTypeIcon();
  const { calculateExpirationForOpportunity } =
    useCalculateExpirationForOpportunity();

  const [moreIndustry, showMoreIndustry] = useState(-1);

  const {
    opportunities,
    findOpportunities,
    loadingError,
    loadingOpportunities,
  } = useFindOpportunities();

  const [friendlyCertifications, setFriendlyCertifications] =
    useState<string[]>();
  useEffect(() => {
    if (certificationList) {
      let friendlyCerts: string[] = [];
      for (const certification of certificationList?.data) {
        if (certification?.friendlyNames) {
          for (const friendlyCert of certification?.friendlyNames) {
            friendlyCerts.push(friendlyCert);
          }
        }
      }
      setFriendlyCertifications(_.uniq(friendlyCerts));
    }
  }, [certificationList]);

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
      let data = industrycodeList.data
        .filter((item) => item.code !== '')
        .map((item) => {
          return {
            label: `${item.code}: ${item.name}`,
            value: item.code,
            groupBy: item.type,
          };
        }) as unknown as SelectOption[];

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
    if (fetchData) {
      findOpportunities({
        page,
        limit,
        certifications,
        industrycodes,
        search,
        location,
        showStatus,
        status: OpportunityStatus.Published,
        sources,
        order,
        direction,
        created,
        ending,
      });
      setFetchData(false);
    }
  }, [
    certifications,
    industrycodes,
    search,
    page,
    limit,

    location,
    showStatus,
    sources,
    findOpportunities,
    created,
    ending,
    order,
    direction,
    fetchData,
  ]);

  const handleSort = (column: string) => {
    retrieveData();
    setOrder(column);
    setDirection(direction === 'ASC' ? 'DESC' : 'ASC');
  };

  const onInputChange = (event: any) => {
    setSearch(event.currentTarget.value);
  };

  const retrieveData = (page = 0, fetch = true) => {
    setFetchData(fetch);
    setPage(page);
  };

  return (
    <StyledDiv>
      <div className='w-full bg-white '>
        <div className='py-2 align-middle inline-block w-full'>
          {showSearch && (
            <InlineFormik
              innerRef={(formik: any) => (formikRef.current = formik)}
              initialValues={{}}
              validationSchema={Yup.object().shape({})}
              isSubmitting={!loadingOpportunities}
              error={loadingError}
              onSubmit={(search: any) => {
                search.status = OpportunityStatus.Published;
                findOpportunities(search);
              }}
            >
              <InlineForm>
                <div className='mt-1 relative w-full shadow-sm border-black border-2 rounded-md '>
                  <SearchIcon className='w-6 h-6 absolute top-6 left-5' />
                  <input
                    type='text'
                    name=''
                    className=' w-1/2 sm:text-xl focus:outline-none py-6 pl-14 pr-4 h-18'
                    placeholder='Search keyword'
                    defaultValue={search ? search : ''}
                    onChange={onInputChange}
                    onKeyPress={(event) => {
                      if (event?.key === 'Enter') {
                        setShowCertifications(!showCertifications);
                        retrieveData();
                      }
                    }}
                  />
                  <div className='hidden sm:flex justify-end items-center w-1/2 absolute right-2 top-3'>
                    <div className='flex justify-center items-center'>
                      <div className='flex justify-center items-center mr-12'>
                        <button
                          className='flex justify-between items-center border hover:border-black rounded-md p-2 mr-4'
                          onClick={() => {
                            setShowCertifications(!showCertifications);
                          }}
                        >
                          <img src='/assets/images/icons/certificate_icon.svg' />
                          <span className='mx-3 text-gray-700'>
                            Certification{' '}
                          </span>
                          <ChevronDownIcon className='w-4 h-4' />
                        </button>
                        <button className='flex justify-between items-center border hover:border-black  rounded-md p-2 '>
                          <img
                            alt=''
                            src='/assets/images/icons/location_icon.svg'
                          />
                          <span className='mx-3 text-gray-700'>Location </span>
                          <ChevronDownIcon className='w-4 h-4' />
                        </button>
                      </div>
                      <div className='h-14'>
                        <button
                          onClick={() => retrieveData()}
                          className='h-full px-10 text-white bg-black rounded-md'
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='w-full flex justify-between my-12'>
                  <div className='justify-start w-1/2'>
                    <button
                      className='flex justify-center items-center'
                      onClick={() => {
                        setShowSearchFilters(!showSearchFilters);
                      }}
                    >
                      <p className='ml-2 font-bold'>Show More Filters</p>{' '}
                    </button>
                  </div>
                  <button className='flex justify-center items-center'>
                    <img alt='' src='/assets/images/bell_icon.svg' />{' '}
                    <p className='ml-2'>
                      Get notified with new jobs with this search
                    </p>{' '}
                  </button>
                </div>

                {showSearchFilters && (
                  <div className='w-full px-4 search-filters grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-4 m-auto'>
                    {/* <div className='xs:block'>
                      <label
                        htmlFor='location'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Certifications
                      </label>

                      <Autocomplete
                        id='certifications'
                        getOptionLabel={(option: any) => option.label}
                        autoComplete={false}
                        defaultValue={{
                          label: certifications || '',
                          value: certifications || '',
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        onChange={(e, value) =>
                          setCertifications(value ? value.value + '' : '')
                        }
                        options={certificationOptions || []}
                        groupBy={(option) => {
                          return option.groupBy || 'type';
                        }}
                        className={'mt-2'}
                      />
                    </div> */}

                    <div>
                      <label
                        htmlFor='industry-codes'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Industry Codes
                      </label>

                      <Autocomplete
                        getOptionLabel={(option: any) => option.label}
                        renderInput={(params) => <TextField {...params} />}
                        defaultValue={{
                          label: industrycodes || '',
                          value: industrycodes || '',
                        }}
                        onChange={(e, value) => {
                          setIndustrycodes(value ? value.value + '' : '');
                          retrieveData();
                        }}
                        onInputChange={(e: any, value) => {
                          findIndustrycodes({
                            search: value,
                          });
                        }}
                        options={industrycodeOptions || []}
                        groupBy={(option) => option.groupBy || 'type'}
                        className={'mt-2 '}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor='showStatus'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Show
                      </label>
                      <Autocomplete
                        getOptionLabel={(option: any) => option.label}
                        autoComplete={false}
                        renderInput={(params) => <TextField {...params} />}
                        defaultValue={{ label: showStatus, value: showStatus }}
                        onChange={(e, value) => {
                          setShowStatus(value ? value.value + '' : '');
                          retrieveData();
                        }}
                        options={[
                          {
                            label: OpportunityShowStatus.All,
                            value: OpportunityShowStatus.All,
                          },
                          {
                            label: OpportunityShowStatus.Open,
                            value: OpportunityShowStatus.Open,
                          },
                          {
                            label: OpportunityShowStatus.Closed,
                            value: OpportunityShowStatus.Closed,
                          },
                        ]}
                        className={'mt-2'}
                      />
                    </div>
                    {/* 
                    <div>
                      <label
                        htmlFor='showStatus'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Ending
                      </label>

                      <div className='flex'>
                        <Autocomplete
                          getOptionLabel={(option: any) => option.label}
                          autoComplete={false}
                          renderInput={(params) => <TextField {...params} />}
                          defaultValue={{ label: ending, value: ending }}
                          onChange={(e, value) =>
                            setEnding(value ? value.value : '')
                          }
                          options={[
                            { label: '', value: '' },
                            {
                              label: 'in 1 day',
                              value: '1',
                            },
                            {
                              label: 'in 2 days',
                              value: '2',
                            },
                            {
                              label: 'in 3 days',
                              value: '3',
                            },
                            {
                              label: 'in 7 days',
                              value: '7',
                            },
                            {
                              label: 'in 2 weeks',
                              value: '14',
                            },
                            {
                              label: 'in 1 month',
                              value: '30',
                            },
                            {
                              label: 'in 2 month',
                              value: '60',
                            },
                            {
                              label: 'in 3 month',
                              value: '90',
                            },
                          ]}
                          className={'mt-2 w-full'}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor='showStatus'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Created
                      </label>

                      <div className='flex'>
                        <Autocomplete
                          getOptionLabel={(option: any) => option.label}
                          autoComplete={false}
                          renderInput={(params) => <TextField {...params} />}
                          defaultValue={{ label: created, value: created }}
                          onChange={(e, value) =>
                            setCreated(value ? value.value : '')
                          }
                          options={[
                            { label: '', value: '' },
                            {
                              label: 'in 24 hours',
                              value: '1',
                            },
                            {
                              label: 'past 2 days',
                              value: '2',
                            },
                            {
                              label: 'past 3 days',
                              value: '3',
                            },
                            {
                              label: 'past 7 days',
                              value: '7',
                            },
                            {
                              label: 'past 2 weeks',
                              value: '14',
                            },
                            {
                              label: 'past 1 month',
                              value: '30',
                            },
                            {
                              label: 'past 2 months',
                              value: '60',
                            },
                            {
                              label: 'past 3 months',
                              value: '90',
                            },
                            {
                              label: 'past 6 months',
                              value: '180',
                            },
                            {
                              label: 'past 12 months',
                              value: '365',
                            },
                          ]}
                          className={'mt-2 w-full'}
                        />
                      </div>
                    </div> */}
                  </div>
                )}
              </InlineForm>
            </InlineFormik>
          )}

          <div className='overflow-auto border-b border-gray-200 w-full'>
            <table className='min-w-full table-auto'>
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
                    id='qeq'
                    scope='col'
                    className='w-2 px-3 py-3.5 text-left text-sm font-semibold certifications-title'
                  >
                    Certifications
                  </th>
                  <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-6'>
                    <span className='sr-only'>Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {!opportunities?.data && loadingOpportunities && (
                  <tr>
                    <td className='loading' colSpan={99}>
                      <p className='cp-paragraph w-full mt-4' />
                      <p className='cp-paragraph w-full mt-4' />
                    </td>
                  </tr>
                )}
                {opportunities?.data?.map((item, personIdx) => (
                  <tr
                    key={item.id}
                    style={{
                      backgroundColor: personIdx % 2 == 0 ? 'white' : '#F9FAFB',
                    }}
                  >
                    <td className='py-4 pl-4 pr-3 text-sm font-medium text-gray-900'>
                      <div className='flex justify-start items-start'>
                        {' '}
                        {/* flex justify-start items-start*/}
                        <div className='mr-4 icon-wrapper flex justify-center items-center'>
                          <img
                            className='icon-wrapper'
                            src={'/assets/images/icons/building_icon.svg'}
                            alt='Workflow'
                          />
                        </div>
                        <div className='flex justify-start items-start ml-4'>
                          <div className='w-full flex flex-col justify-start items-start'>
                            <p className='block text-gray-900 organization-wrapper'>
                              <Link to={`/opportunities/${item.id}`}>
                                {item.name}
                              </Link>
                            </p>
                            <div className='flex justify-center items-center organization-wrapper min-height-for-opportunity'>
                              <div className=' w-1/12 min-height-for-opportunity'>
                                <img
                                  className='h-3 w-3 min-height-for-opportunity'
                                  src={`/assets/images/icons/${changeIconForSectorType(
                                    item.sectorType || undefined
                                  )}.svg`}
                                />
                              </div>{' '}
                              <div className='w-11/12'>
                                <p className='block text-gray-500 text-left'>
                                  {shortenName(
                                    item.organization?.name.toLowerCase(),
                                    item.source?.name
                                  )
                                    .replace(
                                      /(^\w{1})|(\s+\w{1})/g,
                                      (letter: any) => letter.toUpperCase()
                                    )
                                    .replace(/dla/gi, 'DLA')}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='px-3 py-4 text-sm'>
                      <div className='flex flex-col justify-start items-start location-wrapper'>
                        <p className='text-ellipsis  block  text-gray-900'>
                          {item.placeOfPerformance
                            ? item.placeOfPerformance.replace('undefined,', '')
                            : item.city}{' '}
                          {!item?.city && !item?.state && 'Not Specified'}
                        </p>
                        <p className='text-ellipsis  block  text-gray-500'>
                          {item.state && item.state}{' '}
                        </p>
                      </div>
                    </td>
                    <td className='whitespace-wrap px-3  text-sm text-gray-900'>
                      <div className='flex flex-col justify-start items-start industry-code-wrapper'>
                        {moreIndustry === personIdx
                          ? item.industrycodes?.map((industryCode, idx) => (
                              <p
                                className='capitalize whitespace-wrap block break-words industry-codes-text mb-2'
                                key={idx}
                              >
                                {industryCode.name.toLowerCase()}
                              </p>
                            ))
                          : item.industrycodes?.[0] && (
                              <p className='capitalize whitespace-wrap block break-words industry-codes-text'>
                                {item.industrycodes[0].name.toLowerCase()}
                              </p>
                            )}
                        {item.industrycodes && moreIndustry === personIdx ? (
                          <p
                            onClick={() => showMoreIndustry(-1)}
                            className='whitespace-wrap text-gray-500 block industry-code-wrapper cursor-pointer'
                          >
                            show less
                          </p>
                        ) : (
                          <>
                            {item.industrycodes &&
                              item.industrycodes.length - 1 > 0 && (
                                <p
                                  onClick={() => showMoreIndustry(personIdx)}
                                  className='whitespace-wrap text-gray-500 block industry-code-wrapper cursor-pointer'
                                >
                                  +
                                  {item.industrycodes &&
                                    item.industrycodes.length - 1}{' '}
                                  more
                                </p>
                              )}
                          </>
                        )}
                      </div>
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center'>
                      {item?.endDate && new Date(item.endDate) < new Date() ? (
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'}`}
                        >
                          Closed
                        </span>
                      ) : (
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
                      )}
                    </td>
                    <td className='py-4 pl-6 text-sm text-gray-500'>
                      {item?.certifications && showFriendlyCertifications && (
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
                      {item?.certifications && !showFriendlyCertifications && (
                        <div className='mb-2'>
                          <CertificationLabels
                            certifications={item?.certifications}
                          />
                        </div>
                      )}
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

            {showPagination && (
              <nav className='border-gray-200 px-4 flex items-center justify-between sm:px-0 my-6 py-4'>
                <div className='mx-auto '>
                  {opportunities && (
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 100]}
                      align='center'
                      component='div'
                      count={opportunities.total}
                      rowsPerPage={limit ? limit : 100}
                      page={page ? page : 0}
                      onPageChange={(_, newPage) => retrieveData(newPage)}
                      onRowsPerPageChange={(event) => {
                        retrieveData();
                        setLimit(+event.target.value);
                      }}
                    />
                  )}
                </div>
              </nav>
            )}

            <Dialog
              open={showCertifications}
              onClose={() => setShowCertifications(!showCertifications)}
            >
              <DialogTitle>Filter by Certifications</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Choose the certifications you wish to filter by
                </DialogContentText>

                {friendlyCertifications?.map((friendlyCertification, k) => (
                  <div key={k}>
                    {friendlyCertification}
                    <div className='m-3 mb-4'>
                      {certificationList?.data
                        ?.filter((cert) =>
                          cert.friendlyNames?.includes(friendlyCertification)
                        )
                        .map((cert, i) => {
                          let isChecked = false;
                          const x: any = certifications;
                          if (x.includes(cert.name)) {
                            isChecked = true;
                          }
                          if (cert.name) {
                            return (
                              <span key={i} className='mr-2'>
                                <input
                                  type='checkbox'
                                  checked={isChecked}
                                  onChange={(e) => {
                                    let x: any = certifications?.split(',');
                                    if (!x.includes(cert.name)) {
                                      x.push(cert.name);
                                    } else {
                                      x = x.filter((c: any) => c !== cert.name);
                                    }
                                    setCertifications(x.join(','));
                                    retrieveData();
                                  }}
                                />{' '}
                                {cert?.name}
                              </span>
                            );
                          }
                          return <></>;
                        })}
                    </div>
                  </div>
                ))}
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setShowCertifications(!showCertifications)}
                >
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </StyledDiv>
  );
};

export default OpportunityListCard;
