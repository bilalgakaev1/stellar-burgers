import { FC, SyntheticEvent, useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';

import {
  updateUser,
  logoutUser,
  clearError
} from '../../services/slices/userSlice';

import {
  selectUser,
  selectUserLoading,
  selectUserError
} from '../../services/slices/userSlice';

import { ProfileUI } from '@ui-pages';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const isLoading = useSelector(selectUserLoading);
  const updateUserError = useSelector(selectUserError);

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Заполняем форму данными пользователя
  useEffect(() => {
    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  }, [user]);

  const isFormChanged = useMemo(() => {
    if (!user) return false;
    return (
      formValue.name !== user.name ||
      formValue.email !== user.email ||
      !!formValue.password
    );
  }, [formValue, user]);

  useEffect(
    () => () => {
      dispatch(clearError());
    },
    [dispatch]
  );

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const updateData: Partial<{
      name: string;
      email: string;
      password: string;
    }> = {};

    if (formValue.name !== user?.name) updateData.name = formValue.name;
    if (formValue.email !== user?.email) updateData.email = formValue.email;
    if (formValue.password.trim()) updateData.password = formValue.password;

    if (Object.keys(updateData).length > 0) {
      dispatch(updateUser(updateData))
        .unwrap()
        .then(() => {
          // Можно показать уведомление об успехе
          console.log('Данные успешно обновлены');
        })
        .catch((err: any) => {
          console.error('Ошибка при обновлении:', err);
        });
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();

    // Возвращаем форму к исходным данным пользователя
    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: '' // пароль всегда сбрасываем
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValue((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Если пользователь вдруг оказался неавторизован — редирект
  if (!user) {
    navigate('/login', { replace: true });
    return null;
  }

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      updateUserError={updateUserError || undefined}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      handleInputChange={handleInputChange}
    />
  );
};
