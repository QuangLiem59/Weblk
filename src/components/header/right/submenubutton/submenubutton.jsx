import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './submenubutton.scss';
import { faAlignJustify } from '@fortawesome/free-solid-svg-icons';
import Mobilemenu from 'components/header/mobilemenu';

Submenubutton.propTypes = {

};

function Submenubutton() {
    const [onClickMenuMobile, setOnClickMenuMobile] = useState(false);
    const handleOnClickmobilemenu = () => {
        const v = !onClickMenuMobile;
        setOnClickMenuMobile(v);
        if (v === true) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'auto';
        }
    }
    return (
        <div className="Submenubutton">
            <label htmlFor="buttonmenumobile" className="Submenubutton__bt"><FontAwesomeIcon icon={faAlignJustify} /></label>
            <input hidden type="checkbox" name="buttonmenumobile" id="buttonmenumobile" checked={onClickMenuMobile} onChange={handleOnClickmobilemenu} />
            <label htmlFor="buttonmenumobile" className="Submenubutton__overlay" ></label>
            <Mobilemenu onChecked={handleOnClickmobilemenu} />
        </div>
    );
}

export default Submenubutton;