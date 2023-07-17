import { createContext } from 'react';

export const AdditionalHeaderContext = createContext({
    isAdditionalHeaderHidden: false,
    setIsAdditionalHeaderHidden: (value: boolean) => {}
})