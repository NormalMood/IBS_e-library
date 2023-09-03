import React, { FC, useEffect, useState } from 'react';
import CustomTable from './UI/CustomTable/CustomTable';
import CustomButton from './UI/CustomButton/CustomButton';
import styles from '../style/EmployeeBin.module.css';
import EmployeeBinService from '../service/EmployeeBinService';
import { IEmployeeBin } from '../@types/IEmployeeBin';
import { EMPLOYEE_BIN_TABLE_HEADERS } from '../tableHeaders/employeeBinTableHeaders';
import MessagePopup from './UI/MessagePopup/MessagePopup';

const MyBooks: FC = () => {
    const [books, setBooks] = useState<IEmployeeBin>({
        fullName: '',
        books: [/*{
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
        }*/],
        pages: 0
    })
     useEffect(() => {
        getBooksTaken()
    }, [])
    const getBooksTaken = async () => {
        setBooks(await EmployeeBinService.getBooksTaken())
    }
    let booksIdSet = new Set<number>()
    const test = (value: boolean, tableRowIndex: number) => {
        if (value)
            booksIdSet.add(books.books[tableRowIndex].bookId)
        else
            booksIdSet.delete(books.books[tableRowIndex].bookId)
    }
    const returnBooks = async () => {
      //  await EmployeeBinService.returnBooks(Array.from(booksIdSet))
     //   await getBooksTaken()
        const arr = [...responses]
        arr.push('Вернул')
        setResponses(arr)
    }
    const extendBooks = async () => {
        await EmployeeBinService.extendBooks(Array.from(booksIdSet))
        await getBooksTaken()
    }
    const [responses, setResponses] = useState<string[]>([])
    return (
        <>
            <div className="container">
                <div className={styles.buttonContainerEmployeeBinPage}>
                    <CustomButton text={'Вернуть'} styles={styles.customButtonEmployeeBinPage} onClick={() => returnBooks()} />
                    <CustomButton text={'Продлить'} styles={styles.customButtonEmployeeBinPage} onClick={() => extendBooks()} />
                </div>
                <CustomTable 
                    headerData={EMPLOYEE_BIN_TABLE_HEADERS} 
                    data={books.books} 
                    isCheckboxColumnHidden={false}
                    hiddenColumns={new Set<number>().add(0)}
                    tableTitle={'Взятые книги'} 
                    onCheckboxChanged={test} 
                />
            </div>
            <div className='messagePopupContainer'>
                {responses.map(response => 
                    <MessagePopup />
                )}
            </div>
        </>
    )
}

export default MyBooks;