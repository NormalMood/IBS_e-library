import { CatalogSortingFieldsEnum } from "../@types/CatalogSortingFieldsEnum";
import { FilterKeysEnum } from "../@types/FilterKeysEnum";
import { ICatalog } from "../@types/ICatalog";
import { SortingOrdersEnum } from "../@types/SortingOrdersEnum";
import axiosInstance, { BASE_CATALOG_API } from "../api/axiosInstance";

export default class CatalogService {

    static async getAllBooks(
        filterCriteria: Map<FilterKeysEnum, Set<string>>, 
        averageRatingFrom: string, 
        averageRatingTo: string,
        sortingField: CatalogSortingFieldsEnum,
        sortingOrder: SortingOrdersEnum,
        page: number
    ) {
        const response = await axiosInstance.get<ICatalog>(
            BASE_CATALOG_API + '/all',
            {
                params: {
                    page: page,
                    size: 5,
                    genres: Array.from(filterCriteria.get(FilterKeysEnum.GENRES) as Set<string>).join(','),
                    providers: Array.from(filterCriteria.get(FilterKeysEnum.PROVIDERS) as Set<string>).join(','),
                    status: Array.from(filterCriteria.get(FilterKeysEnum.STATUS) as Set<string>).join(','),
                    averageRatingFrom,
                    averageRatingTo,
                    sortingField: sortingField,
                    sortingOrder: SortingOrdersEnum[sortingOrder]
                }
            }
        )
        return response.data
    }

    static async getTopTenBooks() {
        const response = await axiosInstance.get<ICatalog>(
            BASE_CATALOG_API + '/top-10'
        )
        return response.data
    }

    static async getBooksBySearchQuery(
        searchQuery: string,
        filterCriteria: Map<FilterKeysEnum, Set<string>>, 
        averageRatingFrom: string, 
        averageRatingTo: string,
        sortingField: CatalogSortingFieldsEnum,
        sortingOrder: SortingOrdersEnum
    ) {
        const response = await axiosInstance.get<ICatalog>(
            BASE_CATALOG_API + '/search',
            {
                params: {
                    searchQuery: searchQuery,
                    genres: Array.from(filterCriteria.get(FilterKeysEnum.GENRES) as Set<string>).join(','),
                    providers: Array.from(filterCriteria.get(FilterKeysEnum.PROVIDERS) as Set<string>).join(','),
                    status: Array.from(filterCriteria.get(FilterKeysEnum.STATUS) as Set<string>).join(','),
                    averageRatingFrom,
                    averageRatingTo,
                    sortingField: sortingField,
                    sortingOrder: SortingOrdersEnum[sortingOrder]
                }
            }
        )
        return response.data
    }

}