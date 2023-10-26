import { useEffect, useRef } from 'react';

export const useObserver = (element: React.RefObject<Element>, canLoad: boolean, isItemsLoading: boolean, callback: () => void) => {
    const observer = useRef<IntersectionObserver | null>(null)
    useEffect(() => {
        if (isItemsLoading)
            return
        if (observer.current)
            observer.current.disconnect()
        const callbackByCondition = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            if (entries[0].isIntersecting && canLoad) {
                callback()
                console.log('observer')
            }
        }
        observer.current = new IntersectionObserver(callbackByCondition)
        if (element.current !== null)
            observer.current.observe(element.current)
    }, [isItemsLoading])
}