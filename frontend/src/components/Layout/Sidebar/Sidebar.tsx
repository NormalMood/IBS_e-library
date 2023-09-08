import { FC, useState, useEffect } from 'react';
import styles from './Sidebar.module.css';
import useCatalogStore from '../../../store/useCatalogStore';
import { CatalogToolsEnum } from '../../../@types/CatalogToolsEnum';
import CustomButton from '../../UI/CustomButton/CustomButton';
import { ButtonTypeEnum } from '../../../@types/ButtonTypeEnum';
import { SidebarHeaderMap } from '../../../map/SidebarHeaderMap';
import CheckboxListLayout from '../CheckboxListLayout/CheckboxListLayout';
import useCatalogFilterStore from '../../../store/useCatalogFilterStore';
import { TabsEnum } from '../../../@types/TabsEnum';
import CustomInput from '../../UI/CustomInput/CustomInput';
import CustomRadioButton from '../../UI/CustomRadioButton/CustomRadioButton';
import { CatalogSortingFieldsEnum } from '../../../@types/CatalogSortingFieldsEnum';
import { SortingOrdersEnum } from '../../../@types/SortingOrdersEnum';
import useCatalogSortingStore from '../../../store/useCatalogSortingStore';
import { ProvidersMap } from '../../../map/ProvidersMap';

