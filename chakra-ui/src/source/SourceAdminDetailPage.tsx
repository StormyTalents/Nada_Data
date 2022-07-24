import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Breadcrumbs, Grid } from '@material-ui/core';
import {
  PageTemplate,
  PageTemplateDashboard,
  PageTemplateHeader,
} from '@nobrainerlabs/react-material-ui';

import { Source } from './Source';
import SourceInfoCard from './cards/SourceInfoCard';

const SourceAdminDetailPage: React.FC = () => {
  const { sourceId = 0 } = useParams<{ sourceId: string }>();
  const [source, setSource] = useState<Source>();
  return (
    <PageTemplate>
      <PageTemplateHeader>
        <Breadcrumbs aria-label="breadcrumb">
          <h2>
            <Link color="inherit" to="/portal/sources">
              Sources
            </Link>
          </h2>
          <h2>{source?.name}</h2>
        </Breadcrumbs>
      </PageTemplateHeader>
      <PageTemplateDashboard>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <SourceInfoCard
              sourceId={+sourceId}
              onLoad={(source) => setSource(source)}
            />
          </Grid>
        </Grid>
      </PageTemplateDashboard>
    </PageTemplate>
  );
};

export default SourceAdminDetailPage;
