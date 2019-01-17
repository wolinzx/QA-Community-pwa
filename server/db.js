// db模块
let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/qa-community-pwa')

let db = mongoose.connection
db.on('error', () => {
  console.log('failed link database')
})
db.once('open', () => {
  console.log('success link database')
})

/**
 * 定义模式Schema
 */
// 登陆
const loginSchema = mongoose.Schema({
  avatar: {
    type: String
  },
  account: {
    type: String,
    unique: true,
    default: '',
    trim: true
  },
  password: {
    type: String,
    default: '000000',
    trim: true
  },
  email: {
    type: String,
    unique: true,
    trim: true
  }
})
// 用户
const accountSchema = mongoose.Schema({
  accountName: {
    type: String,
    unique: true,
    default: '',
    trim: true
  },
  userSex: {
    type: Number,
    default: 0
  },
  userBirth: {
    type: Date,
    default: Date.now()
  },
  userDescribe: {
    type: String,
    default: '这个人很懒，什么都没留下'
  },
  userIndustry: {
    type: String,
    default: ''
  },
  userAvatar: {
    type: String,
    default: ''
  }
})
/**
 * 定义模型Model
 */
const Models = {
  Login: mongoose.model('Login', loginSchema),
  Account: mongoose.model('Account', accountSchema)
}

module.exports = Models
