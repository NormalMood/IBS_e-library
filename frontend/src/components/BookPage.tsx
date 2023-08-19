import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../style/BookPage.module.css';
import CustomButton from './UI/CustomButton/CustomButton';
import CustomTab from './UI/CustomTab/CustomTab';
import { TabsEnum } from '../@types/TabsEnum';
import useCatalogStore from '../store/useCatalogStore';
import { IBookReview } from '../@types/IBookReview';
import BookReview from './UI/BookReview/BookReview';

const BookPage: FC = () => {
    const { id } = useParams()
    const [scrollY, setScrollY] = useState(0)
    const openedTab = useCatalogStore(state => state.openedTab)
    const openTab = useCatalogStore(state => state.openTab)
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY <= window.screen.height / 3)
            setScrollY(window.scrollY)
        }
        handleScroll()
        console.log(scrollY)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    })
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
    return (
        <div className='container'>
            <div className={styles.bookPageWrapper}>
                <div className={styles.backgroundCoverContainer}>
                    <img src='/img/cover.jpg' className={styles.backgroundCover} />
                    <div className={styles.backgroundMask}></div>
                    <div className={styles.bookTitleAuthorContainer}>
                        <h2 className={styles.bookTitle}>Портрет Дориана Грея</h2>
                        <span>Оскар Уайльд</span>
                    </div>
                </div>
                <div className={styles.bookInfoWrapper}>
                    <div className={styles.bookCoverReviewLinkWrapper}>
                        <div className={styles.bookCoverContainer}>
                            <img src='/img/cover.jpg' className={styles.bookCover} />
                        </div>
                        <div className={styles.reviewLinkContainer}>
                            <img src='/img/add_review.png' className={styles.reviewLinkImg} />
                            <span className={styles.reviewLinkText}>Написать<br />рецензию</span>
                        </div>
                    </div>
                    <div className={styles.bookInfoContainer}>
                        <div className={styles.rightContentContainer}>
                            <span>Поставщик: IBS</span>
                            <div>
                                <span>Статус: </span><span>В наличии</span>
                            </div>
                            <div className={styles.averageRatingContainer}>
                                <img src='/img/star_filled.png' className={styles.averageRatingImg} />
                                <span className={styles.averageRatingValue}>5</span>
                            </div>
                            <div className={styles.bookGenresContainer}>
                                <span>Жанр:</span><br />
                                <span>Зарубежная литература, Роман</span>
                            </div>
                        </div>
                        <div className={styles.checkoutBookButtonContainer}>
                            <CustomButton text={'Взять книгу'} onClick={() => {}} styles={styles.checkoutBookButton} />
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
                            Описание книги "Портрет Дориана Грея" от писателя Оскара Уайльда
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