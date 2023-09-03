import { FC, useState, useRef, useEffect } from 'react';
import styles from './CustomSearch.module.css';
import useSearchDebounce from '../../../hooks/useSearchDebounce';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../CustomButton/CustomButton';
import { IBookCatalog } from '../../../@types/IBookCatalog';
import useCatalogStore from '../../../store/useCatalogStore';
import useCatalogFilterStore from '../../../store/useCatalogFilterStore';
import useCatalogSortingStore from '../../../store/useCatalogSortingStore';
import CatalogService from '../../../service/CatalogService';
import { TabsEnum } from '../../../@types/TabsEnum';

const CustomSearch: FC = () => {
    const getFilterCriteria = useCatalogFilterStore(state => state.getFilterCriteria)
    const averageRatingFrom = useCatalogFilterStore(state => state.averageRatingFrom)
    const averageRatingTo = useCatalogFilterStore(state => state.averageRatingTo)
    const sortingField = useCatalogSortingStore(state => state.sortingField)
    const sortingOrder = useCatalogSortingStore(state => state.sortingOrder)

    const openTab = useCatalogStore(state => state.openTab)
    const setBooks = useCatalogStore(state => state.setBooks)

    const [foundBooks, setFoundBooks] = useState<IBookCatalog[]>([])


    const [isClickedOutside, setIsClickedOutside] = useState(true)
    const customSearchPopupRef = useRef<HTMLDivElement>(null)
    const customSearchInputRef = useRef<HTMLInputElement>(null)

    const navigate = useNavigate()

    const handleClickOutside = (e: MouseEvent) => {
        if (!customSearchPopupRef?.current?.contains(e.target as Node) && 
            !customSearchInputRef?.current?.contains(e.target as Node))
            setIsClickedOutside(true)
    }
    const handleClickInside = () => setIsClickedOutside(false)

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    })

    const [searchQuery, setSearchQuery] = useSearchDebounce()
    const [words, setWords] = useState('')

    const clearSearchInput = () => {
        setWords('')
        setSearchQuery('')
    }
    const getClearButtonStyle = () => {
        if (words === '')
            return styles.hiddenElement
        return styles.clearButton
    }
    useEffect(() => {
        getBooksBySearchQueryRequest()
    }, [searchQuery])
    const getBooksBySearchQueryRequest = async () => {
        if (searchQuery !== null && searchQuery !== '') {
            const response = await CatalogService.getBooksBySearchQuery(searchQuery, getFilterCriteria(), averageRatingFrom, averageRatingTo, sortingField, sortingOrder)
            setFoundBooks(response.objects)
        }
        else
            setFoundBooks([])
    }
    useEffect(() => {
        console.log('clicked outside: ', isClickedOutside)
        if (!isClickedOutside)
            getBooksBySearchQueryRequest()
        console.log(foundBooks)
    }, [isClickedOutside])

    const getSearchPopupStyle = () => {
        if (isClickedOutside || foundBooks.length === 0)
            return styles.hiddenElement
        return styles.searchPopupContainer
    }

    const showResultsClickedHandle = () => {
        openTab(TabsEnum.NONE)
        setBooks(foundBooks)
    }

    return (
        <div className={styles.searchContainer}>
            <div className={styles.searchWrapper}>
                <input 
                    ref={customSearchInputRef}
                    type='text' 
                    className={styles.searchInput}
                    onClick={handleClickInside}
                    value={words}
                    onChange={e => { setWords(e.target.value); setSearchQuery(e.target.value) }}
                    placeholder='Книга, автор, жанр'
                />
                <img 
                    src='/img/close.png' 
                    className={getClearButtonStyle()} 
                    onClick={() => clearSearchInput()}
                />
                <div className={styles.searchButtonWrapper}>
                    <img 
                        src='/img/search_button.png' 
                        className={styles.searchButton} 
                        onClick={() => showResultsClickedHandle()}
                    />
                </div>
            </div>
            <div className={getSearchPopupStyle()} ref={customSearchPopupRef} onClick={handleClickInside}>
                <div className={styles.searchPopupContent}>
                {
                    foundBooks.map(foundBook => {
                        return <article 
                            className={styles.bookRowContainer}
                            onClick={() => navigate(`/book/${foundBook.id}`)}
                        >
                            <div className={styles.bookCoverContainer}>
                                <img src='/img/cover.jpg' className={styles.bookCover} />
                            </div>
                            <div className={styles.bookInfoContainer}>
                                <h3>
                                    {foundBook.title}
                                </h3>
                                <span>
                                    {foundBook.author}
                                </span>
                                <span>
                                    {foundBook.genres}
                                </span>
                                {foundBook.averageRating !== 0 &&
                                    <div className={styles.averageRatingContainer}>
                                        <img src='/img/star_filled.png' className={styles.averageRatingImg} />
                                        {foundBook.averageRating}
                                    </div>
                                }
                            </div>
                        </article>
                    })
                }
                </div>
                <div className={styles.showResultsButtonContainer}>
                    <CustomButton 
                        text={'Показать все результаты'} 
                        onClick={() => showResultsClickedHandle()} 
                        styles={styles.showResultsButton} 
                    />
                </div>
            </div>
        </div>
    )
}

export default CustomSearch;