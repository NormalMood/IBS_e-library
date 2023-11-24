import { FC, useEffect, useState } from 'react';
import AdminToolbar from './Layout/AdminToolbar/AdminToolbar';
import CustomTable from './UI/CustomTable/CustomTable';
import CustomInput from './UI/CustomInput/CustomInput';
import CustomCheckbox from './UI/CustomCheckbox/CustomCheckbox';
import useCatalogStore from '../store/useCatalogStore';
import { TabsEnum } from '../@types/TabsEnum';
import styles from '../style/AdminPanel.module.css';
import { HISTORY_ADMIN_PANEL_TABLE_HEADERS } from '../tableHeaders/historyAdminPanelTableHeaders';
import AdminPanelService from '../service/AdminPanelService';
import { EXPIRED_STATUSES_ADMIN_PANEL_TABLE_HEADERS } from '../tableHeaders/expiredStatusesAdminPanelTableHeaders';
import useSearchDebounce from '../hooks/useSearchDebounce';
import MessagePopup from './UI/MessagePopup/MessagePopup';
import { IMessageCodeResponse } from '../@types/IMessageCodeResponse';
import customInputStyle from './UI/CustomInput/CustomInput.module.css';
import { OK_RESPONSE_CODE } from '../api/axiosInstance';
import { IHistory } from '../@types/IHistory';
import { IExpiredStatuses } from '../@types/IExpiredStatuses';

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
        else { 
            getHistory()
            setIsLastResponseError(false)
        }
    }

    const openedTab = useCatalogStore(state => state.openedTab)
    const openTab = useCatalogStore(state => state.openTab)
    const [history, setHistory] = useState<IHistory[]>([])
    const [expiredStatuses, setExpiredStatuses] = useState<IExpiredStatuses[]>([])
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
        return 'Учет'
    }
    const getHistory = async () => {
        setHistory(await AdminPanelService.getDetailedHistory())
    }
    const getHistoryByBookId = async (bookId: number) => {
        setIsLastResponseError(false)
        await AdminPanelService.getDetailedHistoryByBookId(bookId).then(response => {
            if ((response as IMessageCodeResponse).message)
                updateResponses(response as IMessageCodeResponse)
            else if ((response as IHistory[]))
                setHistory(response as IHistory[])
        })
    }
    const getExpiredStatuses = async () => {
        setExpiredStatuses(await AdminPanelService.getBinExpiredStatuses())
    }
    const getExpiredStatusesOnly = async () => {
        setExpiredStatuses(await AdminPanelService.getBinExpiredStatusesOnly())
    }

    const [responses, setResponses] = useState<IMessageCodeResponse[]>([])

    const [isLastResponseError, setIsLastResponseError] = useState(false)

    const updateResponses = (response: IMessageCodeResponse) => {
        const responsesArray = [...responses]
        responsesArray.push(response)
        setResponses(responsesArray)
    }

    const getCustomInputAdditionalStyle = () => {
        if (isLastResponseError)
            return [styles.adminPanelCustomInput, customInputStyle.invalidCustomInput].join(' ')
        return styles.adminPanelCustomInput
    }

    useEffect(() => {
        if (responses.length > 0 && responses[responses.length - 1]?.code !== OK_RESPONSE_CODE)
            setIsLastResponseError(true)
    }, [responses])

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
                                additionalStyles={getCustomInputAdditionalStyle()}
                            />
                        }
                        {openedTab === TabsEnum.ADMIN_PANEL_RETURN_DATE_STATUS &&
                            <>
                                <CustomCheckbox 
                                    isChecked={isReturnDateExpired} 
                                    onChangeHandler={() => setIsReturnDateExpired(!isReturnDateExpired)} 
                                />
                                <span>Срок истек</span>
                            </>
                        }
                    </div>
                    {openedTab === TabsEnum.ADMIN_PANEL_HISTORY &&
                        <CustomTable 
                            headerData={HISTORY_ADMIN_PANEL_TABLE_HEADERS} 
                            data={history} 
                            hiddenColumns={new Set<number>().add(0)} 
                            tableTitle={getTableTitle()} 
                            onCheckboxChanged={() => {}} 
                        />
                    }
                    {openedTab === TabsEnum.ADMIN_PANEL_RETURN_DATE_STATUS &&
                        <CustomTable 
                            headerData={EXPIRED_STATUSES_ADMIN_PANEL_TABLE_HEADERS} 
                            data={expiredStatuses} 
                            hiddenColumns={new Set<number>().add(0).add(9)} 
                            tableTitle={getTableTitle()} 
                            onCheckboxChanged={() => {}} 
                        />
                    }
                </div>
            </div>
            <div className='messagePopupContainer'>
                {responses.map(response => 
                    <MessagePopup message={response.message} code={response.code} />
                )}
            </div>
        </>
    )
}

export default AdminPanel;