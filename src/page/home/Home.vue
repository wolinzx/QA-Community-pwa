<template>
  <div id="home">
    <mu-tabs class="home-tabs" :value.sync="active1" indicator-color="white" full-width>
      <mu-tab>关注</mu-tab>
      <mu-tab>推荐</mu-tab>
      <mu-tab>热门</mu-tab>
    </mu-tabs>
    <div v-show="active1 === 0">
      <div class="demo-loadmore-wrap" ref="container">
        <div ref="container1" class="demo-loadmore-content">
          <mu-load-more @refresh="refresh1" :refreshing="refreshing1" :loading="loading1" @load="load1">
            <div v-for="(answer, i) in answerList" :key="i">
              <mu-card style="width: 100%; margin: 10px auto;">
                <mu-card-header :title="answer.answerer" :sub-title="'回答了问题 · ' + answer.computedDate">
                  <mu-avatar slot="avatar">
                    <img src="../../assets/image/avatar.jpeg">
                  </mu-avatar>
                </mu-card-header>
                <mu-card-title :title="answer.questionId.title" @click="toAnswer(answer)"></mu-card-title>
                <mu-card-text  @click="toAnswer(answer)">
                  {{answer.contentData | contentFilter}}
                </mu-card-text>
                <mu-card-actions class="list-buttom">
                  <span>{{answer.endorseCount}} 赞同 · 66 评论</span>
                  <mu-menu cover placement="bottom-end">
                    <mu-button icon color="rgba(0,0,0,.57)">
                      <mu-icon value="more_vert"></mu-icon>
                    </mu-button>
                    <mu-list slot="content">
                      <mu-list-item button>
                        <mu-list-item-title>不感兴趣</mu-list-item-title>
                      </mu-list-item>
                      <mu-list-item button>
                        <mu-list-item-title>取消关注</mu-list-item-title>
                      </mu-list-item>
                      <mu-list-item button>
                        <mu-list-item-title>举报</mu-list-item-title>
                      </mu-list-item>
                    </mu-list>
                  </mu-menu>
                </mu-card-actions>
              </mu-card>
            </div>
          </mu-load-more>
        </div>
      </div>
    </div>
    <div v-show="active1 === 1">
      <div class="demo-loadmore-wrap" ref="container">
        <div ref="container2" class="demo-loadmore-content">
          <mu-load-more @refresh="refresh2" :refreshing="refreshing2" :loading="loading2" @load="load2">
            <div v-for="(recommend, i) of recommendlist" :key="i">
              <mu-card style="width: 100%; margin: 10px auto;">
                <mu-card-title :title="recommend.title" @click="toDetail(recommend._id, recommend.title)"></mu-card-title>
                <mu-card-text v-html="recommend.contentData.replace(/<[^>]+>/g,'')" @click="toDetail(recommend._id, recommend.title)"></mu-card-text>
                <mu-card-actions class="list-buttom">
                  <span>{{recommend.follows}} 人关注</span>
                  <mu-menu cover placement="bottom-end">
                    <mu-button icon color="rgba(0,0,0,.57)">
                      <mu-icon value="more_vert"></mu-icon>
                    </mu-button>
                    <mu-list slot="content">
                      <mu-list-item button>
                        <mu-list-item-title>不感兴趣</mu-list-item-title>
                      </mu-list-item>
                      <mu-list-item button>
                        <mu-list-item-title>举报</mu-list-item-title>
                      </mu-list-item>
                    </mu-list>
                  </mu-menu>
                </mu-card-actions>
              </mu-card>
            </div>
          </mu-load-more>
        </div>
      </div>
    </div>
    <div v-show="active1 === 2">
      <div class="demo-loadmore-wrap" ref="container">
        <div ref="container3" class="demo-loadmore-content">
          <mu-load-more @refresh="refresh3" :refreshing="refreshing3" :loading="loading3" @load="load3">
            <template v-for="(hot, i) of hotList">
              <div class="hot-list" :key="i" @click="toDetail(hot._id, hot.title)">
                <p>{{i + 1}}</p>
                <div>
                  <h3>{{hot.title}}</h3>
                  <span>{{hot.computedHotValue}} 热度</span>
                </div>
              </div>
            </template>
          </mu-load-more>
        </div>
      </div>
    </div>
    <div class="edit-action">
      <mu-scale-transition>
        <mu-button fab color="premary" v-show="showEdit" @click="openQuiz = true">
          <mu-icon value="edit"></mu-icon>
        </mu-button>
      </mu-scale-transition>
    </div>
    <div>
      <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openQuiz">
        <mu-appbar color="primary" title="提问">
          <mu-button slot="left" icon @click="openQuiz = false">
            <mu-icon value="arrow_back"></mu-icon>
          </mu-button>
          <mu-button slot="right" flat @click="openSelectDialog" :disabled="!title">
            下一步
          </mu-button>
        </mu-appbar>
        <div>
          <mu-text-field v-model="title" placeholder="请输入标题" full-width style="font-weight: bold; padding: 15px; margin-bottom: 0;"></mu-text-field>
          <!-- <mu-text-field multi-line :rows="10" placeholder="请输入问题描述（选填）" full-width></mu-text-field><br/> -->
          <quill-editor class="question-edit" v-model="content"
            ref="myQuillEditor"
            :options="editorOption">
          </quill-editor>
        </div>
      </mu-dialog>
      <mu-dialog width="360" transition="slide-right" :overlay="false" fullscreen :open.sync="openSelect">
        <mu-appbar color="primary" title="添加话题">
          <mu-button slot="left" icon @click="openSelect = false">
            <mu-icon value="arrow_back"></mu-icon>
          </mu-button>
          <mu-button slot="right" flat @click="commitQuestion">
            <mu-icon value="send"></mu-icon>
          </mu-button>
        </mu-appbar>
        <div style="padding: 24px;">
          <mu-select label="搜索并添加相关话题" v-model="selsectTags" chips multiple tags full-width>
            <mu-option v-for="language,index in languages" :key="language" :label="language" :value="language"></mu-option>
          </mu-select>
        </div>
      </mu-dialog>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import * as localStorage from '../../util/localStorage'
