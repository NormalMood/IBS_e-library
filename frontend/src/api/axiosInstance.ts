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

const axiosInstance = axios.create({
    baseURL: SERVER_URL
})




export default axiosInstance;