import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import ProductItem from '../ProductItem';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getProduct } from 'features/product/productslice';
import PartLoading from 'components/partloading';

ProductTypes.propTypes = {
    setF1: PropTypes.func,
    setF2: PropTypes.func
};
ProductTypes.defaultProps = {
    setF1: null,
    setF2: null,
}

function ProductTypes(props) {
    const Type = useParams().types;
    const [sbIsActive, setSbIsActive] = useState('newest');
    const [listCategoryProduct, setlistCategoryProduct] = useState([]);
    const [sortByListActive, setSortByListActive] = useState(false);
    const [params, setParams] = useState({ page: '1', limit: '10', Category: Type });
    const sortBy = useRef('Mới Nhất');

    const { setF1, setF2 } = props;

    const isLoading = useSelector(state => state.product);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProduct(params)).then(res => {
            const getPd = unwrapResult(res);
            setlistCategoryProduct(getPd.product);
        });
    }, [params]);

    useEffect(() => {
        setSbIsActive('newest');
        sortBy.current = 'Mới Nhất';
        setParams({ page: '1', limit: '10', Category: Type })
    }, [Type]);

    useEffect(() => {
        setF2(Type);
        setF1('Category');
    })


    const handleSetSB = (vl) => {
        setSbIsActive(vl);
        handleActiveSbList();
        switch (vl) {
            case 'newest': return (
                sortBy.current = 'Mới Nhất',
                setParams({ page: '1', limit: '10', Category: Type, sort: '-createdAt' })
            );
            case 'oldest': return (
                sortBy.current = 'Củ Nhất',
                setParams({ page: '1', limit: '10', Category: Type, sort: 'createdAt' })
            );
            case 'lowtohigh': return (
                sortBy.current = 'Giá Từ Thấp Đến Cao',
                setParams({ page: '1', limit: '10', Category: Type, sort: 'Price' })
            );
            case 'hightolow': return (
                sortBy.current = 'Giá Từ Cao Đến Thấp',
                setParams({ page: '1', limit: '10', Category: Type, sort: '-Price' })
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
        <div className="Product-types" onClick={handleInactiveSbList}>
            <div className="Product-types__list-items">
                <div className="Product-types__list-items__title">
                    {Type}
                </div>
                <div className="Product-types__list-items__types">
                    <NavLink
                        className="Product-types__list-items__types__type"
                        to="/home/category/Headphone"
                        activeClassName="Product-types__list-items__types__type__active"
                    >
                        HeadPhone
                    </NavLink>
                    <NavLink
                        className="Product-types__list-items__types__type"
                        to="/home/category/Speaker"
                        activeClassName="Product-types__list-items__types__type__active"
                    >
                        Speaker
                    </NavLink>
                </div>
                <div className="Product-types__list-items__sort">
                    <div className="Product-types__list-items__sort__sortby" >Sort By :</div>
                    <div
                        className="Product-types__list-items__sort__select"
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
                <div className="Product-types__list-items__isLoading" style={isLoading.loading === false ? { display: 'none' } : { display: 'block' }}>
                    <PartLoading />
                </div>
                <div className="Product-types__list-items__list" style={isLoading.loading === true ? { opacity: 0, height: 0 } : { opacity: 1, height: 'auto' }}>
                    {
                        listCategoryProduct.map(product => (
                            <ProductItem Product={product} key={product._id} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default ProductTypes;