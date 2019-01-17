import axios from 'axios'

export const loginPost = params => { return axios.post(`/api/login`, params).then(res => res.data) }

export const registrationGet = params => { return axios.post(`/api/login/createAccount`, params).then(res => res.data) }

export const accountProfileGet = params => { return axios.get(`/api/accountProfileGet`, { params: params }) }

export const setProfileGet = params => { return axios.get(`/api/setProfileGet`, { params: params }) }
