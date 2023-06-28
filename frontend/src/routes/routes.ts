import { IRoute } from "../@types/IRoute"

export const privateRoutes: IRoute[] = [
    { path: '/catalog', component: '' },
    { path: '/my_books', component: '' },
    { path: '/new_book', component: '' }
]

export const publicRoutes: IRoute[] = [
    { path: '/login', component: '' },
]