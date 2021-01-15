import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import './index.scss';
import { useDispatch } from 'react-redux';
import { getListOrder } from '../orderslice';
import { message } from 'antd';
import OrderDetails from '../orderdetails';

OrderHistory.propTypes = {

};

function OrderHistory(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const token = localStorage.getItem('AccessToken');
    const [listOrder, setListOrder] = useState([]);
    const [isDetails, setIsDetails] = useState(false);
    const [idActive, setIdActive] = useState('');
    const total = listOrder.reduce((total, currentValue) =>
        currentValue.Sale > 0
            ?
            total = total + (currentValue.Sale * currentValue.quantity)
            :
            total = total + (currentValue.Price * currentValue.quantity), 0);

    useEffect(() => {
        async function getOrderData() {
            try {
                const orderData = await dispatch(getListOrder());
                setListOrder(orderData.payload);
            } catch (err) {
                message.warning(" Current login has expired, please login again!");
                localStorage.removeItem('AccessToken');
                history.push('/user/login');
            }
        }
        if (token) {
            getOrderData();
        }
    }, [])
    const handleOnClickDetails = (item) => {
        const v = !isDetails;
        setIsDetails(!isDetails);
        setIdActive(item._id);
        if (v === true) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'auto';
        }
    }
    const handleCloseDetails = () => {
        setIsDetails(false);
        setIdActive('');
        document.body.style.overflow = 'auto';
    }
    return (
        <div className="OrderHistory">
            <div className="OrderHistory__container">
                <div className="OrderHistory__container__location">
                    <ul className="OrderHistory__container__location__list">
                        <li className="OrderHistory__container__location__list__lc">
                            <Link to="/">
                                Trang Chủ
                            </Link>
                        </li>
                        <li className="OrderHistory__container__location__list__lc">
                            <Link to="/cart/orderhistory">
                                Đơn Hàng
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="OrderHistory__container__box">
                    <div className="OrderHistory__container__box__list-order">
                        <div className="OrderHistory__container__box__list-order__title">
                            <div className="OrderHistory__container__box__list-order__title__1">
                                <h2>Lịch Sử Mua Hàng</h2>
                                <span>({listOrder.length} Đơn Hàng)</span>
                            </div>
                            <div className="OrderHistory__container__box__list-order__title__2">
                                <h5>Trạng Thái</h5>
                            </div>
                            <div className="OrderHistory__container__box__list-order__title__3">
                                <h5>Thành Tiền</h5>
                            </div>
                            <div className="OrderHistory__container__box__list-order__title__4">
                                <h5>Chi Tiết</h5>
                            </div>
                        </div>
                        {listOrder.length > 0 ?
                            <div className="OrderHistory__container__box__list-order__list">
                                <div className="OrderHistory__container__box__list-order__list__body">
                                    {
                                        listOrder.map((item, index) => (
                                            <div className="OrderHistory__container__box__list-order__list__body__row" key={item._id}>
                                                <div className="OrderHistory__container__box__list-order__list__body__row__username">
                                                    {item.username}
                                                </div>
                                                <div className="OrderHistory__container__box__list-order__list__body__row__email">
                                                    {item.email}
                                                </div>
                                                <div className="OrderHistory__container__box__list-order__list__body__row__numberphone">
                                                    {item.numberphone}
                                                </div>
                                                <div className="OrderHistory__container__box__list-order__list__body__row__address">
                                                    {item.address}
                                                </div>
                                                <div className="OrderHistory__container__box__list-order__list__body__row__status">
                                                    <span
                                                        className={
                                                            item.status ?
                                                                "OrderHistory__container__box__list-order__list__body__row__status__1"
                                                                :
                                                                "OrderHistory__container__box__list-order__list__body__row__status__2"
                                                        }
                                                    >{item.status ? "True" : "False"}</span>
                                                </div>
                                                <div className="OrderHistory__container__box__list-order__list__body__row__price">
                                                    <span>
                                                        {
                                                            item.cart.reduce((total, currentValue) =>
                                                                currentValue.Sale > 0
                                                                    ?
                                                                    total = total + (currentValue.Sale * currentValue.quantity)
                                                                    :
                                                                    total = total + (currentValue.Price * currentValue.quantity), 0)
                                                        }
                                                đ
                                                </span>
                                                </div>
                                                <div className="OrderHistory__container__box__list-order__list__body__row__details">
                                                    <label onClick={() => handleOnClickDetails(item)} className="OrderHistory__container__box__list-order__list__body__row__details__button">
                                                        Chi Tiết
                                                </label>
                                                    <label onClick={handleCloseDetails} style={isDetails ? { display: 'block' } : { display: 'none' }} className="OrderHistory__container__box__list-order__list__body__row__details__overlay"></label>
                                                    <OrderDetails listItems={item.cart} handleCloseDetails={handleCloseDetails} orderId={item._id} idActive={idActive} />
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            :
                            <div className="OrderHistory__container__box__list-order__listnull">
                                Chưa Có Đơn Hàng Nào !
                                <Link to="/" className="OrderHistory__container__box__list-order__listnull__bt">
                                    Tiếp Tục Mua Hàng
                                </Link>
                            </div>
                        }
                    </div>

                </div>
            </div>
        </div>
    );
}

export default OrderHistory;