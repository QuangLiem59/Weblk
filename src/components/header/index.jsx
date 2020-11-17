import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';
import Menu from './menu/menu';
import Right from './right/right';

Header.propTypes = {

};

function Header(props) {
    return (
        <div className="topmenu">
            <div className="topmenu__container">
                <div className="topmenu__container__content">
                    <div className="topmenu__container__content__logo">
                        <Link to='/'>
                            ABSTORE
                        </Link>
                    </div>
                    <div className='topmenu__container__content__menu'>
                        <Menu />
                    </div>
                    <div className="topmenu__container__content__right">
                        <Right />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;