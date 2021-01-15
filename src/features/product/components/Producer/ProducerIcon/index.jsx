import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { NavLink } from 'react-router-dom';

ProducerIC.propTypes = {
    prc: PropTypes.object,
};
ProducerIC.defaultProps = {
    prc: {},
}

function ProducerIC(props) {
    const { prc } = props;
    return (
        <NavLink className="ProducerIC" to={'/home/category/producer/' + prc.ProducerName}>
            <img src={prc.ProducerIcon} alt={prc._id} />
        </NavLink>
    );
}

export default ProducerIC;