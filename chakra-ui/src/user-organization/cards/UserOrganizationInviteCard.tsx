import React, { useEffect, useState } from 'react';

import { Box, Button, Card, Icon, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { CardContent, CardTitle } from '@nobrainerlabs/react-material-ui';

import { OrganizationInvite } from '../../interfaces/OrganizationInvite';
import { UserOrganization } from '../../interfaces/UserOrganization';
import OrganizationInviteDialog from '../../organization/dialogs/OrganizationInviteDialog';

const UserOrganizationInviteCard: React.FC<{
  userOrganization: UserOrganization;
}> = ({ userOrganization }) => {
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [
    createdOrganizationInvite,
    setCreatedOrganizationInvite,
  ] = useState<OrganizationInvite>();

  return (
    <Card>
      <CardTitle>
        <Icon>mail_outline</Icon>
        Team Portal Invite
      </CardTitle>
      <CardContent padding='small'>
        <Typography display='block' variant='caption'>
          Invite a member to access the Haven Project portal. The user will
          receive an email with a link to the portal.
        </Typography>
        <Box mt={2}>
          {!createdOrganizationInvite ? (
            <Button
              variant='outlined'
              color='primary'
              disabled={userOrganization?.userId ? true : false}
              onClick={() => setShowInviteDialog(true)}
            >
              Send Invite
            </Button>
          ) : (
            createdOrganizationInvite && (
              <Alert severity='success'>Team Portal Invite Sent</Alert>
            )
          )}
        </Box>
      </CardContent>
      <OrganizationInviteDialog
        open={showInviteDialog}
        onCancel={() => setShowInviteDialog(false)}
        onCreated={(organizationInvite: OrganizationInvite) => {
          setCreatedOrganizationInvite(organizationInvite);
          setShowInviteDialog(false);
        }}
        userOrganizationId={userOrganization.id}
      />
    </Card>
  );
};

export default UserOrganizationInviteCard;
