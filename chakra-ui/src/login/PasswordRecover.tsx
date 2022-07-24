import * as Yup from 'yup';

import { Button, TextField, Typography } from '@material-ui/core';
import { Form, Formik, FormikProps } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

import { LoginRequest } from './LoginPage';
import OnboardLayoutCard from '../onboard/cards/OnboardLayoutCard';
import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { usePasswordRecover } from '../hooks/users/usePasswordRecover';

export interface PasswordRecoverRequest {
  email: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid e-mail address.')
    .required('E-mail address is required.'),
});

const StyledDiv = styled(OnboardLayoutCard)``;

export const PasswordRecover: React.FC = () => {
  const { success, isLoading, error, doPasswordRecover } = usePasswordRecover();
  const navigate = useNavigate();
  let errorMessage = error
    ? 'Unable to send reset password. Please double check your credentials.'
    : undefined;

  const handleSubmit = (form: PasswordRecoverRequest) => {
    errorMessage = undefined;
    doPasswordRecover(form.email);
  };

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors, isSubmitting },
  // } = useForm<LoginRequest>({ reValidateMode: 'onSubmit' });

  return (
    <StyledDiv>
      <div className='main grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8'>
        <div className='main-left lg:px-12 md:px-8 sm:px-4 px-4'>
          <div className='logo'>
            <img alt='logo' src='/assets/images/onboard/logo.svg' />
          </div>
          <div className='body'>
            <div className='header'>Forgot your password?</div>
            <div className='subheader pt-2'>
              Enter your email to receive a link to reset your password below.
            </div>

            <div className='form mt-4'>
              {!success && (
                <Formik
                  initialValues={{ email: '' }}
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
                  }: FormikProps<PasswordRecoverRequest>) => (
                    <Form className='form'>
                      <TextField
                        variant='outlined'
                        type='email'
                        name='email'
                        label='Email'
                        className='form-field w-full'
                        placeholder='Specify your email to reset'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isLoading}
                        value={values.email}
                        error={touched.email && !!errors.email}
                        helperText={errors.email}
                      />

                      {!isLoading && error && (
                        <p className='error'>{errorMessage}</p>
                      )}

                      <Button
                        className='text-white w-full bg-black rounded h-12 leading-6 text-base mt-8'
                        type='submit'
                        color='primary'
                        variant='contained'
                        disableElevation
                        disabled={isLoading}
                      >
                        Reset via Email
                      </Button>
                    </Form>
                  )}
                </Formik>
              )}

              {success && (
                <Typography variant='body1'>
                  We've sent you an email. Click the link in the email to reset
                  your password.
                </Typography>
              )}

              <div className='bottom-section'>
                <Button
                  component={Link}
                  variant='text'
                  size='large'
                  className='center'
                  color='primary'
                  to='/login'
                >
                  Back to login
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className='main-right '>
          <div className='top  flex justify-end'>
            <img
              alt='top'
              className='object-contain'
              src='/assets/images/onboard/login_top.svg'
            />
          </div>
          <div className='bottom flex justify-end mt-24'>
            <img
              alt='bottom'
              className='object-contain'
              src='/assets/images/onboard/login_bottom.svg'
            />
          </div>
        </div>
      </div>
      {/* <Typography variant="h5" className="title">
        {success ? 'Check your Email' : 'Password Recover'}
      </Typography>

      {!success && (
        <Formik
          initialValues={{ email: '' }}
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
          }: FormikProps<PasswordRecoverRequest>) => (
            <Form className="form">
              <TextField
                variant="outlined"
                type="email"
                name="email"
                label="Email"
                className="form-field"
                placeholder="Specify your email to reset"
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isLoading}
                value={values.email}
                error={touched.email && !!errors.email}
                helperText={errors.email}
              />

              {!isLoading && error && <p className="error">{errorMessage}</p>}

              <Button
                type="submit"
                color="primary"
                variant="contained"
                disableElevation
                disabled={isLoading}
              >
                Reset via Email
              </Button>
            </Form>
          )}
        </Formik>
      )}

      {success && (
        <Typography variant="body1">
          We've sent you an email. Click the link in the email to reset your
          password.
        </Typography>
      )}

      <div className="bottom-section">
        <Button
          component={Link}
          variant="text"
          size="large"
          className="center"
          color="primary"
          to="/login"
        >
          Back to login
        </Button>
      </div> */}
    </StyledDiv>
  );
};

export default PasswordRecover;
