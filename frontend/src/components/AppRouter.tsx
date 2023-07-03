import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { privateRoutes } from '../routes/routes';

const AppRouter: FC = () => {
    return (
        <main className="main">
            <div className="container">
                <Routes>
                    {privateRoutes.map(route =>
                        <Route key={route.path} path={route.path} element={ <route.component /> } />
                    )}
                </Routes>
            </div>
        </main>
    )
}

export default AppRouter;