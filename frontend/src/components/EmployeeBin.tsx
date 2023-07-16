import React, { FC, useEffect, useState } from 'react';
import CustomTable from './UI/CustomTable/CustomTable';
import CustomButton from './UI/CustomButton/CustomButton';
import styles from '../style/EmployeeBin.module.css';
import EmployeeBinService from '../service/EmployeeBinService';
import { IEmployeeBin } from '../@types/IEmployeeBin';

const MyBooks: FC = () => {
    const [books, setBooks] = useState<IEmployeeBin>({
        fullName: '',
        books: [{
            bookId: 11,
            title: 'test',
            author: 'test',
            genres: 'test',
            actionsName: 'test',
            actionsDate: '2023-12-12',
            returnDate: '2023-12-13'
        },
        {
            bookId: 22,
            title: 'test',
            author: 'test',
            genres: 'test',
            actionsName: 'test',
            actionsDate: '2023-12-14',
            returnDate: '2023-12-15'
        },
        {
            bookId: 33,
            title: 'test',
            author: 'test',
            genres: 'test',
            actionsName: 'test',
            actionsDate: '2023-12-16',
            returnDate: '2023-12-17'
        }],
        pages: 0
    })
     useEffect(() => {
       // getBooksTaken()
    }, [])
    const getBooksTaken = async () => {
        setBooks(await EmployeeBinService.getBooksTaken())
    }
    let set = new Set<number>()
    const test = (value: boolean, tableRowIndex: number) => {
        if (value)
            set.add(books.books[tableRowIndex].bookId)
        else
            set.delete(books.books[tableRowIndex].bookId)
    }
    //request in service
    const returnBooks = () => {
        console.log(set)
    }
    //request in service
    const extendBooks = () => {
        console.log(set)
    }
    return (
        <>
            <div className={styles.buttonContainerEmployeeBinPage}>
                <CustomButton text={'Вернуть'} styles={styles.customButtonEmployeeBinPage} onClick={() => returnBooks()} />
                <CustomButton text={'Продлить'} styles={styles.customButtonEmployeeBinPage} onClick={() => extendBooks()} />
            </div>
            <CustomTable data={books.books} onCheckboxChanged={test} />
        </>
    )
}

export default MyBooks;