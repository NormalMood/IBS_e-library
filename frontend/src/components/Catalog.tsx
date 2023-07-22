import React, { FC } from 'react';
import Toolbar from './Layout/Toolbar/Toolbar';
import CatalogBooks from './Layout/CatalogBooks/CatalogBooks';

const Catalog: FC = () => {
    return (
        <>
            <Toolbar />
            <div className="container">
                <CatalogBooks />
            </div>
        </>
    )
}

export default Catalog;