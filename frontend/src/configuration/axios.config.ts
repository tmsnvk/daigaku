/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import axios, { AxiosInstance } from 'axios';

/* logic imports */
import { localStorageUtilities } from '@daigaku/utilities';

/* configuration, constants imports */
import { localStorageKeys } from '@daigaku/constants';

export const axiosConfig: AxiosInstance = axios.create({
  timeout: 30000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export const axiosConfigWithAuth: AxiosInstance = axios.create({
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosConfigWithAuth.interceptors.request.use(
  (config) => {
    const token = localStorageUtilities.getObjectById(localStorageKeys.AUTHENTICATION_TOKEN, null);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);
