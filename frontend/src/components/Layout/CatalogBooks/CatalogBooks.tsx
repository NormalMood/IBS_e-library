import { useEffect } from 'react';
import useCatalogStore from '../../../store/useCatalogStore';
import CatalogBook from '../../CatalogBook';
import styles from './CatalogBooks.module.css';

const CatalogBooks = () => {
    const books = useCatalogStore(state => state.books)
    const getAllBooks = useCatalogStore(state => state.getAllBooks)
    useEffect(() => {
        getAllBooks()
    }, [])
    return (
        <div className={styles.catalogBooksContainer}>
            {books?.map(book =>
                <CatalogBook
                    title={book.title}
                    author={book.author}
                    averageRating={book.averageRating}
                />)}
        </div>
    )
}

export default CatalogBooks;