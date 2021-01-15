import React, { useEffect, useState } from 'react';
import './submenu.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducer } from 'features/product/producerslice';
import { unwrapResult } from '@reduxjs/toolkit';
import PartLoading from 'components/partloading';
import PropTypes from 'prop-types';

SubMenu.propTypes = {
    handleClickMenu: PropTypes.func,
};
SubMenu.defaultProps = {
    handleClickMenu: null
}

function SubMenu(props) {
    const { handleClickMenu } = props;
    const dispatch = useDispatch();
    const [listProducer, setListProducer] = useState([]);

    useEffect(() => {
        dispatch(getProducer({ limit: '8' })).then(res => {
            const getPdcer = unwrapResult(res);
            setListProducer(getPdcer.producer);
        });
    }, []);
    const producer = listProducer;
    const isLoading = useSelector(state => state.producer);
    return (
        <div className="submn">
            <div className="submn__isLoading" style={isLoading.loading === false ? { display: 'none' } : { display: 'block' }}>
                <PartLoading />
            </div>
            <div className="submn__rowsubmenu" style={isLoading.loading === true ? { opacity: 0, height: 0 } : { opacity: 1, height: 'auto' }}>
                {
                    producer.map(pr => (
                        <div className="submn__rowsubmenu__col" key={pr._id}>
                            <div className="submn__rowsubmenu__col__boxlogo">
                                <Link to={`/home/category/producer/${pr.ProducerName}`} onClick={handleClickMenu}>
                                    <img src={pr.ProducerIcon} alt="a" />
                                </Link>
                            </div>
                        </div>
                    ))
                }

            </div>
            <div className='submn__seeall'>
                <Link to='/home/category/producer/listproducer'>
                    <button className='submn__seeall__bt' onClick={handleClickMenu}>
                        Xem Tất Cả
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default SubMenu;