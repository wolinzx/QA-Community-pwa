const express = require('express')
const models = require('./db')
const router = express.Router()
// const images = require('images');
// const multiparty = require('multiparty');
// var path = require("path");
// var fs = require("fs");
// var bodyParser = require('body-parser');
// var formidable = require('formidable');

router.get('/api/test', (req, res) => {
  res.send('yes')
})

router.get('/api/loginState', (req, res) => {
  var sess = req.session
  var account = sess.account
  if (account) {
    models.Login.findOne({
      account
    }, (err, docs) => {
      if (!err) {
        res.send(docs)
      } else {
        res.send(false)
      }
    })
  } else {
    res.send(false)
  }
})

router.get('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      res.send('logout')
    } else {
      throw err
    }
  })
})
// 登陆
router.post('/api/login', (req, res) => {
  // 查询文档
  models.Login.find({
    account: req.body.account,
    password: req.body.password
  }, (err, docs) => {
    if (!err) {
      if (docs.length !== 0) {
        // let user = {
        //   account: docs[0].account,
        //   avatar: docs[0].avatar
        // }
        // console.log(docs[0]._id);
        req.session._id = docs[0]._id
        console.log('in')
        // console.log(docs[0].avatar);
        res.send(docs)
      } else {
        res.send(false)
      }
    } else {
      throw err
    }
  })
})

// 添加账户
router.post('/api/login/createAccount', (req, res) => {
  let newAccount = new models.Login({
    account: req.body.account,
    password: req.body.password,
    email: req.body.email
  })
  newAccount.save((err, data) => {
    if (err) {
      if (err.code === 11000) {
        res.send(err)
      } else {
        res.send(false)
      }
    } else {
      // 创建成功后也写进account表
      let accountModels = new models.Account({ accountName: req.body.account })
      accountModels.save((err, data) => {
        console.log(err)
      })
      res.send(true)
    }
  })
})

// 用户是否已经登陆
router.get('/api/login/accountState', (req, res) => {
  let _id = req.session._id
  // console.log(_id);
  if (_id) {
    res.send(true)
  } else {
    res.send(false)
  }
})

router.get('/api/accountProfileGet', (req, res) => {
  models.Account.findOne({
    accountName: req.query.account
  }, (err, docs) => {
    if (!err) {
      res.send(docs)
    } else {
      res.send(false)
    }
  })
})

router.get('/api/setProfileGet', (req, res) => {
  models.Account.updateOne({ _id: req.query._id }, { $set: req.query }, (err, docs) => {
    if (err) {
      console.log(err)
      console.log('更新数据库失败！')
      res.send(false)
    } else {
      res.send(true)
    }
  })
})

router.post('/api/commitQuestionGet', (req, res) => {
  let questionModels = new models.Question({ questioner: req.body.account, title: req.body.title, contentData: req.body.content })
  questionModels.save((err, data) => {
    if (err) {
      res.send(false)
    } else {
      res.send(true)
    }
  })
})

router.get('/api/getQuestionListGet', (req, res) => {
  const pagesize = Number(req.query.pagesize)
  const currentPage = Number(req.query.currentPage)
  models.Question.find().skip(pagesize * (currentPage - 1)).limit(pagesize).exec((err, docs) => {
    if (!err) {
      res.send(docs)
    } else {
      res.send(false)
    }
  })
})

router.get('/api/getQuestionGet', (req, res) => {
  models.Question.findOne({
    _id: req.query.questionId
  }, (err, docs) => {
    if (!err) {
      res.send(docs)
    } else {
      res.send(false)
    }
  })
})

router.post('/api/commitAnswerGet', (req, res) => {
  let answerModels = new models.Answer({ questionId: req.body.questionId, answerer: req.body.answerer, contentData: req.body.content, answerDate: Date.now() })
  answerModels.save((err, data) => {
    if (err) {
      console.log(err)
      res.send(false)
    } else {
      let insertQuestion = new models.QaRelation({ questionId: req.body.questionId, answerId: data._id })
      insertQuestion.save((err, data) => {
        if (!err) {
          models.QaRelation.count({
            questionId: req.body.questionId
          }, (err, count) => {
            if (!err) {
              models.Question.update(
                { _id: req.body.questionId },
                { $set: { answers: count } }
              ).exec((err, data) => {
                if (!err) {
                  res.send(true)
                } else {
                  console.log(err)
                  res.send(false)
                }
              })
            } else {
              res.send(false)
            }
          })
        } else {
          console.log(err)
          res.send(false)
        }
      })
    }
  })
})

router.get('/api/getAnswerListGet', (req, res) => {
  let param = {
    questionId: req.query.questionId
  }
  models.Answer.find(param, (err, docs) => {
    if (!err) {
      res.send(docs)
    } else {
      console.log(err)
      res.send(err)
    }
  })
})

router.get('/api/getEndorseAnswerGet', (req, res) => {
  models.AnswerEndorse.findOne({
    endorser: req.query.endorser
  }, (err, data) => {
    if (!err) {
      console.log(data)
      res.send(data)
    } else {
      res.send(false)
    }
  })
})

