import { FC } from 'react';
import styles from './BookReview.module.css';
import useEmployeeDataStore from '../../../store/useEmployeeDataStore';
import ReviewsService from '../../../service/ReviewsService';
import { useNavigate } from 'react-router-dom';
import { OK_RESPONSE_CODE } from '../../../api/axiosInstance';
import { IMessageCodeResponse } from '../../../@types/IMessageCodeResponse';

interface IBookReviewProps {
    reviewId: number;
    bookId: number;
    reviewerId: number;
    profileImageUrl: string;
    username: string;
    reviewDate: string;
    text: string;
    stars: number;
    deleteReviewCallback: (response: IMessageCodeResponse) => void;
}

const BookReview: FC<IBookReviewProps> = ({reviewId, bookId, reviewerId, profileImageUrl, username, reviewDate, text, stars, deleteReviewCallback}) => {
    const currentEmployeeId = useEmployeeDataStore(state => state.id)
    const navigate = useNavigate()
    return (
            <article className={styles.bookReviewContainer}>
                <div className={styles.profileImageContainer}>
                    <img src={profileImageUrl} className={styles.profileImage} />
                </div>
                <div className={styles.reviewContentContainer}>
                    <div className={styles.bookReviewHeader}>
                        <div className={styles.bookReviewHeaderLeft}>
                            <h5>{username}</h5>
                            <span className={styles.reviewDate}>{reviewDate}</span>
                        </div>
                        <div className={styles.bookReviewHeaderRight}>
                            <img src='/img/star_filled.png' className={styles.bookReviewStars} />
                            <span>{stars}</span>
                        </div>
                    </div>
                    <div className={styles.bookReviewMain}>
                        {text}
                    </div>
                    {currentEmployeeId === reviewerId &&
                        <div className={styles.bookReviewFooter}>
                            <div className={styles.reviewFooterRightContainer}>
                                <img 
                                    className={styles.editReviewImg} 
                                    src='/img/edit_review.png' 
                                    onClick={() => navigate(`/book/${bookId}/review/${reviewId}`)}
                                />
                                <img 
                                    className={styles.deleteReviewImg} 
                                    src='/img/delete_review.png' 
                                    onClick={async () => {
                                        await ReviewsService.deleteReview(reviewerId, reviewId).then(response => {
                                            deleteReviewCallback(response)
                                        })
                                    }}
                                />
                            </div>
                        </div>
                    }
                </div>
            </article>
    )
}

export default BookReview;