import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../style/BookPage.module.css';
import CustomButton from './UI/CustomButton/CustomButton';
import CustomTab from './UI/CustomTab/CustomTab';
import { TabsEnum } from '../@types/TabsEnum';
import useCatalogStore from '../store/useCatalogStore';
import { IBookReview } from '../@types/IBookReview';
import BookReview from './UI/BookReview/BookReview';
import CatalogService from '../service/CatalogService';
import { CUSTOM_BLOB_SERVER_URL } from '../api/axiosInstance';
import { ProvidersMap } from '../map/ProvidersMap';

const BookPage: FC = () => {
    const { id } = useParams()
    const openedTab = useCatalogStore(state => state.openedTab)
    const openTab = useCatalogStore(state => state.openTab)
    const navigate = useNavigate()
    const bookReviews: IBookReview[] = [
        {
            profileImageUrl: 'http://timemongers.com/wp-content/uploads/2017/04/Christian-Bale-as-Patrick-Bateman-in-American-Psycho-Rolex-Datejust.jpg',
            username: 'Александр Шубин',
            reviewDate: '9 июня',
            text: "Impressive. Very nice. Let's see Paul Allen's portrait.",
            stars: 5,
            likes: 5
        },
        {
            profileImageUrl: 'http://timemongers.com/wp-content/uploads/2017/04/Christian-Bale-as-Patrick-Bateman-in-American-Psycho-Rolex-Datejust.jpg',
            username: 'Александр Шубин',
            reviewDate: '9 июня',
            text: "Impressive. Very nice. Let's see Paul Allen's portrait.",
            stars: 0,
            likes: 0
        }
    ]

    useEffect(() => {
        setBookDataById(Number(id))
    }, [])

    const setBookDataById = async (bookId: number) => {
        const bookData = await CatalogService.getBookDataById(bookId)
        setTitle(bookData.title)
        setAuthor(bookData.author)
        setAverageRating(bookData.averageRating)
        setGenres(bookData.genres)
        setStatus(bookData.status)
        setProvider(bookData.provider)
        setCoverPath(CUSTOM_BLOB_SERVER_URL + '/' + bookData.coverName)
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
                    <div className={styles.bookCoverReviewLinkWrapper}>
                        <div className={styles.bookCoverContainer}>
                            <img src={coverPath} className={styles.bookCover} />
                        </div>
                        <div className={styles.checkoutBookButtonContainer}>
                            <CustomButton text={'Взять книгу'} onClick={() => {}} styles={styles.checkoutBookButton} />
                        </div>
                    </div>
                    <div className={styles.bookInfoContainer}>
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
                            <div className={styles.bookGenresContainer}>
                                <span>Жанр:</span><br />
                                <span>{genres}</span>
                            </div>
                        </div>
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
                                profileImageUrl={bookReview.profileImageUrl}
                                username={bookReview.username}
                                reviewDate={bookReview.reviewDate}
                                text={bookReview.text}
                                stars={bookReview.stars}
                                likes={bookReview.likes}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default BookPage;