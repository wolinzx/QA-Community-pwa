import axios from 'axios'

export const loginPost = params => { return axios.post(`/api/login`, params).then(res => res.data) }

export const registrationGet = params => { return axios.post(`/api/login/createAccount`, params).then(res => res.data) }

// export const registrationGet = params => { return axios.get(`/api/login/createAccount`, { params: params }) }
