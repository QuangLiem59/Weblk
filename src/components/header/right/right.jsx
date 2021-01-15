import React from 'react';
import './right.scss';
import Search from './search/search';
import User from './user/user';
import Cart from './cart/cart';
import Submenubutton from './submenubutton/submenubutton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import MobileSearch from './mobilesearch/mobilesearch';

Right.propTypes = {

};

function Right() {
    const [onClickSearchMobile, setOnClickSearchMobile] = useState(false);
    const handleOnClickSearchMobile = () => {
        const v = !onClickSearchMobile;
        setOnClickSearchMobile(v);
        if (v === true) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'auto';
        }
    }
    return (
        <div className="right">
            <div className="right__search"><Search /></div>
            <div className="right__mobilesearch">
                <label htmlFor="right__mobilesearch__cb" className="right__mobilesearch__bt">
                    <FontAwesomeIcon icon={faSearch} />
                </label>
                <input
                    hidden
                    type="checkbox"
                    name="right__mobilesearch__cb"
                    id="right__mobilesearch__cb"
                    className="right__mobilesearch__cb"
                    checked={onClickSearchMobile}
                    onChange={handleOnClickSearchMobile}
                />
                <label htmlFor="right__mobilesearch__cb" className="right__mobilesearch__overlay" ></label>
                <MobileSearch />
            </div>
            <div className="right__user"><User /></div>
            <div className="right__cart"><Cart /></div>
            <div className="right__smbt"><Submenubutton /></div>
        </div>
    );
}

export default Right;