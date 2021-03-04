import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';

Pagi.propTypes = {
    pageSize: PropTypes.number,
    length: PropTypes.number,
    onChangePage: PropTypes.func,
    page: PropTypes.number,
};
Pagi.defaultProp = {
    pageSize: 10,
    length: 0,
    onChangePage: null,
    page: 1
}
function Pagi(props) {
    const { pageSize, length, onChangePage, page } = props;
    return (
        <div>

            <Pagination
                onChange={onChangePage}
                total={length}
                current={page}
                defaultPageSize={pageSize}
                showSizeChanger={false}
            />
        </div>
    )
}

export default Pagi;