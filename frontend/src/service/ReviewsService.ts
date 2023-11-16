import { IBookReviewsResponse } from "../@types/IBookReviewsResponse"
import { IReviewResponse } from "../@types/IReviewResponse"
import axiosInstance, { BASE_BOOK_REVIEWS_API } from "../api/axiosInstance"

export default class ReviewsService {

    static async getFirst10Reviews(bookId: number) {
        const response = await axiosInstance.get<IBookReviewsResponse>(
            BASE_BOOK_REVIEWS_API + '/reviews-first-10',
            {
                params: {
                    bookId
                }
            }
        )
        return response.data
    }

    static async getAllReviews(bookId: number) {
        const response = await axiosInstance.get<IReviewResponse[]>(
            BASE_BOOK_REVIEWS_API + '/reviews',
            {
                params: {
                    bookId
                }
            }
        )
        return response.data
    }

    static async getReviewById(reviewId: number) {
        const response = await axiosInstance.get<IReviewResponse>(
            BASE_BOOK_REVIEWS_API + '/review',
            {
                params: {
                    reviewId
                }
            }
        )
        return response.data
    }

    static async deleteReview(employeeId: number, reviewId: number) {
        const response = await axiosInstance.delete(
            BASE_BOOK_REVIEWS_API + '/review',
            {
                params: {
                    employeeId, 
                    reviewId
                }
            }
        )
        return response
    }

    static async addReview(employeeId: number, bookId: number, stars: number, comment: string) {
        return await axiosInstance.post(
            BASE_BOOK_REVIEWS_API + '/review',
            {
                employeeId,
                bookId,
                stars,
                comment
                
            }
        )
    }

    static async updateReview(id: number, employeeId: number, bookId: number, stars: number, comment: string) {
        return await axiosInstance.put(
            BASE_BOOK_REVIEWS_API + '/review',
            {
                id,
                employeeId,
                bookId,
                stars,
                comment
            }
        )
    }

}