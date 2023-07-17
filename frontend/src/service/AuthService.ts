import { useContext } from "react"
import axiosInstance, { LOGIN_ERROR_RESPONSE_URL } from "../api/axiosInstance"
import { AuthContext } from "../context/AuthContext"

export const loginServer = async (setIsAuthCallback: Function) => {
        await axiosInstance.post('/login', new URLSearchParams({
            username: localStorage.getItem('username') as string,
            password: localStorage.getItem('password') as string
        })).then(response => {
            if (response?.request?.responseURL !== LOGIN_ERROR_RESPONSE_URL) {
                localStorage.setItem('isAuth', true as any as string)
                setIsAuthCallback(true)
            }
            else {
                localStorage.removeItem('isAuth')
                setIsAuthCallback(false)
            }
        })
    }
    
export const logoutServer = async (setIsAuthCallback: Function) => {
        await axiosInstance.post('/logout')
        localStorage.removeItem('isAuth')
        setIsAuthCallback(false)
    }