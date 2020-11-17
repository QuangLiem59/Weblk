
import productApi from "api/productApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export const getProduct = createAsyncThunk('product/getproducts', async (params, thunkApi) => {
    const listProduct = await productApi.getAll(params);
    return listProduct
});
export const getPrfProduct = createAsyncThunk('product/getprfproducts', async (id) => {
    const profileProduct = await productApi.get(id);
    return profileProduct
});

const product = createSlice({
    name: 'Products',
    initialState: {
        data: {},
        loading: false,
        error: ''
    },
    reducers: {

    }, extraReducers: {
        [getProduct.pending]: (state) => {
            state.loading = true;
        },
        [getProduct.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        [getPrfProduct.pending]: (state) => {
            state.loading = true;
        },
        [getPrfProduct.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getPrfProduct.fulfilled]: (state, action) => {
            state.loading = false;
            // state.data = action.payload;
        }
    }
});
const { reducer, actions } = product;
// export const { getProduct } = actions;
export default reducer;