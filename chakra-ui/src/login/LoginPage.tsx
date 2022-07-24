import { CircularProgress, Typography } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import { getAccessToken, setAuthTokens } from 'axios-jwt';

import OnboardLayoutCard from '../onboard/cards/OnboardLayoutCard';
import React from 'react';
import api from '../common/api/api';
import { api as origApi } from '@nobrainerlabs/react-material-ui';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useUserContext } from '../user/UserContext';

export interface LoginRequest {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();
  const accessToken = getAccessToken();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequest>({ reValidateMode: 'onSubmit' });

  const login = useMutation(
    (data: LoginRequest) => {
      return api.axios.post('/users/login', data);
    },
    {
      onSuccess: (response, variables, context) => {
        origApi.setAccessToken(response.data.accessToken);
        // save tokens to storage
        setAuthTokens({
          accessToken: response.data.accessToken,
          refreshToken: response.data.accessToken,
        });
        window.location.href = `/`;
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
            <div className='header'>It’s time to put the small biz first.</div>
            <div className='subheader pt-2'>
              Thousands of easy-to-find opportunities for{' '}
              <strong>veteran-owned</strong> small businesses — all in one
              place.
            </div>

            <div className='form mt-4'>
              <form
                method='POST'
                onSubmit={handleSubmit((values: LoginRequest) => {
                  return login.mutate(values);
                })}
              >
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
                <div className='mt-4'>
                  <Link
                    to='/password/recover'
                    className='leading-6 text-base font-normal '
                  >
                    Forgot Password? <strong>Click here</strong>
                  </Link>
                </div>
                <button
                  className='text-white w-full bg-black rounded h-12 leading-6 text-base mt-8'
                  type='submit'
                  disabled={login.isLoading}
                >
                  {login.isLoading ? <CircularProgress size='20px' /> : 'Login'}
                </button>
                {login.error instanceof api.AxiosError && (
                  <Typography
                    color='error'
                    variant='body2'
                    className='center error my-4 text-center'
                  >
                    {login?.error?.response?.data.message ??
                      login.error.message}
                  </Typography>
                )}
                <div className='mt-6'>
                  <Link
                    to='/signup'
                    className='leading-6 text-base font-normal '
                  >
                    Don't have an account? <strong>Create Account</strong>
                  </Link>
                </div>
              </form>
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
    </StyledDiv>
  );
};

export default LoginPage;
