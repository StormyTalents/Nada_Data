import {
  AppBar,
  Drawer,
  Icon,
  IconButton,
  Theme,
  Toolbar,
  useMediaQuery,
} from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import Helmet from 'react-helmet';
import {
  Link,
  Route,
  useNavigate,
  Navigate,
  useLocation,
  Routes,
} from 'react-router-dom';
import styled from 'styled-components';

import OrganizationButtonMenu from '../common/menus/OrganizationButtonMenu';
import ProfileButtonMenu from '../common/menus/ProfileButtonMenu';
import ContentAdminDetailPage from '../content/ContentAdminDetailPage';
import ContentAdminListPage from '../content/ContentAdminListPage';
import MailingListPage from '../mailing-list/MailingListPage';
import NavThemeProvider from '../NavThemeProvider';
import OpportunityDetailPage from '../opportunity/OpportunityDetailPage';
import OpportunityListPage from '../opportunity/OpportunityListPage';
import OrganizationAdminDetailPage from '../organization/OrganizationAdminDetailPage';
import OrganizationAdminListPage from '../organization/OrganizationAdminListPage';
import OrganizationDetailPage from '../organization/OrganizationDetailPage';
import SourceAdminDetailPage from '../source/SourceAdminDetailPage';
import SourceAdminListPage from '../source/SourceAdminListPage';
import CertificationAdminDetailPage from '../certification/CertificationAdminDetailPage';
import CertificationAdminListPage from '../certification/CertificationAdminListPage';
import UserOrganizationDetailPage from '../user-organization/UserOrganizationDetailPage';
import UserOrganizationListPage from '../user-organization/UserOrganizationListPage';
import { useUserContext } from '../user/UserContext';
import UserDetailPage from '../user/UserDetailPage';
import UserListPage from '../user/UserListPage';
import UserProfilePage from '../user/UserProfilePage';
import NavigationList from './NavigationList';

import IndustrycodeAdminDetailPage from '../industrycode/IndustrycodeAdminDetailPage';
import IndustrycodeAdminListPage from '../industrycode/IndustrycodeAdminListPage';
import ContenttypeAdminListPage from '../contenttype/ContenttypeAdminListPage';
import ContenttypeAdminDetailPage from '../contenttype/ContenttypeAdminDetailPage';

const StyledSecurePortal = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  nav {
    display: flex;
    flex-direction: column;
    z-index: 0;
    &.nav-close {
      transition-property: margin-left;
      transition-duration: ${(props) =>
        props.theme.transitions.duration.leavingScreen}ms;
      transition-timing-function: ${(props) =>
        props.theme.transitions.easing.sharp};
      margin-left: -260px;
      /* margin-left: -242px; */
    }
    &.nav-open {
      transition-property: margin-left;
      transition-duration: ${(props) =>
        props.theme.transitions.duration.enteringScreen}ms;
      transition-timing-function: ${(props) =>
        props.theme.transitions.easing.easeOut};
      margin-left: 0;
    }
    ${(props) => props.theme.breakpoints.down('md')} {
      &.nav-close {
        margin-left: 0;
      }
    }
  }
  main {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    flex: 1;
    z-index: 1;
  }
`;

const StyledDrawer = styled(Drawer)`
  width: 260px;
  .paper {
    width: 260px;
  }
  .logo {
    width: 180px;
  }
`;

const StyledNavAppBar = styled(AppBar)``;

const StyledMainAppBar = styled(AppBar)`
  /* background-color: #fff; */
  .flex {
    flex: 1;
  }
  .logo {
    width: 180px;
  }
