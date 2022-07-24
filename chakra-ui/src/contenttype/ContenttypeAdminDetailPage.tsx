import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Breadcrumbs, Grid } from '@material-ui/core';
import {
  PageTemplate,
  PageTemplateDashboard,
  PageTemplateHeader,
} from '@nobrainerlabs/react-material-ui';

import { Contenttype } from './Contenttype';
import ContenttypeInfoCard from './cards/ContenttypeInfoCard';

const ContenttypeAdminDetailPage: React.FC = () => {
  const { contenttypeId = 0 } = useParams<{ contenttypeId: string }>();
  const [contenttype, setContenttype] = useState<Contenttype>();
  return (
    <PageTemplate>
      <PageTemplateHeader>
        <Breadcrumbs aria-label="breadcrumb">
          <h2>
            <Link color="inherit" to="/portal/admin/contenttypes">
              Contenttypes
            </Link>
          </h2>
          <h2>{contenttype?.name}</h2>
        </Breadcrumbs>
      </PageTemplateHeader>
      <PageTemplateDashboard>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <ContenttypeInfoCard
              contenttypeId={+contenttypeId}
              onLoad={(contenttype) => setContenttype(contenttype)}
            />
          </Grid>
        </Grid>
      </PageTemplateDashboard>
    </PageTemplate>
  );
};

export default ContenttypeAdminDetailPage;
