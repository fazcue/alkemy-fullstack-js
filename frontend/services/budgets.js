import axios from 'axios'
const BUDGETS_API_URL = process.env.REACT_APP_BUDGETS_API_URL || 'http://localhost:3001/api'

const getAll = () => {
	return axios.get(`${BUDGETS_API_URL}/budgets`)
}

const create = (newObject) => {
    return axios.post(`${BUDGETS_API_URL}/budgets`, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${BUDGETS_API_URL}/budgets/${id}`, newObject)
}

const remove = (id) => {
    return axios.delete(`${BUDGETS_API_URL}/budgets/${id}`)
}

const budgetService = { getAll, create, update, remove }

export default budgetService
