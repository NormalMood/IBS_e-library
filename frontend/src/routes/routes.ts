import { IRoute } from "../@types/IRoute"
import AdminPanel from "../components/AdminPanel"
import Catalog from "../components/Catalog"
import Login from "../components/Login"
import MyBooks from "../components/EmployeeBin"
import NewBook from "../components/NewBookPage"
import BookPage from "../components/BookPage"
import ReviewPage from "../components/ReviewPage"

export const privateAdminRoutes: IRoute[] = [
    { path: '/catalog', component: Catalog },
    { path: '/book/:id', component: BookPage },
    { path: '/book/:id/review', component: ReviewPage },
    { path: '/my_books', component: MyBooks },
    { path: '/new_book', component: NewBook },
    { path: '/admin_panel', component: AdminPanel }
]

export const privateUserRoutes: IRoute[] = [
    { path: '/catalog', component: Catalog },
    { path: '/book/:id', component: BookPage },
    { path: '/book/:id/review', component: ReviewPage },
    { path: '/my_books', component: MyBooks },
    { path: '/new_book', component: NewBook }
]

export const publicRoutes: IRoute[] = [
    { path: '/login', component: Login },
]