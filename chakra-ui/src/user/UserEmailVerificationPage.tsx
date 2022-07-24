import { AppSnackbar, api } from '@nobrainerlabs/react-material-ui';
import { Button, Typography } from '@material-ui/core';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import React, { Fragment, useEffect } from 'react';
import { StringParam, useQueryParam } from 'use-query-params';

import OnboardLayoutCard from '../onboard/cards/OnboardLayoutCard';
import { useUserContext } from './UserContext';
import { useVerifyEmail } from '../hooks/users/useVerifyEmail';

const UserEmailVerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { jwtToken, error, verifyEmail } = useVerifyEmail();
  const [token] = useQueryParam('token', StringParam);
  const { user, refreshUser } = useUserContext();
  // call to verify the token
  useEffect(() => {
    if (token) {
      verifyEmail({ token });
    }
  }, [token, verifyEmail]);

  useEffect(() => {
    if (jwtToken) {
      api.setAccessToken(jwtToken.accessToken);
      refreshUser();

      if (user) {
        if (location.pathname === '/invite') {
          // if user is invited by an organization admin they can proceed to the
          // project admin section
          navigate('/setup/organization-invites');
        } else {
          // if email-verification then proceed to setup flow
          navigate('/setup');
        }
      }
    }
  }, [user, jwtToken]);
  return (
    <OnboardLayoutCard>
      <Typography variant='h5' className='title'>
        Email link not valid
      </Typography>
      <Typography variant='body1'>
        There was an error validating your email address. The link maybe
        expired. To get another email verification link click the login button
        below.
      </Typography>
      <div className='bottom-section'>
        <Button component={Link} className='forgot-password-link' to='/login'>
          Login
        </Button>
      </div>
      <AppSnackbar severity='error' open={!!error}>
        There was an error with email link. Please try again or contact customer
        support.
      </AppSnackbar>
    </OnboardLayoutCard>
  );
};

export default UserEmailVerificationPage;
