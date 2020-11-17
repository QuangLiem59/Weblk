import React from 'react';
import PropTypes from 'prop-types';
import './ProductItem.scss';
import { Link, NavLink } from 'react-router-dom';
import { Button } from 'reactstrap';

ProductItem.propTypes = {
    Product: PropTypes.object,
};
ProductItem.defaultProps = {
    Product: []
}

function ProductItem(props) {
    const { Product } = props;
    return (
        <div className='ProductItem'>
            <div className='ProductItem__box'>
                <div className='ProductItem__box__body'>
                    <div className='ProductItem__box__body__boximage'>
                        <img
                            src={Product.Image[0].url}
                            alt=""
                        />
                        <div className="ProductItem__box__body__boximage__overlay">
                            {
                                Product.Sale !== 0 &&
                                <div className="ProductItem__box__body__boximage__overlay__salespercent">
                                    <div className="ProductItem__box__body__boximage__overlay__salespercent__box">
                                        {Math.ceil(100 - (Product.Sale / Product.Price) * 100)}%
                                    </div>
                                </div>
                            }
                            <div className="ProductItem__box__body__boximage__overlay__button">
                                <div>
                                    <NavLink to={`/home/${Product._id}`} >
                                        <Button size='sm' color='light'>
                                            Chi Tiết
                                        </Button>
                                    </NavLink>
                                </div>
                                <div>
                                    <NavLink to="/">
                                        <Button size='sm' color='danger'>
                                            Thêm Vào Giỏ
                                        </Button>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='ProductItem__box__body__boxcontent'>
                        <Link to={`/home/${Product._id}`} >
                            <h5>{Product.Name}</h5>
                        </Link>
                    </div>
                </div>
                <div className='ProductItem__box__foot'>
                    {Product.Sale === 0 ?
                        <div className='ProductItem__box__foot__sale'>
                            <span>
                                {Product.Price} <span id='vnd'>đ</span>
                            </span>
                        </div>
                        :
                        <div className='ProductItem__box__foot__sale'>
                            <span className='ProductItem__box__foot__sale__up'>
                                {Product.Sale} <span id='vnd'>đ</span>
                            </span>
                            <br />
                            <span className='ProductItem__box__foot__sale__down'>
                                {Product.Price} <span id='vnd'>đ</span>
                            </span>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default ProductItem;