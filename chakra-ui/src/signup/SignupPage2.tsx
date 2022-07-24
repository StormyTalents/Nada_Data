import * as Yup from 'yup';

import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Typography,
} from '@material-ui/core';
import { Form, Formik, FormikProps } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { StringParam, useQueryParam } from 'use-query-params';

import Button from '@material-ui/core/Button';
import { FormikTextField } from '@nobrainerlabs/react-material-ui-formik';
import OnboardLayoutCard from '../onboard/cards/OnboardLayoutCard';
import { useSignupUser } from '../hooks/users/useSignupUser';
import { useUserContext } from '../user/UserContext';

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required.'),
  lastName: Yup.string().required('Last name is required.'),
  email: Yup.string()
    .email('Invalid email address.')
    .required('Email address is required.'),
  password: Yup.string().required('Password is required.'),
});

const SignupPage2: React.FC = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [agreeTos, setAgreeTos] = useState(false);
  const [email] = useQueryParam('email', StringParam);
  const { createdUser, isCreating, error, createUser } = useSignupUser();
  let errorMessage = error
    ? error.statusCode === 409
      ? error.message
      : 'Signup failed. Please double check your credentials.'
    : undefined;

  return (
    <OnboardLayoutCard>
      <Typography variant='h5' className='title'>
        Create Account
      </Typography>

      {createdUser && (
        <Typography variant='body1'>
          A verification email has been sent out to your email address.
        </Typography>
      )}

      {!createdUser && (
        <>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: email || '',
              password: '',
              agreeTos,
            }}
            validationSchema={SignupSchema}
            validateOnBlur={true}
            onSubmit={(form) => {
              errorMessage = undefined;
              createUser(form);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
            }: FormikProps<SignupRequest>) => (
              <Form className='form'>
                <FormikTextField name='firstName' label='First Name' />
                <FormikTextField name='lastName' label='Last Name' />
                <FormikTextField type='email' name='email' label='Email' />
                <FormikTextField
                  type='password'
                  name='password'
                  label='Password'
                />
                <div className='tos'>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={
                      <div style={{ display: 'table-cell' }}>
                        <Checkbox
                          name='agreeTos'
                          onChange={(e) => {
                            setAgreeTos(e.target.checked);
                          }}
                        />
                      </div>
                    }
                    label={
                      <div className='disclaimerandnotes'>
                        I have read and agreed to the Haven Project User
                        Agreement and Terms of Service.
                      </div>
                    }
                  />
                </div>

                <div className='create-account'>
                  <Button
                    variant='contained'
                    color='primary'
                    size='large'
                    type='submit'
                    disabled={
                      isCreating || !agreeTos || Object.keys(errors).length > 0
                    }
                    endIcon={isCreating && <CircularProgress size={16} />}
                    fullWidth={true}
                  >
                    Create an account
                  </Button>
                </div>
                {!isCreating && errorMessage && (
                  <Typography
                    color='error'
                    variant='body2'
                    className='center error'
                  >
                    {errorMessage}
                  </Typography>
                )}
              </Form>
            )}
          </Formik>

          <section className='bottom-section'>
            <Typography variant='body1' className='center'>
              Already have an account?
            </Typography>
            <Button
              component={Link}
              variant='text'
              size='large'
              className='center'
              color='primary'
              to='/login'
            >
              Sign In
            </Button>
          </section>
        </>
      )}
    </OnboardLayoutCard>
  );
};

export default SignupPage2;
