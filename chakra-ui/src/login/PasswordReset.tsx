import * as Yup from 'yup';

import { Button, TextField, Typography } from '@material-ui/core';
import { Form, Formik, FormikProps } from 'formik';
import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';

import { Alert } from '@material-ui/lab';
import OnboardLayoutCard from '../onboard/cards/OnboardLayoutCard';

import { usePasswordReset } from '../hooks/users/usePasswordReset';

const passwordMinLength = 8;
const passwordRegex: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/;
const passwordRegexErrorMessage =
  'Need at least an uppercase and a lowercase letter, and a number.';
const invalidTokenError =
  'Password reset token is missing, invalid or has expired.';
interface PasswordResetForm {
  password: string;
  passwordConfirmation: string;
}

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required.')
    .matches(passwordRegex, passwordRegexErrorMessage)
    .min(passwordMinLength, `Minimum ${passwordMinLength} characters.`),
  passwordConfirmation: Yup.string()
    .required('Password confirmation is required.')
    .oneOf([Yup.ref('password'), ''], 'Passwords must match.'),
});

const hasErrors = (values: PasswordResetForm): boolean => {
  try {
    validationSchema.validateSync(values);
    return false;
  } catch (_) {
    return true;
  }
};

type PasswordResetQueryParams = {
  token?: string;
};

export type PasswordResetProps = PasswordResetQueryParams; // need to check how to replace RouteComponentProps<PasswordResetQueryParams>

const PasswordReset: React.FC<PasswordResetProps> = (
  props: PasswordResetProps
) => {
  const location = useLocation();

  const {
    user,
    success,
    isLoading,
    error,
    verifyError,
    doPasswordReset,
    doVerifyResetToken,
  } = usePasswordReset();
  const tokenRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    // get token from query
    const params = new URLSearchParams(location.search);
    const token: string | null = params.get('token');
    tokenRef.current = token || undefined;
    doVerifyResetToken(token || '');
  }, [doVerifyResetToken, location.key, location.search]);

  let errorMessage: string | undefined = undefined;
  if (error) errorMessage = 'Unable to reset password.';
  else if (verifyError) errorMessage = invalidTokenError;

  const handleSubmit = (form: PasswordResetForm) => {
    const token = tokenRef.current;
    errorMessage = token ? undefined : 'No reset token found.';
    token && doPasswordReset(form.password, token);
  };

  let title: string = 'Verifying reset token...';
  if (user) title = 'Password Reset';
  else if (verifyError) title = 'Invalid token';

  return (
    <OnboardLayoutCard>
      <Typography variant='h5' className='title'>
        {title}
      </Typography>
      {user && !success && (
        <Formik
          initialValues={
            {
              password: '',
              passwordConfirmation: '',
            } as PasswordResetForm
          }
          validationSchema={validationSchema}
          validateOnBlur={true}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
          }: FormikProps<PasswordResetForm>) => (
            <Form className='form'>
              <TextField
                variant='outlined'
                type='password'
                name='password'
                label='New Password'
                className='form-field'
                placeholder='Enter your new password'
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isLoading}
                value={values.password}
                error={touched.password && !!errors.password}
                helperText={errors.password}
              />

              <TextField
                variant='outlined'
                type='password'
                name='passwordConfirmation'
                label='Confirm Password'
                className='form-field'
                placeholder='Re-enter password'
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isLoading}
                value={values.passwordConfirmation}
                error={
                  touched.passwordConfirmation && !!errors.passwordConfirmation
                }
                helperText={errors.passwordConfirmation}
              />

              {!isLoading && error && (
                <Alert severity='error' className='error'>
                  {errorMessage}
                </Alert>
              )}

              <Button
                type='submit'
                variant='contained'
                disableElevation
                disabled={isLoading || hasErrors(values)}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      )}

      {!isLoading && verifyError && (
        <Alert severity='error' className='error'>
          {errorMessage}
        </Alert>
      )}

      {success && (
        <Typography variant='body1'>
          Password reset successful! You can now proceed to the login page to
          sign in.
        </Typography>
      )}
      <div className='bottom-section'>
        <Button component={Link} className='forgot-password-link' to='/login'>
          {success ? 'Proceed to Login' : 'Back to Login'}
        </Button>
      </div>
    </OnboardLayoutCard>
  );
};

export default PasswordReset; // DELETED withRouter here but couldn't replace with new router v6
