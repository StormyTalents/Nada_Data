import { Link, useNavigate } from 'react-router-dom';
import { OnboardSteps, OrganizationType } from '../OnboardPage';
import React, { useState } from 'react';
import { StringParam, useQueryParam } from 'use-query-params';

import { Button } from '@material-ui/core';
import { useUserContext } from '../../user/UserContext';

const OnboardTypeCard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [type = OrganizationType.Buyer, setType] = useQueryParam(
    'type',
    StringParam
  );

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <div className='main grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8'>
      <div className='main-left lg:px-12 md:px-8 sm:px-4 px-4'>
        <div className='logo'>
          <img alt='logo' src='/assets/images/onboard/logo.svg' />
        </div>
        <div className='body'>
          <div className='header first-letter:capitalize'>
            {user?.firstName}, who are you?
          </div>
          <div className='subheader pt-2'>
            Let's start with the basics. We promise this isn't going to take too
            long!
          </div>
          <div className='form mt-4'>
            <label
              htmlFor='buyer-select'
              className={classNames(
                'flex justify-between items-center select-card md:pl-4 pl-2 mt-4 mb-3',
                type === OrganizationType.Buyer && 'select-card-checked'
              )}
            >
              <input
                name='user-select'
                type='radio'
                id='buyer-select'
                className='hidden'
                value={'buyer'}
                onChange={(e: any) => setType(e.target.value)}
              />
              <div className='select-logo'>
                <img
                  className='select-logo'
                  alt='buyer-logo'
                  src='/assets/images/onboard/buyer.svg'
                />
              </div>
              <div className='flex flex-col justify-start items-start lg:mx-0 md:-ml-24 ml-4'>
                <p className='md:text-lg text-base font-medium'>Buyer</p>
                <p className='md:text-sm text-xs select-user-text w-70'>
                  You’re looking for small businesses to buy from.
                </p>
              </div>
              <div className='w-12'>
                {type === OrganizationType.Buyer && (
                  <img
                    className='user-select-tick'
                    alt='user-select-tick'
                    src='/assets/images/onboard/blue_tick.svg'
                  />
                )}
              </div>
            </label>

            <label
              htmlFor='supplier-select'
              className={classNames(
                'flex justify-between items-center select-card md:pl-4 pl-2 my-3',
                type === OrganizationType.Supplier && 'select-card-checked'
              )}
            >
              <input
                name='user-select'
                type='radio'
                id='supplier-select'
                className='hidden'
                value={'supplier'}
                onChange={(e: any) => setType(e.target.value)}
              />
              <div className='select-logo'>
                <img
                  alt='supplier-logo'
                  className='select-logo'
                  src='/assets/images/onboard/supplier.svg'
                />
              </div>
              <div className='flex flex-col justify-start items-start lg:mx-0 md:-ml-24 ml-4'>
                <p className='md:text-lg text-base font-medium'>Supplier</p>
                <p className='md:text-sm text-xs select-user-text w-40'>
                  You’re a small business looking to sell your goods or
                  services!
                </p>
              </div>
              <div className='w-12'>
                {type === OrganizationType.Supplier && (
                  <img
                    className='user-select-tick'
                    alt='user-select-tick'
                    src='/assets/images/onboard/blue_tick.svg'
                  />
                )}
              </div>
            </label>
          </div>

          {/* <div className="mt-4 hidden md:block">
            <Link to="/login" className="leading-6 text-base font-normal">
              Go back to Login Page
            </Link>
          </div> */}

          <button
            className='text-white bg-black rounded h-12 leading-6 text-base md:mt-6 mt-4 md:w-44 w-full'
            type='button'
            onClick={() => {
              navigate(`/onboard/company?type=${type}`);
            }}
          >
            Next
          </button>
        </div>
      </div>

      <div className='main-right md:mt-0 mt-10'>
        <div className='top flex justify-end hidden md:block lg:m-0 md:m-auto lg:py-0 md:py-10'>
          <img
            alt='top'
            className='md:m-auto xl:px-0 lg:px-10'
            src='/assets/images/onboard/type.svg'
          />
        </div>

        <div className='top flex justify-end md:hidden lg:px-12 md:px-8 sm:px-4 px-4'>
          <img alt='top' src='/assets/images/onboard/type-2.svg' />
        </div>
      </div>
    </div>
  );
};

export default OnboardTypeCard;
