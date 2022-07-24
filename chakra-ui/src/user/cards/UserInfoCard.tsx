import { FormikValues } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';

import { Card, Icon } from '@material-ui/core';
import {
  AppSnackbar,
  CardContent,
  CardTitle
} from '@nobrainerlabs/react-material-ui';
import {
  InlineForm,
  InlineFormik,
  InlineTextField
} from '@nobrainerlabs/react-material-ui-formik';

import { useFindUser } from '../../hooks/users/useFindUser';
import { useUpdateUser } from '../../hooks/users/useUpdateUser';
import { User } from '../../interfaces/User';

const UserInfoCard: React.FC<{
  userId: number;
  onLoad?: (user: User) => void;
}> = ({ userId, onLoad }) => {
  const formikRef = useRef<FormikValues>();
  const onLoadRef = useRef(onLoad);
  const {
    user,
    isLoading: isLoadingInitialValues,
    error: findError
  } = useFindUser(userId, true);

  const { isUpdating, error: updateError, updateUser } = useUpdateUser(userId);

  const [initialValues, setInitialValues] = useState<Partial<User>>();

  // set the initial state of the form once loaded
  useEffect(() => {
    if (!isLoadingInitialValues && user) {
      setInitialValues({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || ''
      });
      onLoadRef?.current?.(user);
    }
  }, [isLoadingInitialValues, user]);

  return (
    <Card>
      <CardTitle>
        <Icon>person</Icon>
        User Info
      </CardTitle>
      <CardContent padding='large'>
        <InlineFormik
          innerRef={(formik: any) => (formikRef.current = formik)}
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().required(),
            lastName: Yup.string().required(),
            email: Yup.string().email().required()
          })}
          isSubmitting={isUpdating}
          error={findError}
          onSubmit={(user: Partial<User>) => {
            updateUser(user);
          }}
        >
          <InlineForm>
            <InlineTextField
              name='firstName'
              label='First Name'
              placeholder='The first name of the user'
              grid={{ xs: 6 }}
            />
            <InlineTextField
              name='lastName'
              label='Last Name'
              placeholder='The last name of the user'
              grid={{ xs: 6 }}
            />
            <InlineTextField
              name='email'
              label='E-mail'
              placeholder='The e-mail address of the user'
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

export default UserInfoCard;