router.get('/api/setEndorseGet', (req, res) => {
  models.AnswerEndorse.update(
    { endorser: req.query.endorser },
    { $pull: { unendorseAnswerId: req.query.answerId, endorseAnswerId: req.query.answerId } }
  ).exec()
  if (req.query.status === '0' || req.query.status === '1') {
    let action = req.query.status === '0' ? '$pull' : '$push'
    models.AnswerEndorse.update(
      { endorser: req.query.endorser },
      { [action]: { endorseAnswerId: req.query.answerId } },
      { upsert: true }
    ).exec((err, data) => {
      if (!err) {
        models.AnswerEndorse.count({
          endorseAnswerId: req.query.answerId
        }, (err, count) => {
          if (!err) {
            models.Answer.update(
              { _id: req.query.answerId },
              { $set: { endorseCount: count } }
            ).exec((err, data) => {
              if (!err) {
                console.log(data)
                res.send(true)
              }
            })
          }
        })
      } else {
        console.log(err)
        res.send(false)
      }
    })
  } else {
    let action = req.query.status === '3' ? '$pull' : '$push'
    models.AnswerEndorse.update(
      { endorser: req.query.endorser },
      { [action]: { unendorseAnswerId: req.query.answerId } },
      { upsert: true }
    ).exec((err, data) => {
      if (!err) {
        models.AnswerEndorse.count({
          endorseAnswerId: req.query.answerId
        }, (err, count) => {
          if (!err) {
            models.Answer.update(
              { _id: req.query.answerId },
              { $set: { endorseCount: count } }
            ).exec((err, data) => {
              if (!err) {
                console.log(data)
                res.send(true)
              }
            })
          }
        })
      } else {
        console.log(err)
        res.send(false)
      }
    })
  }
})

router.get('/api/setFollowGet', (req, res) => {
  models.FollowQuestion.update(
    { follower: req.query.follower },
    { $push: { questionId: req.query.questionId } },
    { upsert: true }
  ).exec((err, data) => {
    if (!err) {
      models.FollowQuestion.count({
        questionId: req.query.questionId
      }, (err, count) => {
        if (!err) {
          models.Question.update(
            { _id: req.query.questionId },
            { $set: { follows: count } }
          ).exec((err, data) => {
            if (!err) {
              console.log(data)
              res.send(true)
            } else {
              console.log(err)
              res.send(false)
            }
          })
        } else {
          res.send(false)
        }
      })
    } else {
      console.log(err)
      res.send(false)
    }
  })
})

router.get('/api/unFollowGet', (req, res) => {
  models.FollowQuestion.update(
    { follower: req.query.follower },
    { $pull: { questionId: req.query.questionId } },
    { upsert: true }
  ).exec((err, data) => {
    if (!err) {
      models.FollowQuestion.count({
        questionId: req.query.questionId
      }, (err, count) => {
        if (!err) {
          models.Question.update(
            { _id: req.query.questionId },
            { $set: { follows: count } }
          ).exec((err, data) => {
            if (!err) {
              res.send(true)
            } else {
              console.log(err)
              res.send(false)
            }
          })
        } else {
          res.send(false)
        }
      })
    } else {
      console.log(err)
      res.send(false)
    }
  })
})
// 关注部分待优化
router.get('/api/getFollowGet', (req, res) => {
  models.FollowQuestion.findOne({
    follower: req.query.follower
  }, (err, doc) => {
    if (doc) {
      models.FollowQuestion.count({
        questionId: req.query.questionId
      }, (err, data) => {
        if (!err) {
          let obj = {
            followCount: data,
            doc
          }
          res.send(obj)
        } else {
          res.send(false)
        }
      })
    } else {
      console.log(err)
      res.send(false)
    }
  })
})

router.get('/api/setFollowUserGet', (req, res) => {
  models.FollowUser.update(
    { follower: req.query.follower },
    { $push: { userId: req.query.userId } },
    { upsert: true }
  ).exec((err, data) => {
    if (!err) {
      res.send(true)
    } else {
      console.log(err)
      res.send(false)
    }
  })
})

router.get('/api/unFollowUserGet', (req, res) => {
  models.FollowUser.update(
    { follower: req.query.follower },
    { $pull: { userId: req.query.userId } },
    { upsert: true }
  ).exec((err, data) => {
    if (!err) {
      res.send(true)
    } else {
      console.log(err)
      res.send(false)
    }
  })
})

router.get('/api/getFollowUserGet', (req, res) => {
  models.FollowUser.findOne({
    follower: req.query.follower
  }, (err, doc) => {
    if (doc) {
      models.FollowQuestion.count({
        userId: req.query.userId
      }, (err, data) => {
        if (!err) {
          let obj = {
            followCount: data,
            doc
          }
          res.send(obj)
        } else {
          res.send(false)
        }
      })
    } else {
      console.log(err)
      res.send(false)
    }
  })
})

router.get('/api/getFollowQuestionGet', (req, res) => {
  models.FollowQuestion.findOne({
    follower: req.query.follower
  }, (err, data) => {
    if (!err) {
      models.Question.find({
        _id: data.questionId
      }, (err, data) => {
        if (err) {
          res.send(err)
        } else {
          res.send(data)
        }
      })
    }
  })
})

router.get('/api/getFollowUsersGet', (req, res) => {
  models.FollowUser.findOne({
    follower: req.query.follower
  }, (err, data) => {
    if (!err) {
      models.Account.find({
        accountName: data.userId
      }, (err, data) => {
        if (err) {
          res.send(err)
        } else {
          res.send(data)
        }
      })
    }
  })
})

module.exports = router
