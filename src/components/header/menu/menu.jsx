import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import CatelorySubMenu from './catelorysubmenu';
import './menu1.scss';
import SubMenu from './submenu';

Menu.propTypes = {

};

function Menu() {
    const [submnStyle, setSubmnStyle] = useState({});
    let timeout = null;
    const handleClickMenu = () => {
        setSubmnStyle({
            'opacity': '0',
            'maxHeight': '0',
            'transform': 'translateY(1rem)'
        })
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            setSubmnStyle({});
        }, 1000)
    }
    return (
        <div className="menu__content">
            <ul>
                <li>
                    <NavLink to="/home/category/Headphone"><span>SẢN PHẨM</span></NavLink>
                    <div className='menu__content__submenu' style={submnStyle}>
                        <CatelorySubMenu handleClickMenu={handleClickMenu} />
                    </div>

                </li>
                <li>
                    <NavLink to="/home/category/producer/listproducer"><span>THƯƠNG HIỆU</span></NavLink>
                    <div className='menu__content__submenu' style={submnStyle}>
                        <SubMenu handleClickMenu={handleClickMenu} />
                    </div>

                </li>
                <li><NavLink to="/home/category/status/Sales"><span>KHUYẾN MÃI</span></NavLink></li>
                <li><NavLink to="/"><span>LIÊN HỆ</span></NavLink></li>
            </ul>
        </div>
    );
}

export default Menu;