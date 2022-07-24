import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { NumberParam, StringParam, useQueryParam } from 'use-query-params';
import { format } from 'date-fns';
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

import { useFindMailingList } from '../hooks/mailingList/useFindMailingList';

const MailingListPage: React.FC = () => {
  const [page = 0, setPage] = useQueryParam('page', NumberParam);
  const [limit = 100, setLimit] = useQueryParam('limit', NumberParam);
  const [order, setOrder] = useQueryParam('order', StringParam);
  const [search = '', setSearch] = useQueryParam('search', StringParam);
  const [direction, setDirection] = useQueryParam('direction', StringParam);
  const {
    mailingList,
    isLoading,
    error,
    findMailingList,
  } = useFindMailingList();
  useEffect(() => {
    const params = { page, limit, order, direction } as any;
    if (order && direction) {
      params.order = `${order} ${direction}`;
    }
    if (search) {
      params.search = search;
    }
    findMailingList(params);
  }, [page, limit, order, direction, search, findMailingList]);

  const handleSort = (column: string) => {
    setOrder(column);
    setDirection(direction === 'ASC' ? 'DESC' : 'ASC');
  };

  const getSortDirection = (column: string): 'asc' | 'desc' => {
    return order === column && direction === 'DESC' ? 'desc' : 'asc';
  };

  const handleCsvExport = () => {
    const csvRows: any = [['email', 'created']];
    if (mailingList && mailingList.data) {
      mailingList.data.forEach((elem) => {
        csvRows.push([elem.email, elem.created]);
      });
      const csvData = csvRows.map((row: any) => row.join(',')).join('\r\n');
      const a = document.createElement('a');
      const blob = new Blob([`${csvData}`], { type: 'text/csv;charset=utf-8' });
      a.textContent = 'download';
      a.download = 'email-list.csv';
      a.href = URL.createObjectURL(blob);
      a.click();
      a.href = '#';
    }
  };

  return (
    <PageTemplate>
      <Helmet title='Mailing List' />
      <PageTemplateHeader>
        <h2>Mailing List</h2>
        <SearchBox value={search!} onSearch={(value) => setSearch(value)} />
        <PageTemplateHeaderActions>
          <Button variant='contained' color='primary' onClick={handleCsvExport}>
            Export CSV
          </Button>
        </PageTemplateHeaderActions>
      </PageTemplateHeader>
      <PageTemplateCardOver>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
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
              {mailingList &&
                mailingList.data.map((email) => (
                  <TableRow hover key={email.id}>
                    <TableCell>{email.email}</TableCell>
                    <TableCell>
                      {email.created && format(email.created, 'MMM d, yyyy')}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {mailingList && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={mailingList.total}
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

export default MailingListPage;
