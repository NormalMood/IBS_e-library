import React, { FC, useState } from 'react';
import styles from '../style/NewBookPage.module.css';
import CustomFileInput from './UI/CustomFileInput/CustomFileInput';
import CustomInput from './UI/CustomInput/CustomInput';
import CustomTextarea from './UI/CustomTextarea/CustomTextarea';
import CustomButton from './UI/CustomButton/CustomButton';
import CheckboxListLayout from './Layout/CheckboxListLayout/CheckboxListLayout';

const NewBook: FC = () => {
    const [title, setTitle] = useState('') 
    const [lastname, setLastname] = useState('')
    const [firstname, setFirstname] = useState('')
    const [fathername, setFathername] = useState('')
    const [description, setDescription] = useState('')
    return (
        <div className="container">
            <div className={styles.newBookWrapper}>
                <div className={styles.newBookContainer}>
                    <div className={styles.newBookInfoContainer}>
                        <div className={styles.newBookCoverContainer}>
                            <CustomFileInput />
                        </div>
                        <div className={styles.newBookInputContainer}>
                            <CustomInput value={title} onChangeHandler={setTitle} placeholder={'Название*'} />
                            <CustomInput value={lastname} onChangeHandler={setLastname} placeholder={'Фамилия*'} />
                            <CustomInput value={firstname} onChangeHandler={setFirstname} placeholder={'Имя*'} />
                            <CustomInput value={fathername} onChangeHandler={setFathername} placeholder={'Отчество'} />
                        </div>
                        <div className={styles.newBookTextareaContainer}>
                            <CustomTextarea 
                                text={description} 
                                onChangeHandler={setDescription} 
                                placeholder={'Описание книги*'}
                                additionalStyles={styles.newBookTextarea}
                            />
                        </div>
                    </div>
                    <div className={styles.newBookGenresButtonContainer}>
                        <div className={styles.list}>
                            <CheckboxListLayout 
                                header={'Жанр'} 
                                content={['Роман']} 
                                isChecked={[false]} 
                                isCheckedAll={false}
                                onSelectAllHandler={() => {}}
                                onCheckboxChangeHandler={() => {}}
                            />
                        </div>
                        <div className={styles.newBookButtonContainer}>
                            <CustomButton text={'Добавить книгу'} onClick={() => {}} styles={styles.newBookButton} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewBook;