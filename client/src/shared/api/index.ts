import type { AxiosError } from 'axios';
import axios from 'axios';
import { z } from 'zod';

const axiosInstance = axios.create({
  baseURL: '/api',
});

let accessToken = '';

export function setAccessToken(token: string): void {
  accessToken = token;
}

axiosInstance.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError & { config: { sent: boolean } }) => {
    const prevRequest = error.config;
    if (error.response?.status === 403 && !prevRequest.sent) {
      const response = await axios('/api/tokens/refresh');
      const { accessToken: newAccessToken } = z
        .object({ accessToken: z.string() })
        .parse(response.data);
      setAccessToken(newAccessToken);
      prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      prevRequest.sent = true;
      return axiosInstance(prevRequest);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
