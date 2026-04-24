import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchOrders } from '../../services/slices/ordersSlice';
import {
  selectOrders,
  selectOrdersLoading,
  selectOrdersError
} from '../../services/slices/ordersSlice';
import { ProfileOrdersUI } from '@ui-pages';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector(selectOrders);
  const isLoading = useSelector(selectOrdersLoading);
  const error = useSelector(selectOrdersError);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (isLoading && orders.length === 0) return <Preloader />;

  if (error)
    return (
      <div className='text text_type_main-medium pt-10'>Ошибка: {error}</div>
    );

  return <ProfileOrdersUI orders={orders} />;
};
