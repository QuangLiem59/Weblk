const { default: axiosClient } = require("./axiosClient")

const orderApi = {
    getAll: () => {
        const url = '/payment'
        return axiosClient.get(url)
    },
    payment: (data) => {
        const url = `/payment/payment`;
        return axiosClient.post(url, { ...data });
    }
}
export default orderApi;