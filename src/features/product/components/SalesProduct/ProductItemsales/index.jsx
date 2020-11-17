import React from 'react';
import PropTypes from 'prop-types';
import './productitemsales.scss';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

ProductItemSales.propTypes = {
    Product: PropTypes.object,
};
ProductItemSales.defaultProps = {
    Product: []
}

function ProductItemSales(props) {
    const { Product } = props;
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
                                    <Button size='sm' color='danger'>
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