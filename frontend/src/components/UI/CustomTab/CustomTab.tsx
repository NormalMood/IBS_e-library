import { FC, useState } from 'react';
import styles from './CustomTab.module.css';

interface ICustomTabProps {
    id: string;
    name: string;
    text: string;
    selectedId: string;
}

const CustomTab: FC<ICustomTabProps> = ({id, name, text, selectedId}) => {
    const [isSelectedId, setIsSelectedId] = useState(selectedId)
    return (
        <>
            <input 
                type="radio"
                className={styles.tab}
                name={name}
                id={id}
                checked={isSelectedId === id}
            />
            <label  
                htmlFor={id}
                className={styles.tabTitle}
                onClick={() => setIsSelectedId(id)}
            >
                {text}
            </label>
        </>
    )
}

export default CustomTab;