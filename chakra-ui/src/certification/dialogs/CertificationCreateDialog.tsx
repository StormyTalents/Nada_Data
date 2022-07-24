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

import { useCreateCertification } from '../hooks/useCreateCertification';
import { Certification } from '../Certification';

export interface CertificationCreateDialogProps {
  open: boolean;
  onCancel?: () => void;
  onCreated?: (certification: Certification) => void;
  onAssigned?: (certification: any) => void;
}
const CertificationCreateDialog: React.FC<CertificationCreateDialogProps> = ({
  open,
  onCancel,
  onCreated,
}) => {
  const formikRef = useRef<FormikProps<FormikValues> | null>();
  const {
    createdCertification,
    isCreating,
    error,
    createCertification,
  } = useCreateCertification();

  useEffect(() => {
    if (!isCreating) {
      if (onCreated && createdCertification) {
        onCreated(createdCertification);
      }
      if (formikRef && formikRef.current) {
        formikRef.current.setSubmitting(false);
      }
    }
  }, [createdCertification, isCreating, onCreated]);
  return (
    <Dialog open={open} onClose={onCancel}>
      <Formik
        innerRef={(formik: any) => (formikRef.current = formik)}
        initialValues={{
          name: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
        })}
        onSubmit={(certification: Partial<Certification>) => {
          createCertification(certification);
        }}
      >
        <Form autoComplete='off'>
          <DialogTitle>New Certification</DialogTitle>
          <DialogContent>
            <DialogContentText>
              What is the name of the certification?
            </DialogContentText>
            <FormikGrid>
              <FormikTextField autoFocus type='text' name='name' label='Name' />
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

export default CertificationCreateDialog;
