import { getToken } from '@/utils/utils';
import Axios, { AxiosError, AxiosRequestConfig } from 'axios';

const BASE_URL_PROD = import.meta.env.VITE_PROD_BASE_URL;
const BASE_URL_DEV = import.meta.env.VITE_DEV_BASE_URL;
const ENV = import.meta.env.MODE;
const baseUrl = ENV === 'production' ? BASE_URL_PROD : BASE_URL_DEV;

export const AXIOS_INSTANCE = Axios.create({ baseURL: baseUrl });

export const apiFetcher = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    headers: {
      Accept: 'application/json',
      Authorization: getToken() || '',
    },
    cancelToken: source.token,
  }).then(({ data }) => data);

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = AxiosError<Error>;

