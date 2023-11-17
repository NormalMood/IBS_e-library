import { BookStatusEnum } from "../@types/BookStatusEnum";

export const BookStatusMap = new Map<string, BookStatusEnum>([
    ['В наличии', BookStatusEnum.IN_STOCK],
    ['Взята в пользование', BookStatusEnum.CHECKED_OUT],
    ['Изъята из библиотеки', BookStatusEnum.TAKEN_OUT],
    ['Утеряна', BookStatusEnum.LOST]
])