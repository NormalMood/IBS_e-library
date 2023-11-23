import axiosInstance, { LOGIN_ERROR_RESPONSE_URL, OK_RESPONSE_CODE, UNAUTHORIZED_RESPONSE_CODE } from "../api/axiosInstance"

export const loginServer = async (setIsAuthCallback: Function) => {
        return await axiosInstance.post('/login', new URLSearchParams({
            username: localStorage.getItem('username') as string,
            password: localStorage.getItem('password') as string
        })).then(response => {
            if (response?.request?.responseURL !== LOGIN_ERROR_RESPONSE_URL) {
                setIsAuthCallback(true)
                return OK_RESPONSE_CODE
            }
            else {
                setIsAuthCallback(false)
            }
            return UNAUTHORIZED_RESPONSE_CODE
        })
    }
    
export const logoutServer = async (setIsAuthCallback: Function) => {
        await axiosInstance.post('/logout')
        setIsAuthCallback(false)
    }