import { useEffect } from 'react';
import useCatalogStore from '../../../store/useCatalogStore';
import CatalogBook from '../../CatalogBook';
import styles from './CatalogBooks.module.css';
import { TabsEnum } from '../../../@types/TabsEnum';
import useCatalogFilterStore from '../../../store/useCatalogFilterStore';
import useCatalogSortingStore from '../../../store/useCatalogSortingStore';

const CatalogBooks = () => {
    const books = useCatalogStore(state => state.books)
    const getAllBooks = useCatalogStore(state => state.getAllBooks)

    const getFilterCriteria = useCatalogFilterStore(state => state.getFilterCriteria)
    const averageRatingFrom = useCatalogFilterStore(state => state.averageRatingFrom)
    const averageRatingTo = useCatalogFilterStore(state => state.averageRatingTo)
    const sortingField = useCatalogSortingStore(state => state.sortingField)
    const sortingOrder = useCatalogSortingStore(state => state.sortingOrder)

    const openTab = useCatalogStore(state => state.openTab)
    useEffect(() => {
        getAllBooks(getFilterCriteria(), averageRatingFrom, averageRatingTo, sortingField, sortingOrder)
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