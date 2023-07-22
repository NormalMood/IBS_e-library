import React, { FC, useEffect, useState } from 'react';
import styles from './CustomTable.module.css';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';

interface ICustomTableProps {
    headerData: string[];
    data: any[];
    isIdColumnHidden?: boolean;
    onCheckboxChanged: (value: boolean, tableRowIndex: number) => void;
}

const CustomTable: FC<ICustomTableProps> = ({headerData, data, isIdColumnHidden = true, onCheckboxChanged}) => {
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
                <caption className={styles.caption}>Взятые книги</caption>
                <thead className={[styles.tableHead, isIdColumnHidden && styles.hiddenIdColumn].join(' ')}>
                    <tr>
                        <th>
                            <CustomCheckbox 
                                additionalStyles={styles.customCheckboxTh} 
                                isChecked={isHeaderCheckboxChecked}
                                onChangeHandler={onSelectAllHandler}
                            />
                        </th>
                        {headerData.map(title => 
                            <th key={title}>{title}</th>
                        )}
                    </tr>
                </thead>
                <tbody className={[styles.tableBody, isIdColumnHidden && styles.hiddenIdColumn].join(' ')}>
                    {data && data.map((dataRow, index) => 
                            <tr key={dataRow}>
                                <td>
                                    <CustomCheckbox 
                                        additionalStyles={styles.customCheckboxTh} 
                                        tableRowIndex={index}
                                        isChecked={isRowChecked[index]}
                                        onChangeHandler={onCheckboxChangeHandler}
                                    />
                                </td>
                                {dataRow && Object.values(dataRow).map(dataCell =>
                                        <td key={dataCell as any}>{dataCell as string}</td>
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