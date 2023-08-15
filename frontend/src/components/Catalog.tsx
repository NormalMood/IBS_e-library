import React, { FC, useEffect } from 'react';
import Toolbar from './Layout/Toolbar/Toolbar';
import CatalogBooks from './Layout/CatalogBooks/CatalogBooks';
import Sidebar from './Layout/Sidebar/Sidebar';
import useCatalogFilterStore from '../store/useCatalogFilterStore';
import styles from '../style/Catalog.module.css';
import useCatalogStore from '../store/useCatalogStore';
import { CatalogToolsEnum } from '../@types/CatalogToolsEnum';
import FiltersService from '../service/FiltersService';

const Catalog: FC = () => {
    const genresTitles = useCatalogFilterStore(state => state.genresTitles)
    const setGenresTitles = useCatalogFilterStore(state => state.setGenresTitles)
    const setIsGenreChecked = useCatalogFilterStore(state => state.setIsGenreChecked)

    const providersTitles = useCatalogFilterStore(state => state.providersTitles)
    const setProvidersTitles = useCatalogFilterStore(state => state.setProvidersTitles)
    const setIsProviderChecked = useCatalogFilterStore(state => state.setIsProviderChecked)

    const statusesTitles = useCatalogFilterStore(state => state.statusesTitles)
    const setStatusesTitles = useCatalogFilterStore(state => state.setStatusesTitles)
    const setIsStatusChecked = useCatalogFilterStore(state => state.setIsStatusChecked)

    const clickTool = useCatalogStore(state => state.clickTool)

    useEffect(() => {
        setAllGenres()
        setAllProviders()
        setAllStatuses()
        
        clickTool(CatalogToolsEnum.DEFAULT_NONE)
    }, [])

    const setAllGenres =  async () => {
        const genres = await FiltersService.getAllGenres()
        setGenresTitles(genres)
    }

    const setAllProviders = async () => {
        const providers = await FiltersService.getAllProviders()
        setProvidersTitles(providers)
    }

    const setAllStatuses = async () => {
        const statuses = await FiltersService.getAllStatuses()
        setStatusesTitles(statuses)
    }
    
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