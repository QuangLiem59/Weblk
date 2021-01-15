import orderApi from "api/orderApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getListOrder = createAsyncThunk('payment/getorder', async () => {
    const listOrder = await orderApi.getAll();
    return listOrder
});

export const addOrder = createAsyncThunk('payment/payment', async (data) => {
    const payment = await orderApi.payment(data);
    return payment
});

const order = createSlice({
    name: 'Order',
    initialState: {
        data: [],
        loading: false,
        error: ''
    },
    reducers: {
        // atc: (state, action) => {
        //     state.cart.push(action.payload);
        // }
    }, extraReducers: {
        [getListOrder.pending]: (state) => {
            state.loading = true;
        },
        [getListOrder.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getListOrder.fulfilled]: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        [addOrder.pending]: (state) => {
            state.loading = true;
        },
        [addOrder.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [addOrder.fulfilled]: (state, action) => {
            state.loading = false;
        },
    }
});
const { reducer, actions } = order;
// export const { atc } = actions;
export default reducer;