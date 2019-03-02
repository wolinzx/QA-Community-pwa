<template>
  <div id="message">
    <mu-list textline="two-line">
      <mu-sub-header>通知列表</mu-sub-header>
      <mu-list-item avatar button v-for="(newAnswer,i) of newAnswers" :key="i" @click="getList(newAnswer)">
        <mu-list-item-action>
          <mu-avatar color="primary">
            <mu-icon value="notifications"></mu-icon>
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-list-item-title>{{newAnswer.question.title}}</mu-list-item-title>
          <mu-list-item-sub-title>{{newAnswer.newAnswers.length}} 个新增回答</mu-list-item-sub-title>
        </mu-list-item-content>
      </mu-list-item>
      <mu-list-item avatar button @click="openFullscreen1 = true" v-if="reportNum">
        <mu-list-item-action>
          <mu-avatar color="orange500">
            <mu-icon value="report"></mu-icon>
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-list-item-title>站务提醒</mu-list-item-title>
          <mu-list-item-sub-title>{{reportNum}} 个 提问/回答 被封禁</mu-list-item-sub-title>
        </mu-list-item-content>
      </mu-list-item>
    </mu-list>
    <mu-container>
      <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openFullscreen">
        <mu-appbar color="primary" :title="thisTitle">
          <mu-button slot="left" icon @click="closeFullscreenDialog">
            <mu-icon value="close"></mu-icon>
          </mu-button>
        </mu-appbar>
        <mu-list textline="three-line">
          <mu-sub-header>新增回答</mu-sub-header>
          <mu-list-item avatar button v-for="(list,i) of newAnswersList" :key="i" @click="toAnswer(list)">
            <mu-list-item-action>
              <mu-avatar>
                <mu-icon value="person"></mu-icon>
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>{{list.answerer}} 回答了该问题</mu-list-item-title>
              <mu-list-item-sub-title>
                <span class="answer-content">{{list.contentData | contentFilter}}</span>
                <div style="display: flex">
                  <mu-icon size="20" value="email" color="primary"></mu-icon>&nbsp;
                  <span>{{list.computedDate}}</span>
                </div>
              </mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </mu-dialog>
    </mu-container>
    <mu-container>
      <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openFullscreen1">
        <mu-appbar color="primary" title="站务提醒">
          <mu-button slot="left" icon @click="openFullscreen1 = false">
            <mu-icon value="close"></mu-icon>
          </mu-button>
        </mu-appbar>
        <mu-list textline="three-line">
          <mu-sub-header>被处理的举报</mu-sub-header>
          <mu-list-item avatar button v-for="(list,i) of reportItem" :key="i">
            <mu-list-item-content>
              <mu-list-item-title>{{list.title ? '该提问被封禁' : '该回答被封禁'}}</mu-list-item-title>
              <mu-list-item-sub-title>
                {{list.title || list.contentData | contentFilter}}
              </mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </mu-dialog>
    </mu-container>
    <mu-flex class="flex-wrapper" justify-content="center" direction="column" align-items="center" style="width:100%; height: 20rem;" v-if="newAnswers.length === 0">
      <mu-flex class="flex-wrapper" justify-content="center" direction="column" align-items="center">
        <mu-icon value="storage" size="150" color="#ececec"></mu-icon>
        <span style="color: #b0b0b0">还没有内容</span>
      </mu-flex>
    </mu-flex>
  </div>
</template>

<script>
import { getTimeAnswersGet, getReportNoticeGet, getReportResGet } from '../../api/api.js'
import { mapState } from 'vuex'
import dateDiff from '../../util/dateDiff.js'
import contentFilter from '../../util/contentFilter.js'

export default {
  data () {
    return {
      newAnswers: [],
      newAnswersList: [],
      openFullscreen: false,
      openFullscreen1: false,
      thisTitle: '通知详情',
      answersCount: 0,
      reportNum: 0,
      reportItem: []
    }
  },
  mounted () {
    if (this.userInfo.isLogined) {
      this.getFollowQuestionMsg()
      this.getReportNotice()
      this.getReportRes()
    }
  },
  methods: {
    getFollowQuestionMsg () {
      getTimeAnswersGet({
        follower: this.userInfo.user_datas[0].account
      }).then(res => {
        if (res.data) {
          this.newAnswers = res.data.filter(item => item.newAnswers.length !== 0)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getReportNotice () {
      getReportNoticeGet({
        account: this.userInfo.user_datas[0].account
      }).then(res => {
        let data = res.data
        this.reportNum = data.ques.length + data.answ.length
        this.reportItem = [...data.ques, ...data.answ]
      }).catch(err => {
        throw err
      })
    },
    getReportRes () {
      getReportResGet({
        account: this.userInfo.user_datas[0].account
      }).then(res => {
        console.log(res)
        let hh = res.data.filter(item => {
          if (item.reportQId) {
            return item.reportQId.handled
          } else if (item.reportAId) {
            return item.reportAId.handled
          } else {
            return false
          }
        })
        console.log(hh)
      }).catch(err => {
        throw err
      })
    },
    openFullscreenDialog () {
      this.openFullscreen = true
    },
    closeFullscreenDialog () {
      this.openFullscreen = false
    },
    getList (newAnswers) {
      this.thisTitle = newAnswers.question.title
      this.answersCount = newAnswers.question.answers
      this.openFullscreen = true
      this.newAnswersList = newAnswers.newAnswers
      for (const answer of this.newAnswersList) {
        let answerDate = answer.answerDate
        answer['computedDate'] = dateDiff(answerDate).diff
        answer['sec'] = dateDiff(answerDate).sec
      }
      this.newAnswersList.sort((a, b) => {
        return a.sec - b.sec
      })
    },
    toAnswer (answer) {
      this.$router.push({
        name: 'Answer',
        query: {
          answerId: answer._id,
          questionTitle: this.thisTitle,
          questionId: answer.questionId,
          answersCount: this.answersCount
        }
      })
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  filters: {
    contentFilter
  }
}
</script>

<style scoped>
.answer-content{
  white-space: normal;
  word-break: break-all;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
