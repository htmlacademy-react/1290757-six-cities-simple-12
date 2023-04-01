import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios';
import {getToken} from './token';
import {processErrorHandle} from './process-error-handle';

const BACKEND_URL: string = 'https://12.react.pages.academy/six-cities-simple' as const;
const REQUEST_TIMEOUT: number = 5000 as const;

export const createAPI = (): AxiosInstance => {
  const api: AxiosInstance = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token: string = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{error: string}>): void => {
      if (error.response) {
        processErrorHandle(error.response.data.error);
      }

      throw error;
    }
  );

  return api;
};
