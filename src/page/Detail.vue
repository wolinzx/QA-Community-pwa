<template>
  <div class="detail">
    <mu-dialog title="此提问已被封禁" width="360" :open.sync="openHanded" :overlay-close="false">
      此提问存在违规内容，已被封禁！
      <mu-button slot="actions" flat color="primary" @click="routerBack">返回</mu-button>
    </mu-dialog>
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click="routerBack">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
        提问详情
      <mu-menu slot="right" cover placement="bottom-end">
        <mu-button icon>
          <mu-icon value="more_vert"></mu-icon>
        </mu-button>
        <mu-list slot="content">
          <mu-list-item button @click="toReport">
            <mu-list-item-content>
              <mu-list-item-title>举报</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </mu-menu>
    </mu-appbar>
    <mu-card style="width: 100%; margin: 0 auto;">
      <mu-chip color="#f2f2f2" text-color="#bfbfbf" v-for="(topic, i) of questionDetail.topics" :key="i" @click="toTopicDetail(topic)">
        {{topic}}
      </mu-chip>
      <mu-card-title :title="questionDetail.title"></mu-card-title>
      <mu-card-text :class="{'detail-content': showMore}" @click="showMore = true">
        <div class="question-content" v-html="questionDetail.contentData"></div>
      </mu-card-text>
      <mu-card-actions class="detail-action">
        <span>{{followCount}} 人关注</span>
        <mu-button color="primary" small @click="setFollow" v-if="!isFollow">
          <mu-icon left value="add"></mu-icon>
          关注问题
        </mu-button>
        <mu-button color="#e6e6e6" textColor="rgba(0,0,0,.3)" small @click="unFollow" v-else>
          <mu-icon left value="check"></mu-icon>
          已关注
        </mu-button>
      </mu-card-actions>
    </mu-card>
    <mu-list>
      <mu-sub-header class="detail-answer-bar">
        <span>{{answers.length}} 个回答</span>
        <mu-menu slot="right" cover placement="bottom-end" v-if="answers.length !== 0" :open.sync="openSort">
          {{sortWay}}
          <mu-button icon>
            <mu-icon value="expand_more"></mu-icon>
          </mu-button>
          <mu-list slot="content">
            <mu-list-item button @click="getAnswerList('按质量排序')">
              <mu-list-item-content class="detail-bar-sort">
                <mu-list-item-title>按质量排序</mu-list-item-title>&nbsp;
                <mu-icon value="done" color="primary" v-show="sortWay === '按质量排序'"></mu-icon>
              </mu-list-item-content>
            </mu-list-item>
            <mu-list-item button @click="getAnswerList('按时间排序')">
              <mu-list-item-content class="detail-bar-sort">
                <mu-list-item-title>按时间排序</mu-list-item-title>&nbsp;
                <mu-icon value="done" color="primary" v-show="sortWay === '按时间排序'"></mu-icon>
              </mu-list-item-content>
            </mu-list-item>
          </mu-list>
        </mu-menu>
      </mu-sub-header>
    </mu-list>
    <div v-for="(answer,index) of answers" :key="index">
      <mu-card style="width: 100%; margin: 0 auto 10px;" @click="toAnswer(index)">
        <mu-card-header :title="answer.answerer">
          <mu-avatar slot="avatar" :size="20">
            <img :src="answer.avatar || default_avatar">
          </mu-avatar>
        </mu-card-header>
        <mu-card-text v-if="!answer.handled">
          {{answer.contentData | contentFilter}}
        </mu-card-text>
        <mu-card-text v-else>
          内容涉嫌违规已被封禁！
        </mu-card-text>
        <mu-card-actions>
          <span>{{ answer.endorseCount }} 赞同 · {{answer.computedDate}}</span>
        </mu-card-actions>
      </mu-card>
    </div>
    <mu-flex class="flex-wrapper" justify-content="center" direction="column" align-items="center" style="width:100%; height: 10rem;" v-if="answers.length === 0">
      <mu-flex class="flex-wrapper" justify-content="center" direction="column" align-items="center">
        <mu-icon value="storage" size="150" color="#ececec"></mu-icon>
        <span style="color: #b0b0b0">快成为第一个回答者吧</span>
      </mu-flex>
    </mu-flex>
    <span class="nomore" v-else>无更多内容</span>
    <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openAnswer">
      <mu-appbar color="primary" :title="questionTitle">
        <mu-button slot="left" icon @click="openAnswer = false">
          <mu-icon value="close"></mu-icon>
        </mu-button>
        <mu-button slot="right" flat  @click="commitAnswer">
          <mu-icon value="send"></mu-icon>
        </mu-button>
      </mu-appbar>
      <quill-editor class="question-edit" v-model="content"
        ref="myQuillEditor"
        :options="editorOption">
      </quill-editor>
    </mu-dialog>
    <div class="answer-action">
      <mu-button fab color="premary" @click="isAnswered">
        <mu-icon value="create"></mu-icon>
      </mu-button>
    </div>
  </div>
