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
import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { NumberParam, StringParam, useQueryParam } from 'use-query-params';

import IndustrycodeCreateDialog from './dialogs/IndustrycodeCreateDialog';
import { useFindIndustrycodes } from './hooks/useFindIndustrycodes';

const IndustrycodeAdminListPage: React.FC = () => {
  const navigate = useNavigate();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [page = 0, setPage] = useQueryParam('page', NumberParam);
  const [limit = 100, setLimit] = useQueryParam('limit', NumberParam);
  const [order, setOrder] = useQueryParam('order', StringParam);
  const [search = '', setSearch] = useQueryParam('search', StringParam);
  const [direction, setDirection] = useQueryParam('direction', StringParam);
  const {
    industrycodeList,
    isLoading,
    error,
    findIndustrycodes,
  } = useFindIndustrycodes();
  useEffect(() => {
    const params = { page, limit, order, direction } as any;
    if (order && direction) {
      params.order = `${order} ${direction}`;
    }
    if (search) {
      params.search = search;
    }
    findIndustrycodes(params);
  }, [page, limit, order, direction, search, findIndustrycodes]);
  const handleSort = (column: string) => {
    setOrder(column);
    setDirection(direction === 'ASC' ? 'DESC' : 'ASC');
  };

  const getSortDirection = (column: string): 'asc' | 'desc' => {
    return order === column && direction === 'DESC' ? 'desc' : 'asc';
  };
  return (
    <PageTemplate>
      <Helmet title='Industry Codes' />
      <PageTemplateHeader>
        <h2>Industrycodes</h2>
        <SearchBox value={search!} onSearch={(value) => setSearch(value)} />
        <PageTemplateHeaderActions>
          <Button
            variant='contained'
            color='primary'
            onClick={() => setIsOpenDialog(true)}
          >
            Add New Industry Code
          </Button>
          <IndustrycodeCreateDialog
            open={isOpenDialog}
            onCancel={() => setIsOpenDialog(false)}
            onCreated={(industrycode) =>
              navigate(`./industrycodes/${industrycode.id}`)
            }
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
                    active={order === 'industrycode.type'}
                    direction={getSortDirection('industrycode.type')}
                    onClick={() => handleSort('industrycode.type')}
                  >
                    Type
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={order === 'industrycode.code'}
                    direction={getSortDirection('industrycode.code')}
                    onClick={() => handleSort('industrycode.code')}
                  >
                    Code
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={order === 'industrycode.name'}
                    direction={getSortDirection('industrycode.name')}
                    onClick={() => handleSort('industrycode.name')}
                  >
                    Name
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
              {industrycodeList &&
                industrycodeList.data.map((industrycode) => (
                  <TableRow
                    hover
                    key={industrycode.id}
                    onClick={() =>
                      navigate(`./Industrycodes/${industrycode.id}`)
                    }
                  >
                    <TableCell>{industrycode.type}</TableCell>
                    <TableCell>{industrycode.code}</TableCell>
                    <TableCell>{industrycode.name}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {industrycodeList && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={industrycodeList.total}
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

export default IndustrycodeAdminListPage;
