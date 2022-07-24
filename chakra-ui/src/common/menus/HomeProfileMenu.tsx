import { Button, Divider, Icon, Menu, MenuItem } from '@material-ui/core';
import { ArrowRightIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLogout } from '../../hooks/users/useLogout';
import { useUserContext } from '../../user/UserContext';

const StyledButton = styled(Button)``;

export interface HomeProfileMenuProps {
  dark?: boolean;
}

const HomeProfileMenu: React.FC<HomeProfileMenuProps> = ({ dark }) => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const { doLogout } = useLogout();
  const [
    profileMenuAnchor,
    setProfileMenuAnchor,
  ] = useState<null | HTMLElement>(null);
  const classes = ['user-button', dark ? 'dark' : 'light'];
  return (
    <>
      {!user && (
        <div className=''>
          <li className='ml-10'>
            <Link to='/login'>Log In</Link>
          </li>
          <li className='ml-3'>
            <Link to='/signup'>
              <button className='rounded-full border-black border px-6 flex justify-center items-center py-1 h-10'>
                <span className='font-bold'>Sign up for free</span>{' '}
                <ArrowRightIcon className='w-3 h-3 ml-2' />{' '}
              </button>
            </Link>
          </li>
        </div>
      )}
      {user && (
        <>
          <StyledButton
            className={classes.join(' ')}
            onClick={(e) => setProfileMenuAnchor(e.currentTarget)}
          >
            <span className='inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-500'>
              <span className='font-medium leading-none text-white'>TW</span>
            </span>
            <Icon color='primary'>arrow_drop_down</Icon>
          </StyledButton>
          <Menu
            id='profile-menu'
            anchorEl={profileMenuAnchor}
            keepMounted
            open={Boolean(profileMenuAnchor)}
            onClose={(e) => setProfileMenuAnchor(null)}
            getContentAnchorEl={null} // https://stackoverflow.com/a/52551100
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem
              onClick={() => {
                setProfileMenuAnchor(null);
                navigate(`/portal/user-profile/`);
              }}
            >
              My Profile
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={() => {
                setProfileMenuAnchor(null);
                navigate(`/liked-opportunities/`);
              }}
            >
              My ❤️ Opportunities
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={() => {
                setProfileMenuAnchor(null);
                doLogout();
                navigate('/');
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </>
      )}
    </>
  );
};

export default HomeProfileMenu;
