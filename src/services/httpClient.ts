import axios, { type AxiosRequestConfig } from "axios";
import { BASE_URL } from "../constants/baseUrl";
import type { APIResponse } from "@/types/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//       if (
//         window.location.pathname !== "/login" &&
//         window.location.pathname !== "/"
//       ) {
//         window.location.href = "/login";
//       }
//     }
//     return Promise.reject(error);
//   }
// );

class HttpClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  get axiosInstance() {
    return axiosInstance;
  }

  getAll = (config?: AxiosRequestConfig) => {
    return axiosInstance
      .get<APIResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };

  get = (id: string | number, config?: AxiosRequestConfig) => {
    return axiosInstance
      .get<APIResponse<T>>(`${this.endpoint}/${id}`, config)
      .then((res) => res.data);
  };

  post = (data: unknown, config?: AxiosRequestConfig) => {
    return axiosInstance
      .post<APIResponse<T>>(this.endpoint, data, config)
      .then((res) => res.data);
  };

  put = (
    id: string | number,
    data: Partial<T>,
    config?: AxiosRequestConfig
  ) => {
    return axiosInstance
      .put<APIResponse<T>>(`${this.endpoint}/${id}`, data, config)
      .then((res) => res.data);
  };

  delete = (id: string | number, config?: AxiosRequestConfig) => {
    return axiosInstance
      .delete<T>(`${this.endpoint}/${id}`, config)
      .then((res) => res.data);
  };
}

export default HttpClient;
