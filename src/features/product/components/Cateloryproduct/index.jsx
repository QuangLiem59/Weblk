import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import CategoryPdItems from './CategoryPdItems';
import { getProducer } from 'features/product/producerslice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getProduct } from 'features/product/productslice';
import PartLoading from 'components/partloading';

CateloryProduct.propTypes = {
    setF1: PropTypes.func,
    setF2: PropTypes.func
};
CateloryProduct.defaultProps = {
    setF1: null,
    setF2: null,
}

function CateloryProduct(props) {
    const dispatch = useDispatch();
    const sortBy = useRef('Mới Nhất');
    const producerName = useParams().producer;
    const { setF1, setF2 } = props;

    const isLoading = useSelector(state => state.product);

    const [sbIsActive, setSbIsActive] = useState('');
    const [sortByListActive, setSortByListActive] = useState(false);
    const [listProducers, setListProducers] = useState([]);
    const [listCategoryProduct, setListCategoryProduct] = useState([]);
    const [params, setParams] = useState({ page: '1', limit: '10', Producer: producerName });


    useEffect(() => {
        dispatch(getProduct(params)).then(res => {
            const getPd = unwrapResult(res);
            setListCategoryProduct(getPd.product);
        });
    }, [params]);

    useEffect(() => {
        setParams({ page: '1', limit: '10', Producer: producerName })
    }, [producerName]);

    useEffect(() => {
        setF2(producerName);
        setF1('Producer');
    })

    useEffect(() => {
        dispatch(getProducer()).then(res => {
            const getPdcer = unwrapResult(res);
            setListProducers(getPdcer.producer);
        });
    }, []);

    const handleSetSB = (vl) => {
        setSbIsActive(vl);
        handleActiveSbList();
        switch (vl) {
            case 'newest': return (
                sortBy.current = 'Mới Nhất',
                setParams({ page: '1', limit: '10', Producer: producerName, sort: '-createdAt' })
            );
            case 'oldest': return (
                sortBy.current = 'Củ Nhất',
                setParams({ page: '1', limit: '10', Producer: producerName, sort: 'createdAt' })
            );
            case 'lowtohigh': return (
                sortBy.current = 'Giá Từ Thấp Đến Cao',
                setParams({ page: '1', limit: '10', Producer: producerName, sort: 'Price' })
            );
            case 'hightolow': return (
                sortBy.current = 'Giá Từ Cao Đến Thấp',
                setParams({ page: '1', limit: '10', Producer: producerName, sort: '-Price' })
            );
        }
    }
    const handleActiveSbList = () => {
        setSortByListActive(!sortByListActive);
    }
    const handleInactiveSbList = () => {
        if (sortByListActive) {
            setSortByListActive(false);
        }
    }
    return (
        <div className="Ctgry-container" onClick={handleInactiveSbList}>
            <div className="Ctgry-container__list-producer">
                <div className="Ctgry-container__list-producer__box">
                    <div className="Ctgry-container__list-producer__box__title">
                        Brand List
                    </div>
                    <ul className="Ctgry-container__list-producer__box__list">
                        {
                            listProducers.map(prc => (
                                <li key={prc._id}>
                                    <NavLink
                                        exact={true}
                                        activeStyle={{
                                            fontWeight: "bold",
                                            boxShadow: "0 0 0.1rem rgb(0, 209, 164)",
                                            border: "2px solid rgb(0, 209, 164)",
                                            color: "rgb(0, 209, 164)"
                                        }}
                                        to={`/home/category/producer/${prc.ProducerName}`}
                                    >
                                        {prc.ProducerName}
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div className="Ctgry-container__list-items">
                <div className="Ctgry-container__list-items__title">
                    {producerName}
                </div>
                <div className="Ctgry-container__list-items__sort">
                    <div className="Ctgry-container__list-items__sort__sortby" >Sort By :</div>
                    <div
                        className="Ctgry-container__list-items__sort__select"
                        onClick={() => handleActiveSbList()}
                    >
                        <span>{sortBy.current}</span>
                        <ul
                            style={sortByListActive === true ? { display: 'block' } : { display: 'none' }}
                        >
                            <li
                                onClick={() => handleSetSB('newest')}
                                style={sbIsActive === 'newest' ? { backgroundColor: "rgb(204, 204, 204)" } : {}}
                            >
                                Mới Nhất
                                </li>
                            <li
                                onClick={() => handleSetSB('oldest')}
                                style={sbIsActive === 'oldest' ? { backgroundColor: "rgb(204, 204, 204)" } : {}}
                            >
                                Củ Nhất
                                </li>
                            <li
                                onClick={() => handleSetSB('lowtohigh')}
                                style={sbIsActive === 'lowtohigh' ? { backgroundColor: "rgb(204, 204, 204)" } : {}}
                            >
                                Giá từ thấp đến cao
                                </li>
                            <li
                                onClick={() => handleSetSB('hightolow')}
                                style={sbIsActive === 'hightolow' ? { backgroundColor: "rgb(204, 204, 204)" } : {}}
                            >
                                Giá từ cao đến thấp
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="Ctgry-container__list-items__isLoading" style={isLoading.loading === false ? { display: 'none' } : { display: 'block' }}>
                    <PartLoading />
                </div>
                <div className="Ctgry-container__list-items__list" style={isLoading.loading === true ? { opacity: 0, height: 0 } : { opacity: 1, height: 'auto' }}>
                    {
                        listCategoryProduct.map(product => (
                            <CategoryPdItems Product={product} key={product._id} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default CateloryProduct;