`;

const useNavOpen = (
  isAboveMediumSize: boolean
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  // hide the navigation if member has not signed an agreement
  const [isNavOpen, setIsNavOpen] = useState(isAboveMediumSize);
  const previousIsAboveMediumSizeRef = useRef(isAboveMediumSize);
  // only force nav open/close when a breakpoint change occurs
  if (isAboveMediumSize !== previousIsAboveMediumSizeRef.current) {
    if (!isNavOpen && isAboveMediumSize) {
      setIsNavOpen(true);
    } else if (isNavOpen && !isAboveMediumSize) {
      setIsNavOpen(false);
    }
  }
  useEffect(() => {
    // Store the previous breakpoint change
    previousIsAboveMediumSizeRef.current = isAboveMediumSize;
  }, [isAboveMediumSize]);

  return [isNavOpen, setIsNavOpen];
};

const SecurePortal: React.FC = () => {
  const { user } = useUserContext();
  const isAdmin = user?.roles?.some((r) => r.name === 'Admin');
  const isAboveMediumSize = useMediaQuery<Theme>(
    (theme) => theme.breakpoints.up('lg'),
    { noSsr: true } // prevents 2 render calls on load
  );

  const showNav =
    Boolean(user?.userOrganizations?.length) && user?.isPasswordSet; // hide nav if setting up user
  const [isNavOpen, setIsNavOpen] = useNavOpen(isAboveMediumSize);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleNavigationItemClick = () => {
    if (!isAboveMediumSize) {
      setIsNavOpen(false);
    }
  };

  if (!user?.isPasswordSet) {
    // The user's password is not set, so setup the user
    return <Navigate to='/setup' />;
  } else if (
    !isAdmin &&
    user?.isPasswordSet &&
    !location.pathname.includes('/portal')
  ) {
    return <Navigate to='/portal/opportunities' />;
    // } else if (
    //   !isAdmin && (!user?.userOrganizations || user.userOrganizations.length === 0)
    // ) {
    //   // user is not assigned an organization
    //   return <Redirect to='/customer-service' />;
  } else if (location.pathname.replace(/\//g, '') === 'portal') {
    if (isAdmin) {
      // if navigating to /portal, redirect to customers section for admins
      return <Navigate to='/portal/organizations' />;
    } else if (user?.userOrganizations?.length) {
      return <Navigate to='/portal/opportunities' />;
    } else {
      return <Navigate to='/setup' />;
    }
  }

  return (
    <StyledSecurePortal>
      <Helmet titleTemplate='Haven Project | %s' defaultTitle='Haven Project' />
      {showNav && (
        <nav className={isNavOpen ? 'nav-open' : 'nav-close'}>
          <NavThemeProvider>
            <StyledDrawer
              variant={isAboveMediumSize ? 'persistent' : 'temporary'}
              anchor='left'
              open={isNavOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: 'paper',
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              <StyledNavAppBar
                position='static'
                style={{ background: '#385348' }}
              >
                <Toolbar>
                  <Link to='/'>
                    <img
                      src={'/assets/images/logo.png'}
                      alt='Haven Project'
                      width='40px'
                      height='40px'
                      style={{
                        marginTop: 14,
                        marginBottom: 14,
                      }}
                    />
                  </Link>
                </Toolbar>
              </StyledNavAppBar>
              <NavigationList
                onNavigationItemClicked={handleNavigationItemClick}
              />
            </StyledDrawer>
          </NavThemeProvider>
        </nav>
      )}
      <main>
        <StyledMainAppBar position='static' color='transparent'>
          <Toolbar>
            {showNav && (
              <IconButton
                color='primary'
                aria-label='open drawer'
                edge='start'
                onClick={handleDrawerToggle}
              >
                <Icon>menu</Icon>
              </IconButton>
            )}
            {(!showNav || !isNavOpen) && (
              <Link to='/'>
                <img
                  src={'/assets/images/logo-circle.png'}
                  alt='Haven Project'
                  style={{ height: '36px' }}
                />
              </Link>
            )}
            <span className='flex'></span>
            <OrganizationButtonMenu />
            <ProfileButtonMenu dark />
          </Toolbar>
        </StyledMainAppBar>
        <Routes>
          <Route path='my-company' element={<OrganizationDetailPage />} />
          <Route path='team' element={<UserOrganizationListPage />} />
          <Route
            path='team/:userOrganizationId'
            element={<UserOrganizationDetailPage />}
          />

          <Route path='mailing-list' element={<MailingListPage />} />

          <Route path='sources' element={<SourceAdminListPage />} />
          <Route path='sources/:sourceId' element={<SourceAdminDetailPage />} />

          <Route
            path='certifications'
            element={<CertificationAdminListPage />}
          />
          <Route
            path='certifications/:certificationId'
            element={<CertificationAdminDetailPage />}
          />

          <Route path='industrycodes' element={<IndustrycodeAdminListPage />} />
          <Route
            path='industrycodes/:industrycodeId'
            element={<IndustrycodeAdminDetailPage />}
          />

          <Route path='organizations' element={<OrganizationAdminListPage />} />
          <Route
            path='organizations/:organizationId'
            element={<OrganizationAdminDetailPage />}
          />
          <Route path='opportunities' element={<OpportunityListPage />} />
          <Route
            path='opportunities/:opportunityId'
            element={<OpportunityDetailPage />}
          />
          <Route path='users' element={<UserListPage />} />
          <Route path='users/:userId' element={<UserDetailPage />} />
          <Route path='user-profile' element={<UserProfilePage />} />
          <Route path='contents' element={<ContentAdminListPage />} />
          <Route
            path='contents/:contentId'
            element={<ContentAdminDetailPage />}
          />

          <Route path='contenttypes' element={<ContenttypeAdminListPage />} />
          <Route
            path='contenttypes/:contenttypeId'
            element={<ContenttypeAdminDetailPage />}
          />
        </Routes>
      </main>
    </StyledSecurePortal>
  );
};
export default SecurePortal;
