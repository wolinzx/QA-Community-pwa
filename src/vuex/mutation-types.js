/**
 * 使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式
 * 这样可以使 linter 之类的工具发挥作用
 * 更利于分工合作
 */

export const GET_USERINFO = 'GET_USERINFO'
export const GET_LOCALUSERINFO = 'GET_LOCALUSERINFO'
export const SET_USERINFO = 'SET_USERINFO'
export const CLEAR_USERINFO = 'CLEAR_USERINFO'
export const SHOW_LODING = 'SHOW_LODING'
export const SET_SCROLLED = 'SET_SCROLLED'
export const SET_THEME = 'SET_THEME'
export const GET_THEME = 'GET_THEME'
export const SET_LOGINUSERINFO = 'SET_LOGINUSERINFO'
