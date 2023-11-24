import { FC, useEffect, useState } from 'react';
import CustomTable from './UI/CustomTable/CustomTable';
import CustomButton from './UI/CustomButton/CustomButton';
import styles from '../style/EmployeeBin.module.css';
import EmployeeBinService from '../service/EmployeeBinService';
import { EMPLOYEE_BIN_TABLE_HEADERS } from '../tableHeaders/employeeBinTableHeaders';
import MessagePopup from './UI/MessagePopup/MessagePopup';
import { IMessageCodeResponse } from '../@types/IMessageCodeResponse';
import { IBookEmployeeBin } from '../@types/IBookEmployeeBin';

const MyBooks: FC = () => {
    const [books, setBooks] = useState<IBookEmployeeBin[]>([]/*{
        fullName: '',
        books: [],
        // books: [{
        //     bookId: 11,
        //     title: 'test',
        //     author: 'test',
        //     genres: 'test',
        //     actionsName: 'test',
        //     actionsDate: '2023-12-12',
        //     returnDate: '2023-11-16'
        // },
        // {
        //     bookId: 22,
        //     title: 'test',
        //     author: 'test',
        //     genres: 'test',
        //     actionsName: 'test',
        //     actionsDate: '2023-12-14',
        //     returnDate: '2023-11-17'
        // },
        // {
        //     bookId: 33,
        //     title: 'test',
        //     author: 'test',
        //     genres: 'test',
        //     actionsName: 'test',
        //     actionsDate: '2023-12-16',
        //     returnDate: '2023-11-18'
        // },
        // {
        //     bookId: 33,
        //     title: 'test',
        //     author: 'test',
        //     genres: 'test',
        //     actionsName: 'test',
        //     actionsDate: '2023-12-16',
        //     returnDate: '2023-11-19'
        // },
        // {
        //     bookId: 33,
        //     title: 'test',
        //     author: 'test',
        //     genres: 'test',
        //     actionsName: 'test',
        //     actionsDate: '2023-12-16',
        //     returnDate: '2023-11-20'
        // },
        // {
        //     bookId: 33,
        //     title: 'test',
        //     author: 'test',
        //     genres: 'test',
        //     actionsName: 'test',
        //     actionsDate: '2023-12-16',
        //     returnDate: '2023-11-21'
        // },
        // {
        //     bookId: 33,
        //     title: 'test',
        //     author: 'test',
        //     genres: 'test',
        //     actionsName: 'test',
        //     actionsDate: '2023-12-16',
        //     returnDate: '2023-11-22'
        // },
        // {
        //     bookId: 33,
        //     title: 'test',
        //     author: 'test',
        //     genres: 'test',
        //     actionsName: 'test',
        //     actionsDate: '2023-12-16',
        //     returnDate: '2023-11-23'
        // },
        // {
        //     bookId: 33,
        //     title: 'test',
        //     author: 'test',
        //     genres: 'test',
        //     actionsName: 'test',
        //     actionsDate: '2023-12-16',
        //     returnDate: '2023-11-24'
        // },
        // {
        //     bookId: 33,
        //     title: 'test',
        //     author: 'test',
        //     genres: 'test',
        //     actionsName: 'test',
        //     actionsDate: '2023-12-16',
        //     returnDate: '2023-11-25'
        // }],
        pages: 0
    }*/)

     useEffect(() => {
        getBooksTaken()
    }, [])

    const getBooksTaken = async () => {
        const updatedBooks = await EmployeeBinService.getBooksTaken()
        updateBooksIdsSetAfterFetching(updatedBooks)
        restoreIsRowChecked(updatedBooks)
        setBooks(updatedBooks)
    }

    const updateBooksIdsSetAfterFetching = (updatedBooks: IBookEmployeeBin[]) => {
        if (updatedBooks !== undefined) {
            const booksIdSetUpdated = new Set<number>()
            updatedBooks?.forEach(book => {
                if (booksIdSet.has(book.bookId))
                    booksIdSetUpdated.add(book.bookId)
            })
            setBooksIdSet(booksIdSetUpdated)
            console.log(booksIdSetUpdated)
        }
    }

    const updateBooksIdSet = (value: boolean, tableRowIndex: number) => {
        if (books !== undefined) {
            updateIsRowChecked(value, tableRowIndex)
            if (value) {
                const booksIdSetUpdated = new Set(booksIdSet.add(books[tableRowIndex].bookId))
                setBooksIdSet(booksIdSetUpdated)
            }
            else {
                const booksIdSetUpdated = new Set(booksIdSet)
                booksIdSetUpdated.delete(books[tableRowIndex].bookId)
                setBooksIdSet(booksIdSetUpdated)
            }
        }
    }

    const updateIsRowChecked = (isChecked: boolean, index: number) => {
        const updatedIsRowChecked = [...isRowChecked]
        updatedIsRowChecked[index] = isChecked
        setIsRowChecked(updatedIsRowChecked)
    }

    const restoreIsRowChecked = (updatedBooks: IBookEmployeeBin[]) => {
        const updatedIsRowChecked: boolean[] = []
        updatedBooks.forEach(book => {
            if (booksIdSet.has(book.bookId))
                updatedIsRowChecked.push(true)
            else
                updatedIsRowChecked.push(false)
        })
        setIsRowChecked(updatedIsRowChecked)
    }

    const updateResponses = (response: IMessageCodeResponse) => {
        const responsesArray = [...responses]
        responsesArray.push(response)
        setResponses(responsesArray)
    }

    const returnBooks = async () => {
        await EmployeeBinService.returnBooks(Array.from(booksIdSet)).then(response => {
            updateResponses(response)
        })
        getBooksTaken()
    }
    const extendBooks = async () => {
        await EmployeeBinService.extendBooks(Array.from(booksIdSet)).then(response => {
            updateResponses(response)
        })
        await getBooksTaken()
    }
    const [responses, setResponses] = useState<IMessageCodeResponse[]>([])

    const [booksIdSet, setBooksIdSet] = useState(new Set<number>())
    const [isHeaderCheckboxChecked, setIsHeaderCheckboxChecked] = useState(false)
    const [isRowChecked, setIsRowChecked] = useState<boolean[]>([])

    const updateIsHeaderCheckboxChecked = (isChecked: boolean) => {
        setIsHeaderCheckboxChecked(isChecked)
        const updatedIsRowChecked = new Array(isRowChecked.length).fill(isChecked)
        setIsRowChecked(updatedIsRowChecked)
        if (isChecked) {
            const updatedBooksIdsSet = new Set(books.map(book => book.bookId))
            setBooksIdSet(updatedBooksIdsSet)
        }
        else
            setBooksIdSet(new Set())
    }

    useEffect(() => {
        checkAllIfAllRowsChecked()
    }, [isRowChecked])

    const checkAllIfAllRowsChecked = () => {
        let isCheckedAll = true
        if (isRowChecked?.length === 0)
            isCheckedAll = false
        else
            for(let i = 0; i < isRowChecked.length; i++) {
                if (!isRowChecked[i]) {
                    isCheckedAll = false
                    break
                }
            }
        setIsHeaderCheckboxChecked(isCheckedAll)
    }

    return (
        <>
            <div className="container">
                <div className={styles.buttonContainerEmployeeBinPage}>
                    <CustomButton text={'Вернуть'} styles={styles.customButtonEmployeeBinPage} onClick={() => returnBooks()} />
                    <CustomButton text={'Продлить'} styles={styles.customButtonEmployeeBinPage} onClick={() => extendBooks()} />
                </div>
                <CustomTable 
                    headerData={EMPLOYEE_BIN_TABLE_HEADERS} 
                    data={books} 
                    isCheckboxColumnHidden={false} 
                    hiddenColumns={new Set<number>().add(0)} 
                    tableTitle={'Взятые книги'} 
                    isHeaderCheckboxChecked={isHeaderCheckboxChecked}
                    isRowChecked={isRowChecked}
                    onCheckboxChanged={updateBooksIdSet} 
                    onSelectAllChanged={updateIsHeaderCheckboxChecked}
                />
            </div>
            <div className='messagePopupContainer'>
                {responses.map(response => 
                    <MessagePopup message={response.message} code={response.code} />
                )}
            </div>
        </>
    )
}

export default MyBooks;