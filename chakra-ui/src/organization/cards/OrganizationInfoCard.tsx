import * as Yup from 'yup';

import {
  AppSnackbar,
  CardContent,
  CardTitle,
} from '@nobrainerlabs/react-material-ui';
import { Card, Grid, Icon } from '@material-ui/core';
import {
  InlineForm,
  InlineFormik,
  InlineImage,
  InlineSelectField,
  InlineTextField,
} from '@nobrainerlabs/react-material-ui-formik';
import {
  OrganizationType,
  organizationTypeOptions,
} from '../organization.interface';
import React, { useEffect, useRef, useState } from 'react';
import { StringParam, useQueryParam } from 'use-query-params';
import {
  countriesOptions,
  usStatesOptions,
} from '../../common/interfaces/Location.interface';

import { FolderPaths } from '../../common/interfaces/File.interface';
import { FormikValues } from 'formik';
import { Organization } from '../../interfaces/Organization';
import { useFindOrganization } from '../../hooks/organizations/useFindOrganization';
import { useUpdateOrganization } from '../../hooks/organizations/useUpdateOrganization';

const OrganizationInfoCard: React.FC<{
  organizationId: number;
  onLoad?: (organization: Organization) => void;
}> = ({ organizationId, onLoad }) => {
  const formikRef = useRef<FormikValues>();
  const onLoadRef = useRef(onLoad);
  const {
    organization,
    isLoading: isLoadingInitialValues,
    error: findError,
  } = useFindOrganization(organizationId, true);
  const {
    isUpdating,
    error: updateError,
    updateOrganization,
  } = useUpdateOrganization(organizationId);
  const [type = OrganizationType.Buyer] = useQueryParam('type', StringParam);

  const [initialValues, setInitialValues] = useState<Partial<Organization>>();

  // set the initial state of the form once loaded
  useEffect(() => {
    if (!isLoadingInitialValues && organization) {
      setInitialValues({
        name: organization?.name || '',
        logoUrl: organization?.logoUrl || '',
        foundedYear: organization?.foundedYear || '',
        description: organization?.description || '',
        websiteUrl: organization?.websiteUrl || '',
        secondaryUrl: organization?.secondaryUrl || '',
        address1: organization?.address1 || '',
        address2: organization?.address2 || '',
        city: organization?.city || '',
        state: organization?.state || '',
        postalCode: organization?.postalCode || '',
        countryCode: organization?.countryCode || '',
        primaryIndustry: organization?.primaryIndustry || '',
        secondaryIndustry: organization?.secondaryIndustry || '',
        type: organization?.type ? organization?.type : type || '',
      });
      onLoadRef?.current?.(organization);
    }
  }, [isLoadingInitialValues, organization]);

  return (
    <Card>
      <CardTitle>
        <Icon>business</Icon>
        Organization Info
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
          onSubmit={(organization: Partial<Organization>) => {
            updateOrganization(organization);
          }}
        >
          <InlineForm>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <InlineTextField
                  name='name'
                  label='Company Name *'
                  placeholder='Enter a company name'
                  grid={{ xs: 12 }}
                />
                <InlineTextField
                  name='websiteUrl'
                  label='Website URL'
                  placeholder='Website URL. ie; https://www.company.com'
                  grid={{ xs: 12 }}
                />
              </Grid>
            </Grid>

            <InlineImage
              name='logoUrl'
              label='Company Logo'
              s3Path={FolderPaths.CompanyLogos}
              grid={{ xs: 12, md: 6 }}
            />

            <InlineSelectField
              name='type'
              label='Type'
              options={organizationTypeOptions}
              grid={{ xs: 6 }}
            />

            <InlineTextField
              name='foundedYear'
              label='Year Founded'
              placeholder='The year company was founded. ie; 2020'
              maxLength={4}
              grid={{ xs: 12 }}
            />
            <InlineTextField
              name='description'
              label='Company Description'
              placeholder='Enter a description'
              multiline={true}
              grid={{ xs: 12 }}
            />
            <InlineTextField
              name='address1'
              label='Address 1'
              placeholder='Street Address'
              grid={{ xs: 8 }}
            />
            <InlineTextField
              name='address2'
              label='Address 2'
              placeholder='(Suite 101, etc)'
              grid={{ xs: 4 }}
            />
            <InlineTextField
              name='city'
              label='City'
              placeholder='City'
              grid={{ xs: 5 }}
            />
            <InlineSelectField
              name='state'
              label='State'
              options={usStatesOptions}
              grid={{ xs: 3 }}
            />
            <InlineTextField
              name='postalCode'
              label='Postal Code'
              placeholder='Postal Code'
              maxLength={5}
              grid={{ xs: 4 }}
            />
            <InlineSelectField
              name='countryCode'
              label='Country'
              options={countriesOptions}
              grid={{ xs: 12 }}
            />
            <InlineSelectField
              name='primaryIndustry'
              label='Primary Industry'
              options={[
                { label: '-', value: '' },
                { label: 'Robotics', value: 'robotics' },
                { label: 'Others', value: 'others' },
              ]}
              grid={{ xs: 6 }}
            />
            <InlineSelectField
              name='secondaryIndustry'
              label='Secondary Industry'
              options={[
                { label: '-', value: '' },
                { label: 'Robotics', value: 'robotics' },
                { label: 'Others', value: 'others' },
              ]}
              grid={{ xs: 6 }}
            />

            <InlineTextField
              name='secondaryUrl'
              label='Secondary URL'
              placeholder='Secondary URL. ie; https://www.company.com'
              grid={{ xs: 12 }}
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

export default OrganizationInfoCard;
