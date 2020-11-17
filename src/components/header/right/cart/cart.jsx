import React from 'react';
import './cart.scss';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

Cart.propTypes = {

};

function Cart(props) {
    return (
        <div className="cart">
            <button className="cart__bt" type="button"><FontAwesomeIcon icon={faShoppingCart} /> </button>
        </div>
    );
}

export default Cart;