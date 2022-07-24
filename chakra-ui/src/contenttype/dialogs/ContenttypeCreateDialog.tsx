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

import { useCreateContenttype } from '../hooks/useCreateContenttype';
import { Contenttype } from '../Contenttype';

export interface ContenttypeCreateDialogProps {
  open: boolean;
  onCancel?: () => void;
  onCreated?: (contenttype: Contenttype) => void;
  onAssigned?: (contenttype: any) => void;
}
const ContenttypeCreateDialog: React.FC<ContenttypeCreateDialogProps> = ({
  open,
  onCancel,
  onCreated,
}) => {
  const formikRef = useRef<FormikProps<FormikValues> | null>();
  const { createdContenttype, isCreating, error, createContenttype } =
    useCreateContenttype();

  useEffect(() => {
    if (!isCreating) {
      if (onCreated && createdContenttype) {
        onCreated(createdContenttype);
      }
      if (formikRef && formikRef.current) {
        formikRef.current.setSubmitting(false);
      }
    }
  }, [createdContenttype, isCreating, onCreated]);
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
        onSubmit={(contenttype: Partial<Contenttype>) => {
          createContenttype(contenttype);
        }}
      >
        <Form autoComplete="off">
          <DialogTitle>New Contenttype</DialogTitle>
          <DialogContent>
            <DialogContentText>
              What is the name of the contenttype?
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

export default ContenttypeCreateDialog;
