import React, { FC } from 'react';
import CustomTable from './UI/CustomTable/CustomTable';
import CustomButton from './UI/CustomButton/CustomButton';
import styles from '../style/EmployeeBin.module.css';
import CustomCheckbox from './UI/CustomCheckbox/CustomCheckbox';

const MyBooks: FC = () => {
    return (
        <>
            <div className={styles.buttonContainerEmployeeBinPage}>
                <CustomButton text={'Вернуть'} styles={styles.customButtonEmployeeBinPage} onClick={() => console.log('Вернуть')} />
                <CustomButton text={'Продлить'} styles={styles.customButtonEmployeeBinPage} onClick={() => console.log('Продлить')} />
            </div>
            <CustomTable />
        </>
    )
}

export default MyBooks;