import { FormikValues } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';

import { Box, Card, Icon, Typography } from '@material-ui/core';
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

import { FolderPaths } from '../../common/interfaces/File.interface';
import { useFindUserOrganization } from '../../hooks/user-organizations/useFindUserOrganization';
import { useUpdateUserOrganization } from '../../hooks/user-organizations/useUpdateUserOrganization';
import { UserOrganization } from '../../interfaces/UserOrganization';

const UserOrganizationInfoCard: React.FC<{
  userOrganizationId: number;
  onLoad?: (userOrganization: UserOrganization) => void;
}> = ({ userOrganizationId, onLoad }) => {
  const formikRef = useRef<FormikValues>();
  const {
    userOrganization,
    findUserOrganization,
    loadingUserOrganization,
    loadingError,
  } = useFindUserOrganization(+userOrganizationId || 0, true);

  const {
    updatedUserOrganization,
    updateUserOrganization,
    isUpdating,
    error: updateError,
  } = useUpdateUserOrganization(+userOrganizationId || 0);
  const [initialValues, setInitialValues] = useState<
    Partial<UserOrganization>
  >();

  // set the initial state of the form once loaded
  useEffect(() => {
    setInitialValues({
      firstName: userOrganization?.firstName || '',
      lastName: userOrganization?.lastName || '',
      imageUrl: userOrganization?.imageUrl || '',
      title: userOrganization?.title || '',
      shortBio: userOrganization?.shortBio || '',
      linkedinUrl: userOrganization?.linkedinUrl || '',
      facebookUrl: userOrganization?.facebookUrl || '',
      twitterUrl: userOrganization?.twitterUrl || '',
      instagramUrl: userOrganization?.instagramUrl || '',
    });
  }, [userOrganization]);

  return (
    <Card>
      <CardTitle>
        <Icon>person</Icon>
        Team Profile
      </CardTitle>

      <CardContent padding='large'>
        {!userOrganization && !loadingUserOrganization && (
          <Box>
            <Typography variant='body2' color='error'>
              User is not part of this organization
            </Typography>
          </Box>
        )}
        {userOrganization && (
          <InlineFormik
            innerRef={(formik: any) => (formikRef.current = formik)}
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
              facebookUrl: Yup.string().url(
                'Must be a valid URL (https://site.com)'
              ),
              instagramUrl: Yup.string().url(
                'Must be a valid URL (https://site.com)'
              ),
              linkedinUrl: Yup.string().url(
                'Must be a valid URL (https://site.com)'
              ),
              twitterUrl: Yup.string().url(
                'Must be a valid URL (https://site.com)'
              ),
            })}
            isSubmitting={isUpdating}
            error={updateError}
            onSubmit={(userOrganization: Partial<UserOrganization>) => {
              updateUserOrganization(userOrganization);
            }}
          >
            <InlineForm>
              <InlineImage
                name='imageUrl'
                label='Image'
                s3Path={FolderPaths.UserImages}
                grid={{ xs: 12 }}
              />
              <InlineTextField
                name='title'
                label='Title'
                placeholder='Title (CEO, CFO, etc)'
                grid={{ xs: 12 }}
              />
              <InlineTextField
                name='firstName'
                label='First Name'
                placeholder='First Name'
                grid={{ xs: 12, md: 6 }}
              />
              <InlineTextField
                name='lastName'
                label='Last Name'
                placeholder='Last Name'
                grid={{ xs: 12, md: 6 }}
              />
              <InlineTextField
                name='shortBio'
                label='Short Bio'
                multiline
                placeholder='Short bio of the user'
                grid={{ xs: 12 }}
              />
              <InlineTextField
                name='linkedinUrl'
                label='LinkedIn URL'
                placeholder='https://www.linkedin.com/in/someuser'
                grid={{ md: 6, xs: 12 }}
              />
              <InlineTextField
                name='facebookUrl'
                label='Facebook URL'
                placeholder='https://facebook.com/someuser'
                grid={{ md: 6, xs: 12 }}
              />
              <InlineTextField
                name='twitterUrl'
                label='Twitter URL'
                placeholder='https://twitter.com/someuser'
                grid={{ md: 6, xs: 12 }}
              />
              <InlineTextField
                name='instagramUrl'
                label='Instagram URL'
                placeholder='https://instagram.com/someuser'
                grid={{ md: 6, xs: 12 }}
              />
            </InlineForm>
          </InlineFormik>
        )}
        <AppSnackbar severity='error' open={Boolean(updateError)}>
          There was an error saving.
        </AppSnackbar>
      </CardContent>
    </Card>
  );
};

export default UserOrganizationInfoCard;
