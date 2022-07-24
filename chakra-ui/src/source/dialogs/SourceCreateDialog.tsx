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

import { useCreateSource } from '../hooks/useCreateSource';
import { Source } from '../Source';

export interface SourceCreateDialogProps {
  open: boolean;
  onCancel?: () => void;
  onCreated?: (source: Source) => void;
  onAssigned?: (source: any) => void;
}
const SourceCreateDialog: React.FC<SourceCreateDialogProps> = ({
  open,
  onCancel,
  onCreated,
}) => {
  const formikRef = useRef<FormikProps<FormikValues> | null>();
  const { createdSource, isCreating, error, createSource } = useCreateSource();

  useEffect(() => {
    if (!isCreating) {
      if (onCreated && createdSource) {
        onCreated(createdSource);
      }
      if (formikRef && formikRef.current) {
        formikRef.current.setSubmitting(false);
      }
    }
  }, [createdSource, isCreating, onCreated]);
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
        onSubmit={(source: Partial<Source>) => {
          source.type = 'opportunity';
          createSource(source);
        }}
      >
        <Form autoComplete="off">
          <DialogTitle>New Source</DialogTitle>
          <DialogContent>
            <DialogContentText>
              What is the name of the source?
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

export default SourceCreateDialog;
