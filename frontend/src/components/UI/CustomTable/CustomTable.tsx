import React, { FC, useEffect, useState } from 'react';
import styles from './CustomTable.module.css';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';
import { BooleanMap } from '../../../map/BooleanMap';
import { getDateForTable, isLessWeekLeftBeforeReturning, isReturnDateExpired } from '../../../utils/DateHandler';

interface ICustomTableProps {
    headerData: string[];
    data: any[];
    tableTitle: string;
    isCheckboxColumnHidden?: boolean;
    hiddenColumns: Set<number>;
    onCheckboxChanged: (value: boolean, tableRowIndex: number) => void;
}

const CustomTable: FC<ICustomTableProps> = ({headerData, data, tableTitle, isCheckboxColumnHidden = true, hiddenColumns, onCheckboxChanged}) => {
    const tableRowCheckboxStates: boolean[] = new Array(data?.length).fill(false)
    const [isHeaderCheckboxChecked, setIsHeaderCheckboxChecked] = useState(false)
    const [isRowChecked, setIsRowChecked] = useState(tableRowCheckboxStates)
    const onSelectAllHandler = (isChecked: boolean, tableRowIndex: number) => {
        setIsHeaderCheckboxChecked(isChecked)
        setIsRowChecked(tableRowCheckboxStates.fill(isChecked))
    }
    const onCheckboxChangeHandler = (isChecked: boolean, tableRowIndex: number) => {
        setIsHeaderCheckboxChecked(false)
        const tableRowCheckboxStatesUpdated = [...isRowChecked]
        tableRowCheckboxStatesUpdated[tableRowIndex] = isChecked
        setIsRowChecked(tableRowCheckboxStatesUpdated)
    }
    useEffect(() => {
        let isSelectedAll = true
        isRowChecked.map((value, index) => {
            if (!value)
                isSelectedAll = false
            onCheckboxChanged(value, index)
        })
        if (!isRowChecked?.length)
            isSelectedAll = false
        setIsHeaderCheckboxChecked(isSelectedAll)
    }, [isRowChecked])
    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <caption className={styles.caption}>{tableTitle}</caption>
                <thead className={styles.tableHead}>
                    <tr>
                        {!isCheckboxColumnHidden &&
                            <th className={styles.checkboxColumnHeader}>
                                <CustomCheckbox 
                                    additionalStyles={styles.customCheckboxTh} 
                                    isChecked={isHeaderCheckboxChecked}
                                    onChangeHandler={onSelectAllHandler}
                                />
                            </th>
                        }
                        {headerData.map((title, index) => {
                            return <>
                            {!hiddenColumns.has(index) &&
                                <th key={title}>{title}</th>
                            }</>}
                        )}
                    </tr>
                </thead>
                <tbody className={styles.tableBody}>
                    {data && data.map((dataRow, index) => 
                            <tr key={index}>
                                {!isCheckboxColumnHidden &&
                                    <td className={styles.checkboxColumnRow}>
                                        <CustomCheckbox 
                                            additionalStyles={styles.customCheckboxTh} 
                                            tableRowIndex={index}
                                            isChecked={isRowChecked[index]}
                                            onChangeHandler={onCheckboxChangeHandler}
                                        />
                                    </td>
                                }
                                {dataRow && Object.values(dataRow as any).map((dataCell, dataRowIndex) => 
                                    !hiddenColumns.has(dataRowIndex) ?      
                                            <>  
                                                {headerData[dataRowIndex].includes('Дата')
                                                    ?
                                                        <>
                                                            {headerData[dataRowIndex].includes('Дата возврата')
                                                                ?
                                                                    <td
                                                                        className={
                                                                            isReturnDateExpired(dataCell as string) 
                                                                                ? 
                                                                                    styles.returnDateExpiredCell 
                                                                                : 
                                                                                    isLessWeekLeftBeforeReturning(dataCell as string) 
                                                                                        ? 
                                                                                            styles.weekLeftCell 
                                                                                        : 
                                                                                            {}
                                                                            } 
                                                                        key={dataRowIndex}
                                                                    >
                                                                        {getDateForTable(dataCell as string)}
                                                                    </td>
                                                                :
                                                                    <td key={dataRowIndex}>{getDateForTable(dataCell as string)}</td>
                                                               }
                                                        </>
                                                    :
                                                        <td key={dataRowIndex}>{dataCell as string}</td>
                                                }
                                            </>
                                        :
                                            null
                                    )}
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default CustomTable;