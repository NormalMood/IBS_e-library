import { create } from 'zustand';
import { FilterKeysEnum } from '../@types/FilterKeysEnum';

interface IUseCatalogFilterStoreState {
    genresTitles: string[];
    isAllGenresChecked: boolean;
    isGenreChecked: boolean[];
    setGenresTitles: (titles: string[]) => void;
    setIsAllGenresChecked: (value: boolean) => void;
    setIsGenreChecked: (values: boolean[]) => void;
    resetGenreCheckboxes: () => void;
    genresFilter: Set<string>;
    setGenresFilterCriteria: (criteria: Set<string>) => void;
    
    providersTitles: string[];
    isAllProvidersChecked: boolean;
    isProviderChecked: boolean[];
    setProvidersTitles: (titles: string[]) => void;
    setIsAllProvidersChecked: (value: boolean) => void;
    setIsProviderChecked: (values: boolean[]) => void;
    resetProviderCheckboxes: () => void;
    providersFilter: Set<string>;
    setProvidersFilterCriteria: (criteria: Set<string>) => void;


    statusesTitles: string[];
    isAllStatusesChecked: boolean;
    isStatusChecked: boolean[];
    setStatusesTitles: (titles: string[]) => void;
    setIsAllStatusesChecked: (value: boolean) => void;
    setIsStatusChecked: (values: boolean[]) => void;
    resetStatusCheckboxes: () => void;
    statusesFilter: Set<string>;
    setStatusesFilterCriteria: (criteria: Set<string>) => void;
    

    averageRatingFrom: string;
    averageRatingTo: string;
    setAverageRatingFrom: (from: string) => void;
    setAverageRatingTo: (to: string) => void;

    
    getFilterCriteria: () => Map<FilterKeysEnum, Set<string>>;
    resetFilters: () => void;
}

const useCatalogFilterStore = create<IUseCatalogFilterStoreState>((set, get) => ({
    genresTitles: [],
    isAllGenresChecked: false,
    isGenreChecked: [],
    setGenresTitles: (titles: string[]) => {
        set({ genresTitles: titles })
    },
    setIsAllGenresChecked: (value: boolean) => {
        set({ isAllGenresChecked: value })
    },
    setIsGenreChecked: (values: boolean[]) => {
        set({ isGenreChecked: values })
    },
    resetGenreCheckboxes: () => {
        set({ isAllGenresChecked: false })
        set({ isGenreChecked: new Array(get().genresTitles.length).fill(false)})
    },
    genresFilter: new Set<string>(),
    setGenresFilterCriteria: (criteria: Set<string>) => {
        set({ genresFilter: criteria })
    },


    providersTitles: [],
    isAllProvidersChecked: false,
    isProviderChecked: [],
    setProvidersTitles: (titles: string[]) => {
        set({ providersTitles: titles })
    },
    setIsAllProvidersChecked: (value: boolean) => {
        set({ isAllProvidersChecked: value })
    },
    setIsProviderChecked: (values: boolean[]) => {
        set({ isProviderChecked: values })
    },
    resetProviderCheckboxes: () => {
        set({ isAllProvidersChecked: false })
        set({ isProviderChecked: new Array(get().isProviderChecked.length).fill(false)})
    },
    providersFilter: new Set<string>(),
    setProvidersFilterCriteria: (criteria: Set<string>) => {
        set({ providersFilter: criteria })
    },


    statusesTitles: [],
    isAllStatusesChecked: false,
    isStatusChecked: [],
    setStatusesTitles: (titles: string[]) => {
        set({ statusesTitles: titles })
    },
    setIsAllStatusesChecked: (value: boolean) => {
        set({ isAllStatusesChecked: value })
    },
    setIsStatusChecked: (values: boolean[]) => {
        set({ isStatusChecked: values })
    },
    resetStatusCheckboxes: () => {
        set({ isAllStatusesChecked: false })
        set({ isStatusChecked: new Array(get().isStatusChecked.length).fill(false) })
    },
    statusesFilter: new Set<string>(),
    setStatusesFilterCriteria: (criteria: Set<string>) => {
        set({ statusesFilter: criteria })
    },


    averageRatingFrom: '',
    averageRatingTo: '',
    setAverageRatingFrom: (from: string) => {
        set({ averageRatingFrom: from })
    },
    setAverageRatingTo: (to: string) => {
        set({ averageRatingTo: to })
    },

    
    getFilterCriteria: () => {
        return new Map([
            [FilterKeysEnum.GENRES, get().genresFilter],
            [FilterKeysEnum.PROVIDERS, get().providersFilter],
            [FilterKeysEnum.STATUS, get().statusesFilter]
        ])
    },
    resetFilters: () => {
        set({ genresFilter: new Set<string>() })
        set({ providersFilter: new Set<string>() })
        set({ statusesFilter: new Set<string>() })
        set({ averageRatingFrom: '' })
        set({ averageRatingTo: '' })
    }
}))

export default useCatalogFilterStore;