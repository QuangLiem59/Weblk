import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { getProducer } from 'features/product/producerslice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProducerIC from './ProducerIcon';
import PartLoading from 'components/partloading';
import Loadmore from '../Loadmore';

Producer.propTypes = {
    setF1: PropTypes.func,
    setF2: PropTypes.func
};
Producer.defaultProps = {
    setF1: null,
    setF2: null,
}

function Producer(props) {
    const dispatch = useDispatch();
    const sortBy = useRef('A -> Z');
    const { setF1, setF2 } = props;

    const [sbIsActive, setSbIsActive] = useState('');
    const [sortByListActive, setSortByListActive] = useState(false);
    const [listProducers, setListProducers] = useState([]);
    const [listProducer, setListProducer] = useState([]);
    const [listPrcLength, setListPrcLength] = useState(0);
    const [page, setPage] = useState(1);
    const [params, setParams] = useState({ limit: page * 10 });

    const isLoading = useSelector(state => state.producer);


    useEffect(() => {
        setF2('List Producer');
        setF1('Producer');
    })

    useEffect(() => {
        setParams({ ...params, limit: page * 10 });
    }, [page]);

    useEffect(() => {
        dispatch(getProducer({ limit: 0 })).then(res => {
            const getPdcer = unwrapResult(res);
            setListProducers(getPdcer.producer);
            setListPrcLength(getPdcer.producer.length);
        });
    }, []);

    useEffect(() => {
        async function handleGetProducer() {
            dispatch(getProducer(params)).then(res => {
                const getPdcers = unwrapResult(res);
                setListProducer(getPdcers.producer);
            });
        }
        handleGetProducer();
    }, [params]);

    const handleSetSB = (vl) => {
        setSbIsActive(vl);
        handleActiveSbList();
        switch (vl) {
            case 'atz': return (
                sortBy.current = 'A -> Z',
                setParams({ ...params, sort: 'ProducerName' })
            );
            case 'zta': return (
                sortBy.current = 'Z -> A',
                setParams({ ...params, sort: '-ProducerName' })
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
        <div className="Producercpn-container" onClick={handleInactiveSbList}>
            <div className="Producercpn-container__list-producer">
                <div className="Producercpn-container__list-producer__box">
                    <div className="Producercpn-container__list-producer__box__title">
                        Brand List
                    </div>
                    <ul className="Producercpn-container__list-producer__box__list">
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
            <div className="Producercpn-container__list-items">
                <div className="Producercpn-container__list-items__title">
                    Brands
                </div>
                <div className="Producercpn-container__list-items__sort">
                    <div className="Producercpn-container__list-items__sort__sortby" >Sort By :</div>
                    <div
                        className="Producercpn-container__list-items__sort__select"
                        onClick={() => handleActiveSbList()}
                    >
                        <span>{sortBy.current}</span>
                        <ul
                            style={sortByListActive === true ? { display: 'block' } : { display: 'none' }}
                        >
                            <li
                                onClick={() => handleSetSB('atz')}
                                style={sbIsActive === 'atz' ? { backgroundColor: "rgb(204, 204, 204)" } : {}}
                            >
                                A to Z
                                </li>
                            <li
                                onClick={() => handleSetSB('zta')}
                                style={sbIsActive === 'zta' ? { backgroundColor: "rgb(204, 204, 204)" } : {}}
                            >
                                Z to A
                                </li>
                        </ul>
                    </div>
                </div>
                <div className="Producercpn-container__list-items__isLoading" style={isLoading.loading === false ? { display: 'none' } : { display: 'block' }}>
                    <PartLoading />
                </div>
                <div className="Producercpn-container__list-items__list" style={isLoading.loading === true ? { opacity: 0, height: 0 } : { opacity: 1, height: 'auto' }}>
                    {
                        listProducer.map(prc => (
                            <ProducerIC prc={prc} key={prc._id} />
                        ))
                    }
                </div>
                <div className="Producercpn-container__list-items__loadmore">
                    <Loadmore listLength={listPrcLength} page={page} setPage={setPage} />
                </div>
            </div>
        </div>
    );
}

export default Producer;