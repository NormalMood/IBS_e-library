import { FC } from 'react';
import customTabStyles from '../CustomTab/CustomTab.module.css';

interface IFilterAndSortTabProps {
    text: string;
    additionalStyle: React.HTMLAttributes<any>;
    onClickCallback: () => void;
}

const FilterAndSortTab: FC<IFilterAndSortTabProps> = ({text, additionalStyle, onClickCallback}) => {
    return (
        <label 
            className={[customTabStyles.tabTitle, additionalStyle].join(' ')}
            onClick={() => onClickCallback()}
        >
            {text}
        </label>
    )
}

export default FilterAndSortTab;