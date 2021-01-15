import React, { useEffect, useRef } from 'react';
import './index.scss';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { message, Popconfirm } from 'antd';
import userApi from 'api/userApi';
import { useState } from 'react';
import { addToCart, getUserInfor } from '../userslice';
import PartLoading from 'components/partloading';
import Payment from '../payment';

CartCP.propTypes = {

};

function CartCP() {
    const isLoading = useSelector(state => state.user.loading) || false;
    const userprofile = useSelector(state => state.user.userdata) || {};
    const history = useHistory();
    const [listItems, setListItems] = useState([]);
    const total = listItems.reduce((total, currentValue) =>
        currentValue.Sale > 0
            ?
            total = total + (currentValue.Sale * currentValue.quantity)
            :
            total = total + (currentValue.Price * currentValue.quantity), 0);
    const token = localStorage.getItem('AccessToken');
    const dispatch = useDispatch();
    const timeOutRef = useRef(null);
    const [isPaypal, setIsPaypal] = useState(false);

    useEffect(() => {
        async function getData() {
            try {
                const userPf = await userApi.GetProfile();
                setListItems(userPf.user.cart);
            } catch (err) {
                message.warning(" Current login has expired, please login again!");
                localStorage.removeItem('AccessToken');
                history.push('/user/login');
            }
        }
        if (token) {
            getData();
        }
    }, [])

    const handleOnClickPaypal = () => {
        const v = !isPaypal;
        setIsPaypal(!isPaypal);
        if (v === true) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'auto';
        }
    }

    const handleChangeCart = async () => {
        try {
            await dispatch(addToCart({ cart: listItems }));
            await dispatch(getUserInfor());
        } catch (err) {
            message.warning("Error , Please try again!");
            // localStorage.removeItem('AccessToken');
            // history.push('/user/login');
        }
    }

    const handleQuantityChange = (items, e) => {
        if (!isLoading) {
            listItems.forEach(item => {
                if (item._id === items._id) {
                    if (e.target.value < 1 || e.target.value === "") {
                        if (e.target.value !== "") {
                            item.quantity = 1;
                        }
                        else {
                            item.quantity = 0;
                        }
                    }
                    else if (e.target.value > 99) {
                        item.quantity = 99;
                    }
                    else {
                        item.quantity = parseInt(e.target.value, 10);
                    }
                }
            })
            if (e.target.value !== "" || e.target.value > 0 || e.target.value < 100) {
                setListItems([...listItems]);
                if (timeOutRef.current) {
                    clearTimeout(timeOutRef.current);
                }
                timeOutRef.current = setTimeout(() => {
                    handleChangeCart();
                }, 500);
            }
        }
    }

    const increment = (id) => {
        if (!isLoading) {
            listItems.forEach(item => {
                if (item._id === id) {
                    item.quantity === 99 ? item.quantity = 99 : item.quantity += 1;
                }
            })
            setListItems([...listItems]);
            if (timeOutRef.current) {
                clearTimeout(timeOutRef.current);
            }
            timeOutRef.current = setTimeout(() => {
                handleChangeCart();
            }, 500);
        }
    }

    const decrement = (id) => {
        if (!isLoading) {
            listItems.forEach(item => {
                if (item._id === id) {
                    item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1;
                }
            })
            setListItems([...listItems]);
            if (timeOutRef.current) {
                clearTimeout(timeOutRef.current);
            }
            timeOutRef.current = setTimeout(() => {
                handleChangeCart();
            }, 500);
        }
    }

    const removeItem = (id) => {
        listItems.forEach((item, index) => {
            if (item._id === id) {
                listItems.splice(index, 1);
            }
        })
        setListItems([...listItems]);
        handleChangeCart();
    }

    const confirm = (id) => {
        removeItem(id);
        message.success('Product Removed!');
    }

    const handleOnBlur = (items, e) => {
        if (parseInt(e.target.value) === 0) {
            listItems.forEach(item => {
                if (item._id === items._id) {
                    item.quantity = 1;
                }
            })
            setListItems([...listItems]);
            handleChangeCart();
        }
    }
    return (
        <div className="cart-page">
            <div className="cart-page__container">
                <div className="cart-page__container__location">
                    <ul className="cart-page__container__location__list">
                        <li className="cart-page__container__location__list__lc">
                            <Link to="/">
                                Trang Chủ
                                </Link>
                        </li>
                        <li className="cart-page__container__location__list__lc">
                            <Link to="/cart">
                                Giỏ Hàng
                            </Link>
                        </li>
                    </ul>
                </div>
                {listItems.length > 0 ?
                    <div className="cart-page__container__box">
                        <div className="cart-page__container__box__list-items">
                            <div className="cart-page__container__box__list-items__title">
                                <div className="cart-page__container__box__list-items__title__1">
                                    <h2>
                                        Giỏ Hàng
                                </h2>
                                    <span>({listItems.length} sản phẩm)</span>
                                </div>
                                <div className="cart-page__container__box__list-items__title__2">
                                    <h5>Giá Tiền</h5>
                                </div>
                                <div className="cart-page__container__box__list-items__title__3">
                                    <h5>Số Lượng</h5>
                                </div>
                            </div>
                            <div className="cart-page__container__box__list-items__list">
                                <div className="cart-page__container__box__list-items__list__body-cart">
                                    {
                                        listItems.map(items => (
                                            <div className="cart-page__container__box__list-items__list__body-cart__row" key={items._id}>
                                                <div className="cart-page__container__box__list-items__list__body-cart__row__remove">
                                                    <Popconfirm
                                                        title="Are you sure to remove?"
                                                        onConfirm={() => confirm(items._id)}
                                                        okText="Yes"
                                                        cancelText="No"
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </Popconfirm>
                                                </div>
                                                <div className="cart-page__container__box__list-items__list__body-cart__row__image">
                                                    <img src={items.Image[0].url} />
                                                </div>
                                                <Link to={"/home/" + items._id} className="cart-page__container__box__list-items__list__body-cart__row__name">
                                                    {items.Name}
                                                </Link>

                                                {items.Sale > 0 ?
                                                    <div className="cart-page__container__box__list-items__list__body-cart__row__price">
                                                        <div className="cart-page__container__box__list-items__list__body-cart__row__price__origin-price">
                                                            {items.Price} đ
                                                    </div>
                                                        <div className="cart-page__container__box__list-items__list__body-cart__row__price__sale">
                                                            {items.Sale} đ
                                                    </div>
                                                        <div className="cart-page__container__box__list-items__list__body-cart__row__price__salepercent">
                                                            {Math.ceil(100 - (items.Sale / items.Price) * 100)}%
                                                    </div>
                                                    </div>
                                                    :
                                                    <div className="cart-page__container__box__list-items__list__body-cart__row__price">
                                                        <div className="cart-page__container__box__list-items__list__body-cart__row__price__origin">
                                                            {items.Price} đ
                                                    </div>
                                                    </div>
                                                }

                                                <div className="cart-page__container__box__list-items__list__body-cart__row__count">
                                                    <label
                                                        className="cart-page__container__box__list-items__list__body-cart__row__count__minus"
                                                        onClick={() => decrement(items._id)}
                                                        style={isLoading ? { background: '#dadadaa2' } : { background: '#bdbdbd' }}
                                                    >
                                                        -
                                                    </label>
                                                    <input
                                                        type="number"
                                                        ref={timeOutRef}
                                                        value={items.quantity}
                                                        min="1" max="99"
                                                        onChange={(e) => handleQuantityChange(items, e)}
                                                        onBlur={(e) => handleOnBlur(items, e)}
                                                        style={isLoading ? { background: '#dadadaa2' } : { background: 'none' }}
                                                    />
                                                    <label
                                                        className="cart-page__container__box__list-items__list__body-cart__row__count__plus"
                                                        onClick={() => increment(items._id)}
                                                        style={isLoading ? { background: '#dadadaa2' } : { background: '#bdbdbd' }}
                                                    >
                                                        +
                                                    </label>
                                                </div>

                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="cart-page__container__box__total-price">
                            <div className="cart-page__container__box__total-price__box">
                                <div className="cart-page__container__box__total-price__box__title">
                                    <h2>Đơn Hàng</h2>
                                </div>
                                <div className="cart-page__container__box__total-price__box__body">
                                    <div className="cart-page__container__box__total-price__box__body__total">
                                        <h3>Tổng: </h3>
                                        <p>{total} <span>đ</span></p>
                                    </div>
                                    <div className="cart-page__container__box__total-price__box__body__footer">
                                        <Link to='/' className="cart-page__container__box__total-price__box__body__footer__left">Tiếp Tục Mua Sắm</Link>
                                        <div className="cart-page__container__box__total-price__box__body__footer__right">
                                            <label htmlFor="paypal"> Thanh Toán</label>
                                            <input hidden type="checkbox" name="paypal" id="paypal" checked={isPaypal} onChange={handleOnClickPaypal} />
                                            <label htmlFor="paypal" className="cart-page__container__box__total-price__box__body__footer__right__overlay"></label>
                                            <Payment userprofile={userprofile} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    isLoading ?
                        <PartLoading />
                        :
                        <div className="cart-page__container__box">
                            <div className="cart-page__container__box__null">
                                <span>Không Có Sản Phẩm Nào Trong Giỏ Hàng</span>
                                <Link to="/">Tiếp Tục Mua Hàng</Link>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
}

export default CartCP;