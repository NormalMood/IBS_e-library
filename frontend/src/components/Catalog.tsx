import React, { FC } from 'react';
import Toolbar from './Layout/Toolbar/Toolbar';
import CatalogBooks from './Layout/CatalogBooks/CatalogBooks';
import Sidebar from './Layout/Sidebar/Sidebar';

const Catalog: FC = () => {
    return (
        <>
            <Toolbar />
            <Sidebar />
            <div className="container">
                {/* <div className="catalog-container" style={{display: 'flex', flexDirection: 'row', marginTop: '0'}}> */}
                    <CatalogBooks />
                {/* </div> */}
            </div>
        </>
    )
}

export default Catalog;