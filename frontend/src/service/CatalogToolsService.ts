import { CatalogSortingFieldsEnum } from '../@types/CatalogSortingFieldsEnum';
import { FilterKeysEnum } from '../@types/FilterKeysEnum';
import { IBookCatalog } from '../@types/IBookCatalog';
import { SortingOrdersEnum } from '../@types/SortingOrdersEnum';

export default class CatalogToolsService {

    static getTopTenBooksSortedAndFiltered(
        filterCriteria: Map<FilterKeysEnum, Set<string>>, 
        averageRatingFrom: string,
        averageRatingTo: string,
        sortingField: CatalogSortingFieldsEnum,
        sortingOrder: SortingOrdersEnum,
        books: IBookCatalog[]
    ) {
        let booksUpdated = [...books]
        console.log('field: ' + sortingField)
        console.log('order: ' + sortingOrder)
        //sort
        booksUpdated = this.sortBooks(booksUpdated, sortingField, sortingOrder)
        //filter
        if (filterCriteria.get(FilterKeysEnum.GENRES)?.size !== 0) {
            booksUpdated = booksUpdated.filter(book => 
                this.containsCriteria(book.genres, filterCriteria.get(FilterKeysEnum.GENRES))
            )
        }
        if (filterCriteria.get(FilterKeysEnum.PROVIDERS)?.size !== 0) {
            booksUpdated = booksUpdated.filter(book =>
                this.containsCriteria(book.provider, filterCriteria.get(FilterKeysEnum.PROVIDERS))
            )
        }
        if (filterCriteria.get(FilterKeysEnum.STATUS)?.size !== 0) {
            booksUpdated = booksUpdated.filter(book => 
                this.containsCriteria(book.status, filterCriteria.get(FilterKeysEnum.STATUS)))
        }
        console.log('from: ' + averageRatingFrom)
        console.log('to: ' + averageRatingTo)
        if (averageRatingFrom !== '')
            booksUpdated = booksUpdated.filter(book => 
                averageRatingFrom <= book.averageRating.toString())
        if (averageRatingTo !== '')
            booksUpdated = booksUpdated.filter(book =>
                book.averageRating.toString() <= averageRatingTo)
        return booksUpdated
    }

    private static containsCriteria(str: string, criteria: Set<string> | undefined) {
        let hasAnyFromArray = false
        criteria?.forEach(criterion => {
            if (str.includes(criterion)) {
                hasAnyFromArray = true
                return;
            }
        })

        return hasAnyFromArray
    }

    private static sortBooks(books: IBookCatalog[], field: CatalogSortingFieldsEnum, order: SortingOrdersEnum) {
        let sortedBooks = [...books]
        if (field === CatalogSortingFieldsEnum.TITLE) {
            sortedBooks = sortedBooks.sort((current, next) => this.compareStrings(current.title, next.title))
        }
        else if (field === CatalogSortingFieldsEnum.AUTHOR) {
            sortedBooks = sortedBooks.sort((current, next) => this.compareStrings(current.author, next.author))
        }
        else if (field === CatalogSortingFieldsEnum.AVERAGE_RATING) {
            sortedBooks = sortedBooks.sort((current, next) => current.averageRating - next.averageRating)
        }
        console.log(sortedBooks)
        if (order === SortingOrdersEnum.DESC)
            return sortedBooks.reverse()
        return sortedBooks
    }

    private static compareStrings(str1: string, str2: string) {
        return str1 > str2 ? 
            1 
            : 
            str1 < str2 ? 
                -1 
                :
                0
    }

}