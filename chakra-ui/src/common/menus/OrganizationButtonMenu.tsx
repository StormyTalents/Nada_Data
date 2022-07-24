import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import {
  Button,
  Icon,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { useUpdateUserActiveOrganization } from '../../hooks/users/useUpdateUserActiveOrganization';
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

const OrganizationButtonMenu: React.FC = () => {
  const { user, refreshUser } = useUserContext();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const classes = ['organization-button'];

  const {
    updateUserActiveOrganization,
    updatedUserActiveOrganization,
    isUpdating,
    error,
  } = useUpdateUserActiveOrganization(user?.id || 0);

  function switchOrganization(organizationId: number) {
    updateUserActiveOrganization({ organizationId });
  }

  useEffect(() => {
    if (!isUpdating && updatedUserActiveOrganization) {
      refreshUser();
      navigate(
        `/portal/organizations/${updatedUserActiveOrganization.activeUserOrganizationId}`
      );
    }
  }, [updatedUserActiveOrganization, navigate, user, isUpdating]);

  return user?.userOrganizations && user.userOrganizations.length > 0 ? (
    <>
      <StyledButton
        className={classes.join(' ')}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        {user?.activeUserOrganization?.organization?.name}
        <Icon color='primary'>arrow_drop_down</Icon>
      </StyledButton>
      <Menu
        id='organization-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={(e) => setAnchorEl(null)}
        getContentAnchorEl={null} // https://stackoverflow.com/a/52551100
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {user?.userOrganizations?.map((userOrganization) => (
          <MenuItem
            key={userOrganization.id}
            onClick={() => {
              setAnchorEl(null);
              updateUserActiveOrganization({
                organizationId: userOrganization.organizationId,
              });
            }}
          >
            {user?.activeUserOrganization?.id === userOrganization.id && (
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
            )}
            <ListItemText primary={userOrganization.organization.name} />
          </MenuItem>
        ))}
      </Menu>
    </>
  ) : (
    <>{/* Display nothing */}</>
  );
};

export default OrganizationButtonMenu;
