import React, { useState } from 'react';
import './CateloryProductPage.scss';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import SalesProduct from 'features/product/components/SalesProduct';
import CateloryProduct from 'features/product/components/Cateloryproduct';
import ProductTypes from 'features/product/components/ProducTypes';
import NotFound from 'components/notfound';
import Producer from 'features/product/components/Producer';
import Searchcpn from 'features/product/components/Search';
import StatusProduct from 'features/product/components/StatusProduct';

CateloryProductPage.propTypes = {

};


function CateloryProductPage(props) {
    const match = useRouteMatch();
    const [f1, setF1] = useState('');
    const [f2, setF2] = useState('');

    return (
        <div className="CateloryProduct">
            <div className="CateloryProduct__container">
                <div className="CateloryProduct__container__box">
                    <div className="CateloryProduct__container__box__location">
                        <ul className="CateloryProduct__container__box__location__list">
                            <li className="CateloryProduct__container__box__location__list__lc">
                                <Link to="/">
                                    Trang Chủ
                                </Link>
                            </li>
                            <li className="CateloryProduct__container__box__location__list__lc">
                                <Link to={f1 === 'Producer' ? '/home/category/producer/listproducer' : '#'}>
                                    {f1}
                                </Link>
                            </li>
                            {
                                f2 !== '' &&
                                <li className="CateloryProduct__container__box__location__list__lc">
                                    <Link to={f1 === 'Producer' ? f2 === 'List Producer' ? '/home/category/producer/listproducer' : `/home/category/producer/${f2}` : '#'}>
                                        {f2 ? f2 : "Error"}
                                    </Link>
                                </li>
                            }
                        </ul>
                    </div>
                    <div className="CateloryProduct__container__box__main">
                        <Switch>
                            <Route exact path={`${match.url}/:types`}
                                render={(props) => (
                                    <ProductTypes {...props} setF1={setF1} setF2={setF2} />
                                )} />
                            <Route path={`${match.url}/search/:search`}
                                render={(props) => (
                                    <Searchcpn {...props} setF1={setF1} setF2={setF2} />
                                )} />
                            <Route path={`${match.url}/status/:status`}
                                render={(props) => (
                                    <StatusProduct {...props} setF1={setF1} setF2={setF2} />
                                )} />
                            <Route exact path={`${match.url}/producer/listproducer`}
                                render={(props) => (
                                    <Producer {...props} setF1={setF1} setF2={setF2} />
                                )} />
                            <Route path={`${match.url}/producer/:producer`}
                                render={(props) => (
                                    <CateloryProduct {...props} setF1={setF1} setF2={setF2} />
                                )} />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                    <SalesProduct />
                </div>
            </div>
        </div>
    );
}

export default CateloryProductPage;