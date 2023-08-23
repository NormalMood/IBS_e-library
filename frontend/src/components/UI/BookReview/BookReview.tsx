import { FC } from 'react';
import styles from './BookReview.module.css';
import CustomButton from '../CustomButton/CustomButton';

interface IBookReviewProps {
    profileImageUrl: string;
    username: string;
    reviewDate: string;
    text: string;
    stars: number;
    likes: number;
}

const BookReview: FC<IBookReviewProps> = ({profileImageUrl, username, reviewDate, text, stars, likes}) => {
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
                    {likes !== 0 &&
                        <div className={styles.bookReviewHeaderRight}>
                            <img src='/img/star_filled.png' className={styles.bookReviewStars} />
                            <span>{stars}</span>
                        </div>
                    }
                </div>
                <div className={styles.bookReviewMain}>
                    {text}
                </div>
                <div className={styles.bookReviewFooter}>
                    <div className={styles.bookReviewFooterLeft}>
                        <img src='/img/like.png' className={styles.likeImg} />
                        <span className={styles.likesValue}>{likes}</span>
                    </div>
                    <div>
                        <CustomButton text={'Удалить'} onClick={() => {}} styles={styles.deleteReviewButton} />
                    </div>
                </div>
            </div>
        </article>
    )
}

export default BookReview;