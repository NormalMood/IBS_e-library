import { FC } from 'react';
import customTabStyles from '../CustomTab/CustomTab.module.css';

interface IFilterAndSortTabProps {
    text: string;
    additionalStyles: string;
    onClickCallback: () => void;
}

const FilterAndSortTab: FC<IFilterAndSortTabProps> = ({text, additionalStyles = null, onClickCallback}) => {
    return (
        <label 
            className={[customTabStyles.tabTitle, additionalStyles].join(' ')}
            onClick={() => onClickCallback()}
        >
            {text}
        </label>
    )
}

export default FilterAndSortTab;