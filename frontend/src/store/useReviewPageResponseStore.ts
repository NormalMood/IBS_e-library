import { create } from "zustand";
import { IUseResponsesStoreState } from "../@types/IUseResponsesStoreState";

const useReviewPageResponseStore = create<IUseResponsesStoreState>((set) => ({
    message: '',
    setMessage: (message: string) => {
        set({ message })
    },
    code: -1,
    setCode: (code: number) => {
        set({ code })
    },
    setMessageCodeDefault: () => {
        set({ message: '' })
        set({ code: -1 })
    }
}))

export default useReviewPageResponseStore;