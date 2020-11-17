import React, { useEffect, useState } from 'react';
import './CateloryProductPage.scss';
import { Link, useParams } from 'react-router-dom';
import SalesProduct from 'features/product/components/SalesProduct';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from 'features/product/productslice';
import { unwrapResult } from '@reduxjs/toolkit';

CateloryProductPage.propTypes = {

};


function CateloryProductPage(props) {
    const producerName = useParams(params => params.producer).producer;
    const dispatch = useDispatch();
    const [listCategoryProduct, setListCategoryProduct] = useState([]);
    const [params, setParams] = useState({ page: '1', limit: '10', Producer: producerName });

    useEffect(() => {
        dispatch(getProduct(params)).then(res => {
            const getPd = unwrapResult(res);
            setListCategoryProduct(getPd.product);
        });
    }, [params]);

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
                                <Link to="/">
                                    Producer
                                </Link>
                            </li>
                            <li className="CateloryProduct__container__box__location__list__lc">
                                <Link to={producerName ? `/home/producer/${producerName}` : '/'}>
                                    {producerName ? producerName : "Error"}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="CateloryProduct__container__box__main">
                        AAAAAA
                    </div>
                    <SalesProduct />
                </div>
            </div>
        </div>
    );
}

export default CateloryProductPage;