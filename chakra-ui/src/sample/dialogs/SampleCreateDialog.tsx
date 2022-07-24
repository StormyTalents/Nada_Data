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

import { useCreateSample } from '../hooks/useCreateSample';
import { Sample } from '../Sample';

export interface SampleCreateDialogProps {
  open: boolean;
  onCancel?: () => void;
  onCreated?: (sample: Sample) => void;
  onAssigned?: (sample: any) => void;
}
const SampleCreateDialog: React.FC<SampleCreateDialogProps> = ({
  open,
  onCancel,
  onCreated,
}) => {
  const formikRef = useRef<FormikProps<FormikValues> | null>();
  const { createdSample, isCreating, error, createSample } = useCreateSample();

  useEffect(() => {
    if (!isCreating) {
      if (onCreated && createdSample) {
        onCreated(createdSample);
      }
      if (formikRef && formikRef.current) {
        formikRef.current.setSubmitting(false);
      }
    }
  }, [createdSample, isCreating, onCreated]);
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
        onSubmit={(sample: Partial<Sample>) => {
          createSample(sample);
        }}
      >
        <Form autoComplete="off">
          <DialogTitle>New Sample</DialogTitle>
          <DialogContent>
            <DialogContentText>
              What is the name of the sample?
            </DialogContentText>
            <FormikGrid>
              <FormikTextField autoFocus type="text" name="name" label="Name" />
            </FormikGrid>
            {error && (
              <Alert severity="error">
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

export default SampleCreateDialog;
