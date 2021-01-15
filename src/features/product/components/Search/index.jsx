import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import ProductItem from '../ProductItem';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct } from 'features/product/productslice';
import PartLoading from 'components/partloading';

Searchcpn.propTypes = {
    setF1: PropTypes.func,
    setF2: PropTypes.func
};
Searchcpn.defaultProps = {
    setF1: null,
    setF2: null,
}

function Searchcpn(props) {
    const search = useParams().search;
    const [sbIsActive, setSbIsActive] = useState('');
    const [listCategoryProduct, setlistCategoryProduct] = useState([]);
    const [sortByListActive, setSortByListActive] = useState(false);
    const [params, setParams] = useState({ page: '1', limit: '10', 'Name[regex]': search });
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
        setParams({ page: '1', limit: '10', 'Name[regex]': search });
    }, [search]);

    useEffect(() => {
        setF2('');
        setF1('Search');
    })


    const handleSetSB = (vl) => {
        setSbIsActive(vl);
        handleActiveSbList();
        switch (vl) {
            case 'newest': return (
                sortBy.current = 'Mới Nhất',
                setParams({ page: '1', limit: '10', 'Name[regex]': search, sort: '-createdAt' })
            );
            case 'oldest': return (
                sortBy.current = 'Củ Nhất',
                setParams({ page: '1', limit: '10', 'Name[regex]': search, sort: 'createdAt' })
            );
            case 'lowtohigh': return (
                sortBy.current = 'Giá Từ Thấp Đến Cao',
                setParams({ page: '1', limit: '10', 'Name[regex]': search, sort: 'Price' })
            );
            case 'hightolow': return (
                sortBy.current = 'Giá Từ Cao Đến Thấp',
                setParams({ page: '1', limit: '10', 'Name[regex]': search, sort: '-Price' })
            );
        }
    }
    const handleActiveSbList = () => {
        setSortByListActive(!sortByListActive);
    }
    return (
        <div className="Searchcpn">
            <div className="Searchcpn__list-items">
                <div className="Searchcpn__list-items__title">
                    Search For "{search}"
                </div>
                <div className="Searchcpn__list-items__sort">
                    <div className="Searchcpn__list-items__sort__sortby" >Sort By :</div>
                    <div
                        className="Searchcpn__list-items__sort__select"
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
                <div className="Searchcpn__list-items__isLoading" style={isLoading.loading === false ? { display: 'none' } : { display: 'block' }}>
                    <PartLoading />
                </div>
                <div className="Searchcpn__list-items__list" style={isLoading.loading === true ? { opacity: 0, height: 0 } : { opacity: 1, height: 'auto' }}>
                    {
                        listCategoryProduct.length > 0 ?
                            listCategoryProduct.map(product => (
                                <ProductItem Product={product} key={product._id} />
                            ))
                            :
                            <div className="Searchcpn__list-items__list__null">
                                Không Tìm Thấy Sản Phẩm Phù Hợp!
                            </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Searchcpn;