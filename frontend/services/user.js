import axios from 'axios'
const API_URL = 'http://localhost:3001/api'

const register = (userData) => {
	return axios.post(`${API_URL}/user/register`, userData)
}

const login = (userData) => {
    return axios.post(`${API_URL}/user/login`, userData)
}

const userService = { register, login }

export default userService
