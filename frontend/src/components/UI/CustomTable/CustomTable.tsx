import React, { FC } from 'react';
import styles from './CustomTable.module.css';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';

const CustomTable: FC = () => {
    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <caption className={styles.caption}>Взятые книги</caption>
                <thead className={styles.tableHead}>
                    <tr>
                        <th><CustomCheckbox additionalStyles={styles.customCheckboxTh} /></th>
                        <th>Название</th>
                        <th>Автор</th>
                        <th>Жанр</th>
                        <th>Действие</th>
                        <th>Дата</th>
                        <th>Дата возврата</th>
                    </tr>
                </thead>
                <tbody className={styles.tableBody}>
                    <tr>
                        <td><CustomCheckbox additionalStyles={styles.customCheckboxTh} /></td>
                        <td>Данные</td>
                        <td>Данные</td>
                        <td>Данные</td>
                        <td>Данные</td>
                        <td>Дата</td>
                        <td>Дата возврата</td>
                    </tr>
                    <tr>
                        <td><CustomCheckbox additionalStyles={styles.customCheckboxTh} /></td>
                        <td>Данные</td>
                        <td>Данные</td>
                        <td>Данные</td>
                        <td>Данные</td>
                        <td>Дата</td>
                        <td>Дата возврата</td>
                    </tr>
                    <tr>
                        <td><CustomCheckbox additionalStyles={styles.customCheckboxTh} /></td>
                        <td>Данные</td>
                        <td>Данные</td>
                        <td>Данные</td>
                        <td>Данные</td>
                        <td>Дата</td>
                        <td>Дата возврата</td>
                    </tr>
                    <tr>
                        <td><CustomCheckbox additionalStyles={styles.customCheckboxTh} /></td>
                        <td>Данные</td>
                        <td>Данные</td>
                        <td>Данные</td>
                        <td>Данные</td>
                        <td>Дата</td>
                        <td>Дата возврата</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default CustomTable;