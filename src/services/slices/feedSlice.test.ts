import feedReducer, { fetchFeeds } from './feedSlice';

const mockFeeds = {
  success: true,
  orders: [
    {
      _id: '1',
      name: 'Test Order',
      number: 12345,
      status: 'done',
      ingredients: [],
      createdAt: '',
      updatedAt: ''
    }
  ],
  total: 100,
  totalToday: 10
};

describe('feedSlice', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isLoading: false,
    error: null
  };

  it('should return the initial state', () => {
    expect(feedReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchFeeds.pending', () => {
    const state = feedReducer(initialState, fetchFeeds.pending(''));
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchFeeds.fulfilled', () => {
    const state = feedReducer(
      initialState,
      fetchFeeds.fulfilled(mockFeeds, '')
    );
    expect(state.orders).toEqual(mockFeeds.orders);
    expect(state.total).toBe(100);
    expect(state.totalToday).toBe(10);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should handle fetchFeeds.rejected', () => {
    const error = 'Failed to fetch feeds';
    const state = feedReducer(
      initialState,
      fetchFeeds.rejected(new Error(error), '')
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
  });
});
