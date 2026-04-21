import { FC } from 'react';
import { useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';

import { selectUser } from '../../services/slices/userSlice';

import { AppHeaderUI } from '@ui';

export const AppHeader: FC = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile', { replace: true });
  };

  const handleFeedClick = () => {
    navigate('/feed', { replace: true });
  };

  const handleConstructorClick = () => {
    navigate('/', { replace: true });
  };

  return (
    <AppHeaderUI
      userName={user?.name || 'Личный кабинет'}
      handleProfileClick={handleProfileClick}
      handleFeedClick={handleFeedClick}
      handleConstructorClick={handleConstructorClick}
    />
  );
};
