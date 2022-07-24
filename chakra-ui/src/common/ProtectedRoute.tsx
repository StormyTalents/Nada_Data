import React from 'react';
import { Navigate, Route, RouteProps, Outlet } from 'react-router-dom';

import { GuardFunction } from '../guards/guard';

type ProtectedRouteProps = RouteProps & {
  guards?: Array<GuardFunction>;

  // Will use to redirect when all guards failed to activate
  // By default it will redirect to `/login`
  redirectTo?: string;
};

function ProtectedRoute(props: ProtectedRouteProps) {
  const { guards = [] } = props;
  const { children } = props;

  const isAllowed = guards.some((guard) => guard().canActivate());
  let accessDeniedPath = '/access-denied';
  if (!isAllowed) {
    return <Navigate to={accessDeniedPath} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
