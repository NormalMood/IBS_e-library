import { BookActionsEnum } from "../@types/BookActionsEnum"
import { IBookEmployeeBin } from "../@types/IBookEmployeeBin"
import { IMessageCodeResponse } from "../@types/IMessageCodeResponse"
import axiosInstance, { BASE_CATALOG_API, BASE_EMPLOYEE_BIN_API } from "../api/axiosInstance"

export default class EmployeeBinService {

    static async getBooksTaken() {
        const response = await axiosInstance.get<IBookEmployeeBin[]>(
            BASE_EMPLOYEE_BIN_API + '/books'
        )
        return response.data
    }

    static async checkoutBook(bookId: number) {
        const response = await axiosInstance.post<IMessageCodeResponse>(
            BASE_CATALOG_API + '/book',
            {
                bookId,
                action: BookActionsEnum.CHECKOUT
            }
        )
        return response.data
    }

    static async returnBooks(booksIds: number[]) {
        const response = await axiosInstance.post<IMessageCodeResponse>(
            BASE_EMPLOYEE_BIN_API + '/books/status',
            {
                booksIds,
                action: BookActionsEnum.RETURN
            }
        )
        return response.data
    }

    static async extendBooks(booksIds: number[]) {
        const response = await axiosInstance.post<IMessageCodeResponse>(
            BASE_EMPLOYEE_BIN_API + '/books/status',
            {
                booksIds,
                action: BookActionsEnum.EXTEND
            }
        )
        return response.data
    }
    
}