import React from 'react';
import { NavLink } from 'react-router-dom';
import CatelorySubMenu from './catelorysubmenu';
import './menu1.scss';
import SubMenu from './submenu';

Menu.propTypes = {

};

function Menu() {
    return (
        <div className="menu__content">
            <ul>
                <li>
                    <NavLink to="/"><span>SẢN PHẨM</span></NavLink>
                    <div className='menu__content__submenu'>
                        <CatelorySubMenu />
                    </div>

                </li>
                <li>
                    <NavLink to="/"><span>THƯƠNG HIỆU</span></NavLink>
                    <div className='menu__content__submenu'>
                        <SubMenu />
                    </div>

                </li>
                <li><NavLink to="/"><span>KHUYẾN MÃI</span></NavLink></li>
                <li><NavLink to="/"><span>LIÊN HỆ</span></NavLink></li>
            </ul>
        </div>
    );
}

export default Menu;