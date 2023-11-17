import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from '../style/BookPage.module.css';
import CustomButton from './UI/CustomButton/CustomButton';
import CustomTab from './UI/CustomTab/CustomTab';
import { TabsEnum } from '../@types/TabsEnum';
import useCatalogStore from '../store/useCatalogStore';
import BookReview from './UI/BookReview/BookReview';
import CatalogService from '../service/CatalogService';
import { CUSTOM_BLOB_SERVER_COVERS_URL, CUSTOM_BLOB_SERVER_PICTURES_URL } from '../api/axiosInstance';
import { ProvidersMap } from '../map/ProvidersMap';
import ReviewsService from '../service/ReviewsService';
import { IReviewResponse } from '../@types/IReviewResponse';
import { getDateForReview } from '../utils/DateHandler';

const BookPage: FC = () => {
    const { id } = useParams()
    const openedTab = useCatalogStore(state => state.openedTab)
    const openTab = useCatalogStore(state => state.openTab)
    const navigate = useNavigate()
    
    const [bookReviews, setBookReviews] = useState<IReviewResponse[]>([])

    const [reviewsQuantity, setReviewsQuantity] = useState(0)

    const setFirst10Reviews = async () => {
        const response = await ReviewsService.getFirst10Reviews(Number(id))
        setBookReviews(response.bookReviews.slice(0, SHOWN_REVIEWS_QUANTITY))
        setReviewsQuantity(response.quantity)
    }

    const setAllReviews = async () => {
       const response = await ReviewsService.getAllReviews(Number(id))
       setBookReviews(response)
    }

    const setBookDataById = async (bookId: number) => {
        const bookData = await CatalogService.getBookDataById(bookId)
        setTitle(bookData.title)
        setAuthor(bookData.author)
        setAverageRating(bookData.averageRating)
        setGenres(bookData.genres)
        setStatus(bookData.status)
        setProvider(bookData.provider)
        setCoverPath(CUSTOM_BLOB_SERVER_COVERS_URL + '/' + bookData.coverName)
        setDescription(bookData.description)
    }

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [averageRating, setAverageRating] = useState<number>(0)
    const [genres, setGenres] = useState('')
    const [status, setStatus] = useState('')
    const [provider, setProvider] = useState('')
    const [coverPath, setCoverPath] = useState('')
    const [description, setDescription] = useState('')

    const SHOWN_REVIEWS_QUANTITY = 10;

    const [isOpenReviewsButtonHidden, setIsOpenReviewsButtonHidden] = useState(false)

    const getOpenReviewsButtonStyle = () => {
        if (isOpenReviewsButtonHidden)
            return styles.getAllReviewsButtonHidden
        return styles.getAllReviewsButton
    }

    const location = useLocation()
    useEffect(() => {
        setBookDataById(Number(id))
        setFirst10Reviews()
    }, [location])

    return (
        <div className='container'>
            <div className={styles.bookPageWrapper}>
                <div className={styles.backgroundCoverContainer}>
                    <img src={coverPath} className={styles.backgroundCover} />
                    <div className={styles.backgroundMask}></div>
                    <div className={styles.bookTitleAuthorContainer}>
                        <span className={styles.bookTitle}>{title}</span>
                        <span>{author}</span>
                    </div>
                </div>
                <div className={styles.bookInfoWrapper}>
                    <div className={styles.bookCoverWrapper}>
                        <div className={styles.bookCoverContainer}>
                            <img src={coverPath} className={styles.bookCover} />
                        </div>
                    </div>
                    <div className={styles.checkoutBookButtonWrapper}>
                        <div className={styles.checkoutBookButtonContainer}>
                            <CustomButton text={'Взять книгу'} onClick={() => {}} styles={styles.checkoutBookButton} />
                        </div>
                    </div>
                    <div className={styles.bookInfoContainer}>
                        <div className={styles.rightContentWrapper}>
                            <div className={styles.rightContentContainer}>
                                <span>Поставщик: {ProvidersMap.get(provider)}</span>
                                <div>
                                    <span>Статус: </span><span>{status}</span>
                                </div>
                                {averageRating !== 0 &&
                                    <div className={styles.averageRatingContainer}>
                                        <img src='/img/star_filled.png' className={styles.averageRatingImg} />
                                        <span className={styles.averageRatingValue}>{averageRating}</span>
                                    </div>
                                }
                                <div>
                                    <span>Жанр:</span><br />
                                    <span>{genres}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.reviewLinkWrapper}>
                        <div 
                                className={styles.reviewLinkContainer}
                                onClick={() => navigate(`/book/${id}/review`)}
                            >
                                <img src='/img/add_review.png' className={styles.reviewLinkImg} />
                                <span className={styles.reviewLinkText}>Написать<br />рецензию</span>
                        </div>
                    </div>
                    <div className={styles.tabsContainer}>
                        <CustomTab 
                            id={TabsEnum.BOOK_PAGE_DESCRIPTION} 
                            name={'bookPageTab'} 
                            text={'Описание'} 
                            onClickCallback={() => openTab(TabsEnum.BOOK_PAGE_DESCRIPTION)} 
                            additionalStyles={styles.bookPageCustomTab}
                        />
                        <CustomTab 
                            id={TabsEnum.BOOK_PAGE_REVIEWS} 
                            name={'bookPageTab'} 
                            text={'Рецензии'} 
                            onClickCallback={() => openTab(TabsEnum.BOOK_PAGE_REVIEWS)}
                            additionalStyles={styles.bookPageCustomTab}
                        />
                    </div>
                </div>
                <div className={styles.tabContentContainer}>
                    {openedTab === TabsEnum.BOOK_PAGE_DESCRIPTION &&
                        <div>
                            {description}
                        </div>
                    }
                    {openedTab === TabsEnum.BOOK_PAGE_REVIEWS &&
                        bookReviews.map(bookReview =>
                            <BookReview 
                                reviewId={bookReview.id}
                                bookId={Number(id)}
                                reviewerId={bookReview.employeeId}
                                profileImageUrl={CUSTOM_BLOB_SERVER_PICTURES_URL + '/' + bookReview.pictureName}
                                username={bookReview.firstName + ' ' + bookReview.lastName}
                                reviewDate={getDateForReview(bookReview.reviewsDate)}
                                text={bookReview.comment}
                                stars={bookReview.stars}
                                deleteReviewCallback={() => {
                                    setIsOpenReviewsButtonHidden(false)
                                    setBookDataById(Number(id))
                                    setFirst10Reviews()
                                }}
                            />
                        ) 
                    }
                    {openedTab === TabsEnum.BOOK_PAGE_REVIEWS && reviewsQuantity > SHOWN_REVIEWS_QUANTITY &&
                        <CustomButton 
                            text={'Раскрыть рецензии ('+ (reviewsQuantity - SHOWN_REVIEWS_QUANTITY) + ')'} 
                            onClick={async () => {
                                setIsOpenReviewsButtonHidden(true)
                                await setAllReviews()
                            }}
                            styles={getOpenReviewsButtonStyle()}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default BookPage;