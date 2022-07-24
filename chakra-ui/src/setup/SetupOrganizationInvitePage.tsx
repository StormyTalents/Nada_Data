import { AppSnackbar, ConfirmDialog } from '@nobrainerlabs/react-material-ui';
import { Button, Icon, IconButton, Typography } from '@material-ui/core';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import OnboardLayoutCard from '../onboard/cards/OnboardLayoutCard';
import { OrganizationInvite } from '../interfaces/OrganizationInvite';
import styled from 'styled-components';
import { useAcceptOrganizationInvite } from '../hooks/organizations/useAcceptOrganizationInvite';
import { useDeclineOrganizationInvite } from '../hooks/organizations/useDeclineOrganizationInvites';
import { useUserContext } from '../user/UserContext';

const StyledButton = styled(Button)`
  margin-right: 12px;
`;

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    display: flex;
    align-items: center;
    padding: 6px;
    .organization-name {
      flex: 1;
    }
    .actions {
      display: flex;
    }
  }
`;

const SetupOrganizationInvitePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, refreshUser } = useUserContext();
  const [confirmDecline, setConfirmDecline] = useState<OrganizationInvite>();
  const {
    acceptedOrganizationInvite,
    isAccepting,
    acceptError,
    acceptOrganizationInvite,
  } = useAcceptOrganizationInvite();
  const {
    declinedOrganizationInvite,
    isDeclining,
    declineError,
    declineOrganizationInvite,
  } = useDeclineOrganizationInvite();
  useEffect(() => {
    if (acceptedOrganizationInvite) refreshUser();
  }, [acceptedOrganizationInvite]);
  useEffect(() => {
    if (declinedOrganizationInvite) refreshUser();
  }, [declinedOrganizationInvite]);
  if (!user?.organizationInvites?.length) {
    if (!user?.userOrganizations?.length) {
      // user declined all invites so set up a new organization
      // return <Redirect to="/" />;
    } else {
      //  to projects after accepting all invites
      // return <Redirect to="/portal/projects" />;
    }
  }
  return (
    <OnboardLayoutCard>
      <Typography variant='h5' className='title'>
        Invite Received
      </Typography>
      <Typography variant='body1' className='subtitle'>
        You have been invited to join the following teams:
      </Typography>
      <StyledList>
        {user?.organizationInvites?.map((organizationInvite) => (
          <li key={organizationInvite.id}>
            <div className='organization-name'>
              <Typography variant='body2'>
                {organizationInvite.organization.name}
              </Typography>
            </div>
            <div className='actions'>
              <StyledButton
                arial-label='Accept Invite'
                color='primary'
                variant='outlined'
                disabled={isAccepting || isDeclining}
                onClick={() => {
                  acceptOrganizationInvite(organizationInvite.organization.id);
                }}
              >
                Accept
              </StyledButton>
              <IconButton
                arial-label='Decline Invite'
                size='small'
                color='primary'
                disabled={isAccepting || isDeclining}
                onClick={() => setConfirmDecline(organizationInvite)}
              >
                <Icon>delete_outline</Icon>
              </IconButton>
            </div>
          </li>
        ))}
      </StyledList>
      <Button
        component={Link}
        variant='contained'
        color='primary'
        className='step-button'
        to={
          !user?.userOrganizations?.length
            ? '/setup/organization'
            : '/portal/projects'
        }
      >
        Skip
      </Button>
      {confirmDecline && (
        <ConfirmDialog
          open
          title='Decline Invite'
          message={`Are you sure you want to decline the invite to "${confirmDecline.organization.name}"?`}
          onCancel={() => setConfirmDecline(undefined)}
          onConfirm={() =>
            declineOrganizationInvite(confirmDecline.organization.id)
          }
        />
      )}
      {acceptError && (
        <AppSnackbar open severity='error'>
          {acceptError.message}
        </AppSnackbar>
      )}
      {declineError && (
        <AppSnackbar open severity='error'>
          {declineError.message}
        </AppSnackbar>
      )}
    </OnboardLayoutCard>
  );
};

export default SetupOrganizationInvitePage;
