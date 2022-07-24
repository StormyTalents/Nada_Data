import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Breadcrumbs, Grid } from '@material-ui/core';
import {
  PageTemplate,
  PageTemplateDashboard,
  PageTemplateHeader,
} from '@nobrainerlabs/react-material-ui';

import { Certification } from './Certification';
import CertificationInfoCard from './cards/CertificationInfoCard';

const CertificationAdminDetailPage: React.FC = () => {
  const { certificationId = 0 } = useParams<{ certificationId: string }>();
  const [certification, setCertification] = useState<Certification>();
  return (
    <PageTemplate>
      <PageTemplateHeader>
        <Breadcrumbs aria-label='breadcrumb'>
          <h2>
            <Link color='inherit' to='/portal/certifications'>
              Certifications
            </Link>
          </h2>
          <h2>{certification?.name}</h2>
        </Breadcrumbs>
      </PageTemplateHeader>
      <PageTemplateDashboard>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <CertificationInfoCard
              certificationId={+certificationId}
              onLoad={(certification) => setCertification(certification)}
            />
          </Grid>
        </Grid>
      </PageTemplateDashboard>
    </PageTemplate>
  );
};

export default CertificationAdminDetailPage;
