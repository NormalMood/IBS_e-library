import React, { FC, useEffect, useState } from 'react';
import styles from '../style/NewBookPage.module.css';
import CustomFileInput from './UI/CustomFileInput/CustomFileInput';
import CustomInput from './UI/CustomInput/CustomInput';
import CustomTextarea from './UI/CustomTextarea/CustomTextarea';
import CustomButton from './UI/CustomButton/CustomButton';
import CheckboxListLayout from './Layout/CheckboxListLayout/CheckboxListLayout';
import useCatalogFilterStore from '../store/useCatalogFilterStore';
import FiltersService from '../service/FiltersService';
import useEmployeeDataStore from '../store/useEmployeeDataStore';
import useCoverStore from '../store/useCoverStore';
import BookUploadService from '../service/BookUploadService';
import CustomRadioButton from './UI/CustomRadioButton/CustomRadioButton';
import { NewBookPageProviderFieldsEnum } from '../@types/NewBookPageProviderFieldsEnum';

const NewBook: FC = () => {
    const [title, setTitle] = useState('') 
    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [fatherName, setFatherName] = useState('')
    const [description, setDescription] = useState('')

    const genresTitles = useCatalogFilterStore(state => state.genresTitles)
    const setGenresTitles = useCatalogFilterStore(state => state.setGenresTitles)
    const isAllGenresChecked = useCatalogFilterStore(state => state.isAllGenresChecked)
    const isGenreChecked = useCatalogFilterStore(state => state.isGenreChecked)

    const setIsAllGenresChecked = useCatalogFilterStore(state => state.setIsAllGenresChecked)
    const setIsGenreChecked = useCatalogFilterStore(state => state.setIsGenreChecked)

    const onSelectAllGenresHandler = (value: boolean, rowIndex: number) => {
        setIsAllGenresChecked(value)
        setIsGenreChecked(new Array(genresTitles.length).fill(value))
        if (value)
            setGenresIds(new Set<number>(allGenresIdsSaved))
        else
            setGenresIds(new Set<number>())
    }
    const onGenreCheckboxChangeHandler = (value: boolean, rowIndex: number) => {
        setIsAllGenresChecked(false)
        const genreCheckboxStatesUpdated = [...isGenreChecked]
        genreCheckboxStatesUpdated[rowIndex] = value
        setIsGenreChecked(genreCheckboxStatesUpdated)
        const newGenresIds: Set<number> = new Set(genresIds)
        if (value) {
            newGenresIds?.add(allGenresIdsSaved[rowIndex])
            setGenresIds(newGenresIds)
        }
        else {
            newGenresIds?.delete(allGenresIdsSaved[rowIndex])
            setGenresIds(newGenresIds)
        }
    }

    const providersTitles = useCatalogFilterStore(state => state.providersTitles)
    const setProvidersTitles = useCatalogFilterStore(state => state.setProvidersTitles)

    const setIsProviderChecked = useCatalogFilterStore(state => state.setIsProviderChecked)

    useEffect(() => {
        setAllGenres()
        setAllProviders()
        setCover(null)
    }, [])

    useEffect(() => {
        let isAllSelected = true
        isGenreChecked.map((value, index) => {
            if (!value)
                isAllSelected = false
        })
        setIsAllGenresChecked(isAllSelected)
        if (isGenreChecked.length === 0) {
            setIsAllGenresChecked(false)
        }
    }, [isGenreChecked])

    const [genresIds, setGenresIds] = useState<Set<number>>(new Set<number>())
    const [allGenresIdsSaved, setAllGenresIdsSaved] = useState<number[]>([])
    const [providersIds, setProvidersIds] = useState<number[]>([])

    const setAllGenres =  async () => {
        const genres = await FiltersService.getAllGenres()
        setAllGenresIdsSaved(genres.map(genre => genre.id))
        setGenresTitles(genres.map(genre => genre.genre))
    }

    const setAllProviders = async () => {
        const providers = await FiltersService.getAllProviders()
        setProvidersIds(providers.map(provider => provider.id))
        setProvidersTitles(providers.map(provider => provider.name))
    }

    const isAdmin = useEmployeeDataStore(state => state.isAdmin)

    useEffect(() => {
        setIsGenreChecked(new Array(genresTitles.length).fill(false))
        setIsProviderChecked(new Array(providersTitles.length).fill(false))
    }, [genresTitles])

    const cover = useCoverStore(state => state.cover)
    const setCover = useCoverStore(state => state.setCover)

    const [selectedProviderId, setSelectedProviderId] = useState<NewBookPageProviderFieldsEnum>(NewBookPageProviderFieldsEnum.IBS)

    const [isBookUploading, setIsBookUploading] = useState(false)

    const uploadBook = async () => {
        if (cover !== null) {
            setIsBookUploading(true)
            await BookUploadService.upload(
                cover,
                title,
                lastName,
                firstName,
                fatherName,
                description,
                Array.from(genresIds),
                selectedProviderId,
                isAdmin
            ).then(response => 
                setIsBookUploading(false)
            )
        }
    }

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
                            <CustomInput value={lastName} onChangeHandler={setLastName} placeholder={'Фамилия*'} />
                            <CustomInput value={firstName} onChangeHandler={setFirstName} placeholder={'Имя*'} />
                            <CustomInput value={fatherName} onChangeHandler={setFatherName} placeholder={'Отчество'} />
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
                                content={genresTitles} 
                                isChecked={isGenreChecked} 
                                isCheckedAll={isAllGenresChecked}
                                onSelectAllHandler={onSelectAllGenresHandler}
                                onCheckboxChangeHandler={onGenreCheckboxChangeHandler}
                                additionalStyles={styles.listLayoutContainerNewBookPage}
                            />
                            {isAdmin &&
                                <div className={styles.providerFieldsContainer}>
                                    <span className={styles.providerOptionHeader}>Поставщик</span>
                                    <CustomRadioButton 
                                        id={NewBookPageProviderFieldsEnum.IBS} 
                                        selectedId={selectedProviderId}
                                        name={'newBookProviderFields'} 
                                        onClick={setSelectedProviderId}
                                        text={'IBS'}
                                    />
                                    <CustomRadioButton 
                                        id={NewBookPageProviderFieldsEnum.EMPLOYEE} 
                                        selectedId={selectedProviderId}
                                        name={'newBookProviderFields'} 
                                        onClick={setSelectedProviderId}
                                        text={'Сотрудник'}
                                    />
                                </div>
                            }
                        </div>
                        <div className={styles.newBookButtonContainer}>
                            {isBookUploading ?
                                    <CustomButton 
                                        text={'Добавить книгу'} 
                                        onClick={() => {}} 
                                        styles={[styles.newBookButton, styles.newBookButtonLoadingNewBookPage].join(' ')} 
                                        disabled={true}
                                    />
                                :
                                    <CustomButton 
                                        text={'Добавить книгу'} 
                                        onClick={() => uploadBook()} 
                                        styles={styles.newBookButton} 
                                    />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewBook;