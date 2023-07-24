import { FC, ReactNode, useState, useEffect } from 'react';
import styles from './Sidebar.module.css';
import useCatalogStore from '../../../store/useCatalogStore';
import { CatalogToolsEnum } from '../../../@types/CatalogToolsEnum';

const Sidebar: FC = () => {
    const [isSidebarOpened, setIsSidebarOpened] = useState(false);
    const toolClicked = useCatalogStore(state => state.toolClicked)
    const clickTool = useCatalogStore(state => state.clickTool)
    const getSidebarStyles = () => {
        if (isSidebarOpened)
            return styles.sidebar
        return styles.sidebarClosed
    }
    useEffect(() => {
        if (toolClicked !== CatalogToolsEnum.DEFAULT_NONE)
            setIsSidebarOpened(true)
    }, [toolClicked])
    return (
        <aside className={getSidebarStyles()}>
            <div className={styles.closeImgWrapper}>
                <img 
                    src='/img/close.png' 
                    onClick={() => {
                        setIsSidebarOpened(false);
                        clickTool(CatalogToolsEnum.DEFAULT_NONE)
                    }} 
                    className={styles.sidebarCloseImg} 
                />
            </div>
            <div style={{border: '2px solid red'}}>
                sdf
            </div>
        </aside>
    )
}

export default Sidebar;