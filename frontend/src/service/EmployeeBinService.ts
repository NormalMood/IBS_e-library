import { IEmployeeBin } from "../@types/IEmployeeBin"
import axiosInstance, { BASE_CATALOG_API } from "../api/axiosInstance"

export default class EmployeeBinService {
    static async getBooksTaken() {
        const response = await axiosInstance.get<IEmployeeBin>(
            BASE_CATALOG_API + '/data'
        )
        return response.data
    }
}