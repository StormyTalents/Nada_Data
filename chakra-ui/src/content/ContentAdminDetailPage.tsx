import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Breadcrumbs, Grid } from '@material-ui/core';
import {
  PageTemplate,
  PageTemplateDashboard,
  PageTemplateHeader,
} from '@nobrainerlabs/react-material-ui';

import { Content } from '../interfaces/Content';
import ContentInfoCard from './cards/ContentInfoCard';

const ContentAdminDetailPage: React.FC = () => {
  const { contentId = 0 } = useParams<{ contentId: string }>();
  const [content, setContent] = useState<Content>();
  return (
    <PageTemplate>
      <PageTemplateHeader>
        <Breadcrumbs aria-label="breadcrumb">
          <h2>
            <Link color="inherit" to="/portal/users">
              Contents
            </Link>
          </h2>
          <h2>{content?.title}</h2>
        </Breadcrumbs>
      </PageTemplateHeader>
      <PageTemplateDashboard>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            {/* Grid Left Column */}
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <ContentInfoCard
                  contentId={+contentId}
                  onLoad={(content) => setContent(content)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </PageTemplateDashboard>
    </PageTemplate>
  );
};

export default ContentAdminDetailPage;
