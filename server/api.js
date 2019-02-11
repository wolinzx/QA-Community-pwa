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
  let questionModels = new models.Question({ questioner: req.body.account, title: req.body.title, contentData: req.body.content, topics: req.body.topics })
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

// 添加回答，，此处可以优化
router.post('/api/commitAnswerGet', (req, res) => {
  let aDate = Date.now()
  let answerModels = new models.Answer({ questionId: req.body.questionId, answerer: req.body.answerer, contentData: req.body.content, answerDate: aDate })
  answerModels.save((err, data) => {
    if (err) {
      console.log(err)
      res.send(false)
    } else {
      models.Answer.count({
        questionId: req.body.questionId
      }, (err, count) => {
        console.log('fsdfsdfdssdfsd', count)
        if (!err) {
          models.Question.update(
            { _id: req.body.questionId },
            { $set: { answers: count } }
          ).exec()
        }
      })
      models.Question.update(
        { _id: req.body.questionId },
        { $push: { answersDetail: { answerer: req.body.answerer, answerDate: aDate } } }
      ).exec((err, data) => {
        if (!err) {
          res.send(true)
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
  if (req.query.sortWay === 'quality') {
    console.log('质量')
    models.Answer.find(param).sort({ endorseCount: -1 }).exec((err, docs) => {
      if (!err) {
        res.send(docs)
      } else {
        console.log(err)
        res.send(err)
      }
    })
  } else if (req.query.sortWay === 'time') {
    console.log('时间')

    models.Answer.find(param).sort({ answerDate: -1 }).exec((err, docs) => {
      if (!err) {
        res.send(docs)
      } else {
        console.log(err)
        res.send(err)
      }
    })
  } else {
    console.log('默认')
    models.Answer.find(param).exec((err, docs) => {
      if (!err) {
        res.send(docs)
      } else {
        console.log(err)
        res.send(err)
      }
    })
  }
})

router.get('/api/getEndorseAnswerGet', (req, res) => {
  models.AnswerEndorse.update(
    { endorser: req.query.endorser },
    { $set: { endorser: req.query.endorser } },
    { upsert: true }
  ).exec(() => {
    models.AnswerEndorse.findOne({
      endorser: req.query.endorser
    }, (err, data) => {
      if (!err) {
        console.log(req.query.answerId)
        models.Answer.findOne({
          _id: req.query.answerId
        }, { endorseCount: 1 }, (err, doc) => {
          if (!err) {
            data._doc['endorseCount'] = doc.endorseCount
            res.send(data._doc)
          } else {
            res.send(false)
          }
        })
      } else {
        res.send(false)
      }
    })
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
    console.log('zhishi ', data)
    if (!err) {
      if (data) {
        models.Question.find({
          _id: data.questionId
        }, (err, data) => {
          if (err) {
            res.send(err)
          } else {
            res.send(data)
          }
        })
      } else {
        res.send(err)
      }
    }
  })
})

router.get('/api/getFollowUsersGet', (req, res) => {
  models.FollowUser.findOne({
    follower: req.query.follower
  }, (err, data) => {
    if (!err) {
      if (data) {
        models.Account.find({
          accountName: data.userId
        }, (err, docs) => {
          if (err) {
            res.send(err)
          } else {
            res.send(docs)
          }
        })
      } else {
        res.send(false)
      }
    }
  })
})

router.get('/api/isAnsweredGet', (req, res) => {
  console.log({
    questionId: req.query.questionId,
    answerer: req.query.answerer
  })
  models.Answer.findOne({
    questionId: req.query.questionId,
    answerer: req.query.answerer
  }, (err, data) => {
    if (!err) {
      console.log(data)
      res.send(data)
    } else {
      res.send(err)
    }
  })
})

// 添加收藏
router.get('/api/addCollectionGet', (req, res) => {
  models.Collections.updateMany(
    { collecter: req.query.collecter, 'collections.collectionTitle': req.query.collectionTitle },
    { $push: { 'collections.$.collectionContent': req.query.answerId } },
    { upsert: true }
  ).exec((err, data) => {
    if (!err) {
      res.send(data)
    } else {
      console.log(err)
      res.send(false)
    }
  })
  // 删除收藏
  // models.Collections.updateOne(
  //   { collecter: '333', 'collections.collectionTitle': 'fdfd' },
  //   { $pull: { 'collections.$.collectionContent': 'fdfdfd222' } },
  //   { upsert: true }
  // ).exec((err, data) => {
  //   if (!err) {
  //     res.send(true)
  //   } else {
  //     console.log(err)
  //     res.send(false)
  //   }
  // })
  // 新键收藏目录
  // models.Collections.updateOne(
  //   { collecter: '333' },
  //   { $push: { 'collections': { collectionTitle: '5555' } } },
  //   { upsert: true }
  // ).exec((err, data) => {
  //   if (!err) {
  //     res.send(true)
  //   } else {
  //     console.log(err)
  //     res.send(false)
  //   }
  // })
  // 删除收藏目录
  // models.Collections.updateOne(
  //   { collecter: '333' },
  //   { $push: { 'collections': { collectionTitle: '5555' } } },
  //   { upsert: true }
  // ).exec((err, data) => {
  //   if (!err) {
  //     res.send(true)
  //   } else {
  //     console.log(err)
  //     res.send(false)
  //   }
  // })
})

router.get('/api/deleteCollectionGet', (req, res) => {
  models.Collections.updateOne(
    { collecter: req.query.collecter },
    { $pull: { 'collections': { collectionTitle: req.query.collectionTitle } } },
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

router.get('/api/deleteCollectionListGet', (req, res) => {
  models.Collections.updateOne(
    { collecter: req.query.collecter, 'collections.collectionTitle': req.query.collectionTitle },
    { $pull: { 'collections.$.collectionContent': req.query.answerId } },
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
// 新建收藏目录
router.get('/api/addCollectionListGet', (req, res) => {
  models.Collections.updateOne(
    { collecter: req.query.collecter },
    { $push: { 'collections': { collectionTitle: req.query.collectionTitle } } },
    { upsert: true }
  ).exec((err, data) => {
    if (!err) {
      res.send(data)
    } else {
      console.log(err)
      res.send(err)
    }
  })
})

// 获取收藏目录
router.get('/api/getCollectionListGet', (req, res) => {
  models.Collections.findOne({
    collecter: req.query.collecter
  }, (err, data) => {
    if (!err) {
      res.send(data)
    } else {
      res.send(err)
    }
  })
})

// 获取提问标题与回答内容
router.get('/api/getQaListGet', (req, res) => {
  console.log(req.query.answerId)
  models.Answer.find({
    _id: req.query.answerId
  }).populate({ path: 'questionId', select: 'title answers' }).exec((err, data) => {
    if (!err) {
      res.send(data)
    } else {
      res.send(err)
    }
  })
})

// 获取关注问题消息
router.get('/api/getFollowQuestionMsgGet', (req, res) => {
  models.FollowQuestion.findOne({
    follower: req.query.follower
  }, { questionId: 1 }, (err, data) => {
    if (!err) {
      if (data) {
        models.Question.find({
          _id: data.questionId
        }, (err, data) => {
          if (!err) {
            res.send(data)
          } else {
            res.send(err)
          }
        })
      } else {
        res.send(false)
      }
    } else {
      res.send(err)
    }
  })
})

// 添加话题
router.get('/api/addTopicGet', (req, res) => {
  models.Topic.update(
    { topicName: req.query.topicName },
    { $push: { topicQList: req.query.topicQList }, $set: { topicDescribe: req.query.topicDescribe } },
    { upsert: true }
  ).exec((err, data) => {
    if (!err) {
      res.send(true)
    }
  })
})

// 获取话题列表
router.get('/api/getTopicGet', (req, res) => {
  models.Topic.find((err, docs) => {
    if (!err) {
      res.send(docs)
    } else {
      res.send(false)
    }
  })
})

// 关注话题
router.get('/api/followTopicGet', (req, res) => {
  models.FollowTopic.update(
    { follower: req.query.follower },
    { $push: { topics: req.query.topic } },
    { upsert: true }
  ).exec((err, data) => {
    if (!err) {
      res.send(true)
    } else {
      res.send(false)
    }
  })
})

// 取关话题
router.get('/api/unFollowTopicGet', (req, res) => {
  models.FollowTopic.update(
    { follower: req.query.follower },
    { $pull: { topics: req.query.topic } },
    { upsert: true }
  ).exec((err, data) => {
    if (!err) {
      res.send(true)
    } else {
      res.send(false)
    }
  })
})

// 获取关注者关注的话题
router.get('/api/getFollowTopicGet', (req, res) => {
  models.FollowTopic.findOne({
    follower: req.query.follower
  }, (err, docs) => {
    if (!err) {
      res.send(docs)
    } else {
      res.send(false)
    }
  })
})

// 获取提问标题与回答内容
router.get('/api/getFollowListGet', (req, res) => {
  console.log(req.query.answerId)
  models.Answer.find({
    answerer: req.query.answerer
  }).populate({ path: 'questionId', select: 'title answers' }).exec((err, data) => {
    if (!err) {
      res.send(data)
    } else {
      res.send(err)
    }
  })
})

// 根据关注的话题获取问题列表
router.get('/api/getFollwTopicListGet', (req, res) => {
  models.FollowTopic.findOne({
    follower: req.query.follower
  }, (err, data) => {
    if (!err) {
      if (data) {
        models.Question.find({
          topics: { $in: data.topics }
        }, (err, data) => {
          if (!err) {
            res.send(data)
          } else {
            res.send(false)
          }
        })
      } else {
        res.send(false)
      }
    }
  })
})

// 获取话题详情
router.get('/api/getTopicDetailGet', (req, res) => {
  models.FollowTopic.count({
    topics: req.query.topicName
  }, (err, count) => {
    if (!err) {
      models.Topic.findOne({
        topicName: req.query.topicName
      }, (err, data) => {
        if (data) {
          if (!err) {
            data._doc['followCount'] = count
            res.send(data._doc)
          } else {
            res.send(false)
          }
        } else {
          res.send(false)
        }
      })
    } else {
      res.send(false)
    }
  })
})

module.exports = router
