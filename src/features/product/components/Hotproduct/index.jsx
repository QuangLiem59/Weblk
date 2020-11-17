import React, { useEffect, useState } from 'react';
import './hotproducts.scss';
import ProductItem from '../ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProduct } from 'features/product/productslice';
import { unwrapResult } from '@reduxjs/toolkit';

HotProduct.propTypes = {

};

function HotProduct(props) {
    const dispatch = useDispatch();
    const [listHotProduct, setListHotProduct] = useState([]);
    const [params, setParams] = useState({ page: '1', limit: '10', Hots: 'true' });

    useEffect(() => {
        dispatch(getProduct(params)).then(res => {
            const getPd = unwrapResult(res);
            setListHotProduct(getPd.product);
        })
    }, [params]);

    return (
        <div className="mainhotproduct">
            <div className="mainhotproduct__container">
                <div className='mainhotproduct__container__maintitle'>
                    <h2>Sản Phẩm Bán Chạy</h2>
                </div>
                <div className='mainhotproduct__container__listproduct'>
                    {
                        listHotProduct.map(product => (
                            product.Hots &&
                            <ProductItem Product={product} key={product._id} />
                        ))
                    }
                </div>
                <div className='mainhotproduct__container__seeall'>
                    <Link to='/'>
                        <button className='mainhotproduct__container__seeall__bt'>
                            Xem Tất Cả
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default HotProduct;