import axios, { type AxiosInstance, type AxiosResponse } from "axios";

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: "https://dummyjson.com",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async get<T>(endpoint: string): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(endpoint);
    return response.data;
  }

  async post<T, D = Record<string, unknown>>(endpoint: string, data?: D): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(endpoint, data);
    return response.data;
  }

  async put<T, D = Record<string, unknown>>(endpoint: string, data?: D): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(endpoint, data);
    return response.data;
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(endpoint);
    return response.data;
  }
}

export const apiClient = new ApiClient();