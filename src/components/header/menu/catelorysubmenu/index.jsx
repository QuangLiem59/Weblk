import React from 'react';
import './catelorysubmenu.scss';
import { Link } from 'react-router-dom';
import Banner from 'constant/banner';

CatelorySubMenu.propTypes = {

};

function CatelorySubMenu(props) {
    return (
        <div className="catelorysubmn">
            <div className="catelorysubmn__rowsubmenu">
                <div className="catelorysubmn__rowsubmenu__col">
                    <div className="catelorysubmn__rowsubmenu__col__boxlogo">
                        <Link to='/' >
                            <img src={Banner.bn1} alt="a" />
                            <div className="catelorysubmn__rowsubmenu__col__boxlogo__content">
                                <h2>HeadPhone</h2>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="catelorysubmn__rowsubmenu__col">
                    <div className="catelorysubmn__rowsubmenu__col__boxlogo">
                        <Link to='/' >
                            <img src={Banner.bn8} alt="a" />
                            <div className="catelorysubmn__rowsubmenu__col__boxlogo__content">
                                <h2>Speaker</h2>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CatelorySubMenu;