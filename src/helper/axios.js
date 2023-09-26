import axios from "axios";
import isCookiePresent  from "../utils/CookieChecker";

const SymphAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SYMPH_BASE_URL,
});

const HatchITAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_HATCHIT_BASE_URL,
  // withCredentials:true
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
        config.headers.Authorization = accessToken;
        config.headers.Accept = 'application/json';
        config.headers["Content-Type"] = 'application/json';
        config.headers["Access-Control-Allow-Origin"] = 'http://ml-loans-dev.mlhuillier.com:3000/';
        config.headers["Access-Control-Request-Method"] = ['GET', 'POST', 'PATCH' , 'PUT']

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

// HATCH IT AXIOS INTERCEPTORS
// Request interceptor
// HatchITAxiosInstance.interceptors.request.use(
//     (config) => {

//         config.headers.crossorigin = true;
//         config.headers.Accept = "application/json";
//         config.headers["Content-Type"] = "application/json";
//         config.headers["Access-Control-Allow-Origin"] = "*";
//         // config.withCredentials = true;
//         config.headers["crossorigin"] = true;
//         return config;
//     },
//     (error) => {
//         return error;
//     }
// )

// Response interceptor
// HatchITAxiosInstance.interceptors.response.use(
//     (response) => {
//       response.headers.crossorigin = true
//         return response;
//     },
//     (error) => {
//         return error;
//     }
// )

export { SymphAxiosInstance, HatchITAxiosInstance };
