import {
  Icon,
  List,
  ListItemIcon,
  ListItemText,
  Typography,
  ListItemProps,
  ListItem,
} from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { OpportunityStatus } from '../interfaces/Opportunity';
import { OrganizationType } from '../organization/organization.interface';
import { UserOrganizationRole } from '../interfaces/UserOrganization';
import styled from 'styled-components';
import { useFindOpportunityCountByStatuses } from '../hooks/opportunities/useFindOpportunityCountByStatuses';
import { useUserContext } from '../user/UserContext';

export interface NavigationItem {
  icon: JSX.Element;
  label: string;
  path: string;
  userOrganizationRoles?: UserOrganizationRole[];
}
const StyledList = styled(List)`
  overflow: auto;
`;

const StyledListItem = styled(ListItem)`
  padding: 10px 16px;
` as typeof ListItem;

export interface NavigationListProps {
  onNavigationItemClicked?: (item: NavigationItem) => void;
}

const NavigationList: React.FC<NavigationListProps> = (props) => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const isAdmin = user?.roles?.some((r) => r.name === 'Admin');
  const { onNavigationItemClicked } = props;
  const handleItemClick = (item: NavigationItem) => {
    if (onNavigationItemClicked) {
      onNavigationItemClicked(item);
    }
  };
  const [open, setOpen] = useState(true);
  const {
    findOpportunityCountByStatuses,
    loadingOpportunityCountByStatuses,
    opportunityCountByStatuses,
  } = useFindOpportunityCountByStatuses();

  function getOpportunityCountByStatus(status?: OpportunityStatus) {
    if (loadingOpportunityCountByStatuses) {
      return '...';
    } else {
      const found = opportunityCountByStatuses?.find(
        (item) => item.status === status
      )?.count;
      if (found) {
        return Number(found).toLocaleString('en-US');
      }
      return 0;
    }
  }

  useEffect(() => {
    findOpportunityCountByStatuses();
  }, []);

  const mainNavigationList: NavigationItem[] = [
    {
      icon: <Icon color='primary'>folder</Icon>,
      label: 'Opportunities',
      path: '/portal/opportunities',
    },
    {
      icon: <Icon color='primary'>business</Icon>,
      label: 'Company Profile',
      path: `/portal/organizations/${user?.activeUserOrganizationId}`,
    },
    {
      icon: <Icon color='primary'>group</Icon>,
      label: 'Team Management',
      path: `/portal/team`,
      userOrganizationRoles: [UserOrganizationRole.Admin],
    },
  ];

  const adminNavigationList: NavigationItem[] = [
    {
      icon: <Icon color='primary'>person</Icon>,
      label: 'Users',
      path: '/portal/users',
    },
    {
      icon: <Icon color='primary'>business</Icon>,
      label: 'Organizations',
      path: '/portal/organizations',
    },
    {
      icon: <Icon style={{ marginLeft: 10 }} color='primary'></Icon>,
      label: `Buyers`,
      path: `/portal/organizations?type=${OrganizationType.Buyer}`,
    },
    {
      icon: <Icon style={{ marginLeft: 10 }} color='primary'></Icon>,
      label: `Suppliers`,
      path: `/portal/organizations?type=${OrganizationType.Supplier}`,
    },
    {
      icon: <Icon color='primary'>folder_open</Icon>,
      label: 'All Opportunities',
      path: '/portal/opportunities',
    },
    {
      icon: <Icon style={{ marginLeft: 10 }} color='primary'></Icon>,
      label: `${getOpportunityCountByStatus(
        OpportunityStatus.Pending
      )} Pending`,
      path: '/portal/opportunities?status=Pending',
    },
    {
      icon: <Icon style={{ marginLeft: 10 }} color='primary'></Icon>,
      label: `${getOpportunityCountByStatus(
        OpportunityStatus.Reviewing
      )} Reviewing`,
      path: '/portal/opportunities?status=Reviewing',
    },
    {
      icon: <Icon style={{ marginLeft: 10 }} color='primary'></Icon>,
      label: `${getOpportunityCountByStatus(
        OpportunityStatus.Published
      )} Published`,
      path: '/portal/opportunities?status=Published',
    },
    {
      icon: <Icon style={{ marginLeft: 10 }} color='primary'></Icon>,
      label: `${getOpportunityCountByStatus(
        OpportunityStatus.Cancelled
      )} Cancelled`,
      path: '/portal/opportunities?status=Cancelled',
    },
    {
      icon: <Icon color='primary'>view_quilt</Icon>,
      label: 'All Sources',
      path: '/portal/sources',
    },
    {
      icon: <Icon color='primary'>view_quilt</Icon>,
      label: 'All Certifications',
      path: '/portal/certifications',
    },
    {
      icon: <Icon color='primary'>view_quilt</Icon>,
      label: 'All Industry Codes',
      path: '/portal/industrycodes',
    },
    {
      icon: <Icon color='primary'>folder_open</Icon>,
      label: 'All Content',
      path: '/portal/contents',
    },
    {
      icon: <Icon style={{ marginLeft: 10 }} color='primary'></Icon>,
      label: 'All Blog Posts',
      path: '/portal/contents?type=Blog',
    },
    {
      icon: <Icon style={{ marginLeft: 10 }} color='primary'></Icon>,
      label: 'All Articles',
      path: '/portal/contents?type=Articles',
    },
    {
      icon: <Icon style={{ marginLeft: 10 }} color='primary'></Icon>,
      label: 'All Events',
      path: '/portal/contents?type=Events',
    },

    {
      icon: <Icon color='primary'>email</Icon>,
      label: 'Mailing List',
      path: '/portal/mailing-list',
    },
  ];
  const StyledListItem = (props: ListItemProps<'div', any>) => (
    <ListItem
      key={props.path}
      button
      component={props.NavLink}
      to={props.path}
      activeClassName='active'
      onClick={() => handleItemClick(props.item)}
    >{`${props.children}`}</ListItem>
  );

  return (
    <Fragment>
      <StyledList dense>
        <ListItem>
          <Typography variant='overline' color='textPrimary'>
            Main
          </Typography>
        </ListItem>
        {mainNavigationList
          .filter(
            (item) =>
              !item?.userOrganizationRoles ||
              (user?.activeUserOrganization?.role &&
                item.userOrganizationRoles.includes(
                  user?.activeUserOrganization.role
                ))
          )
          .map((item) => (
            <ListItem
              key={item.path}
              button
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant='body1' color='textPrimary'>
                    {item.label}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        {isAdmin && (
          <>
            <ListItem>
              <Typography variant='overline' color='textPrimary'>
                Admin
              </Typography>
            </ListItem>
            {adminNavigationList.map((item) => (
              <ListItem
                key={item.path}
                button
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant='body1' color='textPrimary'>
                      {item.label}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </>
        )}
      </StyledList>
    </Fragment>
  );
};

export default NavigationList;
