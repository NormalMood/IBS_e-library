import React, { FC } from 'react';
import styles from './CustomTable.module.css';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';
import { TableHeaderMap } from '../../../map/maps';

interface ICustomTableProps {
    data: any[],
    isIdColumnHide?: boolean
}

const CustomTable: FC<ICustomTableProps> = ({data, isIdColumnHide = true}) => {
    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <caption className={styles.caption}>Взятые книги</caption>
                <thead className={[styles.tableHead, isIdColumnHide && styles.hiddenIdColumn].join(' ')}>
                    <tr>
                        <th><CustomCheckbox additionalStyles={styles.customCheckboxTh} /></th>
                        {data[0] && Object.keys(data[0]).map(title => 
                            <th>{TableHeaderMap.get(title)}</th>
                        )}
                    </tr>
                </thead>
                <tbody className={[styles.tableBody, isIdColumnHide && styles.hiddenIdColumn].join(' ')}>
                    {data && data.map(dataRow => 
                            <tr>
                                <td><CustomCheckbox additionalStyles={styles.customCheckboxTh} /></td>
                                {dataRow && Object.values(dataRow).map(dataCell =>
                                        <td>{dataCell as any}</td>
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