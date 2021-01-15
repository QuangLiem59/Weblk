import { message } from 'antd';
import Loading from 'components/loading';
import CartPage from 'features/cart';
import { getUserInfor } from 'features/cart/userslice';
import UserPage from 'features/user';
import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import Footer from './components/footer';
import Header from './components/header';
import NotFound from './components/notfound';

function App() {
  const token = localStorage.getItem('AccessToken');
  const dispatch = useDispatch();
  const history = useHistory();
  const Product = React.lazy(() => import('./features/product'));
  useEffect(() => {
    async function fetchData() {
      try {
        dispatch(getUserInfor())
      } catch (err) {
        message.warning(" Current login has expired, please login again!");
        localStorage.removeItem('AccessToken');
        history.push('/user/login');
      }
    }
    if (token) {
      fetchData();
    }
  }, [token]);

  return (
    <div className='app'>
      <Header />
      <Suspense fallback={<div><Loading /></div>}>
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path='/home' component={Product} />
          <Route path='/user' component={UserPage} />
          <Route path='/cart' component={CartPage} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
