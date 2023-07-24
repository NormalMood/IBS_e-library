import { FC } from 'react';
import customTabStyles from '../CustomTab/CustomTab.module.css';
import styles from './FilterAndSortTab.module.css';

interface IFilterAndSortTabProps {
    text: string;
    onClickCallback: () => void;
}

const FilterAndSortTab: FC<IFilterAndSortTabProps> = ({text, onClickCallback}) => {
    return (
        <label 
            className={[customTabStyles.tabTitle, styles.filterTab].join(' ')}
            onClick={() => onClickCallback()}
        >
            {text}
        </label>
    )
}

export default FilterAndSortTab;