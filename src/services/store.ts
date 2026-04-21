import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { createWsMiddleware } from './middleware/wsMiddleware';

import constructorReducer from './slices/constructorSlice';
import ingredientsReducer from './slices/ingredientsSlice';
import userReducer from './slices/userSlice';
import ordersReducer from './slices/ordersSlice';
import feedReducer from './slices/feedSlice';
import feedWebSocketReducer, {
  wsConnecting as feedWsConnecting,
  wsOpen as feedWsOpen,
  wsClose as feedWsClose,
  wsError as feedWsError,
  wsMessage as feedWsMessage
} from './slices/feedWebSocketSlice';
import profileOrdersWsReducer, {
  wsConnecting as profileWsConnecting,
  wsOpen as profileWsOpen,
  wsClose as profileWsClose,
  wsError as profileWsError,
  wsMessage as profileWsMessage
} from './slices/profileOrdersWebSocketSlice';

const feedWsMiddleware = createWsMiddleware({
  connect: 'feedWebSocket/connect',
  disconnect: 'feedWebSocket/disconnect',
  onConnecting: feedWsConnecting,
  onOpen: feedWsOpen,
  onClose: feedWsClose,
  onError: feedWsError,
  onMessage: feedWsMessage
});

const profileWsMiddleware = createWsMiddleware({
  connect: 'profileOrdersWs/connect',
  disconnect: 'profileOrdersWs/disconnect',
  onConnecting: profileWsConnecting,
  onOpen: profileWsOpen,
  onClose: profileWsClose,
  onError: profileWsError,
  onMessage: profileWsMessage
});

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    user: userReducer,
    orders: ordersReducer,
    feed: feedReducer,
    feedWebSocket: feedWebSocketReducer,
    profileOrdersWs: profileOrdersWsReducer,
    burgerConstructor: constructorReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(feedWsMiddleware, profileWsMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
