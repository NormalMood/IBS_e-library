import React, { FC, useEffect, useMemo, useState } from 'react';
import Toolbar from './Layout/Toolbar/Toolbar';
import CatalogBooks from './Layout/CatalogBooks/CatalogBooks';
import Sidebar from './Layout/Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import { IFilterCriteria } from '../@types/IFilterCriteria';
import useCatalogFilterStore from '../store/useCatalogFilterStore';
import useCatalogSortingStore from '../store/useCatalogSortingStore';

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

    useEffect(() => {
        setIsGenreChecked(new Array(genresTitles.length).fill(false))

        setIsProviderChecked(new Array(providersTitles.length).fill(false))

        setIsStatusChecked(new Array(statusesTitles.length).fill(false))

        resetFilters()
        resetSorting()
        resetSelectedSorting()
    }, [])
    return (
        <>
            <Toolbar />
            
            <div style={{display: 'flex', width: '100%', flexDirection: 'row', maxWidth: '1600px'}}>
            
            <Sidebar />
            <div className="container">
                {/* <div className="catalog-container" style={{display: 'flex', flexDirection: 'row', marginTop: '0'}}> */}
                    <CatalogBooks />
                {/* </div> */}
            </div>
            </div>
        </>
    )
}

export default Catalog;