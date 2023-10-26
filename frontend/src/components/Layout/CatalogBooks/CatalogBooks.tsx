import { useEffect, useRef, useState } from 'react';
import useCatalogStore from '../../../store/useCatalogStore';
import CatalogBook from '../../CatalogBook';
import styles from './CatalogBooks.module.css';
import { TabsEnum } from '../../../@types/TabsEnum';
import useCatalogFilterStore from '../../../store/useCatalogFilterStore';
import useCatalogSortingStore from '../../../store/useCatalogSortingStore';
import { CatalogSortingFieldsEnum } from '../../../@types/CatalogSortingFieldsEnum';
import { SortingOrdersEnum } from '../../../@types/SortingOrdersEnum';
import { IBookCatalog } from '../../../@types/IBookCatalog';
import { useObserver } from '../../../hooks/useObserver';

const CatalogBooks = () => {
    const books = useCatalogStore(state => state.books)
    const getAllBooks = useCatalogStore(state => state.getAllBooks)

    let page = useCatalogStore(state => state.page)
    const setPage = useCatalogStore(state => state.setPage)

    const totalPages = useCatalogStore(state => state.totalPages)

    const isBooksLoading = useCatalogStore(state => state.isBooksLoading)

   // const [books, setBooks] = useState<IBookCatalog[]>([])

    const getFilterCriteria = useCatalogFilterStore(state => state.getFilterCriteria)
    let averageRatingFrom = useCatalogFilterStore(state => state.averageRatingFrom)
    let averageRatingTo = useCatalogFilterStore(state => state.averageRatingTo)
    let sortingField = useCatalogSortingStore(state => state.sortingField)
    let sortingOrder = useCatalogSortingStore(state => state.sortingOrder)

    const resetSorting = useCatalogSortingStore(state => state.resetSorting)
    const resetSelectedSorting = useCatalogSortingStore(state => state.resetSelectedSorting)

    const resetFilters = useCatalogFilterStore(state => state.resetFilters)

    const openedTab = useCatalogStore(state => state.openedTab)
    const openTab = useCatalogStore(state => state.openTab)

    const booksPaginationElement = useRef<Element>(null)

    useEffect(() => {
        averageRatingFrom = ''
        averageRatingTo = ''

        resetSorting()
        resetSelectedSorting()
        sortingField = CatalogSortingFieldsEnum.NONE
        sortingOrder = SortingOrdersEnum.NONE

        resetFilters()

        
        openTab(TabsEnum.CATALOG_ALL_BOOKS)
        page = 0
        setPage(0)
        console.log('sdfsdfds: ' + page)
    }, [])

    useEffect(() => {
        getAllBooks(getFilterCriteria(), averageRatingFrom, averageRatingTo, sortingField, sortingOrder, page)
        console.log('hahahaha')
        console.log(books)
    }, [page])

    useObserver(booksPaginationElement, page < totalPages, isBooksLoading, () => {
        console.log('page here: ' + page)
        setPage(page + 1)
    })

    return (
        <>
            {books?.length !== 0 &&
                <>
                    <div className={styles.catalogBooksContainer}>
                        {books.map(book => 
                            <CatalogBook
                                id={book?.id}
                                title={book?.title}
                                author={book?.author}
                                averageRating={book?.averageRating}
                            />)
                        }
                    </div>
                    {openedTab === TabsEnum.CATALOG_ALL_BOOKS &&
                        <div ref={booksPaginationElement as React.RefObject<HTMLDivElement>} className={styles.booksPaginationElement}></div>
                    }
                </>
            }
            {(books?.length === 0 && openedTab === TabsEnum.NONE) &&
                <div className={[styles.catalogBooksContainer, styles.notFoundBooksContainer].join(' ')}>
                    <h2>Ничего не найдено</h2>
                </div>
            }
        </>
    )
}

export default CatalogBooks;