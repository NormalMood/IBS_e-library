import React, { FC, useEffect, useState } from 'react';
import CustomTable from './UI/CustomTable/CustomTable';
import CustomButton from './UI/CustomButton/CustomButton';
import styles from '../style/EmployeeBin.module.css';
import CustomCheckbox from './UI/CustomCheckbox/CustomCheckbox';
import EmployeeBinService from '../service/EmployeeBinService';
import { IEmployeeBin } from '../@types/IEmployeeBin';

const MyBooks: FC = () => {
    const [books, setBooks] = useState<IEmployeeBin>({
        fullName: '',
        books: [],
        pages: 0
    })
     useEffect(() => {
        getBooksTaken()
    }, [])
    const getBooksTaken = async () => {
        setBooks(await EmployeeBinService.getBooksTaken())
    }
    return (
        <>
            <div className={styles.buttonContainerEmployeeBinPage}>
                <CustomButton text={'Вернуть'} styles={styles.customButtonEmployeeBinPage} onClick={() => console.log('Вернуть')} />
                <CustomButton text={'Продлить'} styles={styles.customButtonEmployeeBinPage} onClick={() => console.log('Продлить')} />
            </div>
            <CustomTable data={books.books} />
        </>
    )
}

export default MyBooks;