import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getCookie } from '../../utils/cookie';

import {
  selectProfileWsOrders,
  selectProfileWsConnected
} from '../../services/slices/profileOrdersWebSocketSlice';

import { ProfileOrdersUI } from '@ui-pages';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector(selectProfileWsOrders);
  const isConnected = useSelector(selectProfileWsConnected);

  useEffect(() => {
    const token = getCookie('accessToken')?.replace('Bearer ', '');
    dispatch({
      type: 'profileOrdersWs/connect',
      payload: `${process.env.REACT_APP_WS_URL}/orders?token=${token}`
    });

    return () => {
      dispatch({ type: 'profileOrdersWs/disconnect' });
    };
  }, [dispatch]);

  if (!isConnected && orders.length === 0) return <Preloader />;

  return <ProfileOrdersUI orders={orders} />;
};
