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
  console.log(newAccount)
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
  console.log('333', req.query)
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

module.exports = router
