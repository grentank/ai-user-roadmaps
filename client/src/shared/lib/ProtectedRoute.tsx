import type { JSX } from 'react';
import { Navigate, Outlet } from 'react-router';

type ProtectedRoutePropsT = {
  children?: JSX.Element;
  redirectTo?: string;
  isAllowed: boolean;
};

export default function ProtectedRoute({
  children,
  redirectTo = '/',
  isAllowed,
}: ProtectedRoutePropsT): JSX.Element {
  if (!isAllowed) return <Navigate to={redirectTo} replace />;
  return children ?? <Outlet />;
}
