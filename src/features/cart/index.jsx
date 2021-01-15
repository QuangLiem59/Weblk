import React, { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import NotFound from 'components/notfound';
import CartCP from './cart';
import OrderHistory from './orderhistory';

CartPage.propTypes = {

};

function CartPage() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    });

    const match = useRouteMatch();
    return (
        <div>
            <Switch>
                <Route exact path={`${match.url}`} component={CartCP} />
                {localStorage.getItem('AccessToken') &&
                    <Route path={`${match.url}/orderhistory`} component={OrderHistory} />}
                <Route component={NotFound} />
            </Switch>
        </div>
    );
}

export default CartPage;