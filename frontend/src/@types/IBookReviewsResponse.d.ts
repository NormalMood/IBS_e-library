import { IReviewResponse } from "./IReviewResponse";

export interface IBookReviewsResponse {
    bookId: number;
    bookReviews: IReviewResponse[];
    quantity: number;
}