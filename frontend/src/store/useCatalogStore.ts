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
import { ICatalog } from "../@types/ICatalog";
import { IMessageCodeResponse } from '../@types/IMessageCodeResponse';
import { BAD_REQUEST_RESPONSE_CODE, INCORRECT_AVERAGE_RATING_FILTER_RESPONSE_MESSAGE } from '../api/axiosInstance';
import { getAverageRatingParsed } from '../utils/AverageRatingHandler';

interface IUseCatalogStoreState {
    books: IBookCatalog[];
    totalPages: number;
    isBooksLoading: boolean;
    setBooks: (books: IBookCatalog[]) => void;
    page: number;
    setPage: (page: number) => void;
    openedTab: TabsEnum;
    toolClicked: CatalogToolsEnum;
    getAllBooks: (
        filterCriteria: Map<FilterKeysEnum, Set<string>>, 
        averageRatingFrom: string, 
        averageRatingTo: string,
        sortingField: CatalogSortingFieldsEnum,
        sortingOrder: SortingOrdersEnum,
        page: number
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

    message: string;
    setMessage: (message: string) => void;
    code: number;
    setCode: (code: number) => void;
    setMessageCodeDefault: () => void;
}

const useCatalogStore = create<IUseCatalogStoreState>((set, get) => ({
    books: [],
    totalPages: -1,
    isBooksLoading: false,
    setBooks: (books: IBookCatalog[]) => {
        set({ books: books })
    },
    page: 0,
    setPage: (page: number) => {
        set({ page: page })
    },
    openedTab: TabsEnum.CATALOG_ALL_BOOKS,
    toolClicked: CatalogToolsEnum.DEFAULT_NONE,
    getAllBooks: async (
        filterCriteria: Map<FilterKeysEnum, Set<string>>, 
        averageRatingFrom: string, 
        averageRatingTo: string,
        sortingField: CatalogSortingFieldsEnum,
        sortingOrder: SortingOrdersEnum,
        page: number
        ) => {
        set({ page: page })
        console.log('page 0? -> ' + page)
        console.log('books: ' + get().books)
        set({ isBooksLoading: true })
        await CatalogService
            .getAllBooks(
                filterCriteria, 
                averageRatingFrom, 
                averageRatingTo, 
                sortingField, 
                sortingOrder,
                page
            ).then(response => {
                if ((response as ICatalog).objects) {
                    set({ isBooksLoading: false })
                    set({ totalPages: (response as ICatalog).pages })
                    if (page === 0)
                        set({ books: (response as ICatalog).objects })
                    else
                        set({ books: [...get().books, ...(response as ICatalog).objects] })
                    get().setMessageCodeDefault()
                }
                else if ((response as IMessageCodeResponse).message) {
                    set({ message: (response as IMessageCodeResponse).message })
                    set({ code: (response as IMessageCodeResponse).code })
                }
            })
    },
    getTopTenBooks: async (
        filterCriteria: Map<FilterKeysEnum, Set<string>>, 
        averageRatingFrom: string, 
        averageRatingTo: string,
        sortingField: CatalogSortingFieldsEnum,
        sortingOrder: SortingOrdersEnum
        ) => {
        const averageRatingFromParsed = getAverageRatingParsed(averageRatingFrom)
        const averageRatingToParsed = getAverageRatingParsed(averageRatingTo)
        if ((averageRatingFromParsed !== '' && averageRatingFromParsed === -1) || 
            (averageRatingToParsed !== '' && averageRatingToParsed === -1)) {
            set({ message: INCORRECT_AVERAGE_RATING_FILTER_RESPONSE_MESSAGE })
            set({ code: BAD_REQUEST_RESPONSE_CODE })
        }
        else {
            const data = await CatalogService.getTopTenBooks()
            const updatedBooks = CatalogToolsService
                    .getTopTenBooksSortedAndFiltered(
                        filterCriteria, 
                        averageRatingFrom, 
                        averageRatingTo, 
                        sortingField,
                        sortingOrder,
                        (data as ICatalog).objects
                    )
            set({ books: updatedBooks })
        }
    },
    openTab: (tab: TabsEnum) => {
        set({ openedTab: tab })
    },
    clickTool: (tool: CatalogToolsEnum) => {
        console.log('TOOL WAS CLICKED!')
        set({ toolClicked: tool })
    },

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

export default useCatalogStore;