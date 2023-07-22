import { FC } from 'react';
import customTabStyles from '../CustomTab/CustomTab.module.css';
import styles from './FilterAndSortTab.module.css';

interface IFilterAndSortTabProps {
    text: string;
}

const FilterAndSortTab: FC<IFilterAndSortTabProps> = ({text}) => {
    return (
        <label className={[customTabStyles.tabTitle, styles.filterTab].join(' ')}>
            {text}
        </label>
    )
}

export default FilterAndSortTab;