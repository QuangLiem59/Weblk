import React from 'react';
import './MainProduct.scss';
import SliderC from 'components/slider/slider';
import NewProducts from 'features/product/components/NewProducts';
import SalesProduct from 'features/product/components/SalesProduct';
import HotProduct from 'features/product/components/Hotproduct';
import { useSelector } from 'react-redux';
import Loading from 'components/loading';
MainProductPage.propTypes = {

};

function MainProductPage() {
    const isLoading = useSelector(state => state.product.loading);
    return (
        <div className="Mainpd">
            <div style={isLoading ? { "display": "block" } : { "display": "none" }}>
                <Loading />
            </div>
            <div className="Mainpd__container">
                <div className="Mainpd__container__slider">
                    <SliderC />
                </div>
                <div className="Mainpd__container__newsproduct">
                    <NewProducts />
                </div>
                <div className="Mainpd__container__salesproduct">
                    <SalesProduct />
                </div>
                <div className="Mainpd__container__hotsproduct">
                    <HotProduct />
                </div>
            </div>
        </div>
    );
}

export default MainProductPage;