import dateDiff from '../../util/dateDiff.js'
import contentFilter from '../../util/contentFilter.js'
// import ImageResize from 'quill-image-resize-module'
// Quill.register('modules/imageResize', ImageResize)
import { commitQuestionGet, getQuestionListGet, getTopicGet, getFollowUsersGet, getFollowListGet, getFollwTopicListGet } from '../../api/api.js'

export default {
  data () {
    return {
      active1: 0,
      num: 0,
      refreshing1: false,
      loading1: false,
      refreshing2: false,
      loading2: false,
      refreshing3: false,
      loading3: false,
      text: 'List',
      containerScroll: 0,
      showEdit: true,
      open: false,
      openQuiz: false,
      openSelect: false,
      title: '',
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
        placeholder: '对问题进行补充说明，可以更快获得解答（选填）'
      },
      recommendlist: [],
      hotList: [],
      pagesize: 10,
      currentPage: 1,
      selsectTags: [],
      languages: [],
      followUsers: [],
      answerList: []
    }
  },
  methods: {
    ...mapMutations(['SET_SCROLLED']),
    refresh1 () {
      this.refreshing1 = true
      this.$refs.container1.scrollTop = 0
      setTimeout(() => {
        this.refreshing1 = false
        this.getFollowUsers()
        // this.pagesize = 10
        // this.currentPage = 1
      }, 1000)
    },
    load1 () {
      // this.loading = true
      // this.getRecommendlist(this.pagesize, ++this.currentPage, false)
    },
    refresh2 () {
      this.refreshing2 = true
      this.$refs.container2.scrollTop = 0
      setTimeout(() => {
        this.refreshing2 = false
        this.getRecommendlist(10, 1, true)
        this.pagesize = 10
        this.currentPage = 1
      }, 1000)
    },
    load2 () {
      this.loading2 = true
      this.getRecommendlist(this.pagesize, ++this.currentPage, false)
    },
    refresh3 () {
      this.refreshing3 = true
      this.$refs.container3.scrollTop = 0
      setTimeout(() => {
        this.refreshing3 = false
        this.getHotList(10, 1, true)
        this.pagesize = 10
        this.currentPage = 1
      }, 1000)
    },
    load3 () {
      this.loading3 = true
      this.getHotList(this.pagesize, ++this.currentPage, false)
    },
    handleScroll () {
      let scrollTop = this.$refs.container1.scrollTop || this.$refs.container2.scrollTop || this.$refs.container3.scrollTop
      let scrollTopBool = this.containerScroll < scrollTop
      this.SET_SCROLLED(scrollTopBool)
      this.containerScroll = scrollTop
      scrollTopBool ? this.showEdit = false : this.showEdit = true
    },
    toDetail (id, title) {
      let user = this.userInfo.user_datas[0].account
      console.log()
      let hhh = localStorage.userHistory.get() || {}
      if (!localStorage.userHistory.get()[user]) {
        hhh[user] = []
      }
      let fff = hhh[user].filter(item => item.questionId !== id)
      fff.push({ questionTitle: title, questionId: id, hDate: Date.now() })
      console.log(1, hhh)
      hhh[user] = fff
      console.log(2, hhh)
      localStorage.userHistory.set(hhh)
      this.$router.push({ name: 'Detail', query: { questionId: id } })
    },
    toAnswer (answer) {
      let answerArr = [answer]
      console.log(answer, 'sdfdsf')
      this.$router.push({
        name: 'Answer',
        params: {
          answers: answerArr,
          tapAnswer: 0,
          questionTitle: answer.questionId.title,
          questionId: answer.questionId._id,
          answersCount: answer.questionId.answers
        }
      })
    },
    commitQuestion () {
      let param = {
        account: this.userInfo.user_datas[0].account,
        title: this.title,
        content: this.content,
        topics: this.selsectTags
      }
      console.log(param)
      commitQuestionGet(param).then(res => {
        if (res) {
          this.getRecommendlist(10, 1, true)
          this.$toast.success('提交成功')
          this.openQuiz = false
          this.openSelect = false
        }
      }).catch(err => {
        console.log(err)
        this.$toast.error('提交失败')
      })
    },
    getRecommendlist (pagesize, currentPage, isFresh) {
      getFollwTopicListGet({
        follower: this.userInfo.user_datas[0].account
      }).then(res => {
        isFresh ? this.recommendlist = res.data.concat() : this.recommendlist = this.recommendlist.concat(res.data)
        this.loading2 = false
      })
    },
    openSelectDialog () {
      this.openSelect = true
      getTopicGet().then(res => {
        for (const topic of res.data) {
          this.languages.push(topic.topicName)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getFollowUsers () {
      getFollowUsersGet({
        follower: this.userInfo.user_datas[0].account
      }).then(res => {
        this.followUsers = res.data
        console.log(this.followUsers, 'fsdfsdfds')
        let arr = []
        for (const follows of this.followUsers) {
          arr.push(follows.accountName)
        }
        console.log('arr', arr)
        getFollowListGet({
          answerer: arr
        }).then(res => {
          this.answerList = res.data
          console.log(res.data)
          console.log('fsdfsd', this.answerList)
          for (const answer of this.answerList) {
            let answerDate = answer.answerDate
            answer['computedDate'] = dateDiff(answerDate).diff
            answer['sec'] = dateDiff(answerDate).sec
          }
          this.answerList.sort((a, b) => {
            return a.sec - b.sec
          })
        }).catch(err => {
          console.log(err)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    getHotList (pagesize, currentPage, isFresh) {
      let param = {
        pagesize,
        currentPage
      }
      getQuestionListGet(param).then(res => {
        isFresh ? this.hotList = res.data.concat() : this.hotList = this.hotList.concat(res.data)
        for (const hot of this.hotList) {
          hot['computedHotValue'] = Number(hot.follows) + Number(hot.answers) * 2
        }
        this.hotList.sort((a, b) => {
          return b.computedHotValue - a.computedHotValue
        })
        this.loading3 = false
      })
    }
  },
  mounted () {
    this.$refs.container1.addEventListener('scroll', this.handleScroll)
    this.$refs.container2.addEventListener('scroll', this.handleScroll)
    this.$refs.container3.addEventListener('scroll', this.handleScroll)
    // 获取关注
    this.getFollowUsers()
    // 获取提问列表
    this.getRecommendlist(10, 1, true)
    // 获取热门列表
    this.getHotList(10, 1, true)
  
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
.demo-loadmore-wrap {
  width: 100%;
  /* max-width: 360px; */
  position: absolute;
  top: 103px;
  bottom: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
}
.mu-appbar {
    width: 100%;
}
.demo-loadmore-content {
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.demo-loadmore-content .mu-icon-button{
  padding: 0;
  width: inherit;
  height: inherit;
}
.home-tabs{
  /* border-bottom: 1px solid rgba(0,0,0,.12); */
  box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14);
}
.edit-action{
  position: fixed;
  right: 16px;
  bottom: 80px;
}
.mu-card-title-container .mu-card-title{
  font-size: 18px;
  font-weight: bold;
}
.list-buttom span{
  display: flex;
  align-items: center;
  color: rgba(0,0,0,.57);
}
.list-buttom{
  display: flex;
  justify-content: space-between;
}
.mu-card{
  box-shadow: 0 2px 2px -1px rgba(0,0,0,.14);
  border-radius: 0;
}
.hot-list{
  display: flex;
  border-bottom: 1px solid #e3e0e0;
}
.hot-list p{
  padding: 0 16px;
  font-weight: bold;
  color: brown;
}
.hot-list h3{
  margin: 13px 0 0;
}
.hot-list span{
  margin: 10px 0;
  display: inline-block;
  color: rgba(0,0,0,.57);
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
