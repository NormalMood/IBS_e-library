import axios from 'axios';

axios.defaults.withCredentials = true;

const SERVER_URL = 'http://localhost:8080'

export const CUSTOM_BLOB_SERVER_COVERS_URL = 'http://localhost:8000/covers'

export const CUSTOM_BLOB_SERVER_PICTURES_URL = 'http://localhost:8000/pictures'

export const BASE_EMPLOYEE_BIN_API = '/api/user/bin'

export const BASE_EMPLOYEE_API = '/api/user'

export const BASE_ADMIN_API = '/api/admin'

export const BASE_CATALOG_API = '/api/user/library'

export const BASE_FILTERS_API = '/api/filters'

export const BASE_ADD_BOOK_API = '/api/library'

export const BASE_BOOK_REVIEWS_API = '/api/book'

export const LOGIN_ERROR_RESPONSE_URL = SERVER_URL + '/login?error'

export const FETCH_ERROR_RESPONSE_URL = SERVER_URL + '/login'

export const UNAUTHORIZED_RESPONSE_CODE = 401

export const OK_RESPONSE_CODE = 200

export const BAD_REQUEST_RESPONSE_CODE = 400

export const NETWORK_CONNECT_TIMEOUT_ERROR_RESPONSE_CODE = 599

export const INCORRECT_AVERAGE_RATING_FILTER_RESPONSE_MESSAGE = 'Введите число от 1.0 до 5.0'

const axiosInstance = axios.create({
    baseURL: SERVER_URL
})




export default axiosInstance;