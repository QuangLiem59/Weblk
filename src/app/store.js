import { configureStore } from '@reduxjs/toolkit';
import productRd from 'features/product/productslice';
import producerRd from 'features/product/producerslice';

const rootReducer = {
    product: productRd,
    producer: producerRd
}
const store = configureStore({
    reducer: rootReducer,
})
export default store;