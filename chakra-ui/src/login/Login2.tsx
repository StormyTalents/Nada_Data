import * as Yup from 'yup';

import { Form, Formik, FormikProps } from 'formik';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import OnboardLayoutCard from '../onboard/cards/OnboardLayoutCard';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import { useLogin } from '../hooks/users/useLogin';

export interface LoginRequest {
  email: string;
  password: string;
}

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address.')
    .required('Email address is required.'),
  password: Yup.string().required('Password is required.'),
});

const Login2: React.FC = () => {
  const { user, isLoading, error, doLogin } = useLogin();
  const navigate = useNavigate();
  let errorMessage = error
    ? error.statusCode === 409
      ? 'Email verification required. Please check your email.'
      : 'Login failed. Please double check your credentials.'
    : undefined;

  const handleSubmit = async (form: LoginRequest) => {
    errorMessage = undefined;

    doLogin(form.email, form.password);
  };

  if (user) {
    if (user.organizationInvites?.length) {
      return <Navigate to='/setup/organization-invites' />;
    } else {
      return <Navigate to='/' />;
    }
  }

  return (
    <OnboardLayoutCard>
      <Typography variant='h5' className='title'>
        Sign In
      </Typography>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        validateOnBlur={true}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
        }: FormikProps<LoginRequest>) => (
          <Form className='form'>
            <TextField
              variant='outlined'
              type='email'
              name='email'
              label='Email'
              className='form-field'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={touched.email && !!errors.email}
              helperText={errors.email}
            />
            <TextField
              variant='outlined'
              type='password'
              name='password'
              label='Password'
              className='form-field'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              error={touched.password && !!errors.password}
              helperText={errors.password}
            />
            {!isLoading && errorMessage && (
              <Typography
                color='error'
                variant='body2'
                className='center error'
              >
                {errorMessage}
              </Typography>
            )}
            <Button
              variant='contained'
              color='primary'
              disableElevation
              type='submit'
              disabled={isLoading}
            >
              Log In
            </Button>
          </Form>
        )}
      </Formik>

      <Button
        component={Link}
        variant='text'
        size='large'
        className='center forgot-password'
        color='primary'
        to='/password/recover'
      >
        Forgot Your Password?
      </Button>

      <section className='bottom-section'>
        <Typography variant='body1' className='center create-account'>
          Don't have an account?
        </Typography>
        <Button
          component={Link}
          variant='text'
          size='large'
          className='center'
          color='primary'
          to='/signup'
        >
          Sign Up
        </Button>
      </section>
    </OnboardLayoutCard>
  );
};

export default Login2;
