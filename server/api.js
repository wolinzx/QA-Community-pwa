const express = require('express')
const models = require('./db')
const router = express.Router()
let mongoose = require('mongoose')
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
        if (docs.length !== 0) {
          models.Account.findOne({
            accountName: account
          }, (err, data) => {
            if (!err) {
              req.session._id = docs[0]._id
              docs.push(data)
              res.send(docs)
            } else {
              res.send(false)
            }
          })
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
        models.Account.findOne({
          accountName: req.body.account
        }, (err, data) => {
          if (!err) {
            req.session._id = docs[0]._id
            docs.push(data)
            res.send(docs)
          } else {
            res.send(false)
          }
        })
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
      let accountModels = new models.Account({ accountName: req.body.account, addDate: Date.now() })
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
  let questionModels = new models.Question({
    questioner: req.body.account,
    title: req.body.title,
    contentData: req.body.content,
    topics: req.body.topics,
    questionDate: Date.now()
  })
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
    { $push: { questions: { questionId: req.query.questionId, followDate: Date.now() } } },
    { upsert: true }
  ).exec((err, data) => {
    if (!err) {
      models.FollowQuestion.count({
        'questions.questionId': req.query.questionId
      }, (err, count) => {
        console.log(count, 'dsjfksdjklfj')
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

router.get('/api/ceshi', (req, res) => {
  models.FollowQuestion.count({
    'questions.questionId': '5c5fe6ba7f119b39200efcdd'
  }, (err, count) => {
    if (!err) {
      console.log(count)
      res.send(true)
    } else {
      res.send(false)
    }
  })
})

router.get('/api/unFollowGet', (req, res) => {
  models.FollowQuestion.update(
    { follower: req.query.follower },
    { $pull: { questions: { questionId: req.query.questionId } } },
    { upsert: true }
  ).exec((err, data) => {
    if (!err) {
      models.FollowQuestion.count({
        'questions.questionId': req.query.questionId
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
    if (!err) {
      console.log('尼玛', doc)
      models.FollowQuestion.count({
        'questions.questionId': req.query.questionId
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

router.get('/api/getFollowUserGet2', (req, res) => {
  models.FollowUser.findOne({
    follower: req.query.follower
  }, (err, doc) => {
    if (!err) {
      res.send(doc)
    } else {
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
        let arr = []
        for (const question of data.questions) {
          arr.push(question.questionId)
        }
        models.Question.find({
          _id: arr
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
  models.Collections.findOne({
    collecter: req.query.collecter,
    'collections.collectionContent': req.query.answerId
  }, (err, doc) => {
    if (!err) {
      if (doc) {
        res.send('collected')
      } else {
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
      }
    }
  })
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
  models.Collections.findOne({
    collecter: req.query.collecter,
    'collections.collectionTitle': req.query.collectionTitle
  }, (err, doc) => {
    if (!err) {
      if (doc) {
        res.send('collected')
      } else {
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
      }
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
      console.log(data)
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
    { $set: { topicDescribe: req.query.topicDescribe, addDate: Date.now() } },
    { upsert: true }
  ).exec((err, data) => {
    console.log(data)
    if (!err) {
      if (data.upserted) {
        res.send(true)
      } else {
        res.send('added')
      }
    } else {
      res.send(false)
    }
  })
})

// 获取话题列表
router.get('/api/getTopicGet', (req, res) => {
  const pagesize = Number(req.query.pageSize)
  const currentPage = Number(req.query.currentPage)
  console.log(req.query)
  models.Topic.count((err, count) => {
    if (!err) {
      models.Topic.find().skip(pagesize * (currentPage - 1)).limit(pagesize).exec((err, docs) => {
        if (!err) {
          res.json({
            total: count,
            docs
          })
        } else {
          res.send(false)
        }
      })
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
    if (err) throw err
    if (docs) {
      models.Topic.find({
        topicName: docs.topics
      }, (err, data) => {
        if (err) throw err
        if (data) {
          res.json({
            topics: docs.topics,
            obj: data
          })
        } else {
          res.send(false)
        }
      })
    } else {
      res.send(false)
    }
  })
})
// 获取关注者关注的话题详细信息
router.get('/api/getFollowTopicDetailGet', (req, res) => {
  models.FollowTopic.findOne({
    follower: req.query.follower
  }, (err, docs) => {
    if (err) throw err
    if (docs) {
      console.log(docs.topics, 'ffff')
      models.Topic.find({
        topicName: docs.topics
      }, (err, data) => {
        if (err) throw err
        if (data) {
          res.send(data)
        } else {
          res.send(false)
        }
      })
    } else {
      res.send(false)
    }
  })
})

// 获取提问标题与回答内容
router.get('/api/getFollowListGet', (req, res) => {
  const pagesize = Number(req.query.pagesize)
  const currentPage = Number(req.query.currentPage)
  console.log({
    pagesize,
    currentPage,
    answerer: req.query.answerer
  })
  models.Answer.find({
    answerer: req.query.answerer
  }).populate({ path: 'questionId', select: 'title answers handled' }).skip(pagesize * (currentPage - 1)).limit(pagesize).exec((err, data) => {
    if (!err) {
      res.send(data)
    } else {
      res.send(err)
    }
  })
})

// 根据关注的话题获取问题列表
router.get('/api/getFollwTopicListGet', (req, res) => {
  const pagesize = Number(req.query.pagesize)
  const currentPage = Number(req.query.currentPage)
  models.FollowTopic.findOne({
    follower: req.query.follower
  }, (err, data) => {
    if (!err) {
      if (data) {
        models.Question.find({
          $or: [ { topics: { $in: data.topics } }, { answers: { $gt: 5 } }, { follows: { $gt: 5 } } ]
        }).skip(pagesize * (currentPage - 1)).limit(pagesize).exec((err, data) => {
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

// 获取规定时间后的回答
router.get('/api/getTimeAnswersGet', (req, res) => {
  models.FollowQuestion.findOne({
    follower: req.query.follower
  }, (err, data) => {
    if (!err) {
      if (data) {
        getFind(data).then(findData => {
          res.send(findData)
        }).catch(err => {
          res.send(err)
        })
      } else {
        res.send(false)
      }
    }
  })
})

function asyncFind (datas) {
  return new Promise(function (resolve, reject) {
    models.Answer.find({
      $and: [{ questionId: datas.questionId }, { answerDate: { '$gte': datas.followDate } }]
    }).exec((err, data) => {
      if (!err) {
        models.Question.findOne({
          _id: datas.questionId
        }, { title: 1, answers: 1 }, (err, doc) => {
          if (!err) {
            let o = {}
            o['question'] = doc
            o['newAnswers'] = data
            resolve(o)
          }
        })
      } else {
        reject(err)
      }
    })
  })
}
async function getFind (data) {
  let a = []
  for (let i = 0; i < data.questions.length; i++) {
    const ret = await asyncFind(data.questions[i])
    a.push(ret)
  }
  return a
}

// 获取用户回答与提问列表
router.get('/api/getQandAListGet', (req, res) => {
  models.Question.find({
    questioner: req.query.account
  }, (err, data1) => {
    if (!err) {
      if (data1) {
        models.Answer.find({
          answerer: req.query.account
        }).populate({ path: 'questionId', select: 'title answers' }).exec((err, data2) => {
          if (!err) {
            if (data2) {
              let obj = {}
              obj['questions'] = data1
              obj['answers'] = data2
              res.send(obj)
            } else {
              res.send(false)
            }
          }
        })
      } else {
        res.send(false)
      }
    }
  })
})

// 获取某些用户资料
router.get('/api/getUsersProfileGet', (req, res) => {
  models.Account.find({
    accountName: req.query.accounts
  }, { accountName: 1, userAvatar: 1, userDescribe: 1 }, (err, data) => {
    if (!err) {
      res.send(data)
    } else {
      res.send(false)
    }
  })
})

// 搜索模糊查询
router.get('/api/getSearchGet', (req, res) => {
  var qs = new RegExp(req.query.search)
  models.Question.find({
    title: { '$regex': qs, $options: '$i' }
  }, (err, question) => {
    if (!err) {
      models.Topic.find({
        topicName: { '$regex': qs, $options: '$i' }
      }, (err, topic) => {
        if (!err) {
          res.json({
            question,
            topic
          })
        }
      })
    }
  })
})

// 提交举报
router.get('/api/commitReprotGet', (req, res) => {
  let updateData = new models.Report({
    reporter: req.query.reporter,
    reportQId: req.query.reportQId,
    reportAId: req.query.reportAId,
    reportType: req.query.reportType,
    reportDate: Date.now()
  })
  console.log(updateData)
  updateData.save((err, data) => {
    if (!err) {
      res.send(true)
    } else {
      res.send(false)
    }
  })
})

// 获取是否已举报
router.get('/api/getReprotedGet', (req, res) => {
  let fake = '000000000000000000000000'
  let reportQIdFilter = req.query.reportQId || fake
  let reportAIdFilter = req.query.reportAId || fake
  models.Report.find({
    $and: [ { $or: [ { reportQId: reportQIdFilter }, { reportAId: reportAIdFilter } ] }, { reporter: req.query.reporter } ]
    // $and: [ { 'reports.reportAId': req.query.reportAId }, { reporter: req.query.reporter } ]
  }, (err, data) => {
    if (!err) {
      res.send(data)
    } else {
      console.log(err)
      res.send(false)
    }
  })
})

// 获取热门
router.get('/api/getHotListGet', (req, res) => {
  const pagesize = Number(req.query.pagesize)
  const currentPage = Number(req.query.currentPage)
  models.Question.aggregate(
    [
      { $project: { title: 1, count: { $add: [ '$follows', { $multiply: [ '$answers', 2 ] } ] } } }
    ]
  ).sort({ count: -1 }).skip(pagesize * (currentPage - 1)).limit(pagesize).exec((err, data) => {
    if (err) throw err
    if (data) {
      res.send(data)
    } else {
      res.send(false)
    }
  })
})

// **************admin**************
// 删除话题
router.get('/api/deleteTopicGet', (req, res) => {
  console.log({
    topicName: req.query.topicName
  })
  models.Topic.update({
    topicName: req.query.topicName
  }, { $set: { topicHandled: req.query.topicHandled } }, (err, data) => {
    if (!err) {
      res.send(true)
    } else {
      res.send(false)
    }
  })
})

// 获取举报信息
router.get('/api/getReportGet', (req, res) => {
  const pagesize = Number(req.query.pageSize)
  const currentPage = Number(req.query.currentPage)
  models.Report.count((err, count) => {
    if (!err) {
      models.Report.find().populate('reportQId reportAId').skip(pagesize * (currentPage - 1)).limit(pagesize).exec((err, docs) => {
        if (!err) {
          res.json({
            total: count,
            docs
          })
        } else {
          res.send(false)
        }
      })
    }
  })
})

// 封禁和解封
router.get('/api/getHandleReportGet', (req, res) => {
  let parmas = {
    reportQId: req.query.reportQId,
    reportAId: req.query.reportAId,
    handled: req.query.handle
  }
  console.log(parmas.handled)
  models.Question.update(
    { _id: parmas.reportQId || parmas.reportAId },
    { $set: { handled: parmas.handled } }
  ).exec((err, data) => {
    if (!err) {
      console.log(data)
      if (data.nModified) {
        res.send(true)
      } else {
        res.send(false)
      }
    } else {
      console.log(err)
      res.send(false)
    }
  })
})

// 模糊查询话题详情
router.get('/api/getSomeTopicDetailGet', (req, res) => {
  console.log(req.query.topicName)
  var qs = new RegExp(req.query.topicName)
  models.Topic.find({
    topicName: { '$regex': qs, $options: '$i' }
  }, (err, data) => {
    if (!err) {
      res.send(data)
    } else {
      res.send(false)
    }
  })
})

// 根据时间获取统计
// router.get('/api/getChartDataGet', (req, res) => {
//   const start = new Date(req.query.start)
//   const end = new Date(req.query.end)
//   models.Question.count({
//     questionDate: { $gte: start, $lt: end }
//   }, (err, qCount) => {
//     if (err) throw err
//     models.Answer.count({
//       answerDate: { $gte: start, $lt: end }
//     }, (err, aCount) => {
//       if (err) throw err
//       models.Account.count({
//         addDate: { $gte: start, $lt: end }
//       }, (err, acCount) => {
//         if (err) throw err
//         res.json({
//           qCount,
//           aCount,
//           acCount
//         })
//       })
//     })
//   })
// })

module.exports = router
