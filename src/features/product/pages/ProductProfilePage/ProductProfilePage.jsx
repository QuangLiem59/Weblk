import React, { useEffect, useState } from 'react';
import './productprofilepage.scss';
import { Link, useParams } from 'react-router-dom';
import Profileproduct from 'features/product/components/Profileproduct/Profileproduct';
import SalesProduct from 'features/product/components/SalesProduct';
import { useDispatch, useSelector } from 'react-redux';
import { getPrfProduct } from 'features/product/productslice';
import { unwrapResult } from '@reduxjs/toolkit';

ProductProfilePage.propTypes = {

};


function ProductProfilePage(props) {
    const { productID } = useParams();
    const dispatch = useDispatch();
    const [profileProduct, setProfileProduct] = useState({});

    useEffect(() => {
        dispatch(getPrfProduct(productID)).then(res => {
            const getPd = unwrapResult(res);
            setProfileProduct(getPd.product);
        });
        // const getNewsPd = async () => {
        //     const gd = await dispatch(getProduct(params))
        //     const getPd = unwrapResult(gd);
        //     setListNewProduct(getPd.product);
        // }
        // getNewsPd();
    }, [productID]);


    return (
        <div className="profileproduct">
            <div className="profileproduct__container">
                <div className="profileproduct__container__box">
                    <div className="profileproduct__container__box__location">
                        <ul className="profileproduct__container__box__location__list">
                            <li className="profileproduct__container__box__location__list__lc">
                                <Link to="/">
                                    Trang Chủ
                                </Link>
                            </li>
                            <li className="profileproduct__container__box__location__list__lc">
                                <Link to="/">
                                    {profileProduct ? profileProduct.Category : "Error"}
                                </Link>
                            </li>
                            <li className="profileproduct__container__box__location__list__lc">
                                <Link to={profileProduct ? `/home/${profileProduct._id}` : '/'}>
                                    {profileProduct ? profileProduct.Name : "Error"}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="profileproduct__container__box__pprd">
                        <Profileproduct initialValues={profileProduct} />
                    </div>

                    <div className="profileproduct__container__box__details">
                        <div className="profileproduct__container__box__details__main">
                            <h2>Thông Tin Chi Tiết</h2>
                            <p>
                                {profileProduct ? profileProduct.Details : "Error"}
                            </p>
                        </div>
                    </div>
                    <SalesProduct />
                </div>
            </div>
        </div>
    );
}

export default ProductProfilePage;