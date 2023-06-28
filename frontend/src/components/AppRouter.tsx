import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { privateRoutes } from '../routes/routes';

const AppRouter: FC = () => {
    return (
        <Routes>
            {privateRoutes.map(route =>
                <Route key={route.path} path={route.path} element={ <route.component /> } />
            )}
        </Routes>
    )
}

export default AppRouter;