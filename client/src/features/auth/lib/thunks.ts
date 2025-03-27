import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../api/service';
import { loginFormSchema } from '../model/schemas';

export const loginThunk = createAsyncThunk('auth/loginThunk', async (formData: FormData) => {
  const data = loginFormSchema.parse(Object.fromEntries(formData));
  return authService.loginUser(data);
});

export const refreshThunk = createAsyncThunk('auth/refreshThunk', async () =>
  authService.refreshToken(),
);

export const logoutThunk = createAsyncThunk('auth/logoutThunk', async () => authService.logoutUser());