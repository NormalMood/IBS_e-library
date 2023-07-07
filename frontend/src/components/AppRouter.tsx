import React, { FC, useContext, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../routes/routes';
import { AuthContext } from '../context';

const AppRouter: FC = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    return (
        isAuth
        ?
        <main className="main">
            <div className="container">
                <Routes>
                    {privateRoutes.map(route =>
                        <Route key={route.path} path={route.path} element={ <route.component /> } />
                    )}
                    <Route path='*' element={ <Navigate to='/my_books' /> } />
                </Routes>
            </div>
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