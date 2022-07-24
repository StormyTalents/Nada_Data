import { format } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { NumberParam, StringParam, useQueryParam } from 'use-query-params';

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
import {
  AppSnackbar,
  PageTemplate,
  PageTemplateCardOver,
  PageTemplateHeader,
  PageTemplateHeaderActions,
  SearchBox,
} from '@nobrainerlabs/react-material-ui';

import { useFindUserOrganizations } from '../hooks/user-organizations/useFindUserOrganizations';
import { UserContext } from '../user/UserContext';
import UserOrganizationCreateDialog from './dialogs/UserOrganizationCreateDialog';

const UserOrganizationListPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { organizationId = 0 } = useParams<{ organizationId: string }>();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [userAdded, setUserAdded] = useState(false);
  const [page = 0, setPage] = useQueryParam('page', NumberParam);
  const [limit = 100, setLimit] = useQueryParam('limit', NumberParam);
  const [order, setOrder] = useQueryParam('order', StringParam);
  const [search = '', setSearch] = useQueryParam('search', StringParam);
  const [direction, setDirection] = useQueryParam('direction', StringParam);

  const {
    userOrganizations,
    loadingUserOrganizations,
    findUserOrganizations,
    loadingUserOrganizationsError,
  } = useFindUserOrganizations();

  useEffect(() => {
    const params = { page, limit, order, direction } as any;
    if (order && direction) {
      params.order = `${order} ${direction}`;
    }
    if (search) {
      params.search = search;
    }
    if (user) {
      params.organizationId = user.activeUserOrganization?.organizationId;
    }

    findUserOrganizations(params);
  }, [
    user,
    userAdded,
    page,
    limit,
    order,
    direction,
    search,
    findUserOrganizations,
  ]);

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
        <h2>Team Members</h2>
        <SearchBox value={search!} onSearch={(value) => setSearch(value)} />
        <PageTemplateHeaderActions>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              setIsOpenDialog(true);
            }}
          >
            Add Member
          </Button>
          <UserOrganizationCreateDialog
            open={isOpenDialog}
            organizationId={user?.activeUserOrganization?.organizationId || 0}
            onCancel={() => setIsOpenDialog(false)}
            onCreated={(userOrganization) => {
              if (userOrganization?.id) {
                navigate(`/portal/team/${userOrganization.id}`);
              }
            }}
          />
        </PageTemplateHeaderActions>
      </PageTemplateHeader>
      <PageTemplateCardOver>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={order === 'user.firstName'}
                    direction={getSortDirection('user.firstName')}
                    onClick={() => handleSort('user.firstName')}
                  >
                    First Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={order === 'user.lastName'}
                    direction={getSortDirection('user.lastName')}
                    onClick={() => handleSort('user.lastName')}
                  >
                    Last Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={order === 'user.title'}
                    direction={getSortDirection('user.title')}
                    onClick={() => handleSort('user.title')}
                  >
                    Title
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={order === 'user.role'}
                    direction={getSortDirection('user.role')}
                    onClick={() => handleSort('user.role')}
                  >
                    Role
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={order === 'user.created'}
                    direction={getSortDirection('user.created')}
                    onClick={() => handleSort('user.created')}
                  >
                    Joined
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loadingUserOrganizations && (
                <TableRow>
                  <TableCell colSpan={4} padding='none'>
                    <LinearProgress />
                  </TableCell>
                </TableRow>
              )}
              {userOrganizations &&
                userOrganizations.data.map((userOrganization) => (
                  <TableRow
                    hover
                    key={userOrganization.id}
                    onClick={() =>
                      navigate(`/portal/team/${userOrganization.id}`)
                    }
                  >
                    <TableCell>{userOrganization.firstName}</TableCell>
                    <TableCell>{userOrganization.lastName}</TableCell>
                    <TableCell>{userOrganization.title}</TableCell>
                    <TableCell>{userOrganization.role}</TableCell>
                    <TableCell>
                      {userOrganization.created &&
                        format(userOrganization.created, 'MMM d, yyyy')}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {userOrganizations && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={userOrganizations.total}
            rowsPerPage={limit ? limit : 100}
            page={page ? page : 0}
            onPageChange={(_, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              setLimit(+event.target.value);
              setPage(0);
            }}
          />
        )}
        <AppSnackbar severity='error' open={!!loadingUserOrganizationsError}>
          There was an error getting the list from the server.
        </AppSnackbar>
        <AppSnackbar severity='success' open={userAdded}>
          User has been added
        </AppSnackbar>
      </PageTemplateCardOver>
    </PageTemplate>
  );
};

export default UserOrganizationListPage;
