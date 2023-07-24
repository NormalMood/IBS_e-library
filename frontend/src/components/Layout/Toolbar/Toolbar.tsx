import { CatalogToolsEnum } from '../../../@types/CatalogToolsEnum';
import { TabsEnum } from '../../../@types/TabsEnum';
import CatalogService from '../../../service/CatalogService';
import useCatalogStore from '../../../store/useCatalogStore';
import CustomTab from '../../UI/CustomTab/CustomTab';
import FilterAndSortTab from '../../UI/FilterAndSortTab/FilterAndSortTab';
import styles from './Toolbar.module.css';

const Toolbar = () => {
    const getAllBooks = useCatalogStore(state => state.getAllBooks)
    const getTopTenBooks = useCatalogStore(state => state.getTopTenBooks)
    const openTab = useCatalogStore(state => state.openTab)
    const clickTool = useCatalogStore(state => state.clickTool)
    return (
        <section className={styles.toolbarContainer}>
            <div>
                    Search
            </div>
            <div className={styles.tabsWrapper}>
                <div className={styles.tabs}>
                    <CustomTab 
                        id={'1'} 
                        name={'topGroup'} 
                        text={'Все книги'} 
                        selectedId={'1'} 
                        onClickCallback={() => {
                            getAllBooks(); 
                            openTab(TabsEnum.CATALOG_ALL_BOOKS)
                        }} 
                    />
                    <CustomTab 
                        id={'2'} 
                        name={'topGroup'} 
                        text={'Топ 10'} 
                        selectedId={'1'} 
                        onClickCallback={() => {
                            getTopTenBooks();
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
                        onClickCallback={() => clickTool(CatalogToolsEnum.CATALOG_SORT)}
                    />
                    <FilterAndSortTab 
                        text={'Фильтр'} 
                        onClickCallback={() => clickTool(CatalogToolsEnum.CATALOG_FILTER)}
                    />
                </div>
            </div>
        </section>
    )
}

export default Toolbar;