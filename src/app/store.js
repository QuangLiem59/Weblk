import { configureStore } from '@reduxjs/toolkit';
import productRd from 'features/product/productslice';
import producerRd from 'features/product/producerslice';
import userRd from 'features/cart/userslice';
import orderRd from 'features/cart/orderslice';

const rootReducer = {
    product: productRd,
    producer: producerRd,
    user: userRd,
    order: orderRd
}
const store = configureStore({
    reducer: rootReducer,
})
export default store;