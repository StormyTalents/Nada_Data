import { Card, Grid, Icon } from '@material-ui/core';
import {
  AppSnackbar,
  CardContent,
  CardTitle,
} from '@nobrainerlabs/react-material-ui';
import {
  InlineForm,
  InlineFormik,
  InlineImage,
  InlineTextField,
} from '@nobrainerlabs/react-material-ui-formik';
import { FormikValues } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';

import { FolderPaths } from '../../common/interfaces/File.interface';
import { useFindContenttype } from '../hooks/useFindContenttype';
import { useUpdateContenttype } from '../hooks/useUpdateContenttype';
import { Contenttype } from '../Contenttype';

const ContenttypeInfoCard: React.FC<{
  contenttypeId: number;
  onLoad?: (contenttype: Contenttype) => void;
}> = ({ contenttypeId, onLoad }) => {
  const formikRef = useRef<FormikValues>();
  const onLoadRef = useRef(onLoad);
  const {
    contenttype,
    isLoading: isLoadingInitialValues,
    error: findError,
  } = useFindContenttype(contenttypeId, true);

  const {
    isUpdating,
    error: updateError,
    updateContenttype,
  } = useUpdateContenttype(contenttypeId);

  const [initialValues, setInitialValues] = useState<Partial<Contenttype>>();

  // set the initial state of the form once loaded
  useEffect(() => {
    if (!isLoadingInitialValues && contenttype) {
      setInitialValues({
        name: contenttype?.name || '',
      });
      onLoadRef?.current?.(contenttype);
    }
  }, [isLoadingInitialValues, contenttype]);

  return (
    <Card>
      <CardTitle>
        <Icon>business</Icon>
        Contenttype Info
      </CardTitle>
      <CardContent padding="large">
        <InlineFormik
          innerRef={(formik: any) => (formikRef.current = formik)}
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            name: Yup.string().required(),
          })}
          isSubmitting={isUpdating}
          error={findError}
          onSubmit={(contenttype: Partial<Contenttype>) => {
            updateContenttype(contenttype);
          }}
        >
          <InlineForm>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <InlineTextField
                  name="name"
                  label="Name"
                  placeholder="Enter a name"
                  grid={{ xs: 12 }}
                />
              </Grid>
            </Grid>
          </InlineForm>
        </InlineFormik>
        <AppSnackbar severity="error" open={Boolean(updateError)}>
          There was an error saving.
        </AppSnackbar>
      </CardContent>
    </Card>
  );
};

export default ContenttypeInfoCard;
