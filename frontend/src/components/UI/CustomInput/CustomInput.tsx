import { FC } from 'react';
import styles from './CustomInput.module.css';

interface ICustomInputProps {
    value: string;
    onChangeHandler: (value: string) => void;
    placeholder: string;
    additionalStyles?: React.HTMLAttributes<any>;
}

const CustomInput: FC<ICustomInputProps> = ({placeholder, value, onChangeHandler, additionalStyles = null}) => {
    return (
        <input 
            type='text' 
            value={value}
            onChange={e => onChangeHandler(e.target.value) }
            placeholder={placeholder} 
            className={[styles.customInput, additionalStyles].join(' ')} 
        />
    )
}

export default CustomInput;