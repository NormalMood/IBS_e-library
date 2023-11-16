import { create } from 'zustand';

interface IUseEmployeeDataStoreState {

    id: number;
    setId: (id: number) => void;

    fullName: string;
    setFullName: (fullName: string) => void;

    position: string;
    setPosition: (position: string) => void;

    isAdmin: boolean;
    setIsAdmin: (isAdmin: boolean) => void;

    pictureName: string;
    setPictureName: (pictureName: string) => void;

}

const useEmployeeDataStore = create<IUseEmployeeDataStoreState>((set) => ({
    id: -1,
    setId: (id: number) => {
        set({ id })
    },
    fullName: '',
    setFullName: (fullName: string) => {
        set({ fullName })
    },
    position: '',
    setPosition: (position: string) => {
        set({ position })
    },
    isAdmin: false,
    setIsAdmin: (isAdmin: boolean) => {
        set({ isAdmin })
    },
    pictureName: '',
    setPictureName: (pictureName: string) => {
        set({ pictureName} )
    }
}))

export default useEmployeeDataStore;