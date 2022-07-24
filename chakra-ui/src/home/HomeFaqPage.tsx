import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import HomeLayout from './HomeLayout';

const StyledDiv = styled.div`
  background-color: white;
  max-width: 1040px;
  margin: 0 auto;
`;
const HomeFaqPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <HomeLayout>
      <StyledDiv>
        <div className='bg-white'>
          <div className='max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8'>
            <h2 className='text-3xl font-extrabold text-gray-900 text-center'>
              Frequently Asked Questions
            </h2>
            <div className='mt-6 pt-10'>
              <dl className='space-y-10 md:space-y-0 md:grid md:grid-cols-1 md:gap-x-8 md:gap-y-12 mt-6'>
                <div>
                  <dt className='text-lg leading-6 font-medium text-gray-900'>
                    What is Haven Project?
                  </dt>
                  <dd className='mt-2 text-base text-gray-500'>
                    I don&#039;t know, but the flag is a big plus. Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Quas cupiditate
                    laboriosam fugiat.
                  </dd>
                </div>
              </dl>
              <dl className='space-y-10 md:space-y-0 md:grid md:grid-cols-1 md:gap-x-8 md:gap-y-12 mt-6'>
                <div>
                  <dt className='text-lg leading-6 font-medium text-gray-900'>
                    What makes Haven great?
                  </dt>
                  <dd className='mt-2 text-base text-gray-500'>
                    Absolutely. Plaid helps you share your financial data with
                    the apps you choose––but if you’d like to make a change at
                    any time, we are here to help. There are several ways you
                    can take action to change how you’re sharing data, to
                    withdraw Plaid’s access to your financial data, and, subject
                    to a few exceptions, delete your data from Plaid’s systems.
                  </dd>
                </div>
              </dl>
              <dl className='space-y-10 md:space-y-0 md:grid md:grid-cols-1 md:gap-x-8 md:gap-y-12 mt-6'>
                <div>
                  <dt className='text-lg leading-6 font-medium text-gray-900'>
                    What&#039;s the best thing about Switzerland?
                  </dt>
                  <dd className='mt-2 text-base text-gray-500'>
                    Not necessarily. The app connections we surface in the Plaid
                    Portal after you verify your financial accounts may not be
                    fully comprehensive of all apps you’ve ever connected to
                    your accounts using Plaid. For example, the Plaid Portal
                    will not be able to surface app connections that may have
                    been facilitated manually via the entry of account and
                    routing numbers, or through manual microdeposits.
                  </dd>
                </div>
              </dl>
              <dl className='space-y-10 md:space-y-0 md:grid md:grid-cols-1 md:gap-x-8 md:gap-y-12 mt-6'>
                <div>
                  <dt className='text-lg leading-6 font-medium text-gray-900'>
                    Can I remove app access, delete my data from Plaid, or
                    revoke my consent to Plaid?
                  </dt>
                  <dd className='mt-2 text-base text-gray-500'>
                    If you have used Plaid to facilitate a connection between
                    your financial accounts and an app, then we will share your
                    financial data with that app. The types of data that Plaid
                    shares with your apps depend on the particular connections
                    you’ve established, the specific Plaid services used to
                    power your connected apps, and the information made
                    available by your financial institution. We do not share
                    your data with any app without your consent and do not sell
                    or rent the personal information we collect.
                  </dd>
                </div>
              </dl>
              <dl className='space-y-10 md:space-y-0 md:grid md:grid-cols-1 md:gap-x-8 md:gap-y-12 mt-6'>
                <div>
                  <dt className='text-lg leading-6 font-medium text-gray-900'>
                    What&#039;s the best thing about Switzerland?
                  </dt>
                  <dd className='mt-2 text-base text-gray-500'>
                    I don&#039;t know, but the flag is a big plus. Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Quas cupiditate
                    laboriosam fugiat.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </StyledDiv>
    </HomeLayout>
  );
};

export default HomeFaqPage;