const Sidebar: FC = () => {
    const [isSidebarOpened, setIsSidebarOpened] = useState(false);

    useEffect(() => {
        if (isSidebarOpened)
            document.body.style.overflow = 'hidden'
        else
            document.body.style.overflow = 'visible'
    }, [isSidebarOpened])

    const toolClicked = useCatalogStore(state => state.toolClicked)
    const clickTool = useCatalogStore(state => state.clickTool)
    const getSidebarStyles = () => {
        if (isSidebarOpened)
            return styles.sidebar
        return [styles.sidebar, styles.sidebarClosed].join(' ')
    }
    
    useEffect(() => {
        console.log('2 times!: ' + CatalogToolsEnum[toolClicked])
        if (toolClicked !== CatalogToolsEnum.DEFAULT_NONE) {
            setIsSidebarOpened(true)
        }
        else {
            setIsSidebarOpened(false)
        }
    }, [toolClicked])

    const genresTitles = useCatalogFilterStore(state => state.genresTitles)
    const isAllGenresChecked = useCatalogFilterStore(state => state.isAllGenresChecked)
    const isGenreChecked = useCatalogFilterStore(state => state.isGenreChecked)

    const setIsAllGenresChecked = useCatalogFilterStore(state => state.setIsAllGenresChecked)
    const setIsGenreChecked = useCatalogFilterStore(state => state.setIsGenreChecked)

    const genresFilter = useCatalogFilterStore(state => state.genresFilter)
    const setGenresFilterCriteria = useCatalogFilterStore(state => state.setGenresFilterCriteria)

    const onSelectAllGenresHandler = (value: boolean, rowIndex: number) => {
        setIsAllGenresChecked(value)
        setIsGenreChecked(new Array(genresTitles.length).fill(value))
        if (value)
            setGenresFilterCriteria(new Set(genresTitles))
        else
            setGenresFilterCriteria(new Set())
    }
    const onGenreCheckboxChangeHandler = (value: boolean, rowIndex: number) => {
        setIsAllGenresChecked(false)
        const genreCheckboxStatesUpdated = [...isGenreChecked]
        genreCheckboxStatesUpdated[rowIndex] = value
        setIsGenreChecked(genreCheckboxStatesUpdated)
        addGenresCriterion(value, genresTitles[rowIndex])
    }
    const addGenresCriterion = (isChecked: boolean, criterion: string) => {
        let criteria = new Set(genresFilter) 
        if (isChecked)
            criteria.add(criterion)
        else
            criteria.delete(criterion)
        setGenresFilterCriteria(criteria)
    }
    useEffect(() => {
        let isAllSelected = true
        isGenreChecked.map((value, index) => {
            if (!value)
                isAllSelected = false
            addGenresCriterion(value, genresTitles[index])
        })
        setIsAllGenresChecked(isAllSelected)
        if (isGenreChecked.length === 0) {
            setIsAllGenresChecked(false)
        }
        console.log(isGenreChecked)
    }, [isGenreChecked])


    const providersTitles = useCatalogFilterStore(state => state.providersTitles)
    const isAllProvidersChecked = useCatalogFilterStore(state => state.isAllProvidersChecked)
    const isProviderChecked = useCatalogFilterStore(state => state.isProviderChecked)

    const setIsAllProvidersChecked = useCatalogFilterStore(state => state.setIsAllProvidersChecked)
    const setIsProviderChecked = useCatalogFilterStore(state => state.setIsProviderChecked)

    const providersFilter = useCatalogFilterStore(state => state.providersFilter)
    const setProvidersFilterCriteria = useCatalogFilterStore(state => state.setProvidersFilterCriteria)

    const onSelectAllProvidersHandler = (value: boolean, rowIndex: number) => {
        setIsAllProvidersChecked(value)
        setIsProviderChecked(new Array(providersTitles.length).fill(value))
        if (value)
            setProvidersFilterCriteria(new Set(providersTitles))
        else
            setProvidersFilterCriteria(new Set())
    }
    const onProviderCheckboxChangeHandler = (value: boolean, rowIndex: number) => {
        setIsAllProvidersChecked(false)
        const providerCheckboxStatesUpdated = [...isProviderChecked]
        providerCheckboxStatesUpdated[rowIndex] = value
        setIsProviderChecked(providerCheckboxStatesUpdated)
        addProvidersCriterion(value, providersTitles[rowIndex])
    }
    const addProvidersCriterion = (isChecked: boolean, criterion: string) => {
        let criteria = new Set(providersFilter) 
        if (isChecked)
            criteria.add(criterion)
        else
            criteria.delete(criterion)
        setProvidersFilterCriteria(criteria)
    }
    useEffect(() => {
        let isAllSelected = true
        isProviderChecked.map((value, index) => {
            if (!value)
                isAllSelected = false
            addProvidersCriterion(value, providersTitles[index])
        })
        setIsAllProvidersChecked(isAllSelected)
        if (isProviderChecked.length === 0) {
            setIsAllProvidersChecked(false)
        }
    }, [isProviderChecked])


    const statusesTitles = useCatalogFilterStore(state => state.statusesTitles)
    const isAllStatusesChecked = useCatalogFilterStore(state => state.isAllStatusesChecked)
    const isStatusChecked = useCatalogFilterStore(state => state.isStatusChecked)

    const setIsAllStatusesChecked = useCatalogFilterStore(state => state.setIsAllStatusesChecked)
    const setIsStatusChecked = useCatalogFilterStore(state => state.setIsStatusChecked)

    const statusesFilter = useCatalogFilterStore(state => state.statusesFilter)
    const setStatusesFilterCriteria = useCatalogFilterStore(state => state.setStatusesFilterCriteria)

    const onSelectAllStatusesHandler = (value: boolean, rowIndex: number) => {
        setIsAllStatusesChecked(value)
        setIsStatusChecked(new Array(statusesTitles.length).fill(value))
        if (value)
            setStatusesFilterCriteria(new Set(statusesTitles))
        else
            setStatusesFilterCriteria(new Set())
    }
    const onStatusCheckboxChangeHandler = (value: boolean, rowIndex: number) => {
        setIsAllStatusesChecked(false)
        const statusCheckboxStatesUpdated = [...isStatusChecked]
        statusCheckboxStatesUpdated[rowIndex] = value
        setIsStatusChecked(statusCheckboxStatesUpdated)
        addStatusesCriterion(value, statusesTitles[rowIndex])
    }
    const addStatusesCriterion = (isChecked: boolean, criterion: string) => {
        let criteria = new Set(statusesFilter) 
        if (isChecked)
            criteria.add(criterion)
        else
            criteria.delete(criterion)
        setStatusesFilterCriteria(criteria)
    }
    useEffect(() => {
        let isAllSelected = true
        isStatusChecked.map((value, index) => {
            if (!value)
                isAllSelected = false
            addStatusesCriterion(value, statusesTitles[index])
        })
        setIsAllStatusesChecked(isAllSelected)
        if (isStatusChecked.length === 0) {
            setIsAllStatusesChecked(false)
        }
    }, [isStatusChecked])


    let averageRatingFrom = useCatalogFilterStore(state => state.averageRatingFrom)
    let averageRatingTo = useCatalogFilterStore(state => state.averageRatingTo)
    const setAverageRatingFrom = useCatalogFilterStore(state => state.setAverageRatingFrom)
    const setAverageRatingTo = useCatalogFilterStore(state => state.setAverageRatingTo)


    const selectedSortingField = useCatalogSortingStore(state => state.selectedSortingField)
    const setSelectedSortingField = useCatalogSortingStore(state => state.setSelectedSortingField)
    const selectedOrder = useCatalogSortingStore(state => state.selectedOrder)
    const setSelectedOrder = useCatalogSortingStore(state => state.setSelectedOrder)
    let sortingField = useCatalogSortingStore(state => state.sortingField)
    const setSortingField = useCatalogSortingStore(state => state.setSortingField)
    let sortingOrder = useCatalogSortingStore(state => state.sortingOrder)
    const setSortingOrder = useCatalogSortingStore(state => state.setSortingOrder)
    const onSortingFieldSelectHandler = (field: CatalogSortingFieldsEnum) => {
        setSelectedSortingField(field)
        setSortingField(field)
    }
    const onSortingOrderSelectHandler = (order: SortingOrdersEnum) => {
        setSelectedOrder(order)
        setSortingOrder(order)
    }
    

    const openedTab = useCatalogStore(state => state.openedTab)
    const getTopTenBooks = useCatalogStore(state => state.getTopTenBooks)
    const getAllBooks = useCatalogStore(state => state.getAllBooks)
    const getFilterCriteria = useCatalogFilterStore(state => state.getFilterCriteria)

    const resetGenreCheckboxes = useCatalogFilterStore(state => state.resetGenreCheckboxes)
    const resetProviderCheckboxes = useCatalogFilterStore(state => state.resetProviderCheckboxes)
    const resetStatusCheckboxes = useCatalogFilterStore(state => state.resetStatusCheckboxes)
    const resetFilters = useCatalogFilterStore(state => state.resetFilters)
    const resetSorting = useCatalogSortingStore(state => state.resetSorting)
    const resetSelectedSorting = useCatalogSortingStore(state => state.resetSelectedSorting)

    const toolsOptionClickHandler = () => {
        if (openedTab === TabsEnum.CATALOG_TOP_TEN)
            getTopTenBooks(getFilterCriteria(), averageRatingFrom, averageRatingTo, sortingField, sortingOrder)
        else if (openedTab === TabsEnum.CATALOG_ALL_BOOKS) {
            getAllBooks(getFilterCriteria(), averageRatingFrom, averageRatingTo, sortingField, sortingOrder)
        }
    }

    useEffect(() => {
        setIsGenreChecked(new Array(genresTitles.length).fill(false))
        setIsProviderChecked(new Array(providersTitles.length).fill(false))
        setIsStatusChecked(new Array(statusesTitles.length).fill(false))
    }, [genresTitles])

    const getProvidersTitlesMapped = (titles: string[]) => {
        const titlesMapped: string[] = []
        titles.forEach(title => {
            titlesMapped.push(ProvidersMap.get(title) as string)
        })
        return titlesMapped
    }
    
    return (
        <aside className={getSidebarStyles()}>
            <div className={styles.closeImgHeaderWrapper}>
                <span className={styles.sidebarHeader}>{SidebarHeaderMap.get(toolClicked)}</span>
                <img 
                    src='/img/close.png' 
                    onClick={() => {
                        setIsSidebarOpened(false)
                        clickTool(CatalogToolsEnum.DEFAULT_NONE)
                    }} 
                    className={styles.sidebarCloseImg} 
                />
            </div>
            <div className={styles.buttonsContainer}>
                <div className={styles.buttonsWrapper}>
                    <CustomButton 
                        text={'Сбросить'} 
                        onClick={() => {
                            if (toolClicked === CatalogToolsEnum.CATALOG_FILTER) {
                                resetGenreCheckboxes()
                                resetProviderCheckboxes()
                                resetStatusCheckboxes()
                                //dirty trick. Doesn't work without assignment :(
                                averageRatingFrom = ''
                                averageRatingTo = ''
                                //
                                resetFilters()
                            }
                            else if (toolClicked === CatalogToolsEnum.CATALOG_SORT) {
                                resetSelectedSorting()
                                sortingField = CatalogSortingFieldsEnum.NONE
                                sortingOrder = SortingOrdersEnum.NONE
                                resetSorting()
                            }
                            toolsOptionClickHandler()
                            
                        }} 
                        type={ButtonTypeEnum.SECONDARY} 
                        styles={styles.sidebarButtons} />
                    <CustomButton 
                        text={'Применить'} 
                        onClick={() => {
                            if (toolClicked === CatalogToolsEnum.CATALOG_SORT) {
                                if (sortingField === CatalogSortingFieldsEnum.NONE) {
                                    sortingField = selectedSortingField
                                    setSortingField(selectedSortingField)
                                }
                                if (sortingOrder === SortingOrdersEnum.NONE) {
                                    sortingOrder = selectedOrder
                                    setSortingOrder(selectedOrder)
                                }
                            }
                            toolsOptionClickHandler()
                        }} 
                        styles={styles.sidebarButtons} 
                    />
                </div>
            </div>
            <div className={styles.sidebarContentContainer}>
                {toolClicked === CatalogToolsEnum.CATALOG_SORT &&
                    <div className={styles.sortCriteriaWrapper}>
                        <div className={styles.sortFieldsContainer}>
                            <span className={styles.sortOptionHeader}>Поля сортировки</span>
                            <CustomRadioButton 
                                id={CatalogSortingFieldsEnum.TITLE} 
                                selectedId={selectedSortingField}
                                name={'sortFields'} 
                                onClick={onSortingFieldSelectHandler}
                                text={'Название'}
                            />
                            <CustomRadioButton 
                                id={CatalogSortingFieldsEnum.AUTHOR} 
                                selectedId={selectedSortingField}
                                name={'sortFields'} 
                                onClick={onSortingFieldSelectHandler}
                                text={'Автор'}
                            />
                            <CustomRadioButton 
                                id={CatalogSortingFieldsEnum.AVERAGE_RATING} 
                                selectedId={selectedSortingField}
                                name={'sortFields'} 
                                onClick={onSortingFieldSelectHandler}
                                text={'Оценка'}
                            />
                        </div>
                        <div className={styles.sortOrdersContainer}>
                            <span className={styles.sortOptionHeader}>Порядок сортировки</span>
                            <CustomRadioButton 
                                id={SortingOrdersEnum.ASC}
                                selectedId={selectedOrder}
                                name={'sortOrders'} 
                                onClick={onSortingOrderSelectHandler}
                                text={'По возрастанию'}
                            />
                            <CustomRadioButton 
                                id={SortingOrdersEnum.DESC}
                                selectedId={selectedOrder}
                                name={'sortOrders'} 
                                onClick={onSortingOrderSelectHandler}
                                text={'По убыванию'}
                            />
                        </div>
                    </div>
                }
                {toolClicked === CatalogToolsEnum.CATALOG_FILTER && 
                    <>
                    <CheckboxListLayout 
                        header={'Жанр'}
                        content={genresTitles}
                        isCheckedAll={isAllGenresChecked}
                        isChecked={isGenreChecked}
                        onSelectAllHandler={onSelectAllGenresHandler}
                        onCheckboxChangeHandler={onGenreCheckboxChangeHandler}
                    />
                    <CheckboxListLayout 
                        header={'Поставщик'}
                        content={getProvidersTitlesMapped(providersTitles)}
                        isCheckedAll={isAllProvidersChecked}
                        isChecked={isProviderChecked}
                        onSelectAllHandler={onSelectAllProvidersHandler}
                        onCheckboxChangeHandler={onProviderCheckboxChangeHandler}
                    />
                    <CheckboxListLayout 
                        header={'Статус'}
                        content={statusesTitles}
                        isCheckedAll={isAllStatusesChecked}
                        isChecked={isStatusChecked}
                        onSelectAllHandler={onSelectAllStatusesHandler}
                        onCheckboxChangeHandler={onStatusCheckboxChangeHandler}
                    />
                    <div className={styles.customInputsWrapper}>
                        <span className={styles.averageRatingHeader}>Оценка</span>
                        <div className={styles.customInputsContainer}>
                            <div className={styles.customInputContainer}>
                                <CustomInput
                                    value={averageRatingFrom}
                                    onChangeHandler={setAverageRatingFrom}
                                    placeholder={'1.0'}
                                />
                            </div>
                            <span className={styles.dashBetweenInputs}></span>
                            <div className={styles.customInputContainer}>
                                <CustomInput
                                    value={averageRatingTo}
                                    onChangeHandler={setAverageRatingTo}
                                    placeholder={'5.0'}
                                />
                            </div>
                        </div>
                    </div>
                    </>
                    }
            </div>
        </aside>
    )
}

export default Sidebar;