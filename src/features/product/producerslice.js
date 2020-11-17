import ProducerIcon from "constant/producericon";

const { createSlice } = require("@reduxjs/toolkit");

const producer = createSlice({
    name: 'producer',
    initialState: [
        {
            id: 1,
            title: 'AKG',
            img: ProducerIcon.akg
        },
        {
            id: 2,
            title: 'Apple',
            img: ProducerIcon.apple
        },
        {
            id: 3,
            title: 'TEAC',
            img: ProducerIcon.teac
        },
        {
            id: 4,
            title: 'Partron',
            img: ProducerIcon.partron
        },
        {
            id: 5,
            title: 'Beyerdynamic',
            img: ProducerIcon.Beyerdynamic
        },
        {
            id: 6,
            title: 'STAX',
            img: ProducerIcon.stax
        },
        {
            id: 7,
            title: 'Advanced',
            img: ProducerIcon.advanced
        },
        {
            id: 8,
            title: 'Audeze',
            img: ProducerIcon.Audeze
        },
    ],
    reducers: {

    }
});
const { reducer, action } = producer;
export default reducer; 