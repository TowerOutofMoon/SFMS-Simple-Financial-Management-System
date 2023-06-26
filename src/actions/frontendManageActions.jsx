import axios from "axios";

export const queryAllFinanceProducts = () => {
    return axios.get('/api/frontend/financial-product/queryAll')
}

export const queryAllFunds = () => {
    return axios.get('/api/frontend/fund/queryAll')
}

export const queryAllInsurance = () => {
    return axios.get('/api/frontend/insurance/queryAll')
}