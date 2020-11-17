import React, { useEffect, useRef } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./Saleslider.scss";
import { useDispatch, useSelector } from 'react-redux';
import ProductItemSales from '../ProductItemsales';
import Banner from 'constant/banner';
import { useState } from 'react';
import { getProduct } from 'features/product/productslice';
import { unwrapResult } from '@reduxjs/toolkit';

Saleslider.propTypes = {

};

const st = {
    className: 'saleslider__ctn__slider',
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    rows: 1,
    arrows: false,
    autoplaySpeed: 2000,
    autoplay: true,
    responsive: [
        {
            breakpoint: 1183,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
            }
        },
        {
            breakpoint: 952,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 638,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};
function Saleslider(props) {
    const dispatch = useDispatch();
    const [listSaleProduct, setListSaleProduct] = useState([]);
    const [params, setParams] = useState({ page: '1', limit: '10', 'Sale[gt]': '0' });

    useEffect(() => {
        dispatch(getProduct(params)).then(res => {
            const getPd = unwrapResult(res);
            setListSaleProduct(getPd.product);
        })
    }, [params]);

    const ref = useRef({});
    const NextSlide = () => {
        ref.current.slickNext();
    }
    const PrevSlide = () => {
        ref.current.slickPrev();
    }
    return (
        <div className="saleslider__ctn">
            <Slider ref={ref}  {...st}>
                {
                    listSaleProduct.map(product => (
                        product.Sale !== 0 &&
                        <div
                            className="saleslider__ctn__slider__slide"
                            key={product._id}
                        >
                            <ProductItemSales Product={product} />
                        </div>
                    ))
                }

            </Slider>
            <button className="saleslider__ctn__prevbt" onClick={PrevSlide}>
                <img src={Banner.prevbt} alt="" />
            </button>
            <button className="saleslider__ctn__nextbt" onClick={NextSlide}>
                <img src={Banner.nextbt} alt="" />
            </button>
        </div>
    );
}

export default Saleslider;