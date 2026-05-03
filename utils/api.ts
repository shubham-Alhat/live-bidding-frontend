import axios, { Axios, AxiosError } from "axios";

export interface CustomError {
  message: string;
  status: number;
  statusText: string;
  data?: null;
}

function isCustomError(error: unknown): error is CustomError {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    "status" in error &&
    "statusText" in error
  );
}

export function getErrorMessage(error: unknown): string {
  if (isCustomError(error)) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
}

const refreshInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 20000, // 20 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest.isRetry) {
      originalRequest.isRetry = true;

      console.log("og request", originalRequest);

      try {
        await refreshInstance.post("/auth/refresh");
        console.log("refresh succeeded, retrying original request");

        return api(originalRequest);
      } catch (error) {
        console.log(error);
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    const customError: CustomError = {
      message:
        error.response?.data?.message || error.message || "An error occurred",
      status: error.response?.status || 500,
      statusText: error.response?.statusText || "Internal Server Error",
      data: error.response?.data || null,
    };

    return Promise.reject(customError);
  },
);

export default api;
