import { useEffect } from 'react';
import useCatalogStore from '../../../store/useCatalogStore';
import CatalogBook from '../../CatalogBook';
import styles from './CatalogBooks.module.css';
import { TabsEnum } from '../../../@types/TabsEnum';

const CatalogBooks = () => {
    const books = useCatalogStore(state => state.books)
    const getAllBooks = useCatalogStore(state => state.getAllBooks)
    const openTab = useCatalogStore(state => state.openTab)
    useEffect(() => {
        getAllBooks()
        openTab(TabsEnum.CATALOG_ALL_BOOKS)
    }, [])
    return (
        <div className={styles.catalogBooksContainer}>
            {books?.map(book =>
                <CatalogBook
                    id={book.id}
                    title={book.title}
                    author={book.author}
                    averageRating={book.averageRating}
                />)}
        </div>
    )
}

export default CatalogBooks;