import React from 'react';

import {
  Box,
  Button,
  Card,
  CircularProgress,
  Typography,
  Icon
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {
  AppSnackbar,
  CardContent,
  CardTitle
} from '@nobrainerlabs/react-material-ui';

import { useSendUserInvite } from '../../hooks/users/useSendUserInvite';
import { User } from '../../interfaces/User';

const UserInviteCard: React.FC<{ user: User }> = ({ user }) => {
  const { inviteResponse, isInviting, error, invite } = useSendUserInvite(
    user.id
  );

  return (
    <Card>
      <CardTitle>
        <Icon>mail_outline</Icon>
        User Portal Invite
      </CardTitle>
      <CardContent padding='small'>
        <Typography display='block' variant='caption'>
          Invite the user to access the Haven Project portal. The user will receive an
          email with a link to the portal.
        </Typography>
        <Box mt={2}>
          {!inviteResponse?.isSent && user.email ? (
            <Button
              variant='outlined'
              color='primary'
              onClick={() => invite()}
              endIcon={
                isInviting && <CircularProgress color='primary' size={20} />
              }
              disabled={isInviting}
            >
              Send Invite
            </Button>
          ) : !user.email ? (
            <Typography variant='subtitle2' color='error'>
              Please fill in an email address for the user.
            </Typography>
          ) : (
            inviteResponse?.isSent && (
              <Alert severity='success'>User Portal Invite Sent</Alert>
            )
          )}
        </Box>
      </CardContent>
      <AppSnackbar severity='error' open={Boolean(error)}>
        There was an error sending the invite.
      </AppSnackbar>
    </Card>
  );
};

export default UserInviteCard;
