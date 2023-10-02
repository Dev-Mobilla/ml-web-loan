import axios from "axios";
import { isCookiePresent }  from "../utils/CookieChecker";

const SymphAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SYMPH_BASE_URL,
});

const HatchITAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_HATCHIT_BASE_URL,
});

// SYMPH AXIOS INTERCEPTORS
// Request interceptor
SymphAxiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = isCookiePresent(
      process.env.REACT_APP_SESSION_COOKIE_NAME
    );

    if (accessToken) {
      if (config.headers) 
      {
        // config.headers.co = accessToken;
        // config.xsrfCookieName
        config.headers.Accept = 'application/json';
        config.headers["Content-Type"] = 'application/json';
      } 
    }
    return config;
  },
  (error) => {
    return error;
  }
);

// Response interceptor
SymphAxiosInstance.interceptors.response.use(
  (response) => {
    response.headers["Access-Control-Allow-Origin"] = process.env.REACT_APP_SYMPH_BASE_URL
    return response;
  },
  (error) => {
    return error;
  }
);

export { SymphAxiosInstance, HatchITAxiosInstance };
