import axios from 'axios'

export const loginPost = params => { return axios.post(`/api/login`, params).then(res => res.data) }

export const registrationGet = params => { return axios.post(`/api/login/createAccount`, params).then(res => res.data) }

export const accountProfileGet = params => { return axios.get(`/api/accountProfileGet`, { params: params }) }

export const setProfileGet = params => { return axios.get(`/api/setProfileGet`, { params: params }) }

export const commitQuestionGet = params => { return axios.post(`/api/commitQuestionGet`, params).then(res => res.data) }

export const getQuestionListGet = params => { return axios.get(`/api/getQuestionListGet`, { params: params }) }

export const getQuestionGet = params => { return axios.get(`/api/getQuestionGet`, { params: params }) }

export const commitAnswerGet = params => { return axios.post(`/api/commitAnswerGet`, params).then(res => res.data) }

export const getAnswerListGet = params => { return axios.get(`/api/getAnswerListGet`, { params: params }) }

export const setEndorseGet = params => { return axios.get(`/api/setEndorseGet`, { params: params }) }

export const getAllEndorseGet = params => { return axios.get(`/api/getAllEndorseGet`, { params: params }) }

export const getAllEndorseListGet = params => { return axios.get(`/api/getAllEndorseListGet`, { params: params }) }

export const setFollowGet = params => { return axios.get(`/api/setFollowGet`, { params: params }) }

export const unFollowGet = params => { return axios.get(`/api/unFollowGet`, { params: params }) }

export const getFollowGet = params => { return axios.get(`/api/getFollowGet`, { params: params }) }

export const setFollowUserGet = params => { return axios.get(`/api/setFollowUserGet`, { params: params }) }

export const unFollowUserGet = params => { return axios.get(`/api/unFollowUserGet`, { params: params }) }

export const getFollowUserGet = params => { return axios.get(`/api/getFollowUserGet`, { params: params }) }

export const getEndorseAnswerGet = params => { return axios.get(`/api/getEndorseAnswerGet`, { params: params }) }

export const getFollowQuestionGet = params => { return axios.get(`/api/getFollowQuestionGet`, { params: params }) }

export const getFollowUsersGet = params => { return axios.get(`/api/getFollowUsersGet`, { params: params }) }
