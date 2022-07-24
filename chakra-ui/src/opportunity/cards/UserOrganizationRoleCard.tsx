import { FormikValues } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';

import { Box, Card, Icon, Typography } from '@material-ui/core';
import {
  AppSnackbar,
  CardContent,
  CardTitle,
} from '@nobrainerlabs/react-material-ui';
import {
  InlineForm,
  InlineFormik,
  InlineSelectField,
} from '@nobrainerlabs/react-material-ui-formik';

import { useUpdateUserOrganization } from '../../hooks/user-organizations/useUpdateUserOrganization';
import {
  UserOrganization,
  UserOrganizationRole,
  userOrganizationRoles,
} from '../../interfaces/UserOrganization';
import { useUserContext } from '../../user/UserContext';

const UserOrganizationRoleCard: React.FC<{
  userOrganization: UserOrganization;
}> = ({ userOrganization }) => {
  const formikRef = useRef<FormikValues>();
  const { user, refreshUser } = useUserContext();

  const {
    isUpdating,
    error: updateError,
    updateUserOrganization,
    updatedUserOrganization,
  } = useUpdateUserOrganization(userOrganization.id);

  useEffect(() => {
    if (updatedUserOrganization) {
      refreshUser();
    }
  }, [updatedUserOrganization]);

  return (
    <Card>
      <CardTitle>
        <Icon>mail_outline</Icon>
        Member Role Assignment
      </CardTitle>
      <CardContent padding='small'>
        <Typography display='block' variant='caption'>
          Choose an appropriate role for this member
        </Typography>
        <Box mt={2}>
          {userOrganization && (
            <InlineFormik
              innerRef={(formik: any) => (formikRef.current = formik)}
              initialValues={{
                role: (userOrganization?.role as UserOrganizationRole) || '',
              }}
              validationSchema={Yup.object().shape({})}
              isSubmitting={isUpdating}
              error={updateError}
              onSubmit={(userOrganization: Partial<UserOrganization>) => {
                updateUserOrganization(userOrganization);
              }}
            >
              <InlineForm>
                <InlineSelectField
                  name='role'
                  label='Role'
                  options={userOrganizationRoles}
                  disabled={
                    user?.activeUserOrganization?.role !==
                    UserOrganizationRole.Admin
                  }
                  grid={{ xs: 12 }}
                />
              </InlineForm>
            </InlineFormik>
          )}
        </Box>
      </CardContent>
      <AppSnackbar severity='error' open={Boolean(updateError)}>
        There was an error updating the role.
      </AppSnackbar>
      <AppSnackbar
        severity='success'
        open={!isUpdating && Boolean(updatedUserOrganization)}
      >
        Update successful
      </AppSnackbar>
    </Card>
  );
};

export default UserOrganizationRoleCard;
