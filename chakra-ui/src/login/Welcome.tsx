import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  const StyledDiv = styled.div`
    font-family: 'Inter', sans-serif !important;

    h4,
    h6,
    button,
    input {
      font-family: 'Inter', sans-serif !important;
    }

    .welcome-primary-title-1 {
      line-height: 121px;
      font-size: 100px;
      height: 121px;
      width: 460px;
    }

    .welcome-primary-title-2 {
      line-height: 63px;
      font-size: 52px;
      width: 412px;
      height: 63px;
    }

    .welcome-btn {
      width: 189px;
    }

    .welcome-input::placeholder {
      color: #c3c2c1;
    }

    .welcome-input {
      width: 434px;
    }

    .welcome-form-container {
      width: 490px;
      min-height: 800px;
    }

    .welcome-secondary-title {
      width: 400px;
      height: 48px;
    }

    .welcome-image {
      width: 537px;
    }

    .welcome-image-mobile {
      width: 119.98px;
      height: 779px;
    }

    .welcome-image-wrapper {
      height: 200px;
      width: 480px;
    }

    ${(props) => props.theme.breakpoints.down('md')} {
      .welcome-form-container {
        min-height: 400px;
      }
    }

    ${(props) => props.theme.breakpoints.down('sm')} {
      .welcome-form-container,
      .welcome-primary-title-1,
      .welcome-primary-title-2,
      .welcome-secondary-title,
      .welcome-container,
      .welcome-input,
      .welcome-mobile-container {
        max-width: 335px;
      }

      .welcome-primary-title-1 {
        width: 237px;
        height: 61px;
        font-size: 50px;
        line-height: 61px;
      }

      .welcome-primary-title-2 {
        width: 251px;
        height: 39px;
        font-size: 32px;
        line-height: 39px;
      }

      .welcome-input-small {
        max-width: 160px;
      }

      .welcome-btn {
        width: 100%;
      }
    }
  `;

  return (
    <StyledDiv>
      <div className='w-full flex justify-center items-center my-auto h-full min-h-screen flex-row lg:flex-row md:px-10 '>
        <div className='lg:w-1/2 w-2/3 flex justify-center items-center'>
          <div className='w-full h-full flex justify-start items-center flex-col'>
            <div className='welcome-mobile-container flex justify-start items-start w-full md:hidden'>
              <img
                className='logo pl-4'
                src='/assets/images/logo_haven_landing_2.jpg'
                alt='Haven Project'
                width='175px'
              />
            </div>

            <div className='welcome-image-wrapper'>
              <img
                className='logo md:block hidden'
                src='/assets/images/logo_haven_landing_2.jpg'
                alt='Haven Project'
                width='175px'
              />
            </div>

            <div className='flex justify-start md:items-start items-center flex-col welcome-form-container '>
              <div className='relative md:text-left text-center md:ml-0 ml-10'>
                <h1 className='font-bold welcome-primary-title-1 z-10 relative'>
                  Welcome
                </h1>
                <p className='welcome-primary-title-2'>
                  to <b>Haven!</b>{' '}
                  <span className='md:inline hidden'>, John.</span>
                </p>
                <img
                  className='logo w-8 h-8 absolute top-2 -left-4 z-0'
                  src='/assets/images/purple_bubble.png'
                  alt='Haven welcome Image'
                />
              </div>

              <p className='welcome-secondary-title text-xl leading-7 md:mt-5 mt-16 mb-2 font-light md:text-left text-center hidden md:block'>
                That’s good for now, you can finish later! We’re really happy
                you’re here :)
              </p>

              <div className='flex justify-center items-start h-full flex-col mt-10 md:mt-0'>
                <button
                  className='text-white border w-full border-black bg-black rounded h-12 welcome-btn leading-6 text-base font-normal my-6 md:px-0 px-5'
                  type='button'
                  placeholder='Password'
                >
                  Get started
                </button>
              </div>
            </div>
          </div>{' '}
        </div>
        <div className='md:w-1/3 xl:w-1/2 w-1/3 flex justify-center items-center'>
          <div className='flex justify-center md:items-start items-end flex-col welcome-form-container'>
            <img
              className='logo welcome-image hidden md:block'
              src='/assets/images/welcome_page_image.png'
              alt='Haven welcome Image'
            />

            <img
              className='logo welcome-image-mobile block md:hidden'
              src='/assets/images/haven_image_group.png'
              alt='Haven welcome Image'
            />
          </div>{' '}
        </div>
      </div>
    </StyledDiv>
  );
};

export default Welcome;
