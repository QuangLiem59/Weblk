import React, { useEffect } from 'react';
import Login from './login';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import NotFound from 'components/notfound';
import Register from './register';
import UserProfile from './profile';

UserPage.propTypes = {

};

function UserPage(props) {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    });

    const match = useRouteMatch();
    return (
        <div>
            <Switch>
                {!localStorage.getItem('AccessToken') && <Route path={`${match.url}/login`} component={Login} />}
                {!localStorage.getItem('AccessToken') && <Route path={`${match.url}/register`} component={Register} />}
                {/* <Route exact path={`${match.url}/login`} component={Login} />
                <Route exact path={`${match.url}/register`} component={Register} /> */}
                {localStorage.getItem('AccessToken') ? <Route path={`${match.url}/profile`} component={UserProfile} /> : <Redirect to={`${match.url}/login`} />}
                {localStorage.getItem('AccessToken') ? <Redirect to={`${match.url}/profile`} /> : <Redirect to={`${match.url}/login`} />}
                <Route component={NotFound} />
            </Switch>
        </div>
    );
}

export default UserPage;