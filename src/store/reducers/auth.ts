import { createSlice } from '@reduxjs/toolkit';
import { usersApi } from 'src/store/actions/users';
import { RootState } from 'src/store/store';
import { User } from 'src/types';

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
} as AuthState;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        usersApi.endpoints.loginUser.matchPending,
        (state, action) => {
          state.isLoading = true;
          console.log('pending');
        }
      )
      .addMatcher(
        usersApi.endpoints.loginUser.matchFulfilled,
        (state, action) => {
          console.log('fulfilled!');
          state.isLoading = false;
          state.user = action.payload;
          state.isAuthenticated = true;
        }
      )
      .addMatcher(
        usersApi.endpoints.loginUser.matchRejected,
        (state, action) => {
          console.log('rejected');
          state.isLoading = false;
          state.isAuthenticated = false;
        }
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
