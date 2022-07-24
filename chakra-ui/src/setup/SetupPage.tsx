import { BooleanParam, useQueryParam } from 'use-query-params';
import { Button, Typography } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

import OnboardLayoutCard from '../onboard/cards/OnboardLayoutCard';
import { api } from '@nobrainerlabs/react-material-ui';
import styled from 'styled-components';
import { useUserContext } from '../user/UserContext';

const StyledDiv = styled(OnboardLayoutCard)``;
const SetupPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, refreshUser } = useUserContext();
  const [invite] = useQueryParam('invite', BooleanParam);
  useEffect(() => {
    if (!user && api.getAccessToken()) {
      refreshUser();
    } else if (!api.getAccessToken()) {
      navigate('/access-denied');
    }
  }, []);
  return (
    <StyledDiv>
      <div className='main grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8'>
        <div className='main-left lg:px-12 md:px-8 sm:px-4 px-4'>
          <div className='logo'>
            <img alt='logo' src='/assets/images/onboard/logo.svg' />
          </div>
          <div className='body'>
            <>
              <div className='header'>Welcome {user?.firstName}!</div>
              <div className='subheader pt-2'>
                Thank you for verifying your email address. There are just a few
                onboarding steps needed to get you going.
              </div>

              <div className='form mt-4'>
                <form>
                  <button
                    className='text-white w-full bg-black rounded h-12 leading-6 text-base mt-8'
                    type='submit'
                    onClick={() => {
                      navigate(`/onboard/type`);
                    }}
                  >
                    Let's get started
                  </button>
                </form>
              </div>
            </>
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

export default SetupPage;
