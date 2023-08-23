import { FC } from 'react';
import styles from './CustomTextarea.module.css';

interface ICustomTextareaProps {
    text: string;
    onChangeHandler: (text: string) => void;
    placeholder: string;
    additionalStyles?: React.HTMLAttributes<any>;
}

const CustomTextarea: FC<ICustomTextareaProps> = ({text, onChangeHandler, placeholder, additionalStyles = null}) => {
    return (
        <textarea 
            value={text} 
            className={[styles.customTextarea, additionalStyles].join(' ')} 
            onChange={e => onChangeHandler(e.target.value)} 
            placeholder={placeholder}
        />
    )
}

export default CustomTextarea;