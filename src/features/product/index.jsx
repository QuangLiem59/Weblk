import React, { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import NotFound from 'components/notfound';
import MainProductPage from './pages/MainProductPage/MainProductPage';
import ProductProfilePage from './pages/ProductProfilePage/ProductProfilePage';
import CateloryProductPage from './pages/CateloryProductPage/CateloryProductPage';
import { useSelector } from 'react-redux';
import Loading from 'components/loading';
import { useState } from 'react';

ProductPage.propTypes = {

};

function ProductPage(props) {
    const isLoading = useSelector(state => state.product.loading);
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    });

    const match = useRouteMatch();
    console.log(isLoading);
    return (
        <div>
            <div style={isLoading ? { "display": "block" } : { "display": "none" }}>
                <Loading />
            </div>
            <Switch>
                <Route exact path={match.url} component={MainProductPage} />
                <Route exact path={`${match.url}/:productID`} component={ProductProfilePage} />
                <Route path={`${match.url}/producer/:producer`} component={CateloryProductPage} />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
}

export default ProductPage;