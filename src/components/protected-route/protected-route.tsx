import { FC, ReactNode } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useSelector } from '../../services/store';

import {
  selectUser,
  selectIsAuthChecked
} from '../../services/slices/userSlice';
import { Preloader } from '@ui';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
};

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  onlyUnAuth = false
}) => {
  const user = useSelector(selectUser);
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth) {
    return user ? (
      <Navigate to='/' replace state={{ from: location }} />
    ) : (
      <Outlet />
    );
  }

  return user ? (
    <Outlet />
  ) : (
    <Navigate to='/login' replace state={{ from: location }} />
  );
};
