import { FC, useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../style/ReviewPage.module.css';
import CustomButton from './UI/CustomButton/CustomButton';
import CustomTextarea from './UI/CustomTextarea/CustomTextarea';
import CatalogService from '../service/CatalogService';
import { CUSTOM_BLOB_SERVER_COVERS_URL, OK_RESPONSE_CODE } from '../api/axiosInstance';
import ReviewsService from '../service/ReviewsService';
import useEmployeeDataStore from '../store/useEmployeeDataStore';
import { IMessageCodeResponse } from '../@types/IMessageCodeResponse';
import MessagePopup from './UI/MessagePopup/MessagePopup';
import useReviewPageResponseStore from '../store/useReviewPageResponseStore';
import customTextAreaStyle from './UI/CustomTextarea/CustomTextarea.module.css';

const ReviewPage: FC = () => {
    const { id } = useParams()
    const {reviewId } = useParams()
    const navigate = useNavigate()
    const [reviewText, setReviewText] = useState('')
    const [starsVisible, setStarsVisible] = useState<boolean[]>(new Array(5).fill(false))
    const starClicked = (index: number) => {
        let newStarsState: boolean[] = []
        newStarsState = new Array(index + 1).fill(true)
        for (let i = 0; i < 4 - index; i++)
            newStarsState.push(false)
        setStarsVisible(newStarsState)
        console.log(newStarsState)
    }

    const [coverPath, setCoverPath] = useState('')

    useEffect(() => {
        setBookInfoByBookId(Number(id))
        if (reviewId !== undefined) {
            setReviewInfo()
        }
    }, [])

    const setReviewInfo = async () => {
        const reviewResponse = await ReviewsService.getReviewById(Number(reviewId))
        setReviewText(reviewResponse.comment)
        starClicked(reviewResponse.stars - 1)
    }

    const setBookInfoByBookId = async (bookId: number) => {
        const bookData = await CatalogService.getBookDataById(bookId)
        setTitle(bookData.title)
        setAuthor(bookData.author)
        setAverageRating(bookData.averageRating)
        setGenres(bookData.genres)
        setCoverPath(CUSTOM_BLOB_SERVER_COVERS_URL + '/' + bookData.coverName)
    }



    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [averageRating, setAverageRating] = useState<number>(0)
    const [genres, setGenres] = useState('')

    const currentEmployeeId = useEmployeeDataStore(state => state.id)

    const addReview =  async () => {
        setIsLastResponseError(false)
        const starsQuantity = starsVisible.filter(star => star).length
        await ReviewsService.addReview(currentEmployeeId, Number(id), starsQuantity, reviewText).then(response => {
            handleAddUpdateReviewResponse(response)
        }
        )
    }

    const [isLastResponseError, setIsLastResponseError] = useState(false)

    const updateReview = async () => {
        setIsLastResponseError(false)
        const starsQuantity = starsVisible.filter(star => star).length
        await ReviewsService.updateReview(Number(reviewId), currentEmployeeId, Number(id), starsQuantity, reviewText).then(response => {
            handleAddUpdateReviewResponse(response)
        })
    }

    const handleAddUpdateReviewResponse = (response: IMessageCodeResponse) => {
        if (response.code === OK_RESPONSE_CODE) {
            setMessage(response.message)
            setCode(response.code)
            navigate(`/book/${id}`)
        }
        else {
            setIsLastResponseError(true)
            updateResponses(response)
        }
    }

    const updateResponses = (response: IMessageCodeResponse) => {
        const responsesArray = [...responses]
        responsesArray.push(response)
        setResponses(responsesArray)
    }

    const [responses, setResponses] = useState<IMessageCodeResponse[]>([])

    const setMessage = useReviewPageResponseStore(state => state.setMessage)
    const setCode = useReviewPageResponseStore(store => store.setCode)

    const getCustomTextAreaAdditionalStyle = () => {
        if (responses[responses.length - 1]?.message.includes('мысли о книге') && isLastResponseError) {
            return [styles.pageReviewTextarea, customTextAreaStyle.invalidCustomTextarea].join(' ')
        }
        return styles.pageReviewTextarea
    }
    
    return (
        <>
            <div className='container'>
                <article className={styles.reviewContainer}>
                    <div className={styles.reviewContentContainer}>
                        <div className={styles.bookReviewHeaderContainer}>
                            <span className={styles.bookReviewHeader}>Новая рецензия</span>
                        </div>
                        <div className={styles.bookContainer}>
                            <div className={styles.bookCoverContainer}>
                                <img 
                                    src={coverPath} 
                                    className={styles.bookCover}
                                />
                            </div>
                            <div className={styles.bookInfoContainer}>
                                <span className={styles.bookTitle}>{title}</span>
                                <span className={styles.bookAuthor}>{author}</span>
                                <span className={styles.bookGenres}>{genres}</span>
                                {averageRating !== 0 &&
                                    <div className={styles.bookAverageRatingContainer}>
                                        <img src='/img/star_filled.png' className={styles.averageRatingImg} />
                                        <span className={styles.averageRatingValue}>{averageRating}</span>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className={styles.reviewFieldsContainer}>
                            <div className={styles.starsWrapper}>
                                <span>Оценка*:</span>
                                <div className={styles.starsContainer}>
                                    {starsVisible.map((starVisible, index) => 
                                        <img 
                                            src={starVisible ? '/img/star_filled.png' : '/img/star_empty.png'}
                                            onClick={() => starClicked(index)}
                                            className={styles.starImg}
                                        />
                                    )}
                                </div>
                            </div>
                            <CustomTextarea 
                                text={reviewText} 
                                onChangeHandler={setReviewText} 
                                placeholder={'Ваши мысли о книге*'}
                                additionalStyles={getCustomTextAreaAdditionalStyle()}
                            />
                            <div className={styles.bookReviewButtonContainer}>
                                {reviewId === undefined 
                                    ? 
                                    <CustomButton 
                                        text={'Опубликовать'} 
                                        onClick={() => {
                                            addReview()
                                        }} 
                                        styles={styles.bookReviewButton} 
                                    />
                                    :
                                    <CustomButton 
                                        text={'Сохранить'} 
                                        onClick={() => {
                                            updateReview()
                                        }} 
                                        styles={styles.bookReviewButton} 
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </article>
            </div>
            <div className='messagePopupContainer'>
                {responses.map(response => 
                    <MessagePopup message={response.message} code={response.code} />
                )}
            </div>
        </>
    )
}

export default ReviewPage;