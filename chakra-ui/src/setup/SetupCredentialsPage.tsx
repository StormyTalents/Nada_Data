import * as Yup from 'yup';

import { Card, Typography } from '@material-ui/core';
import { Form, Formik, FormikValues } from 'formik';
import {
  FormikButton,
  FormikGrid,
  FormikTextField,
} from '@nobrainerlabs/react-material-ui-formik';
import React, { useEffect, useRef } from 'react';

import Alert from '@material-ui/lab/Alert';
import OnboardLayoutCard from '../onboard/cards/OnboardLayoutCard';
import { User } from '../interfaces/User';
import { api } from '@nobrainerlabs/react-material-ui';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useUpdateUser } from '../hooks/users/useUpdateUser';
import { useUserContext } from '../user/UserContext';

const SetupCredentialsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser, refreshUser } = useUserContext();
  const formikRef = useRef<FormikValues>();
  const { updatedUser, error, updateUser } = useUpdateUser(user?.id || 0);
  useEffect(() => {
    if (!user && api.getAccessToken()) {
      refreshUser();
    } else if (!api.getAccessToken()) {
      navigate('/access-denied');
    }
  }, [user]);
  useEffect(() => {
    if (updatedUser) {
      setUser({ ...user, isPasswordSet: true } as any);
      navigate('/setup/user-type');
    }
    if (formikRef && formikRef.current) {
      formikRef.current.setSubmitting(false);
    }
  }, [navigate, setUser, updatedUser, user]);
  const passwordMinLength = 8;
  const passwordRegex: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/;
  const passwordRegexErrorMessage =
    'Need at least an uppercase and a lowercase letter, and a number.';
  return (
    <OnboardLayoutCard>
      <Typography variant="h5" gutterBottom className="title">
        Setup Your Password
      </Typography>
      <Typography variant="subtitle2" className="subtitle">
        The email address used to login to Haven Project is <b>{user?.email}</b>
        . Choose a secure password for your account. The password must be at
        least 8 characters containing an upper and lower case letter, and a
        number.
      </Typography>

      <Formik
        innerRef={(formik: any) => (formikRef.current = formik)}
        initialValues={{
          password: '',
          passwordConfirmation: '',
        }}
        validationSchema={Yup.object({
          password: Yup.string()
            .required('Password is required.')
            .matches(passwordRegex, passwordRegexErrorMessage)
            .min(passwordMinLength, `Minimum ${passwordMinLength} characters.`),
          passwordConfirmation: Yup.string()
            .required('Password is required.')
            .oneOf([Yup.ref('password'), ''], 'Passwords must match.'),
        })}
        onSubmit={(
          userDto: Partial<User & { passwordConfirmation: string }>
        ) => {
          updateUser(userDto);
        }}
      >
        <Form autoComplete="off" className="form">
          <FormikGrid>
            <FormikTextField
              autoFocus
              fullWidth
              type="password"
              name="password"
              label="Enter a Password"
            />
            <FormikTextField
              fullWidth
              type="password"
              name="passwordConfirmation"
              label="Confirm Password"
            />
          </FormikGrid>
          {error && (
            <Alert severity="error">
              An error occurred. Please check your internet connection and try
              again.
            </Alert>
          )}
          <FormikButton className="continue-button">Set Password</FormikButton>
        </Form>
      </Formik>
    </OnboardLayoutCard>
  );
};

export default SetupCredentialsPage;
