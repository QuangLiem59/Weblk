import React, { useEffect, useState } from 'react';
import './NewProducts.scss';
import { Link } from 'react-router-dom';
import ProductItem from '../ProductItem';
import { useDispatch } from 'react-redux';
import { getProduct } from 'features/product/productslice';
import { unwrapResult } from '@reduxjs/toolkit';

NewProducts.propTypes = {

};



function NewProducts() {
    const dispatch = useDispatch();
    const [listNewProduct, setListNewProduct] = useState([]);
    const [params, setParams] = useState({ page: '1', limit: '10', News: 'true' });

    useEffect(() => {
        dispatch(getProduct(params)).then(res => {
            const getPd = unwrapResult(res);
            setListNewProduct(getPd.product);
        });
        // const getNewsPd = async () => {
        //     const gd = await dispatch(getProduct(params))
        //     const getPd = unwrapResult(gd);
        //     setListNewProduct(getPd.product);
        // }
        // getNewsPd();
    }, [params]);

    return (
        <div className="MainNewsProduct">
            <div className="MainNewsProduct__container">
                <div className='MainNewsProduct__container__maintitle'>
                    <h2>Sản Phẩm Mới</h2>
                </div>
                <div className='MainNewsProduct__container__listproduct'>
                    {
                        listNewProduct.map(product => (
                            product.News &&
                            <ProductItem Product={product} key={product._id} />
                        ))
                    }
                </div>
                <div className='MainNewsProduct__container__seeall'>
                    <Link to='/home/category/status/News'>
                        <button className='MainNewsProduct__container__seeall__bt'>
                            Xem Tất Cả
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NewProducts;