import { FC, useEffect, useState } from 'react';
import AdminToolbar from './Layout/AdminToolbar/AdminToolbar';
import CustomTable from './UI/CustomTable/CustomTable';
import CustomInput from './UI/CustomInput/CustomInput';
import CustomCheckbox from './UI/CustomCheckbox/CustomCheckbox';
import useCatalogStore from '../store/useCatalogStore';
import { TabsEnum } from '../@types/TabsEnum';
import styles from '../style/AdminPanel.module.css';
import { HISTORY_ADMIN_PANEL_TABLE_HEADERS } from '../tableHeaders/historyAdminPanelTableHeaders';
import { IBookHistory } from '../@types/IBookHistory';
import AdminPanelService from '../service/AdminPanelService';
import { IBookExpiredStatuses } from '../@types/IBookExpiredStatuses';
import { EXPIRED_STATUSES_ADMIN_PANEL_TABLE_HEADERS } from '../tableHeaders/expiredStatusesAdminPanelTableHeaders';
import useSearchDebounce from '../hooks/useSearchDebounce';

const AdminPanel: FC = () => {
    const [isReturnDateExpired, setIsReturnDateExpired] = useState(false)
    const [searchQuery, setSearchQuery] = useSearchDebounce()
    const [bookId, setBookId] = useState('')

    const customInputChangeHandler = (value: string) => {
        setBookId(value)
        setSearchQuery(value)
    }

    useEffect(() => {
        getBooksHistoryBySearchQuery()
    }, [searchQuery])

    const getBooksHistoryBySearchQuery = async () => {
        if (searchQuery !== null && searchQuery !== '') {
            getHistoryByBookId(searchQuery)
        }
        else
            getHistory()
    }

    const openedTab = useCatalogStore(state => state.openedTab)
    const openTab = useCatalogStore(state => state.openTab)
    const [history, setHistory] = useState<IBookHistory>({
        objects: [],
        pages: 0
    })
    const [expiredStatuses, setExpiredStatuses] = useState<IBookExpiredStatuses>({
        objects: [],
        pages: 0
    })
    useEffect(() => {
        openTab(TabsEnum.ADMIN_PANEL_HISTORY)
        getHistory()
    }, [])
    useEffect(() => {
        if (openedTab === TabsEnum.ADMIN_PANEL_HISTORY)
            getBooksHistoryBySearchQuery()
        else if (openedTab === TabsEnum.ADMIN_PANEL_RETURN_DATE_STATUS)
            getExpiredStatuses()
    }, [openedTab])
    useEffect(() => {
        if (isReturnDateExpired)
            getExpiredStatusesOnly()
        else
            getExpiredStatuses()
    }, [isReturnDateExpired])
    const getTableTitle = () => {
        if (openedTab === TabsEnum.ADMIN_PANEL_HISTORY)
            return 'История'
        return 'Статус срока возврата'
    }
    const getHistory = async () => {
        setHistory(await AdminPanelService.getDetailedHistory())
    }
    const getHistoryByBookId = async (bookId: number) => {
        setHistory(await AdminPanelService.getDetailedHistoryByBookId(bookId))
    }
    const getExpiredStatuses = async () => {
        setExpiredStatuses(await AdminPanelService.getBinExpiredStatuses())
    }
    const getExpiredStatusesOnly = async () => {
        setExpiredStatuses(await AdminPanelService.getBinExpiredStatusesOnly())
    }
    return (
        <>
            <AdminToolbar />
            <div className="container">
                <div className={styles.adminPanelContent}>
                    <div className={styles.tableToolContainer}>
                        {openedTab === TabsEnum.ADMIN_PANEL_HISTORY &&
                            <CustomInput 
                                value={bookId}
                                placeholder={'id книги'} 
                                onChangeHandler={customInputChangeHandler} 
                            />
                        }
                        {openedTab === TabsEnum.ADMIN_PANEL_RETURN_DATE_STATUS &&
                            <>
                                <CustomCheckbox 
                                    isChecked={isReturnDateExpired} 
                                    onChangeHandler={() => setIsReturnDateExpired(!isReturnDateExpired)} 
                                />
                                <span>Срок возврата истек</span>
                            </>
                        }
                    </div>
                    {openedTab === TabsEnum.ADMIN_PANEL_HISTORY &&
                        <CustomTable 
                            headerData={HISTORY_ADMIN_PANEL_TABLE_HEADERS} 
                            data={history.objects} 
                            hiddenColumns={new Set<number>().add(0)} 
                            tableTitle={getTableTitle()} 
                            onCheckboxChanged={() => {}} 
                        />
                    }
                    {openedTab === TabsEnum.ADMIN_PANEL_RETURN_DATE_STATUS &&
                        <CustomTable 
                            headerData={EXPIRED_STATUSES_ADMIN_PANEL_TABLE_HEADERS} 
                            data={expiredStatuses.objects} 
                            hiddenColumns={isReturnDateExpired ? new Set<number>().add(0).add(9) : new Set<number>().add(0)} 
                            tableTitle={getTableTitle()} 
                            onCheckboxChanged={() => {}} 
                        />
                    }
                </div>
            </div>
        </>
    )
}

export default AdminPanel;