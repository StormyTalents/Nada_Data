import { Button, Icon, Menu, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLogout } from '../../hooks/users/useLogout';
import { useUserContext } from '../../user/UserContext';

const StyledButton = styled(Button)`
  font-family: 'Poppins';
  font-weight: 500;
  font-size: 14px;
  &.dark {
    color: #000;
  }
  &.light {
    color: #fff;
  }
`;

export interface ProfileButtonMenuProps {
  dark?: boolean;
}

const ProfileButtonMenu: React.FC<ProfileButtonMenuProps> = ({ dark }) => {
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
      <StyledButton
        className={classes.join(' ')}
        onClick={(e) => setProfileMenuAnchor(e.currentTarget)}
      >
        {`${user?.firstName} ${user?.lastName}`}
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
        {Boolean(user?.userOrganizations?.length) ? (
          <MenuItem
            onClick={() => {
              setProfileMenuAnchor(null);
              navigate(`/portal/opportunities/`);
            }}
          >
            My Opportunities
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => {
              setProfileMenuAnchor(null);
              navigate(`/setup/organization`);
            }}
          >
            Become a Supplier
          </MenuItem>
        )}
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
  );
};

export default ProfileButtonMenu;
