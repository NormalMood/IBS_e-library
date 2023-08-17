import { FC } from 'react';
import styles from '../style/CatalogBook.module.css';
import { useNavigate } from 'react-router-dom';

interface ICatalogBookProps {
    id: number;
    title: string;
    author: string;
    averageRating: number;
}

const CatalogBook: FC<ICatalogBookProps> = ({id, title, author, averageRating}) => {
    const navigate = useNavigate()
    return (
        <article className={styles.bookInfoContainer} onClick={() => navigate(`/book/${id}`)}>
            <img src='/img/cover.jpg' className={styles.bookCover} />
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