import { FC, useState } from 'react';
import styles from './CustomTab.module.css';

interface ICustomTabProps {
    id: string;
    name: string;
    text: string;
    selectedId: string;
    onClickCallback: () => void
}

const CustomTab: FC<ICustomTabProps> = ({id, name, text, selectedId, onClickCallback}) => {
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
                onClick={() => {
                    setIsSelectedId(id)
                    onClickCallback()
                }}
            >
                {text}
            </label>
        </>
    )
}

export default CustomTab;