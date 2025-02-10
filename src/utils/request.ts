/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { get, isEmpty } from 'lodash';
import { trimObjectValues } from './helpers';

const requestConfig = {
  baseURL: '',
  withCredentials: false,
  timeout: 60000,
};

const handleRequest = (config: any, isPrivate = true) => {
  if (!isEmpty(config.data)) {
    config.data = trimObjectValues(config.data, { omitEmpty: false });
  }

  // if (isPrivate) {
  //   const token = cookieStorage.getAccessToken();
  //   if (token) {
  //     config.headers['Authorization'] = `Bearer ${token}`;
  //   }
  // }

  // if (withApiKey) {
  //   config.headers['x-api-key'] = cookieStorage.getApiKey();
  // }

  return config;
};

const handleResponse = (response: any) =>
  response?.data?.data?.data || response?.data?.data || response?.data || response;

const handleResponseError = (error: any) => {
  const data = get(error, 'response.data');
  if (isEmpty(data)) return Promise.reject(error);

  return Promise.reject(data);
};

// * request for authenticated user
const privateRequest = axios.create({ ...requestConfig });

const adminRequest = axios.create({
  ...requestConfig,
  baseURL: import.meta.env.VITE_API_ADMIN,
});

adminRequest.interceptors.request.use((config) => handleRequest(config, true));
adminRequest.interceptors.response.use(handleResponse, handleResponseError);

privateRequest.interceptors.request.use((config) => handleRequest(config, true));
privateRequest.interceptors.response.use(handleResponse, handleResponseError);

// * request for guest user
const publicRequest = axios.create({ ...requestConfig });
publicRequest.interceptors.request.use((config) => handleRequest(config, false));
publicRequest.interceptors.response.use(handleResponse, handleResponseError);

export { privateRequest, publicRequest, adminRequest };
