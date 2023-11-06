import { FC } from 'react';
import styles from '../style/CatalogBook.module.css';
import { useNavigate } from 'react-router-dom';
import { CUSTOM_BLOB_SERVER_URL } from '../api/axiosInstance';

interface ICatalogBookProps {
    id: number;
    title: string;
    author: string;
    averageRating: number;
    coverName: string;
}

const CatalogBook: FC<ICatalogBookProps> = ({id, title, author, averageRating, coverName}) => {
    const navigate = useNavigate()
    const coverPath = CUSTOM_BLOB_SERVER_URL + '/' + coverName
    return (
        <article className={styles.bookInfoContainer} onClick={() => navigate(`/book/${id}`)}>
            <img src={coverPath} className={styles.bookCover} />
            <span>{title}</span> <br />
            <span>{author}</span> <br />
            {averageRating !== 0 &&
                <div className={styles.bookRatingContainer}>
                    <img src='/img/star_filled.png' className={styles.bookRatingImg} />
                    <span className={styles.bookRatingValue}>{averageRating}</span>
                </div>
            }
        </article>
    )
}

export default CatalogBook;