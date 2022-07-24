import { Box, Button, Typography } from '@material-ui/core';

import Alert from '@material-ui/lab/Alert';
import OnboardLayoutCard from '../onboard/cards/OnboardLayoutCard';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/users/useLogout';

const AccessDenied: React.FC = () => {
  const navigate = useNavigate();
  const { doLogout } = useLogout();
  return (
    <OnboardLayoutCard>
      <Typography variant='h5' className='title'>
        Access Denied
      </Typography>
      <Box mb={2}>
        <Alert severity='error'>
          You are not authorized to access this page.
        </Alert>
      </Box>
      <Button
        color='primary'
        onClick={() => {
          doLogout();
          navigate('/login');
        }}
      >
        Login
      </Button>
    </OnboardLayoutCard>
  );
};

export default AccessDenied;
