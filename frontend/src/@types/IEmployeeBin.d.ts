import { IBookEmployeeBin } from "./IBookEmployeeBin";

export interface IEmployeeBin {
    fullName: string;
    books: IBookEmployeeBin[];
    pages: number;
}