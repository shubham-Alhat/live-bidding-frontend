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

      try {
        await api.post("/auth/refresh");
        console.log("refresh succeeded, retrying original request");

        // these are identical
        // api.post("/bids/create", data);
        // api({ url: "/bids/create", method: "post", data: data });

        // When axios makes a request, it builds a config object before sending. This config contains everything about that request
        // When the request fails, axios attaches this config to the error object as error.config. So you have the complete blueprint of the original request sitting there.
        // api is just an axios instance. And an axios instance is callable as a function — you can pass a config object directly to it
        return api(originalRequest); // this is actually calling the OG request which failed.
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
