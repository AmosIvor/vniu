import { STORAGE_KEY } from '@/enums/localStorage';
import axios from 'axios';

const createAxiosInstance = (baseURL: string, includeCredentials = false) => {
  const instance = axios.create({
    headers: {
      'Content-Type': 'application/json',
    },
    baseURL,
    withCredentials: includeCredentials,
  });

  instance.interceptors.request.use(
    (request) => {
      const { isDisableLoading } = request;
      const accessToken = localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);

      if (accessToken) {
        if (request.headers) {
          request.headers.Authorization = `Bearer ${accessToken}`;
        }
      }

      return request;
    },
    (error) => Promise.reject(error)
  );
  instance.interceptors.response.use(
    (response) => {
      return response.data ?? response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

// Axios instances
export const ClientAxios = createAxiosInstance(
  `${process.env.DATABASE_URL}`,
  true
);
export const ServerAxios = createAxiosInstance(
  `${process.env.SERVER_DATABASE_URL || process.env.DATABASE_URL}`
);

// Fetcher function
export const fetcher = async (reqUrl: string, { headers = {}, ...options }) => {
  return fetch(`${process.env.DATABASE_URL}${reqUrl}`, {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...options,
  });
};
