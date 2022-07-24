import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Breadcrumbs, Grid } from '@material-ui/core';
import {
  PageTemplate,
  PageTemplateDashboard,
  PageTemplateHeader,
} from '@nobrainerlabs/react-material-ui';

import { Industrycode } from './Industrycode';
import IndustrycodeInfoCard from './cards/IndustrycodeInfoCard';

const IndustrycodeAdminDetailPage: React.FC = () => {
  const { industrycodeId = 0 } = useParams<{ industrycodeId: string }>();
  const [industrycode, setIndustrycode] = useState<Industrycode>();
  return (
    <PageTemplate>
      <PageTemplateHeader>
        <Breadcrumbs aria-label="breadcrumb">
          <h2>
            <Link color="inherit" to="/portal/industrycodes">
              Industry Codes
            </Link>
          </h2>
          <h2>{industrycode?.name}</h2>
        </Breadcrumbs>
      </PageTemplateHeader>
      <PageTemplateDashboard>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <IndustrycodeInfoCard
              industrycodeId={+industrycodeId}
              onLoad={(industrycode) => setIndustrycode(industrycode)}
            />
          </Grid>
        </Grid>
      </PageTemplateDashboard>
    </PageTemplate>
  );
};

export default IndustrycodeAdminDetailPage;
