import {
  BrowserRouter,
  Route,
  useLocation,
  useNavigate,
  Routes,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import React, { useEffect, useLayoutEffect } from 'react';

import AccessDenied from './login/AccessDenied';
import AppThemeProvider from './AppThemeProvider';
import { CssBaseline } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import FaqPage from './faq/FaqPage';
import GuestGuard from './guards/guest.guard';
import HomeAboutPage from './home/HomeAboutPage';
import HomeArticlePage from './home/HomeArticlePage';
import HomeArticlesPage from './home/HomeArticlesPage';
import HomeContactPage from './home/HomeContactPage';
import HomeFaqPage from './home/HomeFaqPage';
import HomeLikedOpportunitiesPage from './home/HomeLikedOpportunitiesPage';
import HomeOpportunitiesPage from './home/HomeOpportunitiesPage';
import HomeOpportunityPage from './home/HomeOpportunityPage';

import HomePage from './home/HomePage';
import HomeSupplierPage from './home/HomeSupplierPage';
import HomeSuppliersPage from './home/HomeSuppliersPage';
import LoginPage from './login/LoginPage';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import OnboardPage from './onboard/OnboardPage';
import PasswordRecover from './login/PasswordRecover';
import PasswordReset from './login/PasswordReset';
import ProtectedRoute from './common/ProtectedRoute';
import { QueryParamProvider } from 'use-query-params';
import SecurePortal from './secure-portal/SecurePortal';
import SelectUser from './login/SelectUser';
import { SessionProvider } from './session/SessionContext';
import SetupCredentialsPage from './setup/SetupCredentialsPage';
import SetupOrganizationInvitePage from './setup/SetupOrganizationInvitePage';
import SetupPage from './setup/SetupPage';
import SetupSupplierPage from './setup/SetupSupplierPage';
import SetupUserTypePage from './setup/SetupUserTypePage';
import SignupPage from './signup/SignupPage';
import TagManager from 'react-gtm-module';
import UserEmailVerificationPage from './user/UserEmailVerificationPage';
import UserGuard from './guards/user.guard';
import UserProvider from './user/UserContext';
import Welcome from './login/Welcome';
import { api } from '@nobrainerlabs/react-material-ui';
import environment from './environments';
import styled from 'styled-components';

const queryClient = new QueryClient();

// Google Tag Manager (global tracking)
const { gtmId } = environment;
TagManager.initialize({
  gtmId,
});

api.setEnvironment(environment);

const StyledApp = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
`;

function App() {
  const ScrollToTop = (props: any) => {
    const location = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);

    return <>{props.children}</>;
  };

  const RouteAdapter = ({ children }: any) => {
    const navigate = useNavigate();
    const location = useLocation();

    const adaptedHistory = React.useMemo(
      () => ({
        replace(location: any) {
          navigate(location, { replace: true, state: location.state });
        },
        push(location: any) {
          navigate(location, { replace: false, state: location.state });
        },
      }),
      [navigate]
    );
    return children({ history: adaptedHistory, location });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>
        <BrowserRouter>
          <ScrollToTop>
            <QueryParamProvider ReactRouterRoute={RouteAdapter}>
              <CssBaseline />
              <UserProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <SessionProvider connect>
                    <StyledApp className='app'>
                      <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/about' element={<HomeAboutPage />} />
                        <Route
                          path='/articles'
                          element={<HomeArticlesPage />}
                        />
                        <Route
                          path='/articles/:id'
                          element={<HomeArticlePage />}
                        />
                        <Route path='/faq' element={<HomeFaqPage />} />
                        <Route path='/contact' element={<HomeContactPage />} />
                        <Route
                          path='/suppliers'
                          element={<HomeSuppliersPage />}
                        />
                        <Route
                          path='/suppliers/:id'
                          element={<HomeSupplierPage />}
                        />
                        <Route
                          path='/opportunities'
                          element={<HomeOpportunitiesPage />}
                        />

                        <Route
                          path='/opportunities/:id' // /:slug? SLUG DIDN'T WORK HERE.
                          element={<HomeOpportunityPage />}
                        />

                        <Route
                          path='/liked-opportunities'
                          element={<HomeLikedOpportunitiesPage />}
                        />

                        <Route path='/signup' element={<SignupPage />} />
                        <Route path='/onboard' element={<SetupPage />} />
                        <Route
                          path='/onboard/:step'
                          element={<OnboardPage />}
                        />

                        <Route path='/setup' element={<SetupPage />} />
                        <Route
                          path='/setup/credentials'
                          element={<SetupCredentialsPage />}
                        />
                        <Route
                          path='/setup/user-type'
                          element={<SetupUserTypePage />}
                        />
                        <Route
                          path='/setup/supplier'
                          element={<SetupSupplierPage />}
                        />
                        <Route
                          path='/setup/organization-invites'
                          element={<SetupOrganizationInvitePage />}
                        />
                        <Route path='/faq' element={<FaqPage />} />
                        <Route
                          path='/access-denied'
                          element={<AccessDenied />}
                        />
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/signup' element={<LoginPage />} />
                        <Route path='/welcome' element={<Welcome />} />
                        <Route path='/select-user' element={<SelectUser />} />
                        <Route
                          path='/invite'
                          element={<UserEmailVerificationPage />}
                        />
                        <Route
                          path='/email-verification'
                          element={<UserEmailVerificationPage />}
                        />

                        <Route
                          element={<ProtectedRoute guards={[UserGuard]} />}
                        >
                          <Route path='/portal/*' element={<SecurePortal />} />
                        </Route>
                        {/* 
                        <ProtectedRoute guards={[UserGuard]}>
                          <Route path='/portal/*' element={<SecurePortal />} />{' '}
                        </ProtectedRoute>
                       
                        <Route
                          path='/portal'
                          element={
                            <ProtectedRoute guards={[GuestGuard]}>
                              {' '}
                              <SecurePortal />
                            </ProtectedRoute>
                          }
                        />*/}

                        <Route
                          element={<ProtectedRoute guards={[UserGuard]} />}
                        >
                          <Route
                            path='/password/recover'
                            element={<PasswordRecover />}
                          />
                        </Route>

                        <Route
                          element={<ProtectedRoute guards={[UserGuard]} />}
                        >
                          <Route
                            path='/password/reset'
                            element={<PasswordReset />}
                          />
                        </Route>
                      </Routes>
                    </StyledApp>
                  </SessionProvider>
                </MuiPickersUtilsProvider>
              </UserProvider>
            </QueryParamProvider>
          </ScrollToTop>
        </BrowserRouter>
      </AppThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
