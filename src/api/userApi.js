const { default: axiosClient } = require("./axiosClient")

const userApi = {
    LogIn: (data) => {
        const url = '/user/login'
        return axiosClient.post(url, { ...data })
    },
    Register: (data) => {
        const url = '/user/signup'
        return axiosClient.post(url, { ...data })
    },
    GetProfile: () => {
        const url = '/user/infor'
        // return axiosClient.get(url, { headers: { Authorization: 'Bearer ' + { ...token } } })
        return axiosClient.get(url)
    },
    UpdateProfile: (data) => {
        const url = '/user/update'
        return axiosClient.patch(url, [...data])
    },
    AddToCart: (data) => {
        const url = 'user/addtocart'
        return axiosClient.patch(url, { ...data })
    }
}
export default userApi;