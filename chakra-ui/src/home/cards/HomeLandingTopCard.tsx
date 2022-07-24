import { Form, Formik, FormikValues } from 'formik';
import React, { useRef, useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLogout } from '../../hooks/users/useLogout';
import { UserContext } from '../../user/UserContext';
import { useCreateMailingList } from '../../hooks/mailingList/useCreateMailingList';
import { Instagram, Twitter } from '@material-ui/icons';

const StyledDiv = styled.div`
  background-color: #fbf5f2;

  .top-nav {
    .landing-wrapper {
      background-color: #fbf5f2;
      transition: background 300ms ease-in-out 0s, padding 140ms ease-in-out,
        transform 140ms ease-in-out 140ms;
      z-index: 10;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      line-height: 1;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      pointer-events: none;
      font-size: calc((1 - 1) * 1.2vw + 1rem);
    }

    .landing-wrapper-container {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
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

    .landing-wrapper div,
    .landing-wrapper p {
      font-family: 'Poppins';
    }

    .layout-home-links a {
      font-size: calc((0.8 - 1) * 1.2vw + 1rem);
      line-height: 1.8em;
    }

    .layout-instagram-icon,
    .layout-twitter-icon {
      width: 20px;
      height: 20px;
    }

    .top-bun {
      background-color: #000;
      transform: translatey(-5.5px);
      content: '';
      height: 1px;
      transition: transform 250ms cubic-bezier(0.2, 0.6, 0.3, 1),
        width 250ms cubic-bezier(0.2, 0.6, 0.3, 1);
      will-change: transform, width;
    }

    .patty {
      background-color: #000;
      transform: scale(0);
      content: '';
      height: 1px;
      transition: transform 250ms cubic-bezier(0.2, 0.6, 0.3, 1),
        width 250ms cubic-bezier(0.2, 0.6, 0.3, 1);
      will-change: transform, width;
    }

    .bottom-bun {
      transform: translatey(5.5px);
      background-color: #000;
      content: '';
      height: 1px;
      transition: transform 250ms cubic-bezier(0.2, 0.6, 0.3, 1),
        width 250ms cubic-bezier(0.2, 0.6, 0.3, 1);
      will-change: transform, width;
    }

    #mobile-menu,
    .layout-mobile-active {
      background-color: #fdf0e6;
      transition: visibility 600ms cubic-bezier(0.4, 0, 0.2, 1),
        opacity 400ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .layout-header-menu-nav-item {
      margin: 3vw 5vw;
      transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
      color: #000;
      font-size: 8.5vmin;
    }

    .header-announcement {
      z-index: 2;
      box-sizing: border-box;
      padding-top: 1.2vw;
      padding-bottom: 1.2vw;
      padding-left: 4vw;
      padding-right: 4vw;
      pointer-events: auto;
    }

    .top-bun-close {
      transform: translatex(3.5px) rotate(-135deg);
      width: 28px;
    }

    .patty-close {
      transform: scale(0);
    }

    .bottom-bun-close {
      transform: translatex(3.5px) rotate(135deg);
      width: 28px;
    }

    .burger-close-inner {
      width: 100%;
      height: 100%;
    }

    .burger-box {
      width: 35px;
      height: 35px;
    }

    .burger-inner {
      position: relative;
      display: inline-block;
      cursor: pointer;
      background-color: transparent;
      border: none;
    }

    .burger--active .top-bun {
      transform: translatex(3.5px) rotate(-135deg);
      width: 28px;
    }

    .burger--active .patty {
      transform: scale(0);
    }

    .burger--active .bottom-bun {
      transform: translatex(3.5px) rotate(135deg);
      width: 28px;
    }
  }
`;
const HomeLandingTopCard: React.FC = (props) => {
  const { children } = props;
  const formikRef = useRef<FormikValues>();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
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

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
  }
  return (
    <StyledDiv>
      <div
        className={
          showMobileMenu
            ? 'layout-mobile-active fixed inset-0'
            : 'relative landing-wrapper'
        }
      >
        <nav className='top-nav'>
          <div className='header-announcement relative w-full'>
            <div className='relative h-16 flex items-center justify-between '>
              <div className='flex items-center'>
                <div className='logo'>
                  <Link to='/'>
                    <img
                      className='max-h-7 md:max-h-full'
                      style={{ height: 40 }}
                      src='/assets/images/logo_haven_landing.png'
                    />{' '}
                  </Link>
                </div>
              </div>

              <div className='burger-box relative justify-center items-center flex xl:hidden'>
                <button
                  type='button'
                  className={classNames(
                    showMobileMenu ? 'burger--active' : '',
                    'header-burger menu-overlay-has-visible-non-navigation-items w-full h-full'
                  )}
                  aria-controls='mobile-menu'
                  aria-expanded='false'
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                >
                  <span className='sr-only'>Open main menu </span>

                  <div className='top-bun top-0 left-0 bottom-0 absolute w-full m-auto block'></div>
                  <div className='patty top-0 left-0 bottom-0 absolute w-full m-auto block'></div>
                  <div className='bottom-bun top-0 left-0 bottom-0 absolute w-full m-auto block'></div>
                </button>
              </div>

              <div className='hidden lg:block lg:ml-auto'>
                <div className='flex items-center layout-home-links'>
                  <Link to='/' className='text-light tracking-normal mr-2'>
                    <p
                      className='underline'
                      style={{ textUnderlineOffset: '8px' }}
                    >
                      Home
                    </p>
                  </Link>

                  <Link to='/'>
                    <Instagram className='layout-instagram-icon mx-6' />
                  </Link>
                  <Link to='/'>
                    <Twitter className='layout-twitter-icon' />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {showMobileMenu && (
            <div
              className='min-h-screen z-50  border-b border-gray-200 lg:hidden flex flex-col justify-evenly items-center absolute w-full '
              id='mobile-menu'
            >
              <div className='flex flex-col justify-evenly items-center h-full '>
                <div className='layout-header-menu-nav-item relative block bg-transparent opacity-100'>
                  <Link
                    className='font-light leading-normal tracking-normal'
                    to='/'
                  >
                    Home
                  </Link>
                </div>

                <div className='block lg:hidden lg:ml-auto absolute bottom-20'>
                  <div className='flex items-center layout-home-links'>
                    <Instagram className='layout-instagram-icon mx-6' />
                    <Twitter className='layout-twitter-icon' />
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* content goes here */}
        <div className={'landing-page relative z-0'}>{children}</div>
      </div>
    </StyledDiv>
  );
};

export default HomeLandingTopCard;
