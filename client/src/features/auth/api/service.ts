import { isAxiosError, type AxiosInstance } from 'axios';
import { ZodError } from 'zod';
import axiosInstance from '../../../shared/api';
import { authResponseSchema } from '../model/schemas';
import type { AuthResponseT, LoginFormT, SignupFormT } from '../model/types';

class AuthService {
  constructor(private readonly client: AxiosInstance) {}

  async refreshToken(): Promise<AuthResponseT> {
    try {
      const response = await this.client.get('/tokens/refresh');
      if (response.status !== 200) throw new Error('Неверный статус при добавлении (ожидался 200)');
      return authResponseSchema.parse(response.data);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('Ошибка валидации. Список проблем:', error.issues);
      } else if (isAxiosError(error)) {
        console.log(
          'Ошибка при запросе. Статус:',
          error.response?.status,
          'Данные:',
          error.response?.data,
        );
      } else {
        console.error(error);
      }
      throw error;
    }
  }

  async loginUser(data: LoginFormT): Promise<AuthResponseT> {
    try {
      const response = await this.client.post('/auth/login', data);
      if (response.status !== 200) throw new Error('Неверный статус при добавлении (ожидался 200)');
      return authResponseSchema.parse(response.data);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('Ошибка валидации. Список проблем:', error.issues);
      } else if (isAxiosError(error)) {
        console.log(
          'Ошибка при запросе. Статус:',
          error.response?.status,
          'Данные:',
          error.response?.data,
        );
      } else {
        console.error(error);
      }
      throw error;
    }
  }

  async signupUser(data: SignupFormT): Promise<AuthResponseT> {
    try {
      const response = await this.client.post('/auth/signup', data);
      if (response.status !== 200) throw new Error('Неверный статус при добавлении (ожидался 200)');
      return authResponseSchema.parse(response.data);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('Ошибка валидации. Список проблем:', error.issues);
      } else if (isAxiosError(error)) {
        console.log(
          'Ошибка при запросе. Статус:',
          error.response?.status,
          'Данные:',
          error.response?.data,
        );
      } else {
        console.error(error);
      }
      throw error;
    }
  }

  async logoutUser(): Promise<void> {
    return this.client.delete('/auth/logout');
  }
}

const authService = new AuthService(axiosInstance);

export default authService;
