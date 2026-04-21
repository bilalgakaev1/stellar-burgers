import { FC, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { getOrderByNumberApi } from '@api';
import { useState } from 'react';
import { TOrder } from '@utils-types';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  // Данные заказа из WebSocket (лента) или из профиля
  const wsOrders = useSelector((state) => state.feedWebSocket.orders);
  const profileOrders = useSelector((state) => state.profileOrdersWs.orders);

  const [orderData, setOrderData] = useState<TOrder | null>(null);

  useEffect(() => {
    if (!number) return;

    // Сначала ищем в уже загруженных заказах
    const found =
      wsOrders.find((o) => o.number === Number(number)) ||
      profileOrders.find((o) => o.number === Number(number));

    if (found) {
      setOrderData(found);
    } else {
      // Если не нашли — запрашиваем по номеру напрямую
      getOrderByNumberApi(Number(number)).then((data) => {
        if (data.orders.length) setOrderData(data.orders[0]);
      });
    }
  }, [number, wsOrders, profileOrders]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = { ...ingredient, count: 1 };
          }
        } else {
          acc[item].count++;
        }
        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return { ...orderData, ingredientsInfo, date, total };
  }, [orderData, ingredients]);

  if (!orderInfo) return <Preloader />;

  return <OrderInfoUI orderInfo={orderInfo} />;
};
