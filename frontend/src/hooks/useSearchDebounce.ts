import { useState, useEffect } from 'react';

const useSearchDebounce = (delay = 700) => {
    const [search, setSearch] = useState<any>(null)
    const [searchQuery, setSearchQuery] = useState<any>(null)
    useEffect(() => {
        const delayFn = setTimeout(() => setSearch(searchQuery), delay)
        return () => clearTimeout(delayFn)
    }, [searchQuery])
    return [search, setSearchQuery]
}

export default useSearchDebounce;