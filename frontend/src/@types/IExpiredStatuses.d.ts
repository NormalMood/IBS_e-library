export interface IExpiredStatuses {
    id: number;
    employeeId: number;
    employeeFullName: string;
    bookId: number;
    title: string;
    author: string;
    actionsName: string;
    actionsDate: Date;
    returnDate: Date;
    returnDateExpired: boolean;
}