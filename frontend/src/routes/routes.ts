import { IRoute } from "../@types/IRoute"
import AdminPanel from "../components/AdminPanel"
import Catalog from "../components/Catalog"
import Login from "../components/Login"
import MyBooks from "../components/EmployeeBin"
import NewBook from "../components/NewBookPage"

export const privateRoutes: IRoute[] = [
    { path: '/catalog', component: Catalog },
    { path: '/my_books', component: MyBooks },
    { path: '/new_book', component: NewBook },
    { path: '/admin_panel', component: AdminPanel },
    { path: '/login', component: Login }
]

export const publicRoutes: IRoute[] = [
    { path: '/login', component: Login },
]