import React from 'react';
import PropTypes from 'prop-types';
import './mobilemenu.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBalanceScaleLeft, faBoxOpen, faCaretRight, faCopyright, faHeadphones, faHome, faPhone, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

Mobilemenu.propTypes = {
    onChecked: PropTypes.func,
};
Mobilemenu.defaultProps = {
    onChecked: null
}

function Mobilemenu(props) {
    const { onChecked } = props;
    const [showSm, setShowSm] = useState(false);

    const handleShowsm = () => {
        setShowSm(!showSm);
    }
    const handleOnChecked = () => {
        setShowSm(false);
        onChecked();
    }

    return (
        <div className="mobilemenu">
            <label htmlFor="buttonmenumobile" className="mobilemenu__close"><FontAwesomeIcon icon={faTimes} /></label>
            <ul className="mobilemenu__content">
                <li><NavLink to="/" onClick={() => handleOnChecked()}><FontAwesomeIcon icon={faHome} /><span>ABSTORE</span></NavLink></li>
                <li>
                    <div onClick={() => handleShowsm()}><span><FontAwesomeIcon icon={faBoxOpen} />Sản Phẩm</span><FontAwesomeIcon icon={faCaretRight} style={showSm && { transform: 'rotate(90deg)' }} /></div>
                    <ul className={showSm ? 'mobilemenu__content__submenuactive mobilemenu__content__submenu' : 'mobilemenu__content__submenu'}>
                        <li><NavLink to="/home/category/Headphone" activeStyle={{ fontWeight: 'bold', color: '#00ac9d' }} onClick={() => handleOnChecked()}><FontAwesomeIcon icon={faHeadphones} /><span>Headphone</span></NavLink></li>
                        <li><NavLink to="/home/category/Speaker" activeStyle={{ fontWeight: 'bold', color: '#00ac9d' }} onClick={() => handleOnChecked()}><FontAwesomeIcon icon={faHome} /><span>Speaker</span></NavLink></li>
                    </ul>
                </li>
                <li>
                    <NavLink to="/home/category/producer/listproducer" onClick={() => handleOnChecked()}><FontAwesomeIcon icon={faCopyright} /><span>Thương Hiệu</span>
                    </NavLink>
                </li>
                <li><NavLink to="/home/category/status/Sales" onClick={() => handleOnChecked()}><FontAwesomeIcon icon={faBalanceScaleLeft} /><span>Khuyến Mãi</span></NavLink></li>
                <li><NavLink to="/" onClick={() => handleOnChecked()}><FontAwesomeIcon icon={faPhone} /><span>Liên Hệ</span></NavLink></li>
            </ul>
        </div>
    );
}

export default Mobilemenu;