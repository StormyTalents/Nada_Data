import { FormikValues } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';

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
  InlineSelectField,
  InlineTextField,
} from '@nobrainerlabs/react-material-ui-formik';

import { FolderPaths } from '../../common/interfaces/File.interface';
import {
  countriesOptions,
  usStatesOptions,
} from '../../common/interfaces/Location.interface';
import { useFindIndustrycode } from '../hooks/useFindIndustrycode';
import { useUpdateIndustrycode } from '../hooks/useUpdateIndustrycode';
import { Industrycode } from '../Industrycode';

const IndustrycodeInfoCard: React.FC<{
  industrycodeId: number;
  onLoad?: (industrycode: Industrycode) => void;
}> = ({ industrycodeId, onLoad }) => {
  const formikRef = useRef<FormikValues>();
  const onLoadRef = useRef(onLoad);
  const {
    industrycode,
    isLoading: isLoadingInitialValues,
    error: findError,
  } = useFindIndustrycode(industrycodeId, true);

  const {
    isUpdating,
    error: updateError,
    updateIndustrycode,
  } = useUpdateIndustrycode(industrycodeId);

  const [initialValues, setInitialValues] = useState<Partial<Industrycode>>();

  // set the initial state of the form once loaded
  useEffect(() => {
    if (!isLoadingInitialValues && industrycode) {
      setInitialValues({ ...industrycode });
      onLoadRef?.current?.(industrycode);
    }
  }, [isLoadingInitialValues, industrycode]);

  return (
    <Card>
      <CardTitle>
        <Icon>business</Icon>
        Industrycode Info
      </CardTitle>
      <CardContent padding="large">
        <InlineFormik
          innerRef={(formik: any) => (formikRef.current = formik)}
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            code: Yup.string().required(),
            name: Yup.string().required(),
          })}
          isSubmitting={isUpdating}
          error={findError}
          onSubmit={(industrycode: Partial<Industrycode>) => {
            updateIndustrycode(industrycode);
          }}
        >
          <InlineForm>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <InlineTextField
                  name="name"
                  label="Industry Code"
                  placeholder="Enter an industry code"
                  grid={{ xs: 12 }}
                />
                <InlineTextField
                  name="name"
                  label="Name"
                  placeholder="Enter a name of the code"
                  grid={{ xs: 12 }}
                />
                <InlineTextField
                  name="description"
                  label="Description"
                  multiline
                  placeholder="Some information about the code"
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

export default IndustrycodeInfoCard;
