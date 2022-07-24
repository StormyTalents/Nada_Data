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
  InlineSelectField,
} from '@nobrainerlabs/react-material-ui-formik';

import { useCreateIndustrycode } from '../hooks/useCreateIndustrycode';
import { Industrycode, industrycodeOptions } from '../Industrycode';

export interface IndustrycodeCreateDialogProps {
  open: boolean;
  onCancel?: () => void;
  onCreated?: (Industrycode: Industrycode) => void;
  onAssigned?: (Industrycode: any) => void;
}
const IndustrycodeCreateDialog: React.FC<IndustrycodeCreateDialogProps> = ({
  open,
  onCancel,
  onCreated,
}) => {
  const formikRef = useRef<FormikProps<FormikValues> | null>();
  const { createdIndustrycode, isCreating, error, createIndustrycode } =
    useCreateIndustrycode();

  useEffect(() => {
    if (!isCreating) {
      if (onCreated && createdIndustrycode) {
        onCreated(createdIndustrycode);
      }
      if (formikRef && formikRef.current) {
        formikRef.current.setSubmitting(false);
      }
    }
  }, [createdIndustrycode, isCreating, onCreated]);
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
        onSubmit={(industrycode: Partial<Industrycode>) => {
          createIndustrycode(industrycode);
        }}
      >
        <Form autoComplete="off">
          <DialogTitle>New Industry Code</DialogTitle>
          <DialogContent>
            <DialogContentText>
              What is the name of the Industrycode?
            </DialogContentText>
            <FormikGrid>
              <InlineSelectField
                name="type"
                label="Type"
                options={industrycodeOptions}
                grid={{ xs: 6 }}
              />
              <FormikTextField autoFocus type="text" name="code" label="Code" />
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

export default IndustrycodeCreateDialog;
