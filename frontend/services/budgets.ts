import axios from 'axios'
const BUDGETS_API_URL = process.env.NEXT_PUBLIC_BUDGETS_API_URL || 'http://localhost:3001/api'

const get = (userID) => {
	return axios.get(`${BUDGETS_API_URL}/budgets/${userID}`)
}

const update = (userID, newBudget) => {
    return axios.put(`${BUDGETS_API_URL}/budgets/${userID}`, newBudget)
}

const remove = (userID, newBudget) => {
    return axios.put(`${BUDGETS_API_URL}/budgets/${userID}`, newBudget)
}

const budgetService = { get, update, remove }

export default budgetService
