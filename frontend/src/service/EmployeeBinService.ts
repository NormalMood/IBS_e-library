import { IEmployeeBin } from "../@types/IEmployeeBin"
import { IMessageCodeResponse } from "../@types/IMessageCodeResponse"
import axiosInstance, { BASE_CATALOG_API, BASE_EMPLOYEE_BIN_API } from "../api/axiosInstance"

export default class EmployeeBinService {

    static async getBooksTaken() {
        const response = await axiosInstance.get<IEmployeeBin>(
            BASE_EMPLOYEE_BIN_API + '/data'
        )
        return response.data
    }

    static async checkoutBook(bookId: number) {
        const response = await axiosInstance.post<IMessageCodeResponse>(
            BASE_CATALOG_API + '/checkout',
            {},
            {
                params: {
                    bookId
                }
            }
        )
        return response.data
    }

    static async returnBooks(booksId: number[]) {
        const response = await axiosInstance.post<IMessageCodeResponse>(
            BASE_EMPLOYEE_BIN_API + '/return',
            booksId
        )
        return response.data
    }

    static async extendBooks(booksId: number[]) {
        const response = await axiosInstance.post<IMessageCodeResponse>(
            BASE_EMPLOYEE_BIN_API + '/extend',
            booksId
        )
        return response.data
    }
    
}