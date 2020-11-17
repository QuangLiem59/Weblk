import productApi from 'api/productApi';
import React, { Suspense, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/footer';
import Header from './components/header';
import NotFound from './components/notfound';

function App() {

  const Product = React.lazy(() => import('./features/product'));


  return (
    <div className='app'>
      <Header />
      <Suspense fallback={<div>Loading ... </div>}>
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path='/home' component={Product} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
