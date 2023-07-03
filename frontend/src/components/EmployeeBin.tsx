import React, { FC } from 'react';
import CustomTable from './UI/CustomTable/CustomTable';
import CustomButton from './UI/CustomButton/CustomButton';

const MyBooks: FC = () => {
    return (
        <>
            <CustomButton text={'Вернуть'} />
            <CustomButton text={'Продлить'} />
            <CustomTable />
        </>
    )
}

export default MyBooks;