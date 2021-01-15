
import userApi from "api/userApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getUserInfor = createAsyncThunk('user/getuserinfor', async () => {
    const userInfor = await userApi.GetProfile();
    return userInfor
});

export const addToCart = createAsyncThunk('user/addtocart', async (data) => {
    const CartUD = await userApi.AddToCart(data);
    return CartUD
});

const user = createSlice({
    name: 'User',
    initialState: {
        userdata: {},
        cart: [],
        loading: false,
        error: ''
    },
    reducers: {
        // atc: (state, action) => {
        //     state.cart.push(action.payload);
        // }
        logout: (state) => {
            state.userdata = {};
            state.cart = [];
        }
    }, extraReducers: {
        [getUserInfor.pending]: (state) => {
            state.loading = true;
        },
        [getUserInfor.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getUserInfor.fulfilled]: (state, action) => {
            state.loading = false;
            state.userdata = action.payload.user;
            state.cart = action.payload.user.cart;
        },
        [addToCart.pending]: (state) => {
            state.loading = true;
        },
        [addToCart.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [addToCart.fulfilled]: (state, action) => {
            state.loading = false;
        },
    }
});
const { reducer, actions } = user;
export const { logout } = actions;
export default reducer;