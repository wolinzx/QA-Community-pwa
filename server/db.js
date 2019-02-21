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
// 提问
const questionSchema = mongoose.Schema({
  questioner: {
    type: String
  },
  title: {
    type: String
  },
  contentData: {
    type: String
  },
  follows: {
    type: Number,
    default: 0
  },
  answers: {
    type: Number,
    default: 0
  },
  topics: {
    type: Array
  },
  answersDetail: [{
    answerer: String,
    answerDate: Date
  }],
  handled: {
    type: Boolean,
    default: false
  },
  questionDate: {
    type: Date,
    default: Date.now()
  }
})
// 提问评论
const questionCommentSchema = mongoose.Schema({
  contentData: {
    type: String
  },
  questionId: {
    type: String
  },
  commenter: {
    type: String
  }
})
// 提问评论回复
const questionReplySchema = mongoose.Schema({
  contentData: {
    type: String
  },
  questionCommentId: {
    type: String
  },
  replyer: {
    type: String
  }
})
// 回答
const answerSchema = mongoose.Schema({
  contentData: {
    type: String
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  },
  answerer: {
    type: String
  },
  answerDate: {
    type: Date,
    default: Date.now()
  },
  endorseCount: {
    type: Number,
    default: 0
  },
  handled: {
    type: Boolean,
    default: false
  }
})
answerSchema.virtual('members', {
  ref: 'Account', // The model to use
  localField: 'answerer', // Find people where `localField`
  foreignField: 'accountName', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: true
})
// 回答评论
const answerCommentSchema = mongoose.Schema({
  contentData: {
    type: String
  },
  answerId: {
    type: String
  },
  commenter: {
    type: String
  }
})
// 回答评论回复
const answerReplySchema = mongoose.Schema({
  contentData: {
    type: String
  },
  answerCommentId: {
    type: String
  },
  replyer: {
    type: String
  }
})
// 回答赞同
const answerEndorseSchema = mongoose.Schema({
  endorseAnswerId: {
    type: Array,
    default: []
  },
  unendorseAnswerId: {
    type: Array,
    default: []
  },
  endorser: {
    type: String
  }
})
// 提问与问题联系表
const qaRelationSchema = mongoose.Schema({
  questionId: {
    type: String
  },
  answerId: {
    type: String
  }
})
// 问题关注
const followQuestionSchema = mongoose.Schema({
  follower: {
    type: String
  },
  questions: [{
    questionId: String,
    followDate: Date
  }]
})
// 用户关注
const followUserSchema = mongoose.Schema({
  follower: {
    type: String
  },
  userId: {
    type: Array,
    default: []
  }
})
// 话题关注
const followTopicSchema = mongoose.Schema({
  follower: {
    type: String
  },
  topics: {
    type: Array
  }
})
// 收藏
const collectionsSchema = mongoose.Schema({
  collecter: String,
  collections: [{
    collectionTitle: String,
    collectionContent: Array
  }]
})
// 话题
const topicSchema = mongoose.Schema({
  topicName: {
    type: String,
    unique: true
  },
  topicDescribe: String,
  topicQList: Array,
  addDate: {
    type: Date
  },
  topicAvatar: String,
  topicHandled: Boolean
})
// 举报
const reportSchema = mongoose.Schema({
  reporter: String,
  reportQId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  },
  reportAId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer'
  },
  reportType: String,
  reportDate: Date
})
/**
 * 定义模型Model
 */
const Models = {
  Login: mongoose.model('Login', loginSchema),
  Account: mongoose.model('Account', accountSchema),
  Question: mongoose.model('Question', questionSchema),
  QuestionComment: mongoose.model('QuestionComment', questionCommentSchema),
  QuestionReply: mongoose.model('QuestionReply', questionReplySchema),
  Answer: mongoose.model('Answer', answerSchema),
  AnswerComment: mongoose.model('AnswerComment', answerCommentSchema),
  AnswerReply: mongoose.model('AnswerReply', answerReplySchema),
  AnswerEndorse: mongoose.model('AnswerEndorse', answerEndorseSchema),
  QaRelation: mongoose.model('QaRelation', qaRelationSchema),
  FollowQuestion: mongoose.model('FollowQuestion', followQuestionSchema),
  FollowUser: mongoose.model('FollowUser', followUserSchema),
  FollowTopic: mongoose.model('FollowTopic', followTopicSchema),
  Collections: mongoose.model('Collections', collectionsSchema),
  Topic: mongoose.model('Topic', topicSchema),
  Report: mongoose.model('Report', reportSchema)
}

module.exports = Models
