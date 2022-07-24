import { CircularProgress, Typography } from '@material-ui/core';
import { StringParam, useQueryParam } from 'use-query-params';

import { ErrorMessage } from '@hookform/error-message';
import { OnboardSteps } from '../OnboardPage';
import React from 'react';
import api from '../../common/api/api';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../user/UserContext';

interface Request {
  name: string;
  websiteUrl: string;
  numEmployees: string;
  description: string;
}

const OnboardCompanyCard: React.FC = () => {
  const navigate = useNavigate();
  const { user, refreshUser } = useUserContext();
  const [type, setType] = useQueryParam('type', StringParam);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Request>({ reValidateMode: 'onSubmit' });

  const createCompany = useMutation(
    (data: Request) => {
      return api.axios.post(`/users/me/organization`, data);
    },
    {
      onSuccess: (res, variables, context) => {
        refreshUser();
        navigate(`/onboard/${OnboardSteps.Certifications}/?type=${type}`);
      },
      onError: (errors) => {
        console.log('error', errors);
      },
    }
  );

  const StyledDiv = styled.div``;

  return (
    <StyledDiv>
      <div className='main grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8'>
        <div className='main-left lg:px-12 md:px-8 sm:px-4 px-4'>
          <div className='logo'>
            <img alt='logo' src='/assets/images/onboard/logo.svg' />
          </div>
          <div className='body'>
            <div className='header capitalize'>{type} Information</div>
            <div className='subheader pt-2'>
              Just some key points, you'll be able to finish your company
              profile later!
            </div>
            <div className='form mt-4'>
              <form
                method='POST'
                onSubmit={handleSubmit((values: Request) => {
                  return createCompany.mutate(values);
                })}
              >
                <input
                  {...register('name', {
                    required: 'Company name is required',
                  })}
                  className='w-full border border-black rounded h-12 signup-input leading-6 px-6 my-3 '
                  type='text'
                  placeholder='Company name'
                />
                {errors.name && (
                  <span className='error'>{errors.name.message}</span>
                )}

                <input
                  {...register('websiteUrl', {
                    required: 'Website is required',
                  })}
                  className='w-full border border-black rounded h-12 signup-input leading-6 px-6 my-3'
                  type='text'
                  placeholder='Website URL'
                />
                {errors.websiteUrl && (
                  <span className='error'>{errors.websiteUrl?.message}</span>
                )}

                <select
                  {...register('numEmployees', {
                    required: 'Number of employees is required',
                  })}
                  className='w-full border bg-white border-black rounded h-12 signup-input leading-6 px-6 my-3 pr-6'
                  placeholder='Number of employees'
                >
                  <option value='1-10'>1-10</option>
                  <option value='11-50'>11-50</option>
                  <option value='51-100'>51-100</option>
                  <option value='101+'>100+</option>
                </select>
                {errors.numEmployees && (
                  <span className='error'>{errors.numEmployees?.message}</span>
                )}

                <input
                  {...register('description')}
                  className='w-full border border-black rounded h-12 signup-input leading-6 px-6 my-3'
                  type='text'
                  placeholder='Company description'
                />
                {errors.description && (
                  <span className='error'>{errors.description?.message}</span>
                )}

                <button
                  className='text-white w-full bg-black rounded h-12 leading-6 text-base mt-8'
                  type='submit'
                  disabled={createCompany.isLoading}
                >
                  {createCompany.isLoading ? (
                    <CircularProgress size='20px' />
                  ) : (
                    'Get Started'
                  )}
                </button>

                {createCompany.error instanceof api.AxiosError && (
                  <Typography
                    color='error'
                    variant='body2'
                    className='center error capitalize my-4 text-center whitespace-pre-wrap'
                  >
                    {createCompany?.error?.response?.data.message ??
                      createCompany.error.message}
                  </Typography>
                )}

                {/* <ErrorMessage
                  errors={errors}
                  name='singleErrorInput'
                  render={({ message }) => <p>{message}</p>}
                /> */}
              </form>
            </div>
          </div>
        </div>

        <div className='main-right '>
          <div className='top flex justify-center mt-12'>
            <img alt='top' src='/assets/images/onboard/company.svg' />
          </div>
        </div>
      </div>
    </StyledDiv>
  );
};

export default OnboardCompanyCard;
