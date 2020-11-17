import React from 'react';
import './MainProduct.scss';
import SliderC from 'components/slider/slider';
import NewProducts from 'features/product/components/NewProducts';
import SalesProduct from 'features/product/components/SalesProduct';
import HotProduct from 'features/product/components/Hotproduct';
MainProductPage.propTypes = {

};

function MainProductPage(props) {
    return (
        <div className="Mainpd">
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