import React from 'react';
import './submenu.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

SubMenu.propTypes = {

};

function SubMenu(props) {
    const producer = useSelector(state => state.producer);
    return (
        <div className="submn">
            <div className="submn__rowsubmenu">
                {
                    producer.map(pr => (
                        <div className="submn__rowsubmenu__col" key={pr.id}>
                            <div className="submn__rowsubmenu__col__boxlogo">
                                <Link to={`/home/producer/${pr.title}`} >
                                    <img src={pr.img} alt="a" />
                                </Link>
                            </div>
                        </div>
                    ))
                }

            </div>
            <div className='submn__seeall'>
                <Link to='/'>
                    <button className='submn__seeall__bt'>
                        Xem Tất Cả
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default SubMenu;