</template>

<script>
import { getQuestionGet, commitAnswerGet, getAnswerListGet, setFollowGet, unFollowGet, getFollowGet, isAnsweredGet, getUsersProfileGet, getReprotedGet } from '../api/api.js'
import { mapState } from 'vuex'
import * as localStorage from '../util/localStorage'
import dateDiff from '../util/dateDiff.js'
import contentFilter from '../util/contentFilter.js'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { globalBus } from '@/util/globalBus'
export default {
  data () {
    return {
      openHanded: false,
      sortWay: '按质量排序',
      openAnswer: false,
      showMore: false,
      questionTitle: '',
      questionContent: '',
      topics: '',
      questionDetail: {},
      questionFollow: 0,
      content: '',
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image']
          ],
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          }
        },
        placeholder: '写回答...'
      },
      answers: [],
      routerFrom: '',
      endorseList: [],
      followCount: 0,
      isFollow: false,
      accounts: [],
      default_avatar: '/static/img/default_avatar.jpeg',
      openSort: false
    }
  },
  methods: {
    routerBack () {
      this.$router.go(-1)
    },
    toReport () {
      if (this.userInfo.isLogined) {
        getReprotedGet({
          reporter: this.userInfo.user_datas[0].account,
          reportQId: this.$route.query.questionId
        }).then(res => {
          console.log(res.data)
          if (!res.data.length) {
            this.$router.push({ name: 'Report', query: { questionId: this.$route.query.questionId } })
          } else {
            this.$toast.error('您已举报过该问题')
          }
        })
      } else {
        this.$toast.error('请先登录')
        globalBus.$emit('openLogin')
      }
    },
    toTopicDetail (topicName) {
      this.$router.push({ name: 'TopicDetail', query: { topicName } })
    },
    toAnswer (index) {
      let user = this.userInfo.user_datas[0].account
      console.log()
      let hhh = localStorage.userHistory.get() || {}
      if (!localStorage.userHistory.get()[user]) {
        hhh[user] = []
      }
      let fff = hhh[user].filter(item => item.questionId !== this.$route.query.questionId)
      fff.push({ questionTitle: this.questionTitle, questionId: this.$route.query.questionId, hDate: Date.now() })
      console.log(1, hhh)
      hhh[user] = fff
      console.log(2, hhh)
      localStorage.userHistory.set(hhh)
      this.$router.push({
        name: 'Answer',
        query: {
          answerId: this.answers[index]._id,
          sortWay: this.sortWay,
          questionTitle: this.questionTitle,
          questionId: this.$route.query.questionId,
          answersCount: this.questionDetail.answers,
          handled: this.questionDetail.handled
        }
      })
    },
    getAnswerList (sortWay) {
      this.sortWay = sortWay || '按质量排序'
      let param = {
        questionId: this.$route.query.questionId,
        sortWay: this.sortWay === '按质量排序' ? 'quality' : 'time'
      }
      getAnswerListGet(param).then(res => {
        this.answers = res.data.concat()
        this.insertTime(this.answers)
        for (const i of this.answers) {
          this.accounts.push(i.answerer)
        }
        this.getUsersProfile()
        this.openSort = false
      }).catch(err => {
        console.log(err)
      })
    },
    insertTime (answers) {
      console.log(answers)
      for (const answer of answers) {
        let answerDate = answer.answerDate
        answer['computedDate'] = dateDiff(answerDate).diff
        answer['sec'] = dateDiff(answerDate).sec
      }
    },
    commitAnswer () {
      var date = new Date()
      let infoDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      let info = `<p class="answer-info">编辑于 ${infoDate} · 著作权归作者所有</p>`
      let param = {
        questionId: this.$route.query.questionId,
        answerer: this.userInfo.user_datas[0].account,
        content: this.content + info
      }
      commitAnswerGet(param).then(res => {
        this.$toast.success('发表回答成功')
        this.getAnswerList()
        this.openAnswer = false
      }).catch(err => {
        console.log(err)
        this.$toast.error('发表回答失败')
      })
    },
    getFollow () {
      console.log({
        follower: this.userInfo.user_datas[0].account,
        questionId: this.$route.query.questionId
      })
      getFollowGet({
        follower: this.userInfo.user_datas[0].account,
        questionId: this.$route.query.questionId
      }).then(res => {
        console.log(res)
        if (res.data.doc) {
          let questionIdArr = []
          for (const question of res.data.doc.questions) {
            questionIdArr.push(question.questionId)
          }
          this.isFollow = questionIdArr.includes(this.$route.query.questionId)
        }
        this.followCount = res.data.followCount
      }).catch(err => {
        console.log(err)
      })
    },
    setFollow () {
      if (this.userInfo.isLogined) {
        let param = {
          follower: this.userInfo.user_datas[0].account,
          questionId: this.$route.query.questionId
        }
        setFollowGet(param).then(res => {
          if (res) {
            this.getFollow()
            this.$toast.success('关注成功')
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.$toast.error('请先登录')
        globalBus.$emit('openLogin')
      }
    },
    unFollow () {
      let param = {
        follower: this.userInfo.user_datas[0].account,
        questionId: this.$route.query.questionId
      }
      unFollowGet(param).then(res => {
        if (res) {
          this.getFollow()
          this.$toast.success('取消关注成功')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    isAnswered () {
      if (this.userInfo.isLogined) {
        isAnsweredGet({
          questionId: this.$route.query.questionId,
          answerer: this.userInfo.user_datas[0].account
        }).then(res => {
          if (!res.data) {
            this.openAnswer = true
          } else {
            this.$toast.error('已经回答过该问题')
          }
        })
      } else {
        this.$toast.error('请先登录')
        globalBus.$emit('openLogin')
      }
    },
    getUsersProfile () {
      console.log({
        accounts: this.accounts
      })
      getUsersProfileGet({
        accounts: this.accounts
      }).then(res => {
        console.log(res.data)
        let temp = this.answers.concat()
        for (const i of temp) {
          for (const j of res.data) {
            console.log(i.answerer, j.accountName)
            if (i.answerer === j.accountName) {
              i['avatar'] = j.userAvatar
            }
          }
        }
        this.answers = temp.concat()
        console.log(this.answers)
      }).catch(err => {
        console.log(err)
      })
    }
    // qualitySort () {
    //   this.answers.sort((a, b) => {
    //     return b.endorseCount - a.endorseCount
    //   })
    //   this.sortWay = '按质量排序'
    // },
    // timeSort () {
    //   this.answers.sort((a, b) => {
    //     return a.sec - b.sec
    //   })
    //   this.sortWay = '按时间排序'
    // }
  },
  /**
   * activated 用于缓存的路由组件(keep-alive)的钩子函数，启用keep-alive的页面created和mounted失效
   * 有关缓存路由参考  https://segmentfault.com/a/1190000012083511?_ea=2864002
   */
  // beforeRouteEnter (to, from, next) {
  //   from.name === 'Answer' ? to.meta.isBack = true : to.meta.isBack = false
  //   next()
  // },
  mounted () {
    let param = {
      questionId: this.$route.query.questionId
    }
    getQuestionGet(param).then(res => {
      if (res.data.handled) {
        this.openHanded = true
      }
      this.questionDetail = res.data
      this.questionTitle = res.data.title
      this.questionContent = res.data.contentData
      this.questionFollow = res.data.follows
      this.topics = res.data.topics
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
    this.getAnswerList()
    this.getFollow()
  },
  components: {
    quillEditor
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
.detail-action{
  display: flex;
  justify-content: space-between;
}
.detail-action span{
  display: flex;
  align-items: center;
}
.answer-action{
  position: fixed;
  right: 16px;
  bottom: 16px;
}
.detail-answer-bar{
  display: flex;
  justify-content: space-between;
}
.detail-bar-sort{
  display: flex;
}
.detail-answer-list{
  margin: 10px 0;
}
.mu-list{
  padding: 0;
}
.mu-list .mu-sub-header:first-child{
  margin: 0;
}
.detail-content{
  -webkit-line-clamp: unset;
}
.question-edit >>> .ql-toolbar.ql-snow{
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 9999;
  left: 0;
  border: none;
  box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
}
.question-edit >>> .ql-toolbar.ql-snow + .ql-container.ql-snow{
  border: none;
}
.mu-card-title-container .mu-card-title{
  margin-top: 10px;
}
.mu-chip{
  margin-right: 8px;
}
.question-content>>>img{
  max-width: 100% !important;
}
.nomore{
  display: block;
  text-align: center;
  margin: 20px;
  color: #aaaaaa;
}
</style>
