import { Form, Formik, FormikValues } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';

import {
  AppSnackbar,
  CardContent,
  CardTitle,
  PageTemplate,
  PageTemplateCardOver,
  PageTemplateHeader,
} from '@nobrainerlabs/react-material-ui';
import {
  FormikButton,
  FormikGrid,
  FormikTextField,
} from '@nobrainerlabs/react-material-ui-formik';

import { useUpdateUser } from '../hooks/users/useUpdateUser';
import { useUserContext } from './UserContext';

interface UserProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const passwordMinLength = 8;
const passwordRegex: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/;
const passwordRegexErrorMessage =
  'Need at least an uppercase and a lowercase letter, and a number.';
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Please enter your given name.'),
  lastName: Yup.string().required('Please enter your family name.'),
  email: Yup.string().required('Email is required.'),
  password: Yup.string()
    .matches(passwordRegex, passwordRegexErrorMessage)
    .min(passwordMinLength, `Minimum ${passwordMinLength} characters.`),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), ''],
    'Passwords must match.'
  ),
});

const UserProfilePage: React.FC = () => {
  const formikRef = useRef<FormikValues>();
  const { user } = useUserContext();
  const userId = user && user.id ? user.id : 0;
  const [onSuccess, setOnSuccess] = useState(false);
  const { updatedUser, error, updateUser } = useUpdateUser(userId);

  useEffect(() => {
    if (updatedUser) {
      setOnSuccess(true);
    }
    if (formikRef && formikRef.current) {
      formikRef.current.setSubmitting(false);
    }
  }, [updatedUser, error]);

  const handleSubmit = (form: UserProfileForm) => {
    if (user) {
      user.firstName = form.firstName;
      user.lastName = form.lastName;
      user.email = form.email;
      if (form.password) {
        user.password = form.password;
      }
      updateUser(user);
    }
  };

  return (
    <PageTemplate>
      <PageTemplateHeader>
        <h2>My Profile</h2>
      </PageTemplateHeader>
      <PageTemplateCardOver>
        <CardTitle>User Info</CardTitle>
        <CardContent padding="large">
          {user && (
            <Formik
              innerRef={(formik: any) => (formikRef.current = formik)}
              initialValues={{
                firstName: user.firstName ? user.firstName : '',
                lastName: user.lastName ? user.lastName : '',
                email: user.email ? user.email : '',
                password: '',
                passwordConfirmation: '',
              }}
              validationSchema={validationSchema}
              validateOnBlur={true}
              onSubmit={handleSubmit}
            >
              <Form autoComplete="off">
                <FormikGrid>
                  <FormikTextField
                    type="text"
                    name="firstName"
                    label="First Name"
                  />
                  <FormikTextField
                    type="text"
                    name="lastName"
                    label="Last Name"
                  />
                  <FormikTextField type="email" name="email" label="Email" />
                  <FormikTextField
                    type="password"
                    name="password"
                    label="Enter New Password"
                  />
                  <FormikTextField
                    type="password"
                    name="passwordConfirmation"
                    label="Confirm New Password"
                  />
                </FormikGrid>
                <FormikButton>Save Profile</FormikButton>
              </Form>
            </Formik>
          )}
        </CardContent>
      </PageTemplateCardOver>
      <AppSnackbar severity="error" open={Boolean(error)}>
        Failed to update account. Please try again later.
      </AppSnackbar>
      <AppSnackbar severity="success" open={onSuccess}>
        Profile updated.
      </AppSnackbar>
    </PageTemplate>
  );
};

export default UserProfilePage;
