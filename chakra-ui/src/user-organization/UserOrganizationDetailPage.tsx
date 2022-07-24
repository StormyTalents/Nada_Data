import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Breadcrumbs, Grid } from '@material-ui/core';
import {
  PageTemplate,
  PageTemplateDashboard,
  PageTemplateHeader,
} from '@nobrainerlabs/react-material-ui';

import { useFindUserOrganization } from '../hooks/user-organizations/useFindUserOrganization';
import UserOrganizationInfoCard from './cards/UserOrganizationInfoCard';
import UserOrganizationInviteCard from './cards/UserOrganizationInviteCard';
import UserOrganizationRoleCard from './cards/UserOrganizationRoleCard';

const UserOrganizationDetailPage: React.FC = () => {
  const { userOrganizationId = 0 } = useParams<{
    userOrganizationId: string;
  }>();

  const {
    userOrganization,
    findUserOrganization,
    loadingUserOrganization,
    loadingError,
  } = useFindUserOrganization(+userOrganizationId || 0, true);

  return (
    <PageTemplate>
      <PageTemplateHeader>
        <Breadcrumbs aria-label='breadcrumb'>
          <h2>
            <Link color='inherit' to='/portal/team'>
              Team
            </Link>
          </h2>
          <h2>
            {userOrganization?.firstName} {userOrganization?.lastName}
          </h2>
        </Breadcrumbs>
      </PageTemplateHeader>
      <PageTemplateDashboard>
        {userOrganization && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              {/* Grid Left Column */}
              <Grid container spacing={3}>
                {/* {userOrganization?.userId && (
                  <Grid item xs={12}>
                    <UserInfoCard userId={userOrganization.userId} />
                  </Grid>
                )} */}
                {userOrganization && (
                  <Grid item xs={12}>
                    <UserOrganizationInfoCard
                      userOrganizationId={userOrganization.id}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>

            <Grid item xs={12} md={4}>
              {/* Grid Right Column */}
              <Grid container spacing={3}>
                {!userOrganization.userId && (
                  <Grid item xs={12}>
                    {userOrganization && (
                      <UserOrganizationInviteCard
                        userOrganization={userOrganization}
                      />
                    )}
                  </Grid>
                )}
                {userOrganization.userId && (
                  <>
                    <Grid item xs={12}>
                      <UserOrganizationRoleCard
                        userOrganization={userOrganization}
                      />
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

export default UserOrganizationDetailPage;
