import React, { FC } from 'react';
import styles from './CustomCheckbox.module.css';

interface CustomCheckboxProps {
    additionalStyles?: React.HTMLAttributes<any>;
    isChecked: boolean | undefined;
    tableRowIndex?: number;
    onChangeHandler: (isChecked: boolean, tableRowIndex: number ) => void;
}

const CustomCheckbox: FC<CustomCheckboxProps> = ({additionalStyles = null, 
        isChecked, 
        tableRowIndex = 0, 
        onChangeHandler}) => {
    return (
        <label className={[styles.customCheckbox, additionalStyles].join(' ')}>
            <input 
                type="checkbox" 
                checked={isChecked} 
                onChange={e => onChangeHandler(e.target.checked, tableRowIndex)} 
                className={styles.hiddenCheckbox} 
            />
            <span className={styles.checkbox}>
                <svg className={styles.checkmark} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ffffff" d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
            </span>
        </label>
    )
}

export default CustomCheckbox;