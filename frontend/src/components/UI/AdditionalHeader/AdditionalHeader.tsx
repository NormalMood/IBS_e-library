import CustomTab from '../CustomTab/CustomTab';
import styles from './AdditionalHeader.module.css';

const AdditionalHeader = () => {
    return (
        <>
            <div>
                    Search
            </div>
            <div className={styles.tabsWrapper}>
                <div className={styles.tabs}>
                    <CustomTab id={'1'} name={'topGroup'} text={'Все книги'} selectedId={'1'} />
                    <CustomTab id={'2'} name={'topGroup'} text={'Топ 10'} selectedId={'1'} />
                </div>
            </div>
            <hr style={{background: '#CCD3F5', height: '2px', border: 'none'}} />
                {/* <CustomTab id={'1'} name={'name2'} text={'Сортировка'} selectedId={'1'}/>
                <CustomTab id={'2'} name={'name2'} text={'Фильтр'} selectedId={'1'} /> */}
        </>
    )
}

export default AdditionalHeader;