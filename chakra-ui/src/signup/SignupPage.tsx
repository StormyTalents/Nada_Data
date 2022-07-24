import { CircularProgress, Typography } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';

import OnboardLayoutCard from '../onboard/cards/OnboardLayoutCard';
import React from 'react';
import api from '../common/api/api';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  city: string;
  state: string;
  postalCode: string;
}

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupRequest>({ reValidateMode: 'onSubmit' });

  const signup = useMutation(
    (data: SignupRequest) => {
      return api.axios.post('/users/signup', data);
    },
    {
      onSuccess: (res, variables, context) => {
        // alert('GREAT');
      },
      onError: (errors) => {
        console.log('error', errors);
      },
    }
  );

  const StyledDiv = styled(OnboardLayoutCard)``;

  return (
    <StyledDiv>
      <div className='main grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8'>
        <div className='main-left lg:px-12 md:px-8 sm:px-4 px-4'>
          <div className='logo'>
            <img alt='logo' src='/assets/images/onboard/logo.svg' />
          </div>
          <div className='body'>
            {signup.data && (
              <>
                <div className='header'>Verify your email</div>
                <div className='subheader pt-2'>
                  Thank you, we have sent you a verification email. Please check
                  your email to confirm.
                </div>
                <button
                  className='text-white w-full bg-black rounded h-12 leading-6 text-base mt-8'
                  onClick={() => navigate('/')}
                >
                  Go back to home
                </button>
              </>
            )}

            {!signup.data && (
              <>
                <div className='header'>Let's start with the basics.</div>
                <div className='subheader pt-2'>
                  We promise this isn't going to take long!
                </div>
                <div className='form mt-4'>
                  <form
                    method='POST'
                    onSubmit={handleSubmit((values: SignupRequest) => {
                      return signup.mutate(values);
                    })}
                  >
                    <div className='flex gap-4'>
                      <input
                        {...register('firstName', {
                          required: 'First name is required',
                        })}
                        className='w-full lg:w-1/2 border border-black rounded h-12 signup-input leading-6 px-6 my-3 '
                        type='text'
                        placeholder='First Name'
                      />

                      <input
                        {...register('lastName', {
                          required: 'Last name is required',
                        })}
                        className='w-full lg:w-1/2 border border-black rounded h-12 signup-input leading-6 px-6 my-3'
                        type='text'
                        placeholder='Last Name'
                      />
                    </div>
                    {errors.firstName && (
                      <span className='error'>{errors.firstName.message}</span>
                    )}{' '}
                    {errors.lastName && (
                      <span className='error float-right'>
                        {errors.lastName.message}
                      </span>
                    )}
                    <input
                      {...register('email', { required: 'Email is required' })}
                      className='w-full border border-black rounded h-12 signup-input leading-6 px-6 my-3'
                      type='email'
                      placeholder='Email — The Business one, not Personal :)'
                    />
                    {errors.email && (
                      <span className='error'>{errors.email.message}</span>
                    )}
                    <input
                      {...register('password', {
                        required: 'Password is required',
                      })}
                      className='w-full border border-black rounded h-12 signup-input leading-6 px-6 my-3'
                      type='password'
                      placeholder='Password'
                    />{' '}
                    {errors.password && (
                      <span className='error'>{errors.password.message}</span>
                    )}
                    <input
                      {...register('city', { required: 'City is required' })}
                      className='w-full border border-black rounded h-12 signup-input leading-6 px-6 my-3'
                      type='text'
                      placeholder='City'
                    />{' '}
                    {errors.city && (
                      <span className='error'>{errors.city.message}</span>
                    )}
                    <input
                      {...register('state', { required: 'State is required' })}
                      className='w-full border border-black rounded h-12 signup-input leading-6 px-6 my-3'
                      type='text'
                      placeholder='State'
                    />{' '}
                    {errors.state && (
                      <span className='error'>{errors.state.message}</span>
                    )}
                    <input
                      {...register('postalCode', {
                        required: 'Postal code is required',
                      })}
                      className='w-full border border-black rounded h-12 signup-input leading-6 px-6 my-3'
                      type='text'
                      placeholder='Postal Code'
                    />{' '}
                    {errors.postalCode && (
                      <span className='error'>{errors.postalCode.message}</span>
                    )}
                    <div className='mt-4'>
                      <Link
                        to='/login'
                        className='leading-6 text-base font-normal '
                      >
                        Already a Haven member? <strong>Log in</strong>
                      </Link>
                    </div>
                    <button
                      className='text-white w-full bg-black rounded h-12 leading-6 text-base mt-8'
                      type='submit'
                      disabled={signup.isLoading}
                    >
                      {signup.isLoading ? (
                        <CircularProgress size='20px' />
                      ) : (
                        'Sign Up'
                      )}
                    </button>
                    {signup.error instanceof api.AxiosError && (
                      <Typography
                        color='error'
                        variant='body2'
                        className='center error my-4 text-center'
                      >
                        {signup?.error?.response?.data.message ??
                          signup.error.message}
                      </Typography>
                    )}
                  </form>
                </div>
              </>
            )}
          </div>
        </div>

        <div className='main-right '>
          <div className='top flex justify-end'>
            <img alt='top' src='/assets/images/onboard/signup.svg' />
          </div>
        </div>
      </div>
    </StyledDiv>
  );
};

export default SignupPage;
