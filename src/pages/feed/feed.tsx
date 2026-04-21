import { FC, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from '../../services/store';

import {
  selectWsOrders,
  selectWsConnected
} from '../../services/slices/feedWebSocketSlice';

import { FeedUI } from '@ui-pages';
import { Preloader } from '@ui';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector(selectWsOrders);
  const isConnected = useSelector(selectWsConnected);

  useEffect(() => {
    dispatch({
      type: 'feedWebSocket/connect',
      payload: `${process.env.REACT_APP_WS_URL}/orders/all`
    });

    return () => {
      dispatch({ type: 'feedWebSocket/disconnect' }); // отключаем при размонтировании
    };
  }, [dispatch]);

  if (!isConnected && orders.length === 0) return <Preloader />;

  const handleGetFeeds = () => {
    dispatch({
      type: 'feedWebSocket/connect',
      payload: `${process.env.REACT_APP_WS_URL}/orders/all`
    });
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
