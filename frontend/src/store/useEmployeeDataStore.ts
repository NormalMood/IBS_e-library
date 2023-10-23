import { create } from 'zustand';

interface IUseEmployeeDataStoreState {

    fullName: string;
    setFullName: (fullName: string) => void;

    position: string;
    setPosition: (position: string) => void;

    isAdmin: boolean;
    setIsAdmin: (isAdmin: boolean) => void;

}

const useEmployeeDataStore = create<IUseEmployeeDataStoreState>((set) => ({
    fullName: '',
    setFullName: (fullName: string) => {
        set({ fullName: fullName })
    },
    position: '',
    setPosition: (position: string) => {
        set({ position: position })
    },
    isAdmin: false,
    setIsAdmin: (isAdmin: boolean) => {
        set({ isAdmin: isAdmin })
    }
}))

export default useEmployeeDataStore;