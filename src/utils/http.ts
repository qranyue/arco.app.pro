import { Message } from "@arco-design/web-vue";
import axios, { type AxiosResponse } from "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    showError?: false;
  }
}

export const http = axios.create({
  baseURL: "/api/",
});

export interface HttpResponse<T = unknown> {
  code: number;
  success: true;
  data: T;
}

export interface ListResponse<T = unknown> extends HttpResponse<T> {
  total: number;
}

export interface HttpError {
  code: number;
  success: false;
  message: string;
}

export interface ListError extends HttpError {
  total: 0;
}

http.interceptors.response.use((response: AxiosResponse<HttpError>) => {
  if (!response.data.success) {
    response.config.showError !== false && Message.error({ content: response.data.message });
    throw new Error(response.data.message);
  }
  return response;
});
