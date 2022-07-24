import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Breadcrumbs, Grid } from '@material-ui/core';
import {
  PageTemplate,
  PageTemplateDashboard,
  PageTemplateHeader,
} from '@nobrainerlabs/react-material-ui';

import UserInfoCard from './cards/UserInfoCard';
import UserInviteCard from './cards/UserInviteCard';
import UserRoleCard from './cards/UserRoleCard';
import { User } from '../interfaces/User';

const UserDetailPage: React.FC = () => {
  const { userId = 0 } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User>();
  return (
    <PageTemplate>
      <PageTemplateHeader>
        <Breadcrumbs aria-label="breadcrumb">
          <h2>
            <Link color="inherit" to="/portal/users">
              Users
            </Link>
          </h2>
          <h2>
            {user?.firstName} {user?.lastName}
          </h2>
        </Breadcrumbs>
      </PageTemplateHeader>
      <PageTemplateDashboard>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {/* Grid Left Column */}
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <UserInfoCard
                  userId={+userId}
                  onLoad={(user) => setUser(user)}
                />
              </Grid>
              <Grid item xs={12}>
                {/* <UserCustomerInfoCard userId={+userId} /> */}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            {/* Grid Right Column */}
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {user && <UserInviteCard user={user} />}
              </Grid>
              <Grid item xs={12}>
                <UserRoleCard userId={+userId} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </PageTemplateDashboard>
    </PageTemplate>
  );
};

export default UserDetailPage;
