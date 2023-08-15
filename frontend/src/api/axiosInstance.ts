import axios from 'axios';

axios.defaults.withCredentials = true;

const SERVER_URL = 'http://localhost:8080'

export const BASE_EMPLOYEE_BIN_API = '/api/user/bin'

export const BASE_CATALOG_API = '/api/user/library'

export const BASE_FILTERS_API = '/api/filters'

export const LOGIN_ERROR_RESPONSE_URL = SERVER_URL + '/login?error'

export const FETCH_ERROR_RESPONSE_URL = SERVER_URL + '/login'

const axiosInstance = axios.create({
    baseURL: SERVER_URL
})

export default axiosInstance;