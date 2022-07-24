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
import InlineSelect from '../../common/inline/InlineSelectField';
import { FolderPaths } from '../../common/interfaces/File.interface';
import { useFindSource } from '../hooks/useFindSource';
import { useUpdateSource } from '../hooks/useUpdateSource';
import { Source } from '../Source';

const SourceInfoCard: React.FC<{
  sourceId: number;
  onLoad?: (source: Source) => void;
}> = ({ sourceId, onLoad }) => {
  const formikRef = useRef<FormikValues>();
  const onLoadRef = useRef(onLoad);
  const {
    source,
    isLoading: isLoadingInitialValues,
    error: findError,
  } = useFindSource(sourceId, true);

  const {
    isUpdating,
    error: updateError,
    updateSource,
  } = useUpdateSource(sourceId);

  const [initialValues, setInitialValues] = useState<Partial<Source>>();

  // set the initial state of the form once loaded
  useEffect(() => {
    if (!isLoadingInitialValues && source) {
      setInitialValues({
        name: source?.name || '',
        type: source?.type || '',
        websiteUrl: source?.websiteUrl || '',
        logoUrl: source?.logoUrl || '',
        description: source?.description || '',
        isVisible: source?.isVisible,
      });
      onLoadRef?.current?.(source);
    }
  }, [isLoadingInitialValues, source]);

  return (
    <Card>
      <CardTitle>
        <Icon>business</Icon>
        Source Info
      </CardTitle>
      <CardContent padding="large">
        <InlineFormik
          innerRef={(formik: any) => (formikRef.current = formik)}
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            name: Yup.string().required(),
            websiteUrl: Yup.string().url(
              'Must be a valid URL (https://site.com)'
            ),
          })}
          isSubmitting={isUpdating}
          error={findError}
          onSubmit={(source: Partial<Source>) => {
            updateSource(source);
          }}
        >
          <InlineForm>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <InlineTextField
                  name="name"
                  label="Company Name"
                  placeholder="Enter a company name"
                  grid={{ xs: 12 }}
                />
                <InlineTextField
                  name="websiteUrl"
                  label="Website URL"
                  placeholder="Website URL. ie; https://www.company.com"
                  grid={{ xs: 12 }}
                />
              </Grid>
            </Grid>
            <InlineImage
              name="logoUrl"
              label="Company Logo"
              s3Path={FolderPaths.CompanyLogos}
              grid={{ xs: 12, md: 6 }}
            />

            <InlineTextField
              name="description"
              label="Company Description"
              placeholder="Enter a description"
              multiline={true}
              grid={{ xs: 12 }}
            />
          </InlineForm>
        </InlineFormik>
        <AppSnackbar severity="error" open={Boolean(updateError)}>
          There was an error saving.
        </AppSnackbar>
      </CardContent>
    </Card>
  );
};

export default SourceInfoCard;
