import { FC, useEffect } from 'react';
import AdminToolbar from './Layout/AdminToolbar/AdminToolbar';
import CustomTable from './UI/CustomTable/CustomTable';
import CustomInput from './UI/CustomInput/CustomInput';
import CustomCheckbox from './UI/CustomCheckbox/CustomCheckbox';
import useCatalogStore from '../store/useCatalogStore';
import { TabsEnum } from '../@types/TabsEnum';
import styles from '../style/AdminPanel.module.css';

const AdminPanel: FC = () => {
    const headerData = ['id', 'id сотрудника', 'ФИО', 'id книги', 'Название', 'Автор', 'Действие', 'Дата']
    const openedTab = useCatalogStore(state => state.openedTab)
    const openTab = useCatalogStore(state => state.openTab)
    useEffect(() => {
        openTab(TabsEnum.ADMIN_PANEL_HISTORY)
    }, [])
    const getTableTitle = () => {
        if (openedTab === TabsEnum.ADMIN_PANEL_HISTORY)
            return 'История'
        return 'Статус срока возврата'
    }
    return (
        <>
            <AdminToolbar />
            <div className="container">
                <div className={styles.adminPanelContent}>
                    <div className={styles.tableToolContainer}>
                        {openedTab === TabsEnum.ADMIN_PANEL_HISTORY &&
                            <CustomInput value={''} placeholder={'id книги'} onChangeHandler={() => {}} />
                        }
                        {openedTab === TabsEnum.ADMIN_PANEL_RETURN_DATE_STATUS &&
                            <>
                                <CustomCheckbox isChecked={false} onChangeHandler={() => {}} />
                                <span>Срок возврата истек</span>
                            </>
                        }
                    </div>
                    <CustomTable headerData={headerData} data={[]} hiddenColumns={new Set<number>().add(0)} tableTitle={getTableTitle()} onCheckboxChanged={() => {}} />
                </div>
            </div>
        </>
    )
}

export default AdminPanel;