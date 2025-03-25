import { isAxiosError, type AxiosInstance } from 'axios';
import { ZodError } from 'zod';
import axiosInstance from '../../../shared/api';
import placeSchema from '../model/schema';
import type { PlaceAddFormT, PlaceT } from '../model/types';

class PlaceService {
  constructor(private readonly client: AxiosInstance) {}

  async getPlaces(): Promise<PlaceT[]> {
    try {
      const response = await this.client('/places');
      if (response.status !== 200) throw new Error('Неверный статус (ожидался 200)');
      return placeSchema.array().parse(response.data);
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

  async deletePlaceById(placeId: PlaceT['id']): Promise<void> {
    try {
      const response = await this.client.delete(`/places/${String(placeId)}`);
      if (response.status !== 200) throw new Error('Неверный статус при удалении (ожидался 200)');
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

  async createPlace(formData: PlaceAddFormT): Promise<PlaceT> {
    try {
      const response = await this.client.post('/places', formData);
      if (response.status !== 201) throw new Error('Неверный статус при добавлении (ожидался 201)');
      return placeSchema.parse(response.data);
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

  async getPlacesByUserId(userId: PlaceT['userId']): Promise<PlaceT[]> {
    try {
      const response = await this.client.get(`/places/users/${String(userId)}`);
      if (response.status !== 200) throw new Error('Неверный статус при запросе (ожидался 200)');
      return placeSchema.array().parse(response.data);
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

const placeService = new PlaceService(axiosInstance);

export default placeService;
