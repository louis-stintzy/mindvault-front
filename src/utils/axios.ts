/* eslint-disable import/prefer-default-export */

import axios from 'axios';
import { getUserDataFromLocalStorage } from './user';

const apiUrl = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
  baseURL: `${apiUrl}/api`,
});

axiosInstance.interceptors.request.use((config) => {
  const user = getUserDataFromLocalStorage();
  if (user) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});
