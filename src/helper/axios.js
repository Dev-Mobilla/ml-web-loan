import axios from "axios";

const SymphAxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SYMPH_BASE_URL
})

const HatchITAxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_HATCHIT_BASE_URL
})

export {
    SymphAxiosInstance,
    HatchITAxiosInstance
}
