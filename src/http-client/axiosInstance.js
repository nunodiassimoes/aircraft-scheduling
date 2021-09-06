import axios from "axios";
import httpErrorsInterceptor from "./interceptors/httpErrorsInterceptor";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
});

axiosInstance.interceptors.response.use(undefined, httpErrorsInterceptor);

export { axiosInstance };
