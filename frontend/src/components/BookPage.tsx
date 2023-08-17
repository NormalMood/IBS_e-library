import { FC } from 'react';
import { useParams } from 'react-router-dom';

const BookPage: FC = () => {
    const { id } = useParams()
    return (
        <>
            {id}
        </>
    )
}

export default BookPage;