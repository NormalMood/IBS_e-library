import React, { FC, useContext, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { privateUserRoutes, privateAdminRoutes, publicRoutes } from '../routes/routes';
import { AuthContext } from '../context/AuthContext';
import { RolesEnum } from '../@types/RolesEnum';
import useEmployeeDataStore from '../store/useEmployeeDataStore';

const AppRouter: FC = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const isAdmin = useEmployeeDataStore(state => state.isAdmin)
    return (
        isAuth
        ?
        <main className="main">
            {isAdmin && 
                <Routes>
                    {privateAdminRoutes.map(route =>
                        <Route key={route.path} path={route.path} element={ <route.component /> } />
                    )}
                    <Route path='*' element={ <Navigate to='/my_books' /> } />
                </Routes>
            }
            {!isAdmin && 
                <Routes>
                    {privateUserRoutes.map(route =>
                        <Route key={route.path} path={route.path} element={ <route.component /> } />
                    )}
                    <Route path='*' element={ <Navigate to='/my_books' /> } />
                </Routes>
            }
        </main>
        :
        <main>
            <div className="container">
                <Routes>
                    {publicRoutes.map(route =>
                        <Route key={route.path} path={route.path} element={ <route.component /> } />
                    )}
                    <Route path='*' element={ <Navigate to='/login' /> } />
                </Routes>
            </div>
        </main>
    )
}

export default AppRouter;