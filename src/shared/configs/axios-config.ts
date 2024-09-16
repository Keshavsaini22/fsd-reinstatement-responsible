import axios, { InternalAxiosRequestConfig } from 'axios';


const basePath = process.env.NEXT_PUBLIC_BASE_PATH;
const API_URL = `${basePath ?? ""}/api`;

const axiosInstance = axios.create({
  baseURL: API_URL
});


const axiosRequestInterceptor = (config: InternalAxiosRequestConfig<any>) => {
  return config;
};

axiosInstance.interceptors.request.use(axiosRequestInterceptor);

export { axiosInstance };