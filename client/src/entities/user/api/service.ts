import { isAxiosError, type AxiosInstance } from 'axios';
import { ZodError } from 'zod';
import axiosInstance from '../../../shared/api';
import { userWithPlacesSchema } from '../../place/model/schema';
import type { UserWithPlacesT } from '../../place/model/types';

class UserService {
  constructor(private readonly client: AxiosInstance) {}

  async getUsers(): Promise<UserWithPlacesT[]> {
    try {
      const response = await this.client('/places/users');
      if (response.status !== 200) throw new Error('Неверный статус (ожидался 200)');
      return userWithPlacesSchema.array().parse(response.data);
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
}

const userService = new UserService(axiosInstance);

export default userService;
