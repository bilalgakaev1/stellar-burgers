import store from './store';
import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice';
import userReducer from './slices/userSlice';
import ordersReducer from './slices/ordersSlice';
import feedReducer from './slices/feedSlice';
import constructorReducer from './slices/constructorSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  user: userReducer,
  orders: ordersReducer,
  feed: feedReducer,
  burgerConstructor: constructorReducer
});

describe('rootReducer', () => {
  it('rootReducer handles unknown action correctly', () => {
    const sameState = store.getState();
    const state = rootReducer(sameState, { type: 'UNKNOWN_ACTION' });
    expect(state).toBe(sameState);
  });
});