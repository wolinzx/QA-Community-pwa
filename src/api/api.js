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

export const isAnsweredGet = params => { return axios.get(`/api/isAnsweredGet`, { params: params }) }

export const addCollectionGet = params => { return axios.get(`/api/addCollectionGet`, { params: params }) }

export const addCollectionListGet = params => { return axios.get(`/api/addCollectionListGet`, { params: params }) }

export const getCollectionListGet = params => { return axios.get(`/api/getCollectionListGet`, { params: params }) }

export const getQaListGet = params => { return axios.get(`/api/getQaListGet`, { params: params }) }

export const deleteCollectionListGet = params => { return axios.get(`/api/deleteCollectionListGet`, { params: params }) }

export const deleteCollectionGet = params => { return axios.get(`/api/deleteCollectionGet`, { params: params }) }

export const getFollowQuestionMsgGet = params => { return axios.get(`/api/getFollowQuestionMsgGet`, { params: params }) }

export const getTopicGet = params => { return axios.get(`/api/getTopicGet`, { params: params }) }

export const followTopicGet = params => { return axios.get(`/api/followTopicGet`, { params: params }) }

export const getFollowTopicGet = params => { return axios.get(`/api/getFollowTopicGet`, { params: params }) }

export const getFollowListGet = params => { return axios.get(`/api/getFollowListGet`, { params: params }) }

export const getFollwTopicListGet = params => { return axios.get(`/api/getFollwTopicListGet`, { params: params }) }

export const getTopicDetailGet = params => { return axios.get(`/api/getTopicDetailGet`, { params: params }) }

export const unFollowTopicGet = params => { return axios.get(`/api/unFollowTopicGet`, { params: params }) }

export const getTimeAnswersGet = params => { return axios.get(`/api/getTimeAnswersGet`, { params: params }) }

export const getQandAListGet = params => { return axios.get(`/api/getQandAListGet`, { params: params }) }

export const getFollowUserGet2 = params => { return axios.get(`/api/getFollowUserGet2`, { params: params }) }

export const getUsersProfileGet = params => { return axios.get(`/api/getUsersProfileGet`, { params: params }) }
