import { FC } from 'react';
import { useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';

import { logoutUser } from '../../services/slices/userSlice';

import { ProfileMenuUI } from '@ui';

export const ProfileMenu: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login', { replace: true });
  };

  return (
    <ProfileMenuUI
      handleLogout={handleLogout}
      pathname={window.location.pathname}
    />
  );
};
