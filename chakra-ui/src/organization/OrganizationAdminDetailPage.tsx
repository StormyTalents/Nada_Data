import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Breadcrumbs, Grid } from '@material-ui/core';
import {
  PageTemplate,
  PageTemplateDashboard,
  PageTemplateHeader,
} from '@nobrainerlabs/react-material-ui';

import { Organization } from '../interfaces/Organization';
import OrganizationInfoCard from './cards/OrganizationInfoCard';

const OrganizationAdminDetailPage: React.FC = () => {
  const { organizationId = 0 } = useParams<{ organizationId: string }>();
  const [organization, setOrganization] = useState<Organization>();
  return (
    <PageTemplate>
      <PageTemplateHeader>
        <Breadcrumbs aria-label='breadcrumb'>
          <h2>
            <Link color='inherit' to='/portal/admin/organizations'>
              Companies
            </Link>
          </h2>
          <h2>{organization?.name}</h2>
        </Breadcrumbs>
      </PageTemplateHeader>
      <PageTemplateDashboard>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <OrganizationInfoCard
              organizationId={+organizationId}
              onLoad={(organization) => setOrganization(organization)}
            />
          </Grid>
        </Grid>
      </PageTemplateDashboard>
    </PageTemplate>
  );
};

export default OrganizationAdminDetailPage;
