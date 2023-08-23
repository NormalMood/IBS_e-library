import { FC, useState } from 'react';
import { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../style/ReviewPage.module.css';
import CustomInput from './UI/CustomInput/CustomInput';
import CustomButton from './UI/CustomButton/CustomButton';
import CustomTextarea from './UI/CustomTextarea/CustomTextarea';

const ReviewPage: FC = () => {
    const { id } = useParams()
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
    //fetch data of a book by id 'cause u r gonna update a review
    return (
        <div className='container'>
            <article className={styles.reviewContainer}>
                <div className={styles.reviewContentContainer}>
                    <div className={styles.bookReviewHeaderContainer}>
                        <span className={styles.bookReviewHeader}>Новая рецензия</span>
                    </div>
                    <div className={styles.bookContainer}>
                        <div className={styles.bookCoverContainer}>
                            <img 
                                src='/img/cover.jpg' 
                                className={styles.bookCover}
                            />
                        </div>
                        <div className={styles.bookInfoContainer}>
                            <span className={styles.bookTitle}>Портрет Дориана Грея</span>
                            <span className={styles.bookAuthor}>Оскар Уайльд</span>
                            <span className={styles.bookGenres}>Зарубежная литература, Роман</span>
                            <div className={styles.bookAverageRatingContainer}>
                                <img src='/img/star_filled.png' className={styles.averageRatingImg} />
                                <span className={styles.averageRatingValue}>5</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.reviewFieldsContainer}>
                        <div className={styles.starsWrapper}>
                            <span>Ваша оценка книге*:</span>
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
                            additionalStyles={styles.pageReviewTextarea}
                        />
                        <div className={styles.bookReviewButtonContainer}>
                            <CustomButton text={'Опубликовать'} onClick={() => {}} styles={styles.bookReviewButton} />
                        </div>
                    </div>
                </div>
            </article>
        </div>
    )
}

export default ReviewPage;