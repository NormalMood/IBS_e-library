import React, { FC, useEffect, useMemo, useState } from 'react';
import Toolbar from './Layout/Toolbar/Toolbar';
import CatalogBooks from './Layout/CatalogBooks/CatalogBooks';
import Sidebar from './Layout/Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import { IFilterCriteria } from '../@types/IFilterCriteria';
import useCatalogFilterStore from '../store/useCatalogFilterStore';
import useCatalogSortingStore from '../store/useCatalogSortingStore';
import styles from '../style/Catalog.module.css';
import { CatalogSortingFieldsEnum } from '../@types/CatalogSortingFieldsEnum';
import { SortingOrdersEnum } from '../@types/SortingOrdersEnum';
import useCatalogStore from '../store/useCatalogStore';
import { CatalogToolsEnum } from '../@types/CatalogToolsEnum';

const Catalog: FC = () => {
    const genresTitles = useCatalogFilterStore(state => state.genresTitles)
    const setIsGenreChecked = useCatalogFilterStore(state => state.setIsGenreChecked)

    const providersTitles = useCatalogFilterStore(state => state.providersTitles)
    const setIsProviderChecked = useCatalogFilterStore(state => state.setIsProviderChecked)

    const statusesTitles = useCatalogFilterStore(state => state.statusesTitles)
    const setIsStatusChecked = useCatalogFilterStore(state => state.setIsStatusChecked)

    const resetFilters = useCatalogFilterStore(state => state.resetFilters)
    const resetSorting = useCatalogSortingStore(state => state.resetSorting)
    const resetSelectedSorting = useCatalogSortingStore(state => state.resetSelectedSorting)

    const getAllBooks = useCatalogStore(state => state.getAllBooks)
    const getFilterCriteria = useCatalogFilterStore(state => state.getFilterCriteria)
    const averageRatingFrom = useCatalogFilterStore(state => state.averageRatingFrom)
    const averageRatingTo = useCatalogFilterStore(state => state.averageRatingTo)
    let sortingField = useCatalogSortingStore(state => state.sortingField)
    let sortingOrder = useCatalogSortingStore(state => state.sortingOrder)
    const clickTool = useCatalogStore(state => state.clickTool)

    useEffect(() => {
        setIsGenreChecked(new Array(genresTitles.length).fill(false))

        setIsProviderChecked(new Array(providersTitles.length).fill(false))

        setIsStatusChecked(new Array(statusesTitles.length).fill(false))
        resetFilters()
        resetSorting()
        resetSelectedSorting()
        clickTool(CatalogToolsEnum.DEFAULT_NONE)
    //    console.log('=====')
     //   sortingField = CatalogSortingFieldsEnum.NONE
     //   sortingOrder = SortingOrdersEnum.NONE

      //  console.log(sortingField)
     //   console.log(sortingOrder)
       // getAllBooks(getFilterCriteria(), averageRatingFrom, averageRatingTo, sortingField, sortingOrder)
       // console.log('=====')
    }, [])
    return (
        <>
            <Toolbar />
            
            <div className={styles.catalogContentContainer}>
                <Sidebar />
                <div className="container">
                    <CatalogBooks />
                </div>
            </div>
        </>
    )
}

export default Catalog;