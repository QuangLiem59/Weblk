import React, { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import NotFound from 'components/notfound';
import MainProductPage from './pages/MainProductPage/MainProductPage';
import ProductProfilePage from './pages/ProductProfilePage/ProductProfilePage';
import CateloryProductPage from './pages/CateloryProductPage/CateloryProductPage';

ProductPage.propTypes = {

};

function ProductPage() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    });

    const match = useRouteMatch();
    return (
        <div>
            <Switch>
                <Route exact path={match.url} component={MainProductPage} />
                <Route exact path={`${match.url}/:productID`} component={ProductProfilePage} />
                <Route path={`${match.url}/producer/:producer`} component={CateloryProductPage} />
                <Route path={`${match.url}/category/`} component={CateloryProductPage} />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
}

export default ProductPage;