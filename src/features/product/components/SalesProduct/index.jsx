import React from 'react';
import './salesproduct.scss';
import { Link } from 'react-router-dom';
import Saleslider from './Saleslider';

SalesProduct.propTypes = {

};

function SalesProduct() {
    return (
        <div className="MainSalesProduct" >
            <div className="MainSalesProduct__container">
                <div className="MainSalesProduct__container__maintitle">
                    <h2> Khuyến Mãi </h2>
                    <div className='MainSalesProduct__container__maintitle__seeall'>
                        <Link to='/home/category/status/Sales'>
                            <button className='MainSalesProduct__container__maintitle__seeall__bt'>
                                Xem Tất Cả
                            </button>
                        </Link>
                    </div>
                </div>
                <div className='MainSalesProduct__container__listproduct'>
                    <Saleslider />
                </div>
            </div>
        </div>
    );
}

export default SalesProduct;