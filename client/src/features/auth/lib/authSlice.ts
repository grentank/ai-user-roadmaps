import type { PayloadAction, UnknownAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { AuthStatus, type AuthSliceT } from '../model/types';
import { loginThunk, refreshThunk } from './thunks';

const initialState: AuthSliceT = {
  status: AuthStatus.PENDING,
  buttonLoading: false,
};

function isLogoutAction(action: UnknownAction): action is PayloadAction {
  return typeof action.type === 'string' && action.type.includes('logout');
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState as AuthSliceT,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.buttonLoading = true;
      })
      .addCase(loginThunk.fulfilled, (_, action) => ({
        buttonLoading: false,
        status: AuthStatus.AUTHORIZED,
        user: action.payload.user,
      }))
      .addCase(loginThunk.rejected, (state) => {
        state.buttonLoading = false;
        state.status = AuthStatus.GUEST;
      })
      .addCase(refreshThunk.pending, (state) => {
        state.status = AuthStatus.PENDING;
      })
      .addCase(refreshThunk.fulfilled, (_, action) => ({
        buttonLoading: false,
        status: AuthStatus.AUTHORIZED,
        user: action.payload.user,
      }))
      .addCase(refreshThunk.rejected, (state) => {
        state.status = AuthStatus.GUEST;
      })
      .addMatcher(isLogoutAction, () => ({
        status: AuthStatus.GUEST,
        buttonLoading: false,
      }));
  },
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default authSlice.reducer;
