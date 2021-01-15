const { default: axiosClient } = require("./axiosClient")

const producerApi = {
    getAll: (params) => {
        const url = '/producer'
        return axiosClient.get(url, { params })
    },
}
export default producerApi;