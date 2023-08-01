import { FC, useState } from 'react';
import styles from './CustomTab.module.css';
import { TabsEnum } from '../../../@types/TabsEnum';
import useCatalogStore from '../../../store/useCatalogStore';

interface ICustomTabProps {
    id: TabsEnum;
    name: string;
    text: string;
    onClickCallback: () => void
}

const CustomTab: FC<ICustomTabProps> = ({id, name, text, onClickCallback}) => {
    const openedTab = useCatalogStore(state => state.openedTab)
    return (
        <>
            <input 
                type="radio"
                className={styles.tab}
                name={name}
                id={id.toString()}
                checked={openedTab === id}
            />
            <label  
                htmlFor={id.toString()}
                className={styles.tabTitle}
                onClick={() =>
                    onClickCallback()
                }
            >
                {text}
            </label>
        </>
    )
}

export default CustomTab;