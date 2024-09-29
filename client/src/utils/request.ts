import axios from "axios";
import { getToken } from "./utils";

const BASE_URL_PROD = import.meta.env.VITE_PROD_BASE_URL;
const BASE_URL_DEV = import.meta.env.VITE_DEV_BASE_URL;
const ENV = import.meta.env.MODE;
const BASE_URL = ENV === "production" ? BASE_URL_PROD : BASE_URL_DEV;

const request = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
  },
  params: {
    token: getToken() || "",
  },
});

request.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) config.headers["Authorization"] = token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
