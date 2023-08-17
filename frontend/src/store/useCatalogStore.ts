import { create } from 'zustand';
import { IBookCatalog } from '../@types/IBookCatalog';
import CatalogService from '../service/CatalogService';
import { TabsEnum } from '../@types/TabsEnum';
import { CatalogToolsEnum } from '../@types/CatalogToolsEnum';
import CatalogToolsService from '../service/CatalogToolsService';
import useCatalogFilterStore from './useCatalogFilterStore';
import { FilterKeysEnum } from '../@types/FilterKeysEnum';
import { CatalogSortingFieldsEnum } from '../@types/CatalogSortingFieldsEnum';
import { SortingOrdersEnum } from '../@types/SortingOrdersEnum';

interface IUseCatalogStoreState {
    books: IBookCatalog[];
    setBooks: (books: IBookCatalog[]) => void;
    openedTab: TabsEnum;
    toolClicked: CatalogToolsEnum;
    getAllBooks: (
        filterCriteria: Map<FilterKeysEnum, Set<string>>, 
        averageRatingFrom: string, 
        averageRatingTo: string,
        sortingField: CatalogSortingFieldsEnum,
        sortingOrder: SortingOrdersEnum
    ) => {};
    getTopTenBooks: (
        filterCriteria: Map<FilterKeysEnum, Set<string>>, 
        averageRatingFrom: string, 
        averageRatingTo: string,
        sortingField: CatalogSortingFieldsEnum,
        sortingOrder: SortingOrdersEnum
    ) => {};
    openTab: (tab: TabsEnum) => void;
    clickTool: (tool: CatalogToolsEnum) => void;
}

const useCatalogStore = create<IUseCatalogStoreState>((set) => ({
    books: [],
    setBooks: (books: IBookCatalog[]) => {
        set({ books: books })
    },
    openedTab: TabsEnum.CATALOG_ALL_BOOKS,
    toolClicked: CatalogToolsEnum.DEFAULT_NONE,
    getAllBooks: async (
        filterCriteria: Map<FilterKeysEnum, Set<string>>, 
        averageRatingFrom: string, 
        averageRatingTo: string,
        sortingField: CatalogSortingFieldsEnum,
        sortingOrder: SortingOrdersEnum
        ) => {
        const data = await CatalogService
            .getAllBooks(
                filterCriteria, 
                averageRatingFrom, 
                averageRatingTo, 
                sortingField, 
                sortingOrder
            )
        set({ books: data.objects })
    },
    getTopTenBooks: async (
        filterCriteria: Map<FilterKeysEnum, Set<string>>, 
        averageRatingFrom: string, 
        averageRatingTo: string,
        sortingField: CatalogSortingFieldsEnum,
        sortingOrder: SortingOrdersEnum
        ) => {
        const data = await CatalogService.getTopTenBooks()
        const updatedBooks = CatalogToolsService
            .getTopTenBooksSortedAndFiltered(
                filterCriteria, 
                averageRatingFrom, 
                averageRatingTo, 
                sortingField,
                sortingOrder,
                data.objects
            )
        set({ books: updatedBooks })
    },
    openTab: (tab: TabsEnum) => {
        set({ openedTab: tab })
    },
    clickTool: (tool: CatalogToolsEnum) => {
        console.log('TOOL WAS CLICKED!')
        set({ toolClicked: tool })
    }
}))

export default useCatalogStore;