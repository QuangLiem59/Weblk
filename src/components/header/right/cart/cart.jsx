import React, { useState } from 'react';
import './cart.scss';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { message } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { getUserInfor } from 'features/cart/userslice';
import userApi from '../../../../api/userApi';

Cart.propTypes = {

};

function Cart() {
    const token = localStorage.getItem('AccessToken');
    const [cartLength, setCartLength] = useState(0);
    const dispatch = useDispatch();
    const history = useHistory();
    const cart = useSelector(state => state.user.cart);
    const isLoading = useSelector(state => state.user.loading);

    useEffect(() => {
        async function fetchData() {
            try {
                dispatch(getUserInfor())
            } catch (err) {
                message.warning(" Current login has expired, please login again!");
                localStorage.removeItem('AccessToken');
                history.push('/user/login');
            }
        }
        if (token) {
            fetchData();
        }
    }, [token]);

    useEffect(() => {
        async function getData() {
            try {
                const userPf = await userApi.GetProfile();
                setCartLength(userPf.user.cart.length);
            } catch (err) {
                message.warning(" Current login has expired, please login again!");
                localStorage.removeItem('AccessToken');
                history.push('/user/login');
            }
        }
        if (token) {
            getData();
        }
        else {
            setCartLength(0);
        }
    }, [cart, token, isLoading])
    return (
        <div className="cart" title="Cart">
            <Link className="cart__bt" to="/cart"><FontAwesomeIcon icon={faShoppingCart} /> </Link>
            <div className="cart__count">{cartLength}</div>
        </div>
    );
}

export default Cart;