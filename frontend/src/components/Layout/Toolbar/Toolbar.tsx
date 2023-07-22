import CatalogService from '../../../service/CatalogService';
import useCatalogStore from '../../../store/useCatalogStore';
import CustomTab from '../../UI/CustomTab/CustomTab';
import FilterAndSortTab from '../../UI/FilterAndSortTab/FilterAndSortTab';
import styles from './Toolbar.module.css';

const Toolbar = () => {
    const getAllBooks = useCatalogStore(state => state.getAllBooks)
    const getTopTenBooks = useCatalogStore(state => state.getTopTenBooks)
    return (
        <section className={styles.toolbarContainer}>
            <div>
                    Search
            </div>
            <div className={styles.tabsWrapper}>
                <div className={styles.tabs}>
                    <CustomTab id={'1'} name={'topGroup'} text={'Все книги'} selectedId={'1'} onClickCallback={getAllBooks} />
                    <CustomTab id={'2'} name={'topGroup'} text={'Топ 10'} selectedId={'1'} onClickCallback={getTopTenBooks} />
                </div>
            </div>
            <hr style={{background: '#CCD3F5', height: '2px', border: 'none'}} />
            <div className={styles.tabsWrapper}>
                <div className={styles.tabs}>
                    <FilterAndSortTab text={'Сортировка'} />
                    <FilterAndSortTab text={'Фильтр'} />
                </div>
            </div>
        </section>
    )
}

export default Toolbar;