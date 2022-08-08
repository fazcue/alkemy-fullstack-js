import axios from 'axios'
const API_URL = process.env.NEXT_PUBLIC_BUDGETS_API_URL || 'http://localhost:3001/api'

const register = (userData) => {
	return axios.post(`${API_URL}/user/register`, userData)
}

const login = (userData) => {
    return axios.post(`${API_URL}/user/login`, userData)
}

const recover = (email) => {
    console.log('recovering', email);
    return axios.post(`${API_URL}/user/recover`, {email: email})
}

const userService = { register, login, recover }

export default userService
