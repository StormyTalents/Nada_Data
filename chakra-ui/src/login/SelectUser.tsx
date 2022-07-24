import { Form, Formik, FormikProps } from 'formik';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';

const SelectUser: React.FC = () => {
  const navigate = useNavigate();

  const StyledDiv = styled.div`
    font-family: 'Inter', sans-serif !important;

    h4,
    h6,
    button,
    input {
      font-family: 'Inter', sans-serif !important;
    }

    .select-user-primary-title {
      font-size: 36px;
    }

    .select-user-secondary-title {
      font-size: 18px;
    }



    .select-user-btn {
      width: 189px;
    }

    .select-user-input::placeholder {
      color: #c3c2c1;
    }

    .select-user-input {
      width: 434px;
    }

    .select-user-form-container {
      min-height: 800px;
      width: 490px;
    }

 

    .select-user-primary-title {
      width: 460px;
    }

    .select-user-secondary-title {
      width: 505px;
    }

    .select-user-money-icon {
      width: 58.71px;
      height: 35.74px;
    }

    .select-user-blue-tick-icon {
      width: 26.37px;
      height: 20.04px;
    }

    .select-user-supplier-icon {
      width 52px;
      height: 52px;
    }

    .select-user-container {
      width: 528px;
      height: 105px;
      background: #F9FAFB;
      border-radius: 4px;
    }

    .select-user-container-first-text {
      font-size: 18px;
    }

    .select-user-container-small-text {
      color: #667085
    }

    .select-user-container.active {
      border: 1px solid #1656C6;
    }

    .select-user-container-small-text {
      max-width: 340px
    }

    .select-user-image-wrapper {
      height: 200px;
      width: 480px;
    }

    ${(props) => props.theme.breakpoints.down('md')} {
      .select-user-form-container {
        min-height: 400px;
      }

      .select-user-image-container {
        min-height: 400px;
      }

      
    }


    ${(props) => props.theme.breakpoints.down('sm')} {
      .select-user-form-container,
      .select-user-primary-title,
      .select-user-secondary-title,
      .select-user-container,
      .select-user-input,
      .select-image-container 
       {
        max-width: 335px;
      }

      .select-user-input-small {
        max-width: 160px;
      }

      .select-user-btn {
        width: 100%;
      }

      .select-user-image-container {
        width: 139.56px
      }
    }
  `;

  return (
    <StyledDiv>
      <div className='w-full flex justify-center items-center  h-full min-h-screen '>
        <div className='flex lg:flex-row flex-col justify-between items-center w-full md:px-10'>
          <div className='lg:w-1/2 w-full h-full flex justify-center items-center'>
            <div className='w-full h-full flex justify-start items-center flex-col'>
              <div className='select-user-image-wrapper'>
                <img
                  className='logo md:block hidden'
                  src='/assets/images/logo_haven_landing_2.jpg'
                  alt='Haven Project'
                  width='175px'
                />
              </div>
              <div className='flex justify-start items-start flex-col select-user-form-container'>
                <Typography
                  variant='h4'
                  className='title font-bold select-user-primary-title leading-9'
                >
                  John, who are you?
                </Typography>

                <Typography
                  variant='h6'
                  className='title select-user-secondary-title leading-7 mt-5 mb-2'
                >
                  Let’s start with the basics. We promise this isn’t going to
                  take long!
                </Typography>
                <div className='flex justify-center items-start h-full flex-col '>
                  <div className='flex justify-between items-center select-user-container active px-6 my-6'>
                    <div className='flex justify-start items-center'>
                      <img
                        className='logo select-user-money-icon'
                        src='/assets/images/money_img.png'
                        alt='Haven Money Image'
                      />

                      <div className='flex flex-col items-start justify-center ml-5'>
                        <p className='select-user-container-first-text leading-6'>
                          Buyer
                        </p>
                        <p className='select-user-container-small-text'>
                          You’re looking for small businesses to buy from.
                        </p>
                      </div>
                    </div>
                    <img
                      className='logo select-user-blue-tick-icon'
                      src='/assets/images/blue_tick_image.png'
                      alt='Haven Blue Tick Image'
                    />
                  </div>

                  <div className='flex justify-between items-center select-user-container px-6'>
                    <div className='flex justify-start items-center'>
                      <img
                        className='logo select-user-supplier-icon'
                        src='/assets/images/supplier_image.png'
                        alt='Haven Money Image'
                      />

                      <div className='flex flex-col items-start justify-center ml-5'>
                        <p className='select-user-container-first-text leading-6'>
                          Supplier
                        </p>
                        <p className='select-user-container-small-text'>
                          You’re a small business looking to sell your goods or
                          services!
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link
                    to='/select-user'
                    className='leading-6 text-base font-bold mt-6'
                  >
                    Go back to Login Page
                  </Link>
                  <button
                    className='text-white border w-full border-black bg-black rounded h-12 select-user-btn leading-6 text-base font-normal my-6'
                    type='button'
                    placeholder='Password'
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='md:w-1/3 xl:w-1/2 w-full flex  items-center md:justify-center justify-end select-image-container'>
            <div className='flex justify-center  items-start flex-col select-user-image-container '>
              <img
                className='logo welcome-image'
                src='/assets/images/select_user_image.png'
                alt='Haven welcome Image'
              />
            </div>{' '}
          </div>{' '}
        </div>
      </div>
    </StyledDiv>
  );
};

export default SelectUser;
