import { useState, useEffect } from 'react';

const getIsLessThan = (width: number) => window.innerWidth < width

const useWindowWidth = (width : number) => {
    const [isWidthLess, setIsWidthLess] = useState(getIsLessThan(width))

    useEffect(() => {
        const onResize = () => {
            setIsWidthLess(getIsLessThan(width))
        }
        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [])

    return isWidthLess
}

export default useWindowWidth;