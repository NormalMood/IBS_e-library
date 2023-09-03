import { IBookExpiredStatuses } from "../@types/IBookExpiredStatuses";
import { IBookHistory } from "../@types/IBookHistory";
import axiosInstance, { BASE_ADMIN_API } from "../api/axiosInstance";

export default class AdminPanelService {

    static async getDetailedHistory() {
        const response = await axiosInstance.get<IBookHistory>(
            BASE_ADMIN_API + '/detailed_history/all'
        )
        return response.data
    }

    static async getDetailedHistoryByBookId(bookId: number) {
        const response = await axiosInstance.get<IBookHistory>(
            BASE_ADMIN_API + '/detailed_history/certain',
            {
                params: {
                    bookId: bookId
                }
            }
        )
        return response.data
    }

    static async getBinExpiredStatuses() {
        const response = await axiosInstance.get<IBookExpiredStatuses>(
            BASE_ADMIN_API + '/expired'
        )
        return response.data
    }

    static async getBinExpiredStatusesOnly() {
        const response = await axiosInstance.get<IBookExpiredStatuses>(
            BASE_ADMIN_API + '/expired_only'
        )
        return response.data
    }

}