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
  FormikTextField,
} from '@nobrainerlabs/react-material-ui-formik';

import { useCreateUserOrganization } from '../../hooks/user-organizations/useCreateUserOrganization';
import { Organization } from '../../interfaces/Organization';
import { UserOrganization } from '../../interfaces/UserOrganization';

export interface UserOrganizationCreateDialogProps {
  open: boolean;
  organizationId: number;
  onCancel?: () => void;
  onCreated?: (userOrganization: UserOrganization) => void;
}

const UserOrganizationCreateDialog: React.FC<UserOrganizationCreateDialogProps> = ({
  organizationId,
  open,
  onCancel,
  onCreated,
}) => {
  const formikRef = useRef<FormikProps<FormikValues> | null>();
  const {
    createdUserOrganization,
    isCreating,
    error,
    createUserOrganization,
  } = useCreateUserOrganization();

  useEffect(() => {
    if (!isCreating) {
      if (onCreated && createdUserOrganization) {
        onCreated(createdUserOrganization);
      }
      if (formikRef && formikRef.current) {
        formikRef.current.setSubmitting(false);
      }
    }
  }, [createdUserOrganization, isCreating, onCreated]);

  return (
    <Dialog open={open} onClose={onCancel}>
      <Formik
        innerRef={(formik: any) => (formikRef.current = formik)}
        initialValues={{
          firstName: '',
          lastName: '',
          organizationId,
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().required('Required'),
          lastName: Yup.string().required('Required'),
        })}
        onSubmit={(organization: Partial<Organization>) => {
          createUserOrganization(organization);
        }}
      >
        <Form autoComplete='off'>
          <DialogTitle>Add a Team Member</DialogTitle>
          <DialogContent>
            <DialogContentText>Member information</DialogContentText>
            <FormikGrid>
              <FormikTextField
                autoFocus
                required
                grid={{ xs: 6 }}
                name='firstName'
                label='First Name'
              />
              <FormikTextField
                required
                grid={{ xs: 6 }}
                name='lastName'
                label='Last Name'
              />
              <FormikTextField
                required
                grid={{ xs: 12 }}
                name='title'
                label='Title'
              />
              {/* <FormikTextField
                autoFocus
                required
                type='email'
                name='email'
                label='Email'
              /> */}
            </FormikGrid>
            {error && <Alert severity='error'>{error.message}</Alert>}
          </DialogContent>
          <DialogActions>
            <Button onClick={onCancel}>Cancel</Button>
            <FormikButton>Create</FormikButton>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  );
};

export default UserOrganizationCreateDialog;
