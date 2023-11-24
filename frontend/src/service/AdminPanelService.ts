import { IExpiredStatuses } from "../@types/IExpiredStatuses";
import { IHistory } from "../@types/IHistory";
import { IMessageCodeResponse } from "../@types/IMessageCodeResponse";
import axiosInstance, { BASE_ADMIN_API } from "../api/axiosInstance";

const EXPIRED_STATUS = 'EXPIRED'

export default class AdminPanelService {

    static async getDetailedHistory() {
        const response = await axiosInstance.get<IHistory[]>(
            BASE_ADMIN_API + '/history'
        )
        return response.data
    }

    static async getDetailedHistoryByBookId(bookId: number) {
        const response = await axiosInstance.get<IHistory[] | IMessageCodeResponse>(
            BASE_ADMIN_API + '/history',
            {
                params: {
                    bookId: bookId
                }
            }
        )
        return response.data
    }

    static async getBinExpiredStatuses() {
        const response = await axiosInstance.get<IExpiredStatuses[]>(
            BASE_ADMIN_API + '/checkouted-books'
        )
        return response.data
    }

    static async getBinExpiredStatusesOnly() {
        const response = await axiosInstance.get<IExpiredStatuses[]>(
            BASE_ADMIN_API + '/checkouted-books',
            {
                params: {
                    status: EXPIRED_STATUS
                }
            }
        )
        return response.data
    }

}