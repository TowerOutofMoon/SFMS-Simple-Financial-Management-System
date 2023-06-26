import axios from "axios";

export const queryAllBankProducts = () => {
    return axios.get('/api/backend/product/queryAll')
}

export const addBankProducts = (products) => {
    axios
        .post('/api/backend/product/add', products)
        .catch((error) => {
            // 处理错误，可以根据实际需求进行操作
        });
}

export const updateBankProducts = (products) => {
    return axios.post('/api/backend/product/update', products)
}

export const deleteBankProducts = (products) => {
    return axios.post('/api/backend/product/delete', products)
}

export const setBankProductOnline = (products) => {
    return axios.post('/api/backend/product/online', products)
}

export const queryAllUsers = () => {
    return axios.get('/api/backend/user/query')
}

export const queryAllOrders = () => {
    return axios.get('/api/backend/order/query')
}