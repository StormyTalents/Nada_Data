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
import { useFindCertification } from '../hooks/useFindCertification';
import { useUpdateCertification } from '../hooks/useUpdateCertification';
import { Certification } from '../Certification';

const CertificationInfoCard: React.FC<{
  certificationId: number;
  onLoad?: (certification: Certification) => void;
}> = ({ certificationId, onLoad }) => {
  const formikRef = useRef<FormikValues>();
  const onLoadRef = useRef(onLoad);
  const {
    certification,
    isLoading: isLoadingInitialValues,
    error: findError,
  } = useFindCertification(certificationId, true);

  const {
    isUpdating,
    error: updateError,
    updateCertification,
  } = useUpdateCertification(certificationId);

  const [initialValues, setInitialValues] = useState<Partial<Certification>>();

  // set the initial state of the form once loaded
  useEffect(() => {
    if (!isLoadingInitialValues && certification) {
      setInitialValues({
        name: certification?.name || '',
        type: certification?.type || '',
        logoUrl: certification?.logoUrl || '',
        description: certification?.description || '',
      });
      onLoadRef?.current?.(certification);
    }
  }, [isLoadingInitialValues, certification]);

  return (
    <Card>
      <CardTitle>
        <Icon>business</Icon>
        Certification Info
      </CardTitle>
      <CardContent padding='large'>
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
          onSubmit={(certification: Partial<Certification>) => {
            updateCertification(certification);
          }}
        >
          <InlineForm>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <InlineTextField
                  name='name'
                  label='Certification Name'
                  placeholder='Enter a certification name'
                  grid={{ xs: 12 }}
                />
                <InlineTextField
                  name='description'
                  label='Description'
                  multiline
                  placeholder='Some information'
                  grid={{ xs: 12 }}
                />
              </Grid>
            </Grid>
            <InlineImage
              name='logoUrl'
              label='Certification Logo'
              s3Path={FolderPaths.CompanyLogos}
              grid={{ xs: 12, md: 6 }}
            />
          </InlineForm>
        </InlineFormik>
        <AppSnackbar severity='error' open={Boolean(updateError)}>
          There was an error saving.
        </AppSnackbar>
      </CardContent>
    </Card>
  );
};

export default CertificationInfoCard;
