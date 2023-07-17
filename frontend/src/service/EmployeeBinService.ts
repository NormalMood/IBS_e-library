import { IEmployeeBin } from "../@types/IEmployeeBin"
import axiosInstance, { BASE_EMPLOYEE_BIN_API } from "../api/axiosInstance"

export default class EmployeeBinService {

    static async getBooksTaken() {
        const response = await axiosInstance.get<IEmployeeBin>(
            BASE_EMPLOYEE_BIN_API + '/data'
        )
        return response.data
    }

    static async returnBooks(booksId: number[]) {
        const response = await axiosInstance.post(
            BASE_EMPLOYEE_BIN_API + '/return',
            booksId
        )
    }

    static async extendBooks(booksId: number[]) {
        const response = await axiosInstance.post(
            BASE_EMPLOYEE_BIN_API + '/extend',
            booksId
        )
    }
    
}