import { create } from 'zustand';
import { IBookCatalog } from '../@types/IBookCatalog';
import CatalogService from '../service/CatalogService';
import { TabsEnum } from '../@types/TabsEnum';
import { CatalogToolsEnum } from '../@types/CatalogToolsEnum';

interface IUseCatalogStoreState {
    books: IBookCatalog[];
    openedTab: TabsEnum;
    toolClicked: CatalogToolsEnum;
    getAllBooks: () => {};
    getTopTenBooks: () => {};
    openTab: (tab: TabsEnum) => void;
    clickTool: (tool: CatalogToolsEnum) => void;
}

const useCatalogStore = create<IUseCatalogStoreState>((set) => ({
    books: [],
    openedTab: TabsEnum.CATALOG_ALL_BOOKS,
    toolClicked: CatalogToolsEnum.DEFAULT_NONE,
    getAllBooks: async () => {
        const data = await CatalogService.getAllBooks()
        set({ books: data.objects })
    },
    getTopTenBooks: async () => {
        const data = await CatalogService.getTopTenBooks()
        set({ books: data.objects })
    },
    openTab: (tab: TabsEnum) => {
        set({ openedTab: tab })
    },
    clickTool: (tool: CatalogToolsEnum) => {
        set({ toolClicked: tool })
    }
}))

export default useCatalogStore;