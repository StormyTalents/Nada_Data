import { Form, Formik, FormikProps, FormikValues } from 'formik';
import React, { useEffect, useRef } from 'react';
import * as Yup from 'yup';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {
  FormikButton,
  FormikGrid,
  FormikSelectField,
  FormikTextField,
} from '@nobrainerlabs/react-material-ui-formik';

import { useCreateOrganizationInvite } from '../../hooks/organizations/useCreateOrganizationInvite';
import { useFindUserOrganization } from '../../hooks/user-organizations/useFindUserOrganization';
import {
  OrganizationInvite,
  OrganizationInviteRequest,
} from '../../interfaces/OrganizationInvite';
import { UserOrganizationRole } from '../../interfaces/UserOrganization';

export interface OrganizationInviteDialogProps {
  open: boolean;
  userOrganizationId: number;
  onCancel?: () => void;
  onCreated?: (organizationInvite: OrganizationInvite) => void;
  onAssigned?: (organization: any) => void;
}

export const userOrganizationRoleOptions = [
  { value: UserOrganizationRole.Admin, label: 'Admin' },
  { value: UserOrganizationRole.User, label: 'User' },
];

const OrganizationInviteDialog: React.FC<OrganizationInviteDialogProps> = ({
  userOrganizationId,
  open,
  onCancel,
  onCreated,
}) => {
  const formikRef = useRef<FormikProps<FormikValues> | null>();
  const {
    userOrganization,
    findUserOrganization,
    loadingUserOrganization,
    loadingError,
  } = useFindUserOrganization(+userOrganizationId || 0, true);
  const {
    createdOrganizationInvite,
    isCreating,
    error,
    createOrganizationInvite,
  } = useCreateOrganizationInvite(userOrganization?.organizationId || 0);

  useEffect(() => {
    if (!isCreating) {
      if (onCreated && createdOrganizationInvite) {
        onCreated(createdOrganizationInvite);
      }
      if (formikRef && formikRef.current) {
        formikRef.current.setSubmitting(false);
      }
    }
  }, [createdOrganizationInvite, isCreating, onCreated]);
  return (
    <Dialog open={open} onClose={onCancel}>
      <Formik
        innerRef={(formik: any) => (formikRef.current = formik)}
        initialValues={{
          email: '',
          role: UserOrganizationRole.User || '',
          userOrganizationId,
        }}
        validationSchema={Yup.object({
          email: Yup.string().email().required('Required'),
          role: Yup.string().required('Required'),
        })}
        onSubmit={(form: OrganizationInviteRequest) => {
          form.userOrganizationId = userOrganizationId;
          createOrganizationInvite(form);
        }}
      >
        <Form autoComplete='off'>
          <DialogTitle>Invite Member</DialogTitle>
          <DialogContent>
            <DialogContentText>What is their email?</DialogContentText>
            <FormikGrid>
              <FormikTextField
                autoFocus
                required
                type='email'
                name='email'
                label='Email'
              />
              <FormikSelectField
                required
                margin='normal'
                name='role'
                label='Role'
                options={userOrganizationRoleOptions}
              />
            </FormikGrid>
            {error && <Alert severity='error'>{error.message}</Alert>}
          </DialogContent>
          <DialogActions>
            <Button onClick={onCancel}>Cancel</Button>
            <FormikButton>Send Invite</FormikButton>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  );
};

export default OrganizationInviteDialog;
