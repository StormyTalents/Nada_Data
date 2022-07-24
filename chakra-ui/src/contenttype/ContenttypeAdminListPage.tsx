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

import ContenttypeCreateDialog from './dialogs/ContenttypeCreateDialog';
import { useFindContenttypes } from './hooks/useFindContenttypes';
import { format } from 'date-fns';

const ContenttypeAdminListPage: React.FC = () => {
  const navigate = useNavigate();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [page = 0, setPage] = useQueryParam('page', NumberParam);
  const [limit = 100, setLimit] = useQueryParam('limit', NumberParam);
  const [order, setOrder] = useQueryParam('order', StringParam);
  const [search = '', setSearch] = useQueryParam('search', StringParam);
  const [direction, setDirection] = useQueryParam('direction', StringParam);
  const {
    contenttypeList,
    isLoading,
    error,
    findContenttypes,
  } = useFindContenttypes();
  useEffect(() => {
    const params = { page, limit, order, direction } as any;
    if (order && direction) {
      params.order = `${order} ${direction}`;
    }
    if (search) {
      params.search = search;
    }
    findContenttypes(params);
  }, [page, limit, order, direction, search, findContenttypes]);
  const handleSort = (column: string) => {
    setOrder(column);
    setDirection(direction === 'ASC' ? 'DESC' : 'ASC');
  };

  const getSortDirection = (column: string): 'asc' | 'desc' => {
    return order === column && direction === 'DESC' ? 'desc' : 'asc';
  };
  return (
    <PageTemplate>
      <Helmet title='Contenttypes' />
      <PageTemplateHeader>
        <h2>Content Types</h2>
        <SearchBox value={search!} onSearch={(value) => setSearch(value)} />
        <PageTemplateHeaderActions>
          <Button
            variant='contained'
            color='primary'
            onClick={() => setIsOpenDialog(true)}
          >
            Add New Content Type
          </Button>
          <ContenttypeCreateDialog
            open={isOpenDialog}
            onCancel={() => setIsOpenDialog(false)}
            onCreated={(contenttype) =>
              navigate(`./contenttypes/${contenttype.id}`)
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
                    active={order === 'contenttype.name'}
                    direction={getSortDirection('contenttype.name')}
                    onClick={() => handleSort('contenttype.name')}
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
                    active={order === 'contenttype.created'}
                    direction={getSortDirection('contenttype.created')}
                    onClick={() => handleSort('contenttype.created')}
                  >
                    Created
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
              {contenttypeList &&
                contenttypeList.data.map((contenttype) => (
                  <TableRow
                    hover
                    key={contenttype.id}
                    onClick={() => navigate(`./contenttypes/${contenttype.id}`)}
                  >
                    <TableCell>{contenttype.name}</TableCell>
                    <TableCell>
                      {contenttype.modifiedBy.firstName}{' '}
                      {contenttype.modifiedBy.lastName}
                    </TableCell>
                    <TableCell>
                      {contenttype.created &&
                        format(contenttype.created, 'MMM d, yyyy')}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {contenttypeList && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={contenttypeList.total}
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

export default ContenttypeAdminListPage;
