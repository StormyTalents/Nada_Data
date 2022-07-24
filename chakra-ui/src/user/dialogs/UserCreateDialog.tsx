import { Form, Formik, FormikProps, FormikValues } from 'formik';
import React, { useEffect, useRef } from 'react';
import * as Yup from 'yup';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useCreateUser } from '../../hooks/users/useCreateUser';
import { User } from '../../interfaces/User';
import {
  FormikButton,
  FormikGrid,
  FormikTextField,
  FormikSwitch
} from '@nobrainerlabs/react-material-ui-formik';

export interface UserCreateDialogProps {
  open: boolean;
  organizationId?: number;
  onCancel?: () => void;
  onCreated?: (user: User) => void;
  onAssigned?: (user: any) => void;
}
const UserCreateDialog: React.FC<UserCreateDialogProps> = ({
  open,
  organizationId,
  onCancel,
  onCreated
}) => {
  const formikRef = useRef<FormikProps<FormikValues> | null>();
  const { createdUser, isCreating, error, createUser } = useCreateUser();

  useEffect(() => {
    if (!isCreating) {
      if (onCreated && createdUser) {
        onCreated(createdUser);
      }
      if (formikRef && formikRef.current) {
        formikRef.current.setSubmitting(false);
      }
    }
  }, [createdUser, isCreating, onCreated]);
  return (
    <Dialog open={open} onClose={onCancel}>
      <Formik
        innerRef={(formik: any) => (formikRef.current = formik)}
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          isInvited: false
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().required('Required'),
          lastName: Yup.string().required('Required'),
          email: Yup.string().email().required('Required')
        })}
        onSubmit={(user: Partial<User>) => {
          if (organizationId) {
            user.userOrganizations = [{ organizationId } as any];
          }
          createUser(user);
        }}
      >
        <Form autoComplete='off'>
          <DialogTitle>New User</DialogTitle>
          <DialogContent>
            <DialogContentText>
              What is the name of the user and their email?
            </DialogContentText>
            <FormikGrid>
              <FormikTextField
                autoFocus
                type='text'
                name='firstName'
                label="User's First Name"
              />
              <FormikTextField
                type='text'
                name='lastName'
                label="User's Last Name"
              />
              <FormikTextField
                type='email'
                name='email'
                label="User's Email"
              ></FormikTextField>
              <FormikSwitch
                name='isInvited'
                label='Invite the user to access the Haven Project Portal'
              ></FormikSwitch>
            </FormikGrid>
            {error && (
              <Alert severity='error'>
                {error.statusCode === 409
                  ? 'The user with that email address already exists.'
                  : 'Error occurred. Please check your internet connection and try again.'}
              </Alert>
            )}
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

export default UserCreateDialog;
