import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

Loadmore.propTypes = {
    listLength: PropTypes.number,
    page: PropTypes.number,
    setNumber: PropTypes.func,
};

Loadmore.defaultProp = {
    listLength: 0,
    page: 1,
    setPage: null
}


function Loadmore(props) {
    const { listLength, page, setPage } = props;
    return (
        <div className="Loadmore">
            {
                listLength <= page * 10
                    ?
                    ""
                    :
                    <button onClick={() => setPage(page + 1)}>
                        Load More
                    </button>
            }
        </div>
    );
}

export default Loadmore;