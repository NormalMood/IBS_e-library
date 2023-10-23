import axiosInstance, { LOGIN_ERROR_RESPONSE_URL } from "../api/axiosInstance"

export const loginServer = async (setIsAuthCallback: Function) => {
        await axiosInstance.post('/login', new URLSearchParams({
            username: localStorage.getItem('username') as string,
            password: localStorage.getItem('password') as string
        })).then(response => {
            if (response?.request?.responseURL !== LOGIN_ERROR_RESPONSE_URL) {
                setIsAuthCallback(true)
            }
            else {
                setIsAuthCallback(false)
            }
        })
    }
    
export const logoutServer = async (setIsAuthCallback: Function) => {
        await axiosInstance.post('/logout')
        setIsAuthCallback(false)
    }