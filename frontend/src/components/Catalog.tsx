import { FC, useEffect, useState } from 'react';
import Toolbar from './Layout/Toolbar/Toolbar';
import CatalogBooks from './Layout/CatalogBooks/CatalogBooks';
import Sidebar from './Layout/Sidebar/Sidebar';
import useCatalogFilterStore from '../store/useCatalogFilterStore';
import styles from '../style/Catalog.module.css';
import useCatalogStore from '../store/useCatalogStore';
import { CatalogToolsEnum } from '../@types/CatalogToolsEnum';
import FiltersService from '../service/FiltersService';
import CustomSearch from './UI/CustomSearch/CustomSearch';
import { IMessageCodeResponse } from '../@types/IMessageCodeResponse';
import MessagePopup from './UI/MessagePopup/MessagePopup';

const Catalog: FC = () => {
    const setGenresTitles = useCatalogFilterStore(state => state.setGenresTitles)

    const setProvidersTitles = useCatalogFilterStore(state => state.setProvidersTitles)

    const setStatusesTitles = useCatalogFilterStore(state => state.setStatusesTitles)

    const clickTool = useCatalogStore(state => state.clickTool)

    useEffect(() => {
        setAllGenres()
        setAllProviders()
        setAllStatuses()
        
        clickTool(CatalogToolsEnum.DEFAULT_NONE)
    }, [])

    const setAllGenres =  async () => {
        const genres = await FiltersService.getAllGenres()
        setGenresTitles(genres.map(genre => genre.genre))
    }

    const setAllProviders = async () => {
        const providers = await FiltersService.getAllProviders()
        setProvidersTitles(providers.map(provider => provider.name))
    }

    const setAllStatuses = async () => {
        const statuses = await FiltersService.getAllStatuses()
        setStatusesTitles(statuses.map(status => status.name))
    }

    const message = useCatalogStore(state => state.message)
    const code = useCatalogStore(state => state.code)

    useEffect(() => {
        if (message !== '') {
            const responsesArray = [...responses]
            responsesArray.push({ message, code})
            setResponses(responsesArray)
        }
    }, [message])

    const [responses, setResponses] = useState<IMessageCodeResponse[]>([])

    useEffect(() => {
        console.log(responses)
    }, [responses])
    
    return (
        <>
            <CustomSearch />
            <Toolbar />
            <div className={styles.catalogContentContainer}>
                <Sidebar />
                <div className="container">
                    <CatalogBooks />
                </div>
            </div>
            <div className='messagePopupContainer'>
                {responses.map(response => 
                    <MessagePopup message={response.message} code={response.code} />
                )}
            </div>
        </>
    )
}

export default Catalog;