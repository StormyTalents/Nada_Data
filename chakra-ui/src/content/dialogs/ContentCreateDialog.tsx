import { Form, Formik, FormikProps, FormikValues } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
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

import { useCreateContent } from '../../hooks/contents/useCreateContent';
import { Content } from '../../interfaces/Content';
import { Contenttype } from '../../contenttype/Contenttype';
import { useFindContenttypes } from '../../contenttype/hooks/useFindContenttypes';
import { StringParam, useQueryParam } from 'use-query-params';
import { useFindContents } from '../../hooks/contents/useFindContents';

export interface ContentCreateDialogProps {
  open: boolean;
  onCancel?: () => void;
  onCreated?: (content: Content) => void;
  onAssigned?: (content: any) => void;
}
const ContentCreateDialog: React.FC<ContentCreateDialogProps> = ({
  open,
  onCancel,
  onCreated,
}) => {
  const formikRef = useRef<FormikProps<FormikValues> | null>();
  const { createdContent, isCreating, error, createContent } =
    useCreateContent();
  const [type = '', setType] = useQueryParam('type', StringParam);
  const { contenttypeList, findContenttypes } = useFindContenttypes();

  useEffect(() => {
    if (type) {
      findContenttypes({
        name: type,
      });
    }
  }, [type]);

  useEffect(() => {
    if (!isCreating) {
      if (onCreated && createdContent) {
        onCreated(createdContent);
      }
      if (formikRef && formikRef.current) {
        formikRef.current.setSubmitting(false);
      }
    }
  }, [createdContent, isCreating, onCreated]);
  return (
    <Dialog open={open} onClose={onCancel}>
      <Formik
        innerRef={(formik: any) => (formikRef.current = formik)}
        initialValues={{
          title: '',
        }}
        validationSchema={Yup.object({
          title: Yup.string().required('Required'),
        })}
        onSubmit={(content: Partial<Content>) => {
          if (type && contenttypeList?.data) {
            content.contenttype = contenttypeList.data[0];
            createContent(content);
          }
        }}
      >
        <Form autoComplete="off">
          <DialogTitle>New Content</DialogTitle>
          <DialogContent>
            <DialogContentText>
              What is the title for this content?
            </DialogContentText>
            <FormikGrid>
              <FormikTextField
                autoFocus
                type="text"
                name="title"
                label="Content Title"
              />
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

export default ContentCreateDialog;
