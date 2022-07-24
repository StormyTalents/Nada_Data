import {
  Button,
  Chip,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import {
  AppSnackbar,
  PageTemplate,
  PageTemplateCardOver,
  PageTemplateHeader,
  PageTemplateHeaderActions,
  SearchBox,
} from '@nobrainerlabs/react-material-ui';
import {
  InlineForm,
  InlineFormik,
} from '@nobrainerlabs/react-material-ui-formik';
import { format } from 'date-fns';
import { FormikValues } from 'formik';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Helmet from 'react-helmet';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { NumberParam, StringParam, useQueryParam } from 'use-query-params';
import * as Yup from 'yup';
import CertificationLabels from '../certification/cards/CertificationLabels';

import FriendlyCertificationLabels from '../certification/cards/FriendlyCertificationLabels';
import { useFindCertifications } from '../certification/hooks/useFindCertifications';
import { useFindOpportunities } from '../hooks/opportunities/useFindOpportunities';
import { useFindOrganizations } from '../hooks/organizations/useFindOrganizations';
import { useFindIndustrycodes } from '../industrycode/hooks/useFindIndustrycodes';
import {
  OpportunityShowStatus,
  OpportunityStatus,
} from '../interfaces/Opportunity';
import { useFindKeywords } from '../keyword/useFindKeywords';
import { useFindSources } from '../source/hooks/useFindSources';
import { UserContext } from '../user/UserContext';
import OpportunityCreateDialog from './dialogs/OpportunityCreateDialog';

function getStatusLabel(status: string) {
  switch (status) {
    case 'Pending':
      return (
        <Chip
          label={status}
          color='primary'
          variant='default'
          style={{ backgroundColor: 'orange' }}
        />
      );
    case 'Reviewing':
      return <Chip label={status} color='secondary' variant='outlined' />;
    case 'Published':
      return <Chip label={status} color='primary' variant='default' />;
    default:
      return <Chip label={status} color='default' variant='default' />;
  }
}

interface SelectOption {
  value: number | string;
  label: string;
  groupBy?: string;
}

const OpportunityListPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const formikRef = useRef<FormikValues>();

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [userAdded, setUserAdded] = useState(false);
  const [page = 0, setPage] = useQueryParam('page', NumberParam);
  const [limit = 50, setLimit] = useQueryParam('limit', NumberParam);
  const [order = 'opportunity.id', setOrder] = useQueryParam(
    'order',
    StringParam
  );
  const [direction = 'DESC', setDirection] = useQueryParam(
    'direction',
    StringParam
  );
  const [search = '', setSearch] = useQueryParam('search', StringParam);
  const [status = '', setStatus] = useQueryParam('status', StringParam);

  const [organizationId = '', setOrganizationId] = useQueryParam(
    'organizationId',
    StringParam
  );
  const [sources = '', setSources] = useQueryParam('sources', StringParam);
  const [location = '', setLocation] = useQueryParam('location', StringParam);
  const [certifications = '', setCertifications] = useQueryParam(
    'certifications',
    StringParam
  );
  const [industrycodes = '', setIndustrycodes] = useQueryParam(
    'industrycodes',
    StringParam
  );
  const [keywords = '', setKeywords] = useQueryParam('keywords', StringParam);
  const [showStatus = 'All', setShowStatus] = useQueryParam(
    'showStatus',
    StringParam
  );

  const [created = '', setCreated] = useQueryParam('created', StringParam);
  const [ending = '', setEnding] = useQueryParam('ending', StringParam);

  const { sourceList, findSources } = useFindSources(true);
  const [sourcesOptions, setSourcesOptions] = useState<SelectOption[]>();

  const { organizationList, findOrganizations } = useFindOrganizations();
  const [organizationsOptions, setOrganizationsOptions] = useState<
    SelectOption[]
  >();

  const { keywordList } = useFindKeywords(true);
  const [keywordOptions, setKeywordOptions] = useState<SelectOption[]>();

  const { certificationList, findCertifications } = useFindCertifications(true);
  const [certificationOptions, setCertificationOptions] = useState<
    SelectOption[]
  >();

  const { industrycodeList, findIndustrycodes } = useFindIndustrycodes(true);
  const [industrycodeOptions, setIndustrycodeOptions] = useState<
    SelectOption[]
  >();

  const {
    opportunities,
    loadingOpportunities,
    findOpportunities,
    loadingError: loadingOpportunitiesError,
  } = useFindOpportunities();

  useEffect(() => {
    findOrganizations({
      type: 'buyer',
      order: 'organization.name',
      direction: 'ASC',
    });
  }, [findOrganizations]);

  useEffect(() => {
    findOpportunities({
      page,
      limit,
      order,
      direction,
      search,
      status,
      sources,
      certifications,
      industrycodes,
      keywords,
      organizationId,
      location,
      showStatus,
      created,
      ending,
    });
  }, [
    page,
    limit,
    order,
    direction,
    search,
    status,
    sources,
    certifications,
    industrycodes,
    keywords,
    organizationId,
    location,
    showStatus,
    created,
    ending,
    findOpportunities,
  ]);

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
    if (sourceList) {
      const data: SelectOption[] = sourceList?.data.map((item) => {
        return { label: item.name, value: item.id };
      });
      setSourcesOptions(data);
    }
  }, [sourceList]);

  useEffect(() => {
    if (keywordList?.data) {
      let data = (keywordList.data
        .filter((item) => item.name !== '')
        .map((item) => {
          return {
            label: `${item.name}`,
            value: item.name,
          };
        }) as unknown) as SelectOption[];
      data = [
        {
          label: '- empty -',
          value: '- empty -',
        },
        ...data,
      ];
      setKeywordOptions(data);
    }
  }, [keywordList]);

  useEffect(() => {
    if (organizationList) {
      const data: SelectOption[] = organizationList?.data.map((item) => {
        return { label: item.name, value: item.id };
      });
      setOrganizationsOptions(data);
    }
  }, [organizationList]);

  const handleSort = (column: string) => {
    setOrder(column);
    setDirection(direction === 'ASC' ? 'DESC' : 'ASC');
  };
  const getSortDirection = (column: string): 'asc' | 'desc' => {
    return order === column && direction === 'DESC' ? 'desc' : 'asc';
  };

  return (
    <PageTemplate>
      <Helmet title='Users' />
      <PageTemplateHeader>
        <h2>Opportunities</h2>
        <SearchBox value={search!} onSearch={(value) => setSearch(value)} />
        <PageTemplateHeaderActions>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              setIsOpenDialog(true);
            }}
          >
            Add Opportunity
          </Button>
          <OpportunityCreateDialog
            open={isOpenDialog}
            onCancel={() => setIsOpenDialog(false)}
            onCreated={(opportunity) => {
              if (opportunity?.id) {
                navigate(`./opportunities/${opportunity.id}`);
              }
            }}
          />
        </PageTemplateHeaderActions>
      </PageTemplateHeader>
      <PageTemplateCardOver>
        <TableContainer>
          <div className='px-4 py-8 flex gap-4'>
            <InlineFormik
              innerRef={(formik: any) => (formikRef.current = formik)}
              initialValues={{}}
              validationSchema={Yup.object().shape({})}
              isSubmitting={!loadingOpportunities}
              error={loadingOpportunitiesError}
              onSubmit={(search: any) => {
                search.status = OpportunityStatus.Published;
                findOpportunities(search);
              }}
            >
              <InlineForm>
                <div className='w-full px-4 search-filters grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-4 m-auto'>
                  <div>
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
                  </div>

                  <div>
                    <label
                      htmlFor='location'
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
                      }}
                      options={industrycodeOptions || []}
                      groupBy={(option) => option.groupBy || 'type'}
                      className={'mt-2 '}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='location'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Keywords
                    </label>

                    <Autocomplete
                      getOptionLabel={(option: any) => option.label}
                      renderInput={(params) => <TextField {...params} />}
                      defaultValue={{
                        label: keywords || '',
                        value: keywords || '',
                      }}
                      onChange={(e, value) => {
                        setKeywords(value ? value.value + '' : '');
                      }}
                      options={keywordOptions || []}
                      className={'mt-2 '}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='sources'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Sources
                    </label>

                    <Autocomplete
                      getOptionLabel={(option: any) => option.label}
                      renderInput={(params) => <TextField {...params} />}
                      defaultValue={{
                        label: sources || '',
                        value: sources || '',
                      }}
                      onChange={(e, value) => {
                        setSources(value ? value.label + '' : '');
                      }}
                      options={sourcesOptions || []}
                      className={'mt-2 '}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='organizations'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Company
                    </label>

                    <Autocomplete
                      getOptionLabel={(option: any) => option.label}
                      renderInput={(params) => <TextField {...params} />}
                      defaultValue={{
                        label:
                          organizationList?.data && organizationId
                            ? organizationList.data.find(
                                (organization) =>
                                  organization?.id === parseInt(organizationId)
                              )?.name || ''
                            : '',
                        value: organizationId || '',
                      }}
                      onChange={(e, value) => {
                        if (value) {
                          setOrganizationId(value ? value.value + '' : '');
                        }
                      }}
                      options={organizationsOptions || []}
                      className={'mt-2 '}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='location'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Location
                    </label>

                    <TextField
                      type='text'
                      name='location'
                      onChange={(e) => setLocation(e.target.value)}
                      defaultValue={location}
                      className='w-full mt-1'
                      placeholder='Search by location'
                    />

                    {/* <Autocomplete
                      getOptionLabel={(option) => option.label}
                      autoComplete={false}
                      renderInput={(params) => <TextField {...params} />}
                      onChange={(e, value) =>
                        setLocation(value ? value.value + '' : '')
                      }
                      options={[
                        { label: 'CA', value: 'CA' },
                        { label: 'CO', value: 'CO' },
                      ]}
                      className={'mt-2'}
                    /> */}
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
                      onChange={(e, value) =>
                        setShowStatus(value ? value.value + '' : '')
                      }
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
                  </div>
                </div>
              </InlineForm>
            </InlineFormik>
          </div>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={order === 'opportunity.id'}
                    direction={getSortDirection('opportunity.id')}
                    onClick={() => handleSort('opportunity.id')}
                  >
                    ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={order === 'opportunity.name'}
                    direction={getSortDirection('opportunity.name')}
                    onClick={() => handleSort('opportunity.name')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={order === 'opportunity.refId'}
                    direction={getSortDirection('opportunity.refId')}
                    onClick={() => handleSort('opportunity.refId')}
                  >
                    Ref ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={order === 'opportunity.organization.name'}
                    direction={getSortDirection(
                      'opportunity.organization.name'
                    )}
                    onClick={() => handleSort('opportunity.organization.name')}
                  >
                    Company
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={order === 'opportunity.sourceId'}
                    direction={getSortDirection('opportunity.sourceId')}
                    onClick={() => handleSort('opportunity.sourceId')}
                  >
                    Source
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={order === 'opportunity.status'}
                    direction={getSortDirection('opportunity.status')}
                    onClick={() => handleSort('opportunity.status')}
                  >
                    Status
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={order === 'opportunity.endDate'}
                    direction={getSortDirection('opportunity.endDate')}
                    onClick={() => handleSort('opportunity.endDate')}
                  >
                    Ending
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={order === 'opportunity.created'}
                    direction={getSortDirection('opportunity.created')}
                    onClick={() => handleSort('opportunity.created')}
                  >
                    Created
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loadingOpportunities && (
                <TableRow>
                  <TableCell colSpan={10} padding='none'>
                    <LinearProgress />
                  </TableCell>
                </TableRow>
              )}
              {opportunities &&
                opportunities.data.map((opportunity) => (
                  <TableRow
                    hover
                    key={opportunity.id}
                    component={Link}
                    to={`/portal/opportunities/${opportunity.id}`}
                  >
                    <TableCell>{opportunity.id}</TableCell>
                    <TableCell
                      style={{
                        width: '50%',
                      }}
                    >
                      <p
                        style={{
                          wordBreak: 'break-all',
                        }}
                      >
                        {opportunity.name}
                      </p>
                      <div className='mt-4'>
                        <CertificationLabels
                          certifications={opportunity.certifications}
                        />
                      </div>
                      <div>
                        {opportunity?.industrycodes &&
                          opportunity?.industrycodes.length > 0 && (
                            <div className='text-sm text-gray-900 line-clamp-2 mt-4'>
                              {opportunity?.industrycodes?.map(
                                (industrycode, i) => (
                                  <div key={i}>
                                    {industrycode.code}: {industrycode.name} (
                                    {industrycode.type})
                                  </div>
                                )
                              )}
                            </div>
                          )}
                      </div>
                      {opportunity.keywords &&
                        opportunity.keywords?.length > 0 && (
                          <div className='mt-4'>
                            <Typography variant='caption'>
                              Keywords:{' '}
                              {opportunity.keywords
                                ?.map((keyword) => keyword.name)
                                .join(', ')}
                            </Typography>
                          </div>
                        )}
                    </TableCell>
                    <TableCell>{opportunity.refId}</TableCell>
                    <TableCell>
                      {opportunity.organization?.logoUrl && (
                        <div className='mb-2'>
                          <img
                            src={opportunity.organization.logoUrl}
                            style={{ width: 20, height: 20 }}
                          />
                        </div>
                      )}
                      {opportunity.organization?.name}
                    </TableCell>
                    <TableCell>{opportunity.source?.name}</TableCell>
                    <TableCell>{getStatusLabel(opportunity.status)}</TableCell>
                    <TableCell>
                      {opportunity.endDate &&
                        format(opportunity.endDate, 'MM/dd/yy')}
                    </TableCell>
                    <TableCell>
                      {opportunity.created &&
                        format(opportunity.created, 'MM/dd/yy')}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {opportunities && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={opportunities.total}
            rowsPerPage={limit ? limit : 100}
            page={page ? page : 0}
            onPageChange={(_, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              setLimit(+event.target.value);
              setPage(0);
            }}
          />
        )}
        <AppSnackbar severity='error' open={!!loadingOpportunitiesError}>
          There was an error getting the list from the server.
        </AppSnackbar>
        <AppSnackbar severity='success' open={userAdded}>
          User has been added
        </AppSnackbar>
      </PageTemplateCardOver>
    </PageTemplate>
  );
};

export default OpportunityListPage;
