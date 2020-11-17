const { default: axiosClient } = require("./axiosClient")

const productApi = {
    getAll: (params) => {
        const url = '/product'
        return axiosClient.get(url, { params })
    },
    get: (id) => {
        const url = `/product/${id}`;
        return axiosClient.get(url)
    }
}
export default productApi;