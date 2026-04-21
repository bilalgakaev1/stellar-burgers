import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { RootState } from '../store';

import { TWsMessagePayload } from './feedWebSocketSlice';

type TProfileWsState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isConnected: boolean;
  error: string | null;
};

const initialState: TProfileWsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isConnected: false,
  error: null
};

const profileOrdersWsSlice = createSlice({
  name: 'profileOrdersWs',
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
  profileOrdersWsSlice.actions;

export default profileOrdersWsSlice.reducer;

export const selectProfileWsOrders = (state: RootState) =>
  state.profileOrdersWs.orders;
export const selectProfileWsConnected = (state: RootState) =>
  state.profileOrdersWs.isConnected;
