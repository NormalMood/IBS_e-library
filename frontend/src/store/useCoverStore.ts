import { create } from 'zustand';

interface IUseCoverStoreState {
    cover: File | null;
    setCover: (cover: File | null) => void;
}

const useCoverStore = create<IUseCoverStoreState>((set) => ({
    cover: null,
    setCover: (cover: File | null) => {
        set({ cover: cover })
    }
}))

export default useCoverStore;