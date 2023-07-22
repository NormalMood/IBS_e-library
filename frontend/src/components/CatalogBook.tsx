import { FC } from 'react';
import styles from '../style/CatalogBook.module.css';

interface ICatalogBookProps {
    title: string;
    author: string;
    averageRating: number;
}

const CatalogBook: FC<ICatalogBookProps> = ({title, author, averageRating}) => {
    return (
        <article className={styles.bookInfoContainer}>
            <img src='/img/cover.jpg' className={styles.bookCover} />
            <span>{title}</span> <br />
            <span>{author}</span> <br />
            {!isNaN(averageRating) &&
                <div className={styles.bookRatingContainer}>
                    <img src='/img/star_filled.png' className={styles.bookRatingImg} />
                    <span className={styles.bookRatingValue}>{averageRating}</span>
                </div>
            }
        </article>
    )
}

export default CatalogBook;