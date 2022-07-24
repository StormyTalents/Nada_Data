import { Link, useNavigate } from 'react-router-dom';
import { OnboardSteps, OrganizationType } from '../OnboardPage';
import React, { useState } from 'react';

import { Button } from '@material-ui/core';
import { useUserContext } from '../../user/UserContext';

const OnboardCompleteCard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [userSelectType, setUserSelectType] = useState();

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <div className='main grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8'>
      <div className='main-left lg:px-12 md:px-8 sm:px-4 px-4'>
        <div className='logo'>
          <img alt='logo' src='/assets/images/onboard/logo.svg' />
        </div>
        <div className='body md:pl-14 pl-4 mt-40'>
          <div className='relative '>
            <span className='select-purple-ball absolute md:top-2 -top-1 z-0 -left-3.5'></span>{' '}
            <p className='text-8xl header-2 z-50 relative'>Welcome</p>
          </div>
          <div className='subheader-2 pt-2 font-normal'>
            to <b>Haven</b>
            <b className='hidden md:inline'>,</b>
            <span className='hidden md:inline capitalize'>
              {' '}
              {user?.firstName}!
            </span>
          </div>
          <div className='text-xl font-light leading-6 pt-6 hidden md:block'>
            That’s good for now, you can finish later! We’re really happy you’re
            here :)
          </div>

          <button
            className='text-white bg-black rounded h-12 leading-6 text-base md:mt-6 mt-4 md:w-44 w-full'
            type='button'
            onClick={() => {
              navigate(`/`);
            }}
          >
            Get Started
          </button>
        </div>
      </div>

      <div className='main-right xs:mt-0 mt-12'>
        <div className='top flex justify-end hidden md:block lg:m-0 md:m-auto lg:py-0 md:py-10'>
          <img
            alt='top'
            className='md:m-auto xl:px-0 lg:px-10'
            src='/assets/images/onboard/select-complete.svg'
          />
        </div>

        <div className='top flex justify-end md:hidden lg:px-12 md:px-8 sm:px-4 px-4'>
          <img alt='top' src='/assets/images/onboard/select-complete-2.svg' />
        </div>
      </div>
    </div>
  );
};

export default OnboardCompleteCard;
