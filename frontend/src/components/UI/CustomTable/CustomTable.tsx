import React, { FC, useEffect, useState } from 'react';
import styles from './CustomTable.module.css';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';
import { getDateForTable, isLessWeekLeftBeforeReturning, isReturnDateExpired } from '../../../utils/DateHandler';

interface ICustomTableProps {
    headerData: string[];
    data: any[] | undefined;
    isHeaderCheckboxChecked?: boolean;
    isRowChecked?: boolean[];
    tableTitle: string;
    isCheckboxColumnHidden?: boolean;
    hiddenColumns: Set<number>;
    onCheckboxChanged?: (isChecked: boolean, tableRowIndex: number) => void;
    onSelectAllChanged?: (isChecked: boolean) => void;
}

const CustomTable: FC<ICustomTableProps> = ({
    headerData, data, isHeaderCheckboxChecked, isRowChecked, 
    tableTitle, isCheckboxColumnHidden = true, hiddenColumns, onCheckboxChanged, onSelectAllChanged}) => {
    // useEffect(() => {
    //     let isSelectedAll = true
    //     isRowChecked.map((value, index) => {
    //         if (!value)
    //             isSelectedAll = false
    //         //console.log(index, ' ', value)
    //         onCheckboxChanged(value, index)
    //     })
    //     if (!isRowChecked?.length)
    //         isSelectedAll = false
    //     setIsHeaderCheckboxChecked(isSelectedAll)
    // }, [isRowChecked])
    const onSelectAllChangedHandler = (isChecked: boolean, index: number) => {
        onSelectAllChanged!(isChecked)
    }

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
                                    onChangeHandler={onSelectAllChangedHandler}
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
                                            isChecked={isRowChecked![index]}
                                            onChangeHandler={onCheckboxChanged!}
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