<template>
  <div class="detail">
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
          <mu-list-item button @click="openEdit = true">
            <mu-list-item-content>
              <mu-list-item-title>举报</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </mu-menu>
    </mu-appbar>
    <mu-card style="width: 100%; margin: 0 auto;">
      <mu-card-title :title="questionTitle"></mu-card-title>
      <mu-card-text :class="{'detail-content': showMore}" @click="showMore = true">
        <div v-html="questionContent"></div>
      </mu-card-text>
      <mu-card-actions class="detail-action">
        <span>{{followCount}} 人关注  28 条评论</span>
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
        <mu-menu slot="right" cover placement="bottom-end">
          {{sortWay}}
          <mu-button icon>
            <mu-icon value="expand_more"></mu-icon>
          </mu-button>
          <mu-list slot="content">
            <mu-list-item button @click="sortWay = '按质量排序'">
              <mu-list-item-content class="detail-bar-sort">
                <mu-list-item-title>按质量排序</mu-list-item-title>&nbsp;
                <mu-icon value="done" color="primary" v-show="sortWay === '按质量排序'"></mu-icon>
              </mu-list-item-content>
            </mu-list-item>
            <mu-list-item button @click="sortWay = '按时间排序'">
              <mu-list-item-content class="detail-bar-sort">
                <mu-list-item-title>按时间排序</mu-list-item-title>&nbsp;
                <mu-icon value="done" color="primary" v-show="sortWay === '按时间排序'"></mu-icon>
              </mu-list-item-content>
            </mu-list-item>
          </mu-list>
        </mu-menu>
      </mu-sub-header>
    </mu-list>
    <mu-card style="width: 100%; margin: 0 auto 10px;" v-for="(answer,index) of answers" :key="index">
      <mu-card-header :title="answer.answerer">
        <mu-avatar slot="avatar" :size="20">
          <img src="../assets/image/avatar.jpeg">
        </mu-avatar>
      </mu-card-header>
      <mu-card-text @click="toAnswer(index)" v-html="answer.contentData.replace(/<[^>]+>/g,'')">
      </mu-card-text>
      <mu-card-actions>
        <span>{{ answer.endorseCount }} 赞同 · 40 评论 · 12 小时前</span>
      </mu-card-actions>
    </mu-card>
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
      <mu-button fab color="premary" @click="openAnswer = true">
        <mu-icon value="create"></mu-icon>
      </mu-button>
    </div>
  </div>
</template>

<script>
import { getQuestionGet, commitAnswerGet, getAnswerListGet, setFollowGet, unFollowGet, getFollowGet } from '../api/api.js'
import { mapState } from 'vuex'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  data () {
    return {
      sortWay: '按质量排序',
      openAnswer: false,
      showMore: false,
      questionTitle: '',
      questionContent: '',
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
      isFollow: false
    }
  },
  methods: {
    routerBack () {
      this.$router.go(-1)
    },
    toAnswer (index) {
      this.$router.push({ name: 'Answer', params: { answers: this.answers, tapAnswer: index, questionTitle: this.questionTitle, questionId: this.$route.query.questionId } })
    },
    getAnswerList () {
      let param = {
        questionId: this.$route.query.questionId
      }
      getAnswerListGet(param).then(res => {
        this.answers = res.data.concat()
        console.log('俩hi了', res)
        console.log('哈哈哈', this.answers)
      }).catch(err => {
        console.log(err)
      })
    },
    commitAnswer () {
      let param = {
        questionId: this.$route.query.questionId,
        answerer: this.userInfo.user_datas[0].account,
        content: this.content
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
      getFollowGet({
        follower: this.userInfo.user_datas[0].account,
        questionId: this.$route.query.questionId
      }).then(res => {
        console.log(res)
        let questionIdArr = res.data.doc.questionId
        this.isFollow = questionIdArr.includes(this.$route.query.questionId)
        this.followCount = res.data.followCount
      }).catch(err => {
        console.log(err)
      })
    },
    setFollow () {
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
    }
  },
  /**
   * activated 用于缓存的路由组件(keep-alive)的钩子函数，启用keep-alive的页面created和mounted失效
   * 有关缓存路由参考  https://segmentfault.com/a/1190000012083511?_ea=2864002
   */
  // beforeRouteEnter (to, from, next) {
  //   from.name === 'Answer' ? to.meta.isBack = true : to.meta.isBack = false
  //   next()
  // },
  created () {
    if (!this.$route.meta.isBack) {
      let param = {
        questionId: this.$route.query.questionId
      }
      getQuestionGet(param).then(res => {
        this.questionTitle = res.data.title
        this.questionContent = res.data.contentData
        this.questionFollow = res.data.follows
        console.log(res.data)
      }).catch(err => {
        console.log(err)
      })
      this.getAnswerList()
      this.getFollow()
    }
  },
  components: {
    quillEditor
  },
  computed: {
    ...mapState(['userInfo'])
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
</style>
