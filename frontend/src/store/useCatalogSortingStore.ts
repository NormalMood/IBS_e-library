import { create } from 'zustand';
import { CatalogSortingFieldsEnum } from '../@types/CatalogSortingFieldsEnum';
import { SortingOrdersEnum } from '../@types/SortingOrdersEnum';

interface IUseCatalogSortingStoreState {
    sortingField: CatalogSortingFieldsEnum;
    setSortingField: (field: CatalogSortingFieldsEnum) => void;

    selectedSortingField: CatalogSortingFieldsEnum;
    setSelectedSortingField: (selectedField: CatalogSortingFieldsEnum) => void;


    sortingOrder: SortingOrdersEnum;
    setSortingOrder: (order: SortingOrdersEnum) => void;

    selectedOrder: SortingOrdersEnum;
    setSelectedOrder: (selectedOrder: SortingOrdersEnum) => void;


    resetSorting: () => void;
    resetSelectedSorting: () => void;
}

const useCatalogSortingStore = create<IUseCatalogSortingStoreState>((set) => ({
    sortingField: CatalogSortingFieldsEnum.NONE,
    setSortingField: (field: CatalogSortingFieldsEnum) => {
        set({ sortingField: field })
    },
    selectedSortingField: CatalogSortingFieldsEnum.TITLE,
    setSelectedSortingField: (selectedField: CatalogSortingFieldsEnum) => {
        set({ selectedSortingField: selectedField })
    },
    sortingOrder: SortingOrdersEnum.NONE,
    setSortingOrder: (order: SortingOrdersEnum) => {
        set({ sortingOrder: order })
    },
    selectedOrder: SortingOrdersEnum.ASC,
    setSelectedOrder: (selectedOrder: SortingOrdersEnum) => {
        set({ selectedOrder: selectedOrder })
    },
    resetSorting: () => {
        set({ sortingField: CatalogSortingFieldsEnum.NONE })
        set({ sortingOrder: SortingOrdersEnum.NONE })
    },
    resetSelectedSorting: () => {
        set({ selectedSortingField: CatalogSortingFieldsEnum.TITLE })
        set({ selectedOrder: SortingOrdersEnum.ASC })
    }
}))

export default useCatalogSortingStore;