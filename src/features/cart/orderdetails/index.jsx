import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

OrderDetails.propTypes = {
    listItems: PropTypes.array,
    handleCloseDetails: PropTypes.func,
    orderId: PropTypes.string,
    idActive: PropTypes.string,
};
OrderDetails.defaultProps = {
    listItems: [],
    handleCloseDetails: null,
    orderId: '',
    idActive: ''
}

function OrderDetails(props) {
    const { listItems, handleCloseDetails, orderId, idActive } = props;
    return (
        <div className="Order-Details" style={orderId === idActive ? { display: 'block', opacity: '1', transform: 'scale(1)' } : { display: 'none', opacity: '0', transform: 'scale(0.9)' }}>
            <div className="Order-Details__box">
                <div className="Order-Details__box__title">
                    Detail
                </div>
                <div className="Order-Details__box__close">
                    <FontAwesomeIcon icon={faTimes} onClick={handleCloseDetails} />
                </div>
                <div className="Order-Details__box__header">
                    <div className="Order-Details__box__header__name">
                        Name
                        </div>
                    <div className="Order-Details__box__header__image">
                        Image
                        </div>
                    <div className="Order-Details__box__header__category">
                        Category
                        </div>
                    <div className="Order-Details__box__header__price">
                        Price
                        </div>
                    <div className="Order-Details__box__header__quantity">
                        Quantity
                        </div>
                </div>
                <div className="Order-Details__box__list-items">
                    {
                        listItems.map(item => (
                            <div className="Order-Details__box__list-items__item" key={item._id}>
                                <div className="Order-Details__box__list-items__item__name">
                                    {item.Name}
                                </div>
                                <div className="Order-Details__box__list-items__item__image">
                                    <img
                                        src={item.Image[0].url}
                                        alt=""
                                    />
                                </div>
                                <div className="Order-Details__box__list-items__item__category">
                                    {item.Category}
                                </div>
                                {item.Sale === 0 ?
                                    <div className='Order-Details__box__list-items__item__price'>
                                        <span>
                                            {item.Price} <span id='vnd'>đ</span>
                                        </span>
                                    </div>
                                    :
                                    <div className='Order-Details__box__list-items__item__price'>
                                        <span className='Order-Details__box__list-items__item__price__up'>
                                            {item.Sale} <span id='vnd'>đ</span>
                                        </span>
                                        <br />
                                        <span className='Order-Details__box__list-items__item__price__down'>
                                            {item.Price} <span id='vnd'>đ</span>
                                        </span>
                                    </div>
                                }
                                <div className="Order-Details__box__list-items__item__quantity">
                                    {item.quantity}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;