import { Button, Typography } from '@material-ui/core';

import { Link } from 'react-router-dom';
import OnboardLayoutCard from '../onboard/cards/OnboardLayoutCard';
import React from 'react';

const SetupUserTypePage: React.FC = () => {
  return (
    <OnboardLayoutCard>
      <Typography variant="h5" className="title">
        What would you like to do?
      </Typography>
      <Typography variant="body1">
        Are you browsing for opportunities or looking to become a supplier?
      </Typography>
      <div className="account-types">
        <Button
          component={Link}
          variant="contained"
          color="primary"
          size="large"
          to="/opportunities"
        >
          Browse Opportunities
        </Button>

        <Button
          component={Link}
          variant="outlined"
          size="large"
          to="/setup/supplier"
        >
          Become a Supplier
        </Button>
      </div>
    </OnboardLayoutCard>
  );
};

export default SetupUserTypePage;
