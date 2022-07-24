import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Breadcrumbs, Grid } from '@material-ui/core';
import {
  PageTemplate,
  PageTemplateDashboard,
  PageTemplateHeader,
} from '@nobrainerlabs/react-material-ui';

import { Sample } from './Sample';
import SampleInfoCard from './cards/SampleInfoCard';

const SampleAdminDetailPage: React.FC = () => {
  const { sampleId = 0 } = useParams<{ sampleId: string }>();
  const [sample, setSample] = useState<Sample>();
  return (
    <PageTemplate>
      <PageTemplateHeader>
        <Breadcrumbs aria-label="breadcrumb">
          <h2>
            <Link color="inherit" to="/portal/admin/samples">
              Samples
            </Link>
          </h2>
          <h2>{sample?.name}</h2>
        </Breadcrumbs>
      </PageTemplateHeader>
      <PageTemplateDashboard>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <SampleInfoCard
              sampleId={+sampleId}
              onLoad={(sample) => setSample(sample)}
            />
          </Grid>
        </Grid>
      </PageTemplateDashboard>
    </PageTemplate>
  );
};

export default SampleAdminDetailPage;
