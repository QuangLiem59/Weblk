import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './productitemsales.scss';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import { message } from 'antd';
import { addToCart, getUserInfor } from 'features/cart/userslice';
import { useDispatch, useSelector } from 'react-redux';

ProductItemSales.propTypes = {
    Product: PropTypes.object,
};
ProductItemSales.defaultProps = {
    Product: []
}

function ProductItemSales(props) {
    const dispatch = useDispatch();
    const { Product } = props;
    const cart = useSelector(state => state.user.cart);
    const token = localStorage.getItem('AccessToken');
    const history = useHistory();
    const isLoading = useSelector(state => state.user.loading);
    const [isSelected, setIsSelected] = useState(false);

    const handleAddToCart = async (product) => {
        if (!token) {
            return (
                message.warning('Please Login to use cart!'),
                history.push('/user/login')
            )
        }
        if (isSelected) {
            return (
                message.warning('This product has been added to cart!')
            )
        }
        const check = cart.every(item => {
            return item._id !== product._id
        })
        if (check) {
            try {
                await dispatch(addToCart({ cart: [...cart, { ...product, quantity: 1 }] }));
                await dispatch(getUserInfor());
                setIsSelected(true);
                message.success('Product added!')
            } catch (err) {
                message.warning(err.response.data.message);
            }
        }
        else {
            message.warning('This product has been added to cart!')
        }
    }
    return (
        <div className='ProductItemSales'>
            <div className='ProductItemSales__box'>
                <div className='ProductItemSales__box__body'>
                    <div className='ProductItemSales__box__body__boximage'>
                        <img
                            src={Product.Image[0].url}
                            alt=""
                        />
                        <div className="ProductItemSales__box__body__boximage__overlay">
                            {
                                Product.Sale !== 0 &&
                                <div className="ProductItemSales__box__body__boximage__overlay__salespercent">
                                    <div className="ProductItemSales__box__body__boximage__overlay__salespercent__box">
                                        {Math.ceil(100 - (Product.Sale / Product.Price) * 100)}%
                                    </div>
                                </div>
                            }
                            <div className="ProductItemSales__box__body__boximage__overlay__button">
                                <div>
                                    <Link to={`/home/${Product._id}`} >
                                        <Button size='sm' color='light'>
                                            Chi Tiết
                                        </Button>
                                    </Link>
                                </div>
                                <div>
                                    <Button size='sm' color='danger' disabled={isLoading} style={isLoading ? { background: "rgba(252, 0, 0, 0.5)" } : { background: "rgba(252, 0, 0, 0.8)" }} onClick={() => handleAddToCart(Product)}>
                                        Thêm Vào Giỏ
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='ProductItemSales__box__body__boxcontent'>
                        <Link to={`/home/${Product._id}`} >
                            <h5>{Product.Name}</h5>
                        </Link>
                    </div>
                </div>
                <div className='ProductItemSales__box__foot'>
                    {Product.Sale === 0 ?
                        <div className='ProductItemSales__box__foot__sale'>
                            <span>
                                {Product.Price} <span id='vnd'>đ</span>
                            </span>
                        </div>
                        :
                        <div className='ProductItemSales__box__foot__sale'>
                            <span className='ProductItemSales__box__foot__sale__up'>
                                {Product.Sale} <span id='vnd'>đ</span>
                            </span>
                            <br />
                            <span className='ProductItemSales__box__foot__sale__down'>
                                {Product.Price} <span id='vnd'>đ</span>
                            </span>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default ProductItemSales;