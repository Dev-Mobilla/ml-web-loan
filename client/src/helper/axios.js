import axios from "axios";
import { isCookiePresent }  from "../utils/CookieChecker";

const SymphAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SYMPH_BASE_URL,
});

const HatchITAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_HATCHIT_BASE_URL,
});

const ML_LoansAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true
})

export { SymphAxiosInstance, HatchITAxiosInstance, ML_LoansAxiosInstance };
