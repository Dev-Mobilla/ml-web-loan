import axios from "axios";
import isCookiePresent  from "../utils/CookieChecker";

const SymphAxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SYMPH_BASE_URL
})

const HatchITAxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_HATCHIT_BASE_URL
})

// SYMPH AXIOS INTERCEPTORS
// Request interceptor
SymphAxiosInstance.interceptors.request.use(
    (config) => {

        const accessToken = isCookiePresent(process.env.REACT_APP_SESSION_COOKIE_NAME);

        if (accessToken) {
            if (config.headers) config.headers.Authorization = accessToken;
        }
        return config;
    },
    (error) => {
        return error;
    }
)

// Response interceptor
SymphAxiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return error;
    }
)

// HATCH IT AXIOS INTERCEPTORS
// Request interceptor
// HatchITAxiosInstance.interceptors.request.use(
//     (config) => {

//         // const apiKey = process.env.REACT_APP_HATCH_IT_API_KEY

//         // if (apiKey) {
//         //     if (config.headers){ 
//         //         config.headers.Authorization = apiKey;
//         //     }
//         // }
//         return config;
//     },
//     (error) => {
//         return error;
//     }
// )

// // Response interceptor
// HatchITAxiosInstance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         return error;
//     }
// )

export {
    SymphAxiosInstance,
    HatchITAxiosInstance
}
