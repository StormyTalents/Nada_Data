import {
  AppSnackbar,
  PageTemplate,
  PageTemplateCardOver,
  PageTemplateHeader,
  PageTemplateHeaderActions,
  SearchBox,
} from '@nobrainerlabs/react-material-ui';
import {
  Button,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import { NumberParam, StringParam, useQueryParam } from 'use-query-params';
import React, { useEffect, useState } from 'react';

import Helmet from 'react-helmet';
import OrganizationCreateDialog from './dialogs/OrganizationCreateDialog';
import { format } from 'date-fns';
import { useFindOrganizations } from '../hooks/organizations/useFindOrganizations';
import { useNavigate } from 'react-router-dom';

const OrganizationAdminListPage: React.FC = () => {
  const navigate = useNavigate();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [page = 0, setPage] = useQueryParam('page', NumberParam);
  const [limit = 100, setLimit] = useQueryParam('limit', NumberParam);
  const [order, setOrder] = useQueryParam('order', StringParam);
  const [search = '', setSearch] = useQueryParam('search', StringParam);
  const [direction, setDirection] = useQueryParam('direction', StringParam);
  const [type, setType] = useQueryParam('type', StringParam);
  const {
    organizationList,
    isLoading,
    error,
    findOrganizations,
  } = useFindOrganizations();

  useEffect(() => {
    const params = { page, limit, order, direction } as any;
    if (order && direction) {
      params.order = `${order} ${direction}`;
    }
    if (search) {
      params.search = search;
    }
    if (type) {
      params.type = type;
    }
    findOrganizations(params);
  }, [page, limit, order, direction, search, type, findOrganizations]);
  const handleSort = (column: string) => {
    setOrder(column);
    setDirection(direction === 'ASC' ? 'DESC' : 'ASC');
  };

  const getSortDirection = (column: string): 'asc' | 'desc' => {
    return order === column && direction === 'DESC' ? 'desc' : 'asc';
  };
  return (
    <PageTemplate>
      <Helmet title='Organizations' />
      <PageTemplateHeader>
        <h2>Companies</h2>
        <SearchBox value={search!} onSearch={(value) => setSearch(value)} />
        <PageTemplateHeaderActions>
          <Button
            variant='contained'
            color='primary'
            onClick={() => setIsOpenDialog(true)}
          >
            Add New Company
          </Button>
          <OrganizationCreateDialog
            open={isOpenDialog}
            onCancel={() => setIsOpenDialog(false)}
            onCreated={(organization) =>
              navigate(`./organizations/${organization.id}?type=${type}`)
            }
          />
        </PageTemplateHeaderActions>
      </PageTemplateHeader>
      <PageTemplateCardOver>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  <TableSortLabel
                    active={order === 'organization.name'}
                    direction={getSortDirection('organization.name')}
                    onClick={() => handleSort('organization.name')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={order === 'organization.source.name'}
                    direction={getSortDirection('organization.source.name')}
                    onClick={() => handleSort('organization.source.name')}
                  >
                    Source
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={order === 'modifiedBy.firstName'}
                    direction={getSortDirection('modifiedBy.firstName')}
                    onClick={() => handleSort('modifiedBy.firstName')}
                  >
                    Last Modified By
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={order === 'organization.modified'}
                    direction={getSortDirection('organization.modified')}
                    onClick={() => handleSort('organization.modified')}
                  >
                    Joined
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={4} padding='none'>
                    <LinearProgress />
                  </TableCell>
                </TableRow>
              )}
              {organizationList &&
                organizationList.data.map((organization) => (
                  <TableRow
                    hover
                    key={organization.id}
                    onClick={() =>
                      navigate(`./organizations/${organization.id}`)
                    }
                  >
                    <TableCell style={{ width: 100 }}>
                      {organization.logoUrl && (
                        <img
                          style={{ width: 100 }}
                          src={organization.logoUrl}
                        />
                      )}
                    </TableCell>
                    <TableCell style={{ maxWidth: 400 }}>
                      {organization.name}
                    </TableCell>
                    <TableCell>{organization.source?.name}</TableCell>
                    <TableCell>
                      {organization.modifiedBy.firstName}{' '}
                      {organization.modifiedBy.lastName}
                    </TableCell>
                    <TableCell>
                      {organization.modified &&
                        format(organization.modified, 'MMM d, yyyy')}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {organizationList && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={organizationList.total}
            rowsPerPage={limit ? limit : 100}
            page={page ? page : 0}
            onPageChange={(_, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              setLimit(+event.target.value);
              setPage(0);
            }}
          />
        )}
        <AppSnackbar severity='error' open={!!error}>
          There was an error getting the list from the server.
        </AppSnackbar>
      </PageTemplateCardOver>
    </PageTemplate>
  );
};

export default OrganizationAdminListPage;
