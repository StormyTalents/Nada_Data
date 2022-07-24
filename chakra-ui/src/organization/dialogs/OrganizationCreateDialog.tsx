import * as Yup from 'yup';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { Form, Formik, FormikProps, FormikValues } from 'formik';
import {
  FormikButton,
  FormikGrid,
  FormikTextField,
} from '@nobrainerlabs/react-material-ui-formik';
import React, { useEffect, useRef } from 'react';
import { StringParam, useQueryParam } from 'use-query-params';

import Alert from '@material-ui/lab/Alert';
import { Organization } from '../../interfaces/Organization';
import { OrganizationType } from '../organization.interface';
import { useCreateOrganization } from '../../hooks/organizations/useCreateOrganization';

export interface OrganizationCreateDialogProps {
  open: boolean;
  onCancel?: () => void;
  onCreated?: (organization: Organization) => void;
  onAssigned?: (organization: any) => void;
}
const OrganizationCreateDialog: React.FC<OrganizationCreateDialogProps> = ({
  open,
  onCancel,
  onCreated,
}) => {
  const formikRef = useRef<FormikProps<FormikValues> | null>();
  const {
    createdOrganization,
    isCreating,
    error,
    createOrganization,
  } = useCreateOrganization();
  const [type = OrganizationType.Buyer] = useQueryParam('type', StringParam);

  useEffect(() => {
    if (!isCreating) {
      if (onCreated && createdOrganization) {
        onCreated(createdOrganization);
      }
      if (formikRef && formikRef.current) {
        formikRef.current.setSubmitting(false);
      }
    }
  }, [createdOrganization, isCreating, onCreated]);
  return (
    <Dialog open={open} onClose={onCancel}>
      <Formik
        innerRef={(formik: any) => (formikRef.current = formik)}
        initialValues={{
          name: '',
          type: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          type: Yup.string().required('Required'),
        })}
        onSubmit={(organization: Partial<Organization>) => {
          organization.type = type || '';
          createOrganization(organization);
        }}
      >
        <Form autoComplete='off'>
          <DialogTitle>New Company</DialogTitle>
          <DialogContent>
            <DialogContentText>
              What is the name of the company?
            </DialogContentText>
            <FormikGrid>
              <FormikTextField
                autoFocus
                type='text'
                name='name'
                label='Company name'
              />
            </FormikGrid>
            {error && (
              <Alert severity='error'>
                Error occurred. Please check your internet connection and try
                again.
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

export default OrganizationCreateDialog;
