import Axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from "axios";
import { baseURL } from "@/config/urls";

const axiosInstance = Axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
  if (config && config.headers) {
    (config.headers as AxiosRequestHeaders).ContentType = "application/json";
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (config): AxiosResponse => config,
  (error) => {
    /** Error Handling for each request response. */
    Promise.reject(error);
  }
);

export default axiosInstance;
