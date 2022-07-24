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

import CertificationCreateDialog from './dialogs/CertificationCreateDialog';
import { useFindCertifications } from './hooks/useFindCertifications';
import { format } from 'date-fns';

const CertificationAdminListPage: React.FC = () => {
  const navigate = useNavigate();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [page = 0, setPage] = useQueryParam('page', NumberParam);
  const [limit = 100, setLimit] = useQueryParam('limit', NumberParam);
  const [order, setOrder] = useQueryParam('order', StringParam);
  const [search = '', setSearch] = useQueryParam('search', StringParam);
  const [direction, setDirection] = useQueryParam('direction', StringParam);
  const {
    certificationList,
    isLoading,
    error,
    findCertifications,
  } = useFindCertifications();
  useEffect(() => {
    const params = { page, limit, order, direction } as any;
    if (order && direction) {
      params.order = `${order} ${direction}`;
    }
    if (search) {
      params.search = search;
    }
    findCertifications(params);
  }, [page, limit, order, direction, search, findCertifications]);
  const handleSort = (column: string) => {
    setOrder(column);
    setDirection(direction === 'ASC' ? 'DESC' : 'ASC');
  };

  const getSortDirection = (column: string): 'asc' | 'desc' => {
    return order === column && direction === 'DESC' ? 'desc' : 'asc';
  };
  return (
    <PageTemplate>
      <Helmet title='Certifications' />
      <PageTemplateHeader>
        <h2>Certifications</h2>
        <SearchBox value={search!} onSearch={(value) => setSearch(value)} />
        <PageTemplateHeaderActions>
          <Button
            variant='contained'
            color='primary'
            onClick={() => setIsOpenDialog(true)}
          >
            Add New Certification
          </Button>
          <CertificationCreateDialog
            open={isOpenDialog}
            onCancel={() => setIsOpenDialog(false)}
            onCreated={(certification) =>
              navigate(`./certifications/${certification.id}`)
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
                    active={order === 'certification.name'}
                    direction={getSortDirection('certification.name')}
                    onClick={() => handleSort('certification.name')}
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
                    active={order === 'certification.modified'}
                    direction={getSortDirection('certification.modified')}
                    onClick={() => handleSort('certification.modified')}
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
              {certificationList &&
                certificationList.data.map((certification) => (
                  <TableRow
                    hover
                    key={certification.id}
                    onClick={() =>
                      navigate(`./certifications/${certification.id}`)
                    }
                  >
                    <TableCell>{certification.name}</TableCell>
                    <TableCell>
                      {certification.modifiedBy.firstName}{' '}
                      {certification.modifiedBy.lastName}
                    </TableCell>
                    <TableCell>
                      {certification.modified &&
                        format(certification.modified, 'MMM d, yyyy')}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {certificationList && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={certificationList.total}
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

export default CertificationAdminListPage;
