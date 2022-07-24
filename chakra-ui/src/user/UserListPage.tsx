import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { useNavigate } from 'react-router-dom';
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

import UserCreateDialog from './dialogs/UserCreateDialog';
import { useFindUsers } from '../hooks/users/useFindUsers';
import { format } from 'date-fns';

const UserListPage: React.FC = () => {
  const navigate = useNavigate();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [page = 0, setPage] = useQueryParam('page', NumberParam);
  const [limit = 100, setLimit] = useQueryParam('limit', NumberParam);
  const [order, setOrder] = useQueryParam('order', StringParam);
  const [search = '', setSearch] = useQueryParam('search', StringParam);
  const [direction, setDirection] = useQueryParam('direction', StringParam);
  const { userList, isLoading, error, findUsers } = useFindUsers();
  useEffect(() => {
    const params = { page, limit, order, direction } as any;
    if (order && direction) {
      params.order = `${order} ${direction}`;
    }
    if (search) {
      params.search = search;
    }
    findUsers(params);
  }, [page, limit, order, direction, search, findUsers]);
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
        <h2>Users</h2>
        <SearchBox value={search!} onSearch={(value) => setSearch(value)} />
        <PageTemplateHeaderActions>
          <Button
            variant='contained'
            color='primary'
            onClick={() => setIsOpenDialog(true)}
          >
            Add New User
          </Button>
          <UserCreateDialog
            open={isOpenDialog}
            onCancel={() => setIsOpenDialog(false)}
            onCreated={(user) => navigate(`./users/${user.id}`)}
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
                    active={order === 'user.email'}
                    direction={getSortDirection('user.email')}
                    onClick={() => handleSort('user.email')}
                  >
                    Email
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
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={4} padding='none'>
                    <LinearProgress />
                  </TableCell>
                </TableRow>
              )}
              {userList &&
                userList.data.map((user) => (
                  <TableRow
                    hover
                    key={user.id}
                    onClick={() => navigate(`./users/${user.id}`)}
                  >
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.created && format(user.created, 'MMM d, yyyy')}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {userList && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={userList.total}
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

export default UserListPage;
