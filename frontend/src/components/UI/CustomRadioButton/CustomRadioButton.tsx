import { FC } from 'react';
import styles from './CustomRadioButton.module.css';
import { CatalogSortingFieldsEnum } from '../../../@types/CatalogSortingFieldsEnum';

interface ICustomRadioButtonProps {
    id: any;
    selectedId: any;
    name: string;
    onClick: (value: any) => void;
    text: string;
}

const CustomRadioButton: FC<ICustomRadioButtonProps> = ({id, selectedId, name, onClick, text}) => {
    return (
        <label 
            onClick={() => onClick(id)}
            className={styles.customRadioButton}
        >
            <input 
                type='radio' 
                id={id} 
                name={name} 
                className={styles.defaultInput} 
                checked={id === selectedId}
            />
            <span className={styles.radiobuttonBorder}>
                <span className={styles.radiobuttonBody}>
                </span>
            </span>
            <span className={styles.radiobuttonText}>
                {text}
            </span>
        </label>
    )
}

export default CustomRadioButton;