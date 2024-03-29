import { IProviders } from "../@types/IProviders";
import { IStatuses } from "../@types/IStatuses";
import { IVGenres } from "../@types/IVGenres";
import axiosInstance, { BASE_FILTERS_API } from "../api/axiosInstance";

export default class FiltersService {

    static async getAllGenres() {
        const response = await axiosInstance.get<IVGenres[]>(
            BASE_FILTERS_API + '/genres'
        )
        return response.data
    }

    static async getAllProviders() {
        const response = await axiosInstance.get<IProviders[]>(
            BASE_FILTERS_API + '/providers'
        )
        return response.data
    }

    static async getAllStatuses() {
        const response = await axiosInstance.get<IStatuses[]>(
            BASE_FILTERS_API + '/statuses'
        )
        return response.data
    }

}