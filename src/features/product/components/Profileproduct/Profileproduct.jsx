import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './profileproduct.scss';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faHandHolding, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { message } from 'antd';
import { addToCart, getUserInfor } from 'features/cart/userslice';
import { useDispatch, useSelector } from 'react-redux';

Profileproduct.propTypes = {
    initialValues: PropTypes.object,
};
Profileproduct.defaultProps = {
    initialValues: {}
}

function Profileproduct(props) {
    const { initialValues } = props;
    const [srcimage, setSrcimage] = useState("");

    const dispatch = useDispatch();
    const cart = useSelector(state => state.user.cart);
    const token = localStorage.getItem('AccessToken');
    const history = useHistory();
    const isLoading = useSelector(state => state.user.loading);

    const handleAddToCart = async (initialValues) => {
        if (!token) {
            return (
                message.warning('Please Login to use cart!'),
                history.push('/user/login')
            )
        }
        const check = cart.every(item => {
            return item._id !== initialValues._id
        })
        if (check) {
            try {
                await dispatch(addToCart({ cart: [...cart, { ...initialValues, quantity: 1 }] }));
                await dispatch(getUserInfor());
                message.success('Product added!')
            } catch (err) {
                message.warning(err.response.data.message);
            }
        }
        else {
            message.warning('This product has been added to cart!')
        }
    }

    // if (initialValues.Image) {
    //     setSrcimage(initialValues.Image[0].url)
    // }

    useEffect(() => {
        initialValues.Image &&
            setSrcimage(initialValues.Image[0].url);
    }, [initialValues]);

    const handleChangeImage = (v) => {
        const newImage = v;
        setSrcimage(newImage);
    }
    return (
        <div className="profilebox">
            <div className="profilebox__mobilebutton" disabled={isLoading} style={isLoading ? { background: "#9e320096", color: "white", boxShadow: "0 0 0.5rem #682600" } : {}}>
                <button className="profilebox__mobilebutton__atc" onClick={() => handleAddToCart(initialValues)}>
                    <FontAwesomeIcon icon={faCartPlus} />
                    <span>Thêm Vào Giỏ</span>
                </button>
            </div>
            <div className="profilebox__img">
                <div className="profilebox__img__box">
                    <div className="profilebox__img__box__listimage">
                        <ul className="profilebox__img__box__listimage__list">
                            {
                                initialValues.Image &&
                                initialValues.Image.map(v => (
                                    <li className={`profilebox__img__box__listimage__list__item ${srcimage === v.url ? 'profilebox__img__box__listimage__list__item__active' : ''}`} key={v.id} onClick={() => handleChangeImage(v.url)}>
                                        <img src={v.url} alt='' />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="profilebox__img__box__mainimage">
                        <div className="profilebox__img__box__mainimage__image"
                            style={{ backgroundImage: `url(${srcimage})` }}
                        >
                            {/* <img src={srcimage} alt='' /> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="profilebox__information">
                <h2 className="profilebox__information__name">{initialValues.Name}</h2>
                <h5 className="profilebox__information__brandname">
                    Thương Hiệu :
                    <Link to={`/home/category/producer/${initialValues.Producer ? initialValues.Producer.ProducerName : ''}`}>
                        <b> {initialValues.Producer ? initialValues.Producer.ProducerName : ''}</b>
                    </Link>
                </h5>

                {
                    initialValues.Sale !== 0 ?
                        < div className="profilebox__information__price">
                            < div className="profilebox__information__price__sale">
                                <b>{initialValues.Sale}</b> <span>đ</span>
                            </ div>
                            <div className="profilebox__information__price__origin">
                                <div className="profilebox__information__price__origin__left">
                                    {initialValues.Price} <span>đ</span>
                                </div>
                                <div className="profilebox__information__price__origin__right">
                                    {Math.ceil(100 - ((initialValues.Sale / initialValues.Price) * 100))}%
                                </div>
                            </div>
                        </div>
                        :
                        < div className="profilebox__information__price">
                            < div className="profilebox__information__price__sale">
                                <b>{initialValues.Price}</b> <span>đ</span>
                            </ div>
                        </div>
                }

                <div className="profilebox__information__warranties">
                    <FontAwesomeIcon icon={faShieldAlt} />
                    <span>Bảo Hành {initialValues.Warranties} Tháng</span>
                </div>
                <div className="profilebox__information__button">
                    <button className="profilebox__information__button__atc" disabled={isLoading} style={isLoading ? { background: "rgba(0, 110, 92, 0.8)", color: "white" } : {}} onClick={() => handleAddToCart(initialValues)}>
                        <FontAwesomeIcon icon={faCartPlus} />
                        <span>Thêm Vào Giỏ</span>
                    </button>
                </div>
                <div className="profilebox__information__info">
                    <ul className="profilebox__information__info__list">
                        {
                            initialValues.Information &&
                            initialValues.Information.map(v => (
                                <li key={v}> <FontAwesomeIcon icon={faHandHolding} /><span>{v}</span></li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div >
    );
}

export default Profileproduct;