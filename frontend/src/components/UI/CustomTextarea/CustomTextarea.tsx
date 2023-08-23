import { FC } from 'react';
import styles from './CustomTextarea.module.css';

interface ICustomTextareaProps {
    text: string;
    onChangeHandler: (text: string) => void;
    additionalStyles?: React.HTMLAttributes<any>;
}

const CustomTextarea: FC<ICustomTextareaProps> = ({text, onChangeHandler, additionalStyles = null}) => {
    return (
        <textarea 
            value={text} 
            className={[styles.customTextarea, additionalStyles].join(' ')} 
            onChange={e => onChangeHandler(e.target.value)} 
            placeholder='Ваши мысли о книге*'
        />
    )
}

export default CustomTextarea;