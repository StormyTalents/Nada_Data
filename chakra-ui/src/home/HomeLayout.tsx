import { Form, Formik, FormikValues } from 'formik';
import * as Yup from 'yup';
import React, { useRef, useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HomeProfileMenu from '../common/menus/HomeProfileMenu';
import { useLogout } from '../hooks/users/useLogout';
import { UserContext } from '../user/UserContext';
import {
  FormikButton,
  FormikTextField,
} from '@nobrainerlabs/react-material-ui-formik';
import { useCreateMailingList } from '../hooks/mailingList/useCreateMailingList';
import { Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import HomeTopNav from '../components/HomeTopNav';

const StyledDiv = styled.div`
  font-family: 'Inter', sans-serif;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 40px;
  ${(props) => props.theme.breakpoints.down('sm')} {
    padding: 0 20px;
  }

  .logo {
    font-family: Tommy;
    a {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 24px;
    }
  }
  .main-menu {
    a {
      font-weight: bold;
      font-family: Tommy;
    }
  }
  .loading {
    text-align: center;
    padding: 40px;
  }
`;
const HomeLayout: React.FC = (props) => {
  const { children } = props;
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const formikRef = useRef<FormikValues>();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { doLogout } = useLogout();
  const {
    createMailingList,
    createdMailingList,
    emailError,
  } = useCreateMailingList();
  const [subscribed, setSubscribed] = useState(false);
  useEffect(() => {
    if (createdMailingList) {
      setSubscribed(true);
    }
    if (formikRef && formikRef.current) {
      formikRef.current.setSubmitting(false);
    }
  }, [createdMailingList, emailError]);
  return (
    <StyledDiv>
      <div className='relative  bg-white '>
        <div className='mx-auto min-h-[90vh] bg-white mt-4 mb-4'>
          <HomeTopNav />
        </div>
      </div>

      {/* content goes here */}
      <div className='z-0'>{children}</div>

      <footer
        aria-labelledby='footer-heading'
        className='bg-white mt-24 border-t border-gray-200  m-auto'
      >
        <h2 id='footer-heading' className='sr-only'>
          Footer
        </h2>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='py-20'>
            <div className='grid grid-cols-1 md:grid-cols-12 md:grid-flow-col md:gap-x-8 md:gap-y-16 md:auto-rows-min'>
              {/* Image section */}
              <div className='col-span-1 md:col-span-2 lg:row-start-1 lg:col-start-1'>
                <img
                  src='/assets/images/haven-standalone.png'
                  alt=''
                  className='h-12 w-auto'
                />
              </div>
              {/* Sitemap sections */}
              <div className='mt-10 col-span-6 grid grid-cols-2 gap-8 sm:grid-cols-3 md:mt-0 md:row-start-1 md:col-start-3 md:col-span-8 lg:col-start-2 lg:col-span-6'>
                <div className='grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8'>
                  <div>
                    <h3 className='text-sm font-medium text-gray-900'>
                      Opportunities
                    </h3>
                    <ul role='list' className='mt-6 space-y-6'>
                      <li className='text-sm'>
                        <Link
                          to='/opportunities?certifications=DBE'
                          className='text-gray-500 hover:text-gray-600'
                        >
                          DBE
                        </Link>
                      </li>
                      <li className='text-sm'>
                        <Link
                          to='/opportunities?certifications=DVBE'
                          className='text-gray-500 hover:text-gray-600'
                        >
                          DVBE
                        </Link>
                      </li>
                      <li className='text-sm'>
                        <Link
                          to='/opportunities?certifications=WOSB'
                          className='text-gray-500 hover:text-gray-600'
                        >
                          Women Owned
                        </Link>
                      </li>
                      <li className='text-sm'>
                        <Link
                          to='/opportunities?certifications=8%28a%29%20Set-Aside'
                          className='text-gray-500 hover:text-gray-600'
                        >
                          8(a) Set-Aside (FAR 19.8)
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className='text-sm font-medium text-gray-900'>
                      Company
                    </h3>
                    <ul role='list' className='mt-6 space-y-6'>
                      <li className='text-sm'>
                        <Link
                          to='/about'
                          className='text-gray-500 hover:text-gray-600'
                        >
                          Who we are
                        </Link>
                      </li>
                      <li className='text-sm'>
                        <Link
                          to='/articles'
                          className='text-gray-500 hover:text-gray-600'
                        >
                          Blog
                        </Link>
                      </li>
                      <li className='text-sm'>
                        <Link
                          to='/faq'
                          className='text-gray-500 hover:text-gray-600'
                        >
                          FAQ
                        </Link>
                      </li>
                      <li className='text-sm'>
                        <a
                          href='#'
                          className='text-gray-500 hover:text-gray-600'
                        >
                          Terms &amp; Conditions
                        </a>
                      </li>
                      <li className='text-sm'>
                        <a
                          href='#'
                          className='text-gray-500 hover:text-gray-600'
                        >
                          Privacy
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className='text-sm font-medium text-gray-900'>
                    Customer Service
                  </h3>
                  <ul role='list' className='mt-6 space-y-6'>
                    <li className='text-sm'>
                      <Link
                        to='/contact'
                        className='text-gray-500 hover:text-gray-600'
                      >
                        Contact Us
                      </Link>
                    </li>
                    <li className='text-sm'>
                      <a href='#' className='text-gray-500 hover:text-gray-600'>
                        Live Chat
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* Newsletter section */}
              <div className='mt-12 md:mt-0 md:row-start-2 md:col-start-3 md:col-span-8 lg:row-start-1 lg:col-start-9 lg:col-span-4'>
                <h3 className='text-sm font-medium text-gray-900'>
                  Subscribe to our newsletter
                </h3>
                <p className='mt-6 text-sm text-gray-500'>
                  Receive jobs and news to your email daily
                </p>

                <Formik
                  innerRef={(formik: any) => (formikRef.current = formik)}
                  initialValues={{
                    email: '',
                  }}
                  validationSchema={Yup.object({
                    email: Yup.string().email().required('Required'),
                  })}
                  onSubmit={(data: any) => {
                    createMailingList({ email: data.email });
                  }}
                >
                  <Form className='mt-2 flex sm:max-w-md'>
                    <label htmlFor='email-address' className='sr-only'>
                      Email address
                    </label>
                    {subscribed && (
                      <Alert severity='success' className='mt-4'>
                        You are now subscribed!
                      </Alert>
                    )}
                    {!subscribed && (
                      <>
                        <FormikTextField
                          className='p-0'
                          type='text'
                          name='email'
                        />
                        <div className='ml-4 flex-shrink-0'>
                          <FormikButton
                            className='rounded-md'
                            style={{ height: 56 }}
                          >
                            Subscribe
                          </FormikButton>
                        </div>
                      </>
                    )}
                  </Form>
                </Formik>
                {emailError && (
                  <Alert severity='warning' className='mt-4'>
                    You are already subscribed, thank you!
                  </Alert>
                )}
              </div>
            </div>
          </div>
          <div className='border-t border-gray-100 py-10 text-center'>
            <p className='text-sm text-gray-500'>
              © 2021 Haven Project, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </StyledDiv>
  );
};

export default HomeLayout;
