import React from 'react';

import {
  Card,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon
} from '@material-ui/core';
import { CardTitle } from '@nobrainerlabs/react-material-ui';

import { useFindRoles } from '../../hooks/users/useFindRoles';
import { useFindUser } from '../../hooks/users/useFindUser';
import { useUpdateUser } from '../../hooks/users/useUpdateUser';
import { Role, roleLabels } from '../../interfaces/User';

export interface UserRoleCardProps {
  userId: number;
}

const UserRoleCard: React.FC<UserRoleCardProps> = ({ userId }) => {
  const { roles } = useFindRoles(true);
  const { updatedUser, updateUser } = useUpdateUser(userId);
  const {
    user: origUser,
    isLoading: isLoadingInitialValues,
    error: findError
  } = useFindUser(userId, true);

  const user = updatedUser ? updatedUser : origUser; // initial user versus getting user from patch() response
  return (
    <Card>
      <CardTitle>
        <Icon>group</Icon>
        Role Assignments
      </CardTitle>
      <List>
        {roles?.map(role => (
          <ListItem key={role.id} dense button onClick={() => {}}>
            <ListItemIcon>
              <Checkbox
                edge='start'
                disableRipple
                color='primary'
                checked={
                  user?.roles?.find(g => g.id === role.id) ? true : false
                }
                onChange={event => {
                  if (event.target.checked) {
                    user?.roles?.push(role);
                  } else {
                    const filtered =
                      user &&
                      user.roles &&
                      user.roles.filter(g => {
                        return g.id !== role.id;
                      });

                    if (user && user.roles && filtered) {
                      user.roles = filtered as Role[];
                    }
                  }
                  updateUser(user);
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={roleLabels.find(r => r.name === role.name)?.label}
            />
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default UserRoleCard;
