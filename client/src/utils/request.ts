import axios from "axios";

const ENV = process.env.NODE_ENV;
const LOCAL_URL = process.env.NEXT_PUBLIC_LOCAL_URL;
const PROD_URL = process.env.NEXT_PUBLIC_PROD_URL;

const request = axios.create({
  baseURL: ENV === "production" ? PROD_URL : LOCAL_URL,
});

export default request;
