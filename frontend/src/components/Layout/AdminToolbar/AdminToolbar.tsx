import { FC } from 'react';
import { TabsEnum } from "../../../@types/TabsEnum";
import useCatalogStore from "../../../store/useCatalogStore";
import CustomTab from "../../UI/CustomTab/CustomTab";
import toolbarStyles from '../Toolbar/Toolbar.module.css';

const AdminToolbar: FC = () => {
    const openTab = useCatalogStore(state => state.openTab)
    return (
        <section className={toolbarStyles.toolbarContainer}>
            <div className={toolbarStyles.tabsWrapper}>
                <div className={toolbarStyles.tabs}>
                    <CustomTab 
                        id={TabsEnum.ADMIN_PANEL_HISTORY} 
                        name={'topGroup'} 
                        text={'История'} 
                        onClickCallback={() => {
                            openTab(TabsEnum.ADMIN_PANEL_HISTORY)
                        }} 
                    />
                    <CustomTab 
                        id={TabsEnum.ADMIN_PANEL_RETURN_DATE_STATUS} 
                        name={'topGroup'} 
                        text={'Статус срока возврата'} 
                        onClickCallback={() => {
                            openTab(TabsEnum.ADMIN_PANEL_RETURN_DATE_STATUS)
                        }} 
                    />
                </div>
            </div>
            <hr className={toolbarStyles.horizontalLine} />
        </section>
    )
}

export default AdminToolbar;