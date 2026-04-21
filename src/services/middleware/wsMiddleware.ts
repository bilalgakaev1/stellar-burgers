import {
  Middleware,
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload
} from '@reduxjs/toolkit';

import { TOrder } from '@utils-types';

type TWsMessage = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

type TWsActions = {
  connect: string;
  disconnect: string;
  onConnecting: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<any>;
};

export const createWsMiddleware =
  (actions: TWsActions): Middleware =>
  (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action: unknown) => {
      const typedAction = action as { type: string; payload?: string };

      if (typedAction.type === actions.connect) {
        const url = typedAction.payload;
        socket = new WebSocket(url!);
        store.dispatch(actions.onConnecting());

        socket.onopen = () => store.dispatch(actions.onOpen());
        socket.onclose = () => store.dispatch(actions.onClose());
        socket.onerror = () =>
          store.dispatch(actions.onError('WebSocket error'));
        socket.onmessage = (event) => {
          const data: TWsMessage = JSON.parse(event.data);
          store.dispatch(actions.onMessage(data));
        };
      }

      if (typedAction.type === actions.disconnect) {
        socket?.close();
        socket = null;
      }

      return next(action);
    };
  };
