import { IBook } from "./IBook";

export interface IEmployeeBin {
    fullName: string;
    books: IBook[];
    pages: number;
}