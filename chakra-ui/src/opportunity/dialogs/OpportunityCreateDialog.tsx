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

import { useCreateOpportunity } from '../../hooks/opportunities/useCreateOpportunity';
import { Organization } from '../../interfaces/Organization';
import { Opportunity } from '../../interfaces/Opportunity';

export interface OpportunityCreateDialogProps {
  open: boolean;
  onCancel?: () => void;
  onCreated?: (opportunity: Opportunity) => void;
}

const OpportunityCreateDialog: React.FC<OpportunityCreateDialogProps> = ({
  open,
  onCancel,
  onCreated,
}) => {
  const formikRef = useRef<FormikProps<FormikValues> | null>();
  const {
    createdOpportunity,
    isCreating,
    error,
    createOpportunity,
  } = useCreateOpportunity();

  useEffect(() => {
    if (!isCreating) {
      if (onCreated && createdOpportunity) {
        onCreated(createdOpportunity);
      }
      if (formikRef && formikRef.current) {
        formikRef.current.setSubmitting(false);
      }
    }
  }, [createdOpportunity, isCreating, onCreated]);

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
        onSubmit={(opportunity: Partial<Opportunity>) => {
          createOpportunity(opportunity);
        }}
      >
        <Form autoComplete='off'>
          <DialogTitle>Add an opportunity</DialogTitle>
          <DialogContent>
            <DialogContentText>Opportunity Information</DialogContentText>
            <FormikGrid>
              <FormikTextField
                autoFocus
                required
                grid={{ xs: 12 }}
                name='name'
                label='Name'
              />
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

export default OpportunityCreateDialog;
