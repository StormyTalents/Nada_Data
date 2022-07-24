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

import SampleCreateDialog from './dialogs/SampleCreateDialog';
import { useFindSamples } from './hooks/useFindSamples';
import { format } from 'date-fns';

const SampleAdminListPage: React.FC = () => {
  const navigate = useNavigate();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [page = 0, setPage] = useQueryParam('page', NumberParam);
  const [limit = 100, setLimit] = useQueryParam('limit', NumberParam);
  const [order, setOrder] = useQueryParam('order', StringParam);
  const [search = '', setSearch] = useQueryParam('search', StringParam);
  const [direction, setDirection] = useQueryParam('direction', StringParam);
  const { sampleList, isLoading, error, findSamples } = useFindSamples();
  useEffect(() => {
    const params = { page, limit, order, direction } as any;
    if (order && direction) {
      params.order = `${order} ${direction}`;
    }
    if (search) {
      params.search = search;
    }
    findSamples(params);
  }, [page, limit, order, direction, search, findSamples]);
  const handleSort = (column: string) => {
    setOrder(column);
    setDirection(direction === 'ASC' ? 'DESC' : 'ASC');
  };

  const getSortDirection = (column: string): 'asc' | 'desc' => {
    return order === column && direction === 'DESC' ? 'desc' : 'asc';
  };
  return (
    <PageTemplate>
      <Helmet title='Samples' />
      <PageTemplateHeader>
        <h2>Samples</h2>
        <SearchBox value={search!} onSearch={(value) => setSearch(value)} />
        <PageTemplateHeaderActions>
          <Button
            variant='contained'
            color='primary'
            onClick={() => setIsOpenDialog(true)}
          >
            Add New Company
          </Button>
          <SampleCreateDialog
            open={isOpenDialog}
            onCancel={() => setIsOpenDialog(false)}
            onCreated={(sample) => navigate(`./samples/${sample.id}`)}
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
                    active={order === 'sample.name'}
                    direction={getSortDirection('sample.name')}
                    onClick={() => handleSort('sample.name')}
                  >
                    Name
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
                    active={order === 'sample.modified'}
                    direction={getSortDirection('sample.modified')}
                    onClick={() => handleSort('sample.modified')}
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
              {sampleList &&
                sampleList.data.map((sample) => (
                  <TableRow
                    hover
                    key={sample.id}
                    onClick={() => navigate(`./samples/${sample.id}`)}
                  >
                    <TableCell>{sample.name}</TableCell>
                    <TableCell>
                      {sample.modifiedBy.firstName} {sample.modifiedBy.lastName}
                    </TableCell>
                    <TableCell>
                      {sample.modified &&
                        format(sample.modified, 'MMM d, yyyy')}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {sampleList && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={sampleList.total}
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

export default SampleAdminListPage;
