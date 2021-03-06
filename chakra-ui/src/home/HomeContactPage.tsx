import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import HomeLayout from './HomeLayout';

const StyledDiv = styled.div`
  background-color: white;
  max-width: 1040px;
  margin: 0 auto;
`;
const HomeContactPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <HomeLayout>
      <StyledDiv>
        <div className='bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24'>
          <div className='relative max-w-xl mx-auto'>
            <div className='text-center'>
              <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
                Contact Us
              </h2>
              <p className='mt-8 text-lg leading-6 text-gray-500'>
                Tell us how we can help and we’ll get in touch shortly.
              </p>
            </div>
            <div className='mt-12'>
              <form
                action='#'
                method='POST'
                className='grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8'
              >
                <div>
                  <label
                    htmlFor='first-name'
                    className='block text-sm font-medium text-gray-700'
                  >
                    First name
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      name='first-name'
                      id='first-name'
                      autoComplete='given-name'
                      className='py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md'
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor='last-name'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Last name
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      name='last-name'
                      id='last-name'
                      autoComplete='family-name'
                      className='py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md'
                    />
                  </div>
                </div>
                <div className='sm:col-span-2'>
                  <label
                    htmlFor='company'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Company
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      name='company'
                      id='company'
                      autoComplete='organization'
                      className='py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md'
                    />
                  </div>
                </div>
                <div className='sm:col-span-2'>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Email
                  </label>
                  <div className='mt-1'>
                    <input
                      id='email'
                      name='email'
                      type='email'
                      autoComplete='email'
                      className='py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md'
                    />
                  </div>
                </div>
                <div className='sm:col-span-2'>
                  <label
                    htmlFor='phone-number'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Phone Number
                  </label>
                  <div className='mt-1 relative rounded-md shadow-sm'>
                    <div className='absolute inset-y-0 left-0 flex items-center'>
                      <label htmlFor='country' className='sr-only'>
                        Country
                      </label>
                      <select
                        id='country'
                        name='country'
                        className='h-full py-0 pl-4 pr-8 border-transparent bg-transparent text-gray-500 focus:ring-green-500 focus:border-green-500 rounded-md'
                      >
                        <option>US</option>
                        <option>CA</option>
                        <option>EU</option>
                      </select>
                    </div>
                    <input
                      type='text'
                      name='phone-number'
                      id='phone-number'
                      autoComplete='tel'
                      className='py-3 px-4 block w-full pl-20 focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md'
                      placeholder='+1 (555) 987-6543'
                    />
                  </div>
                </div>
                <div className='sm:col-span-2'>
                  <label
                    htmlFor='message'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Message
                  </label>
                  <div className='mt-1'>
                    <textarea
                      id='message'
                      name='message'
                      rows={4}
                      className='py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border border-gray-300 rounded-md'
                    ></textarea>
                  </div>
                </div>
                {/* <div className="sm:col-span-2">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <button
                        type="button"
                        className="bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        role="switch"
                        aria-checked="false"
                      >
                        <span className="sr-only">Agree to policies</span>

                        <span
                          aria-hidden="true"
                          className="translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                        ></span>
                      </button>
                    </div>
                    <div className="ml-3">
                      <p className="text-base text-gray-500">
                        By selecting this, you agree to the
                        <a
                          href="#"
                          className="font-medium text-gray-700 underline"
                        >
                          Privacy Policy
                        </a>
                        and
                        <a
                          href="#"
                          className="font-medium text-gray-700 underline"
                        >
                          Cookie Policy
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div> */}
                <div className='sm:col-span-2'>
                  <button
                    type='submit'
                    className='w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                  >
                    Let's talk
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </StyledDiv>
    </HomeLayout>
  );
};

export default HomeContactPage;
