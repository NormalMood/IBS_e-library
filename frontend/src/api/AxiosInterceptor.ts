import { useEffect, FC, useContext } from 'react';
import axiosInstance, { FETCH_ERROR_RESPONSE_URL } from './axiosInstance';
import { AuthContext } from '../context/AuthContext';


interface IAxiosInterceptorProps {
    children: React.ReactElement<any, any> | null
}



const AxiosInterceptor: FC<IAxiosInterceptorProps> = ({children}) => {
    const { setIsAuth } = useContext(AuthContext)
    useEffect(() => {
        const responseInterceptor = (response: any) => {
            if (response?.request?.responseURL === FETCH_ERROR_RESPONSE_URL) {
                console.log('oooooooooooooooooooops!')
                setIsAuth(false)
            }
            return response
        }
        const interceptor = axiosInstance.interceptors.response.use(responseInterceptor)
        return () => axiosInstance.interceptors.response.eject(interceptor)
    }, [])
    return children
}

export { AxiosInterceptor }