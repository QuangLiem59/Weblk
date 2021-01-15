import producerApi from "api/producerApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getProducer = createAsyncThunk('producer/getproducer', async (params) => {
    const listProducer = await producerApi.getAll(params);
    return listProducer
});

const producer = createSlice({
    name: 'producer',
    initialState: {
        producer: {},
        loading: false,
        error: ''
    },
    reducers: {

    }, extraReducers: {
        [getProducer.pending]: (state) => {
            state.loading = true;
        },
        [getProducer.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getProducer.fulfilled]: (state, action) => {
            state.loading = false;
            state.producer = action.payload;
        }
    }

});
const { reducer, action } = producer;
export default reducer; 