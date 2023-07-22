import { ICatalog } from "../@types/ICatalog";
import axiosInstance, { BASE_CATALOG_API } from "../api/axiosInstance";

export default class CatalogService {

    static async getAllBooks() {
        const response = await axiosInstance.get<ICatalog>(
            BASE_CATALOG_API + '/all'
        )
        return response.data
    }

    static async getTopTenBooks() {
        const response = await axiosInstance.get<ICatalog>(
            BASE_CATALOG_API + '/all'
        )
        return response.data
    }

}