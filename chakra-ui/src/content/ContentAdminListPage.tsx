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

import ContentCreateDialog from './dialogs/ContentCreateDialog';
import { useFindContents } from '../hooks/contents/useFindContents';
import { format } from 'date-fns';

const ContentAdminListPage: React.FC = () => {
  const navigate = useNavigate();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [page = 0, setPage] = useQueryParam('page', NumberParam);
  const [limit = 100, setLimit] = useQueryParam('limit', NumberParam);
  const [order, setOrder] = useQueryParam('order', StringParam);
  const [search = '', setSearch] = useQueryParam('search', StringParam);
  const [direction, setDirection] = useQueryParam('direction', StringParam);
  const [type, setType] = useQueryParam('type', StringParam);
  const { contentList, isLoading, error, findContents } = useFindContents();
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
    findContents(params);
  }, [page, limit, order, direction, search, type, findContents]);
  const handleSort = (column: string) => {
    setOrder(column);
    setDirection(direction === 'ASC' ? 'DESC' : 'ASC');
  };

  const getSortDirection = (column: string): 'asc' | 'desc' => {
    return order === column && direction === 'DESC' ? 'desc' : 'asc';
  };
  return (
    <PageTemplate>
      <Helmet title='Contents' />
      <PageTemplateHeader>
        <h2>All {type || 'Content'}</h2>
        <SearchBox value={search!} onSearch={(value) => setSearch(value)} />
        <PageTemplateHeaderActions>
          <Button
            variant='contained'
            color='primary'
            onClick={() => setIsOpenDialog(true)}
          >
            Add New {type || 'Content'}
          </Button>
          <ContentCreateDialog
            open={isOpenDialog}
            onCancel={() => setIsOpenDialog(false)}
            onCreated={(content) => navigate(`./contents/${content.id}`)}
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
                    active={order === 'content.title'}
                    direction={getSortDirection('content.title')}
                    onClick={() => handleSort('content.title')}
                  >
                    Title
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={order === 'content.contenttype.name'}
                    direction={getSortDirection('content.contenttype.name')}
                    onClick={() => handleSort('content.contenttype.name')}
                  >
                    Type
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
                    active={order === 'modifiedBy.created'}
                    direction={getSortDirection('modifiedBy.created')}
                    onClick={() => handleSort('modifiedBy.created')}
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
              {contentList &&
                contentList.data.map((content) => (
                  <TableRow
                    hover
                    key={content.id}
                    onClick={() => navigate(`./contents/${content.id}`)}
                  >
                    <TableCell>{content.title}</TableCell>
                    <TableCell>{content.contenttype?.name}</TableCell>
                    <TableCell>
                      {content.modifiedBy.firstName}{' '}
                      {content.modifiedBy.lastName}
                    </TableCell>
                    <TableCell>
                      {content.created &&
                        format(content.created, 'MMM d, yyyy')}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {contentList && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={contentList.total}
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

export default ContentAdminListPage;
