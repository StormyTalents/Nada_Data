import {
  Button,
  ButtonBase,
  Drawer,
  lighten,
  Theme,
  useMediaQuery,
} from '@material-ui/core';
import { AppSnackbar } from '@nobrainerlabs/react-material-ui';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useCreateMailingList } from '../hooks/mailingList/useCreateMailingList';
import { useUserContext } from '../user/UserContext';
import ProfileButtonMenu from './menus/ProfileButtonMenu';

const StyledDiv = styled.div`
  display: flex;
  white-space: nowrap;
  align-items: center;
  padding: 32px 24px;
  &.light {
    .mailing-list-label,
    .input-base,
    .header-right a {
      color: #fff;
    }
  }
  &.dark {
    .header-right a {
      color: #000;
    }
  }
  .header-left {
    padding-right: 32px;
    .logo {
      height: 38px;
      width: 80px;
    }
  }
  .header-middle {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    .mailing-list-label {
      margin-right: 12px;
    }
    .form {
      display: flex;
      border: solid 1px ${(p) => p.theme.palette.primary.light};
      border-radius: 4px;
      padding: 6px 8px;
      max-width: 326px;
      min-width: 240px;
      width: 100%;
      .input-base {
        flex: 1;
      }
    }
  }
  .header-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 1;
    /* max-width: 360px; */
    a {
      text-transform: uppercase;
      /* flex: 1; */
      margin: 0 12px;
      &:hover {
        color: ${(p) => lighten(p.theme.palette.secondary.main, 0.5)};
      }
    }
    .wave-pattern {
      /* margin-left: 24px; */
      width: 32px;
    }
  }
  ${(props) => props.theme.breakpoints.down('lg')} {
    .header-middle {
      .mailing-list-label,
      .form {
        display: none;
      }
    }
  }
  ${(props) => props.theme.breakpoints.down('sm')} {
  }
`;

const StyledDrawerContainer = styled.div`
  width: 300px;
  height: 100%;
  background: #ecf1f4;
  display: flex;
  flex-direction: column;
  padding: 32px;
  a {
    margin-bottom: 24px;
  }
`;

export interface SiteHeaderProps {
  dark?: boolean;
}

/**
 * The site header for all pages
 */
const SiteHeader: React.FC<SiteHeaderProps> = ({ dark }) => {
  const { user } = useUserContext();
  const { createdMailingList, isCreating, emailError, createMailingList } =
    useCreateMailingList();
  const [inputEmail, setInputEmail] = useState('');
  const [openDrawer, setOpenDrawer] = useState(false);
  const classes = ['site-header', dark ? 'dark' : 'light'];
  const isAboveMediumSize = useMediaQuery<Theme>(
    (theme) => theme.breakpoints.up('sm'),
    { noSsr: true } // prevents 2 render calls on load
  );
  return (
    <StyledDiv className={classes.join(' ')}>
      <div className="header-left">
        <Link to="/">
          <img
            src={
              dark
                ? '/assets/images/logo-circle.png'
                : '/assets/images/logo-circle.png'
            }
            alt="Logo"
            className="logo"
          />
        </Link>
      </div>
      {/* <div className='header-middle'>
        <Typography variant='body2' className='mailing-list-label'>
          Join mailing list
        </Typography>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={Yup.object().shape({
            email: Yup.string().trim().email('Invalid email.')
          })}
          onSubmit={() => {
            console.log('onSubmit');
            createMailingList({ email: inputEmail });
            setInputEmail('');
          }}
        >
          <Form className='form'>
            <InputBase
              id='email'
              name='email'
              type='email'
              className='input-base'
              placeholder='Email address'
              onChange={event => setInputEmail(event.target.value)}
              value={inputEmail}
            />
            <div className='subscribe'>
              <Button
                type='submit'
                className='button'
                size='small'
                variant='contained'
                color='primary'
                disabled={isCreating}
                // endIcon={isCreating && <CircularProgress size={16} />}
              >
                SUBSCRIBE
              </Button>
            </div>
          </Form>
        </Formik>
      </div> */}
      <div className="header-right">
        {isAboveMediumSize ? (
          <>
            <Button component={Link} to="/faq">
              FAQ
            </Button>
            <Button component={Link} to="/faq">
              Raise Funding
            </Button>
            {user ? (
              <ProfileButtonMenu dark={dark} />
            ) : (
              <>
                <Button
                  component={Link}
                  variant="outlined"
                  color="secondary"
                  to="/login"
                >
                  Log In
                </Button>
                <Button
                  component={Link}
                  variant="contained"
                  color="secondary"
                  to="/signup"
                >
                  Sign Up
                </Button>
              </>
            )}
          </>
        ) : (
          <>
            <ButtonBase onClick={() => setOpenDrawer(true)}>
              <img
                src="/assets/patterns/wave-light.svg"
                alt="wave"
                className="wave-pattern"
              />
            </ButtonBase>
            <Drawer
              anchor="right"
              open={openDrawer}
              onClose={() => setOpenDrawer(false)}
            >
              <StyledDrawerContainer>
                <Button component={Link} to="/faq">
                  FAQ
                </Button>
                <Button component={Link} to="/faq">
                  Raise Funding
                </Button>
                {user ? (
                  <ProfileButtonMenu dark />
                ) : (
                  <>
                    <Button
                      component={Link}
                      variant="outlined"
                      color="secondary"
                      to="/login"
                    >
                      Log In
                    </Button>
                    <Button
                      component={Link}
                      variant="contained"
                      color="secondary"
                      to="/signup"
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </StyledDrawerContainer>
            </Drawer>
          </>
        )}
      </div>
      {emailError && (
        <AppSnackbar severity="error" open>
          {emailError && emailError.message === 'Invalid Email'
            ? emailError.message
            : 'Network Error. Try again later.'}
        </AppSnackbar>
      )}
      {createdMailingList && (
        <AppSnackbar severity="success" open>
          Thank you for signing up!
        </AppSnackbar>
      )}
    </StyledDiv>
  );
};

export default SiteHeader;
