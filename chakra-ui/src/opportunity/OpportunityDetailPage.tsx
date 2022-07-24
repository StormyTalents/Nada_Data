import { Breadcrumbs, Grid } from '@material-ui/core';
import {
  PageTemplate,
  PageTemplateDashboard,
  PageTemplateHeader,
} from '@nobrainerlabs/react-material-ui';
import { FormikProps, FormikValues } from 'formik';
import React, { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useFindOpportunity } from '../hooks/opportunities/useFindOpportunity';
import { useUpdateOpportunity } from '../hooks/opportunities/useUpdateOpportunity';
import OpportunityInfoCard from './cards/OpportunityInfoCard';
import OpportunityNotesCard from './cards/OpportunityNotesCard';
import OpportunityStatusCard from './cards/OpportunityStatusCard';

const OpportunityDetailPage: React.FC = () => {
  const formikRef = useRef<FormikProps<FormikValues> | null>();

  const { opportunityId = 0 } = useParams<{
    opportunityId: string;
  }>();

  const {
    opportunity,
    findOpportunity,
    loadingOpportunity,
    loadingError,
  } = useFindOpportunity(+opportunityId || 0, true);
  const { updateOpportunity, isUpdating, error } = useUpdateOpportunity(
    +opportunityId
  );

  return (
    <PageTemplate>
      <PageTemplateHeader>
        <Breadcrumbs aria-label='breadcrumb'>
          <h2>
            <Link color='inherit' to='/portal/team'>
              Opportunities
            </Link>
          </h2>
          <h2>{opportunity?.name}</h2>
        </Breadcrumbs>
      </PageTemplateHeader>
      <PageTemplateDashboard>
        {opportunity && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {/* Grid Left Column */}
              <Grid container spacing={3}>
                {/* {opportunity?.userId && (
                  <Grid item xs={12}>
                    <UserInfoCard userId={opportunity.userId} />
                  </Grid>
                )} */}
                {opportunity && (
                  <>
                    <Grid item xs={12}>
                      <OpportunityStatusCard opportunityId={opportunity.id} />
                    </Grid>
                    <Grid item xs={12}>
                      <OpportunityInfoCard opportunityId={opportunity.id} />
                    </Grid>
                    <Grid item xs={12}>
                      <OpportunityNotesCard opportunityId={opportunity.id} />
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        )}
      </PageTemplateDashboard>
    </PageTemplate>
  );
};

export default OpportunityDetailPage;
