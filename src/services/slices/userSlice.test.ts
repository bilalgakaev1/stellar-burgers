import userReducer, {
  loginUser,
  getUser,
  clearError,
  logoutUser
} from './userSlice';

const mockUser = {
  name: 'Билал Гакаев',
  email: 'bgakaev@yandex.ru'
};

describe('userSlice', () => {
  const initialState = {
    user: null,
    isLoading: false,
    isAuthChecked: false,
    error: null
  };

  it('should return the initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('clearError should reset error state', () => {
    const errorState = {
      ...initialState,
      error: 'Error'
    };
    const state = userReducer(errorState, clearError());
    expect(state.error).toBeNull();
  });

  it('should handle loginUser.pending', () => {
    const state = userReducer(
      initialState,
      loginUser.pending('', { email: '', password: '' })
    );
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle loginUser.fulfilled', () => {
    const state = userReducer(
      initialState,
      loginUser.fulfilled(mockUser, '', { email: '', password: '' })
    );
    expect(state.user).toEqual(mockUser);
    expect(state.isLoading).toBe(false);
  });

  it('should handle loginUser.rejected', () => {
    const error = 'Failed to login';
    const state = userReducer(
      initialState,
      loginUser.rejected(new Error(error), '', { email: '', password: '' })
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
  });

  it('should handle getUser.fulfilled', () => {
    const state = userReducer(initialState, getUser.fulfilled(mockUser, ''));
    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toEqual(mockUser);
  });

  it('should handle logoutUser.fulfilled', () => {
    const loggedInState = {
      ...initialState,
      user: mockUser
    };
    const state = userReducer(
      loggedInState,
      logoutUser.fulfilled(undefined, '')
    );
    expect(state.user).toBeNull();
  });
});
