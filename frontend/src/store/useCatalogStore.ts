import { create } from 'zustand';
import { IBookCatalog } from '../@types/IBookCatalog';
import CatalogService from '../service/CatalogService';

interface IUseCatalogStoreState {
    books: IBookCatalog[];
    getAllBooks: () => {};
    getTopTenBooks: () => {}
}

const useCatalogStore = create<IUseCatalogStoreState>((set) => ({
    books: [],
    getAllBooks: async () => {
        const data = await CatalogService.getAllBooks()
        set({ books: data.objects })
    },
    getTopTenBooks: async () => {
        const data = await CatalogService.getTopTenBooks()
        set({ books: data.objects })
    }
}))

export default useCatalogStore;