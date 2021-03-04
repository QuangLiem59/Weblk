import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import ProductItem from '../ProductItem';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getProduct } from 'features/product/productslice';
import PartLoading from 'components/partloading';
import Loadmore from '../Loadmore';
import Pagi from '../Pagination';

StatusProduct.propTypes = {
    setF1: PropTypes.func,
    setF2: PropTypes.func
};
StatusProduct.defaultProps = {
    setF1: null,
    setF2: null,
}

function StatusProduct(props) {
    const status = useParams().status;
    const [sbIsActive, setSbIsActive] = useState('newest');
    const [listCategoryProduct, setlistCategoryProduct] = useState([]);
    const [sortByListActive, setSortByListActive] = useState(false);
    const [listCTLength, setListCTLength] = useState(0);
    const [page, setPage] = useState(1);
    const [params, setParams] = useState({ limit: 10, page: page });
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
        async function changeStatus() {
            setSbIsActive('newest');
            sortBy.current = 'Mới Nhất';
            await setPage(1);
            switch (status) {
                case 'News': return setParams({ limit: 10, page: page, News: true });
                case 'Hots': return setParams({ limit: 10, page: page, Hots: true });
                case 'Sales': return setParams({ limit: 10, page: page, 'Sale[gt]': 0 });
            }
        }
        changeStatus();
    }, [status]);

    useEffect(() => {
        setF2('');
        setF1(status);
    })

    useEffect(() => {
        switch (status) {
            case 'News':
                switch (sbIsActive) {
                    case 'newest': return setParams({ limit: 10, page: page, News: true, sort: '-createdAt' });
                    case 'oldest': return setParams({ limit: 10, page: page, News: true, sort: 'createdAt' });
                    case 'lowtohigh': return setParams({ limit: 10, page: page, News: true, sort: 'Price' });
                    case 'hightolow': return setParams({ limit: 10, page: page, News: true, sort: '-Price' });
                }
            case 'Hots':
                switch (sbIsActive) {
                    case 'newest': return setParams({ limit: 10, page: page, Hots: true, sort: '-createdAt' });
                    case 'oldest': return setParams({ limit: 10, page: page, Hots: true, sort: 'createdAt' });
                    case 'lowtohigh': return setParams({ limit: 10, page: page, Hots: true, sort: 'Price' });
                    case 'hightolow': return setParams({ limit: 10, page: page, Hots: true, sort: '-Price' });
                }
            case 'Sales':
                switch (sbIsActive) {
                    case 'newest': return setParams({ limit: 10, page: page, 'Sale[gt]': 0, sort: '-createdAt' });
                    case 'oldest': return setParams({ limit: 10, page: page, 'Sale[gt]': 0, sort: 'createdAt' });
                    case 'lowtohigh': return setParams({ limit: 10, page: page, 'Sale[gt]': 0, sort: 'Price' });
                    case 'hightolow': return setParams({ limit: 10, page: page, 'Sale[gt]': 0, sort: '-Price' });
                }
        }
    }, [page]);

    useEffect(() => {
        function getCTlength() {
            switch (status) {
                case 'News': return dispatch(getProduct({ limit: 0, News: true })).then(res => {
                    const getCt = unwrapResult(res);
                    setListCTLength(getCt.product.length);
                });
                case 'Hots': return dispatch(getProduct({ limit: 0, Hots: true })).then(res => {
                    const getCt = unwrapResult(res);
                    setListCTLength(getCt.product.length);
                });
                case 'Sales': return dispatch(getProduct({ limit: 0, 'Sale[gt]': 0 })).then(res => {
                    const getCt = unwrapResult(res);
                    setListCTLength(getCt.product.length);
                });
            }
        }
        getCTlength();
    }, [status]);

    const handleSetSB = (vl) => {
        setSbIsActive(vl);
        handleActiveSbList();
        switch (vl) {
            case 'newest': return (
                sortBy.current = 'Mới Nhất',
                setParams({ ...params, page: 1, sort: '-createdAt' })
            );
            case 'oldest': return (
                sortBy.current = 'Củ Nhất',
                setParams({ ...params, page: 1, sort: 'createdAt' })
            );
            case 'lowtohigh': return (
                sortBy.current = 'Giá Từ Thấp Đến Cao',
                status === 'Sales' ?
                    setParams({ ...params, page: 1, sort: 'Sale' })
                    :
                    setParams({ ...params, page: 1, sort: 'Price' })
            );
            case 'hightolow': return (
                sortBy.current = 'Giá Từ Cao Đến Thấp',
                status === 'Sales' ?
                    setParams({ ...params, page: 1, sort: '-Sale' })
                    :
                    setParams({ ...params, page: 1, sort: '-Price' })
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
    const onChangePage = (pages) => {
        setPage(pages);
    }
    return (
        <div className="StatusProduct" onClick={handleInactiveSbList}>
            <div className="StatusProduct__list-items">
                <div className="StatusProduct__list-items__title">
                    {status}
                </div>
                <div className="StatusProduct__list-items__types">
                    <NavLink
                        className="StatusProduct__list-items__types__type"
                        to="/home/category/status/News"
                        activeClassName="StatusProduct__list-items__types__type__active"
                    >
                        News
                    </NavLink>
                    <NavLink
                        className="StatusProduct__list-items__types__type"
                        to="/home/category/status/Hots"
                        activeClassName="StatusProduct__list-items__types__type__active"
                    >
                        Hots
                    </NavLink>
                    <NavLink
                        className="StatusProduct__list-items__types__type"
                        to="/home/category/status/Sales"
                        activeClassName="StatusProduct__list-items__types__type__active"
                    >
                        Sales
                    </NavLink>
                </div>
                <div className="StatusProduct__list-items__sort">
                    <div className="StatusProduct__list-items__sort__sortby" >Sort By :</div>
                    <div
                        className="StatusProduct__list-items__sort__select"
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
                <div className="StatusProduct__list-items__isLoading" style={isLoading.loading === false ? { display: 'none' } : { display: 'block' }}>
                    <PartLoading />
                </div>
                <div className="StatusProduct__list-items__list" style={isLoading.loading === true ? { opacity: 0, height: 0 } : { opacity: 1, height: 'auto' }}>
                    {
                        listCategoryProduct.map(product => (
                            <ProductItem Product={product} key={product._id} />
                        ))
                    }
                </div>
                <div className="StatusProduct__list-items__pagination">
                    <Pagi pageSize={10} onChangePage={onChangePage} length={listCTLength} page={page} />
                </div>
            </div>
        </div>
    );
}

export default StatusProduct;