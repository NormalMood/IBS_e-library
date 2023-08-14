import { FC, useEffect } from 'react';
import { CatalogToolsEnum } from '../../../@types/CatalogToolsEnum';
import { TabsEnum } from '../../../@types/TabsEnum';
import CatalogService from '../../../service/CatalogService';
import useCatalogStore from '../../../store/useCatalogStore';
import CustomTab from '../../UI/CustomTab/CustomTab';
import FilterAndSortTab from '../../UI/FilterAndSortTab/FilterAndSortTab';
import styles from './Toolbar.module.css';
import CatalogToolsService from '../../../service/CatalogToolsService';
import useCatalogFilterStore from '../../../store/useCatalogFilterStore';
import useCatalogSortingStore from '../../../store/useCatalogSortingStore';
import { CatalogSortingFieldsEnum } from '../../../@types/CatalogSortingFieldsEnum';
import { SortingOrdersEnum } from '../../../@types/SortingOrdersEnum';

const Toolbar: FC = () => {
    const getAllBooks = useCatalogStore(state => state.getAllBooks)
    const getTopTenBooks = useCatalogStore(state => state.getTopTenBooks)
    const openTab = useCatalogStore(state => state.openTab)
    const clickTool = useCatalogStore(state => state.clickTool)
    let toolClicked = useCatalogStore(state => state.toolClicked)
    const getFilterCriteria = useCatalogFilterStore(state => state.getFilterCriteria)
    const averageRatingFrom = useCatalogFilterStore(state => state.averageRatingFrom)
    const averageRatingTo = useCatalogFilterStore(state => state.averageRatingTo)
    let sortingField = useCatalogSortingStore(state => state.sortingField)
    let sortingOrder = useCatalogSortingStore(state => state.sortingOrder)
    const resetSorting = useCatalogSortingStore(state => state.resetSorting)
    const resetSelectedSorting = useCatalogSortingStore(state => state.resetSelectedSorting)
    useEffect(() => {
        console.log('****************')
        sortingField = CatalogSortingFieldsEnum.NONE
        sortingOrder = SortingOrdersEnum.NONE
        resetSorting()
        resetSelectedSorting()
        console.log(sortingField)
        //toolClicked = CatalogToolsEnum.DEFAULT_NONE
        //clickTool(CatalogToolsEnum.DEFAULT_NONE)
        getAllBooks(getFilterCriteria(), averageRatingFrom, averageRatingTo, sortingField, sortingOrder);
        console.log('****************')
    }, [])
    return (
        <section className={styles.toolbarContainer}>
            <div>
                    Search
            </div>
            <div className={styles.tabsWrapper}>
                <div className={styles.tabs}>
                    <CustomTab 
                        id={TabsEnum.CATALOG_ALL_BOOKS} 
                        name={'topGroup'} 
                        text={'Все книги'} 
                        onClickCallback={() => {
                            getAllBooks(getFilterCriteria(), averageRatingFrom, averageRatingTo, sortingField, sortingOrder); 
                            openTab(TabsEnum.CATALOG_ALL_BOOKS)
                        }} 
                    />
                    <CustomTab 
                        id={TabsEnum.CATALOG_TOP_TEN} 
                        name={'topGroup'} 
                        text={'Топ 10'} 
                        onClickCallback={() => {
                            getTopTenBooks(getFilterCriteria(), averageRatingFrom, averageRatingTo, sortingField, sortingOrder);
                            openTab(TabsEnum.CATALOG_TOP_TEN)
                        }} 
                    />
                </div>
            </div>
            <hr className={styles.horizontalLine} />
            <div className={styles.tabsWrapper}>
                <div className={styles.tabs}>
                    <FilterAndSortTab 
                        text={'Сортировка'}
                        additionalStyle={toolClicked === CatalogToolsEnum.CATALOG_SORT && styles.toolBarToolActive}
                        onClickCallback={() => clickTool(CatalogToolsEnum.CATALOG_SORT)}
                    />
                    <FilterAndSortTab 
                        text={'Фильтр'} 
                        additionalStyle={toolClicked === CatalogToolsEnum.CATALOG_FILTER && styles.toolBarToolActive}
                        onClickCallback={() => clickTool(CatalogToolsEnum.CATALOG_FILTER)}
                    />
                </div>
            </div>
        </section>
    )
}

export default Toolbar;