import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { RootState } from '../store';

type TFeedWebSocketState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isConnected: boolean;
  error: string | null;
};

export type TWsMessagePayload = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

const initialState: TFeedWebSocketState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isConnected: false,
  error: null
};

const feedWebSocketSlice = createSlice({
  name: 'feedWebSocket',
  initialState,
  reducers: {
    wsConnecting: (state) => {
      state.isConnected = false;
    },
    wsOpen: (state) => {
      state.isConnected = true;
      state.error = null;
    },
    wsClose: (state) => {
      state.isConnected = false;
    },
    wsError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isConnected = false;
    },
    wsMessage: (state, action: PayloadAction<TWsMessagePayload>) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    }
  }
});

export const { wsConnecting, wsOpen, wsClose, wsError, wsMessage } =
  feedWebSocketSlice.actions;

export default feedWebSocketSlice.reducer;

// Селекторы
export const selectWsOrders = (state: RootState) => state.feedWebSocket.orders;
export const selectWsTotal = (state: RootState) => state.feedWebSocket.total;
export const selectWsTotalToday = (state: RootState) =>
  state.feedWebSocket.totalToday;
export const selectWsConnected = (state: RootState) =>
  state.feedWebSocket.isConnected;
