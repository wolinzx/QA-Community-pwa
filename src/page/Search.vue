<template>
  <div class="search">
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click="routerBack">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
      <!-- <mu-text-field v-model="searchContent" placeholder="输入搜索内容"></mu-text-field> -->
      <input type="text" class="search-input" v-model="searchContent" placeholder="输入搜索内容">
      <mu-button icon slot="right" color="primary" @click="search">
        <mu-icon value="search"></mu-icon>
      </mu-button>
    </mu-appbar>
    <mu-expansion-panel expand>
      <div slot="header">话题</div>
      <mu-list textline="three-line" class="demo-loadmore-content">
      <div v-for="(topic,i) of topics" :key="i" @click="toTopicDetail(topic.topicName)">
        <mu-list-item avatar button>
          <mu-list-item-action>
            <mu-avatar>
              <img :src="topic.topicAvatar">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>{{topic.topicName}}</mu-list-item-title>
            <mu-list-item-sub-title>
              {{topic.topicDescribe}}
            </mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action @click.stop="followTopic(topic.topicName)" v-if="!topic.followed">
            <!-- <mu-button color="primary" small @click="()=>{openAlert = true; unFollower = user.accountName;}"> -->
            <mu-button color="primary" small>
              关注
            </mu-button>
          </mu-list-item-action>
          <mu-list-item-action @click.stop="unFollowTopic(topic.topicName)" v-else>
            <!-- <mu-button color="primary" small @click="()=>{openAlert = true; unFollower = user.accountName;}"> -->
            <mu-button color="gray" small>
              已关注
            </mu-button>
          </mu-list-item-action>
        </mu-list-item>
        <mu-divider></mu-divider>
      </div>
    </mu-list>
    </mu-expansion-panel>
    <div class="demo-text">
      <mu-card style="width: 100%; margin: 10px auto;" v-for="(question, i) of questions" :key="i" @click="toDetail(question._id, question.title)">
        <mu-card-title :title="question.title"></mu-card-title>
        <mu-card-text>
          {{question.contentData | contentFilter}}
        </mu-card-text>
        <mu-card-actions class="list-buttom">
          <span>{{question.answers}} 回答 · {{question.follows}} 关注</span>
        </mu-card-actions>
      </mu-card>
    </div>
    <span class="nomore">无更多内容</span>
  </div>
</template>

<script>
import { getSearchGet, followTopicGet, unFollowTopicGet, getFollowTopicGet } from '../api/api.js'
import { mapState } from 'vuex'
import contentFilter from '../util/contentFilter.js'
import * as localStorage from '../util/localStorage'
import { globalBus } from '@/util/globalBus'
export default {
  data () {
    return {
      searchContent: '',
      topics: [],
      questions: []
    }
  },
  methods: {
    routerBack () {
      this.$router.go(-1)
    },
    toTopicDetail (topicName) {
      this.$router.push({ name: 'TopicDetail', query: { topicName } })
    },
    followTopic (topic) {
      if (this.userInfo.isLogined) {
        followTopicGet({
          follower: this.userInfo.user_datas[0].account,
          topic
        }).then(res => {
          console.log(res)
          // this.topicList[index].followed = !this.topicList[index].followed
          this.getFollowTopic()
          console.log(this.topicList)
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.$toast.error('请登录后再操作')
        globalBus.$emit('openLogin')
      }
    },
    unFollowTopic (topic) {
      unFollowTopicGet({
        follower: this.userInfo.user_datas[0].account,
        topic
      }).then(res => {
        console.log(res)
        this.getFollowTopic()
      }).catch(err => {
        console.log(err)
      })
    },
    getFollowTopic () {
      if (this.userInfo.isLogined) {
        getFollowTopicGet({
          follower: this.userInfo.user_datas[0].account
        }).then(res => {
          console.log(res)
          if (res.data) {
            console.log(this.topics)
            let obj = this.topics.concat()
            for (const i of obj) {
              i.followed = res.data.topics.includes(i.topicName)
            }
            this.topics = obj.concat()
          }
        }).catch(err => {
          console.log(err)
        })
      }
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
    getSearch () {
      getSearchGet({
        search: this.searchContent || this.$route.query.search
      }).then(res => {
        console.log(res)
        if (res.data) {
          for (const topic of res.data.topic) {
            topic['followed'] = false
          }
          this.topics = res.data.topic
          this.questions = res.data.question
          this.getFollowTopic()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    search () {
      this.getSearch()
    }
  },
  mounted () {
    this.getSearch()
    this.searchContent = this.$route.query.search
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
.nomore{
  display: block;
  text-align: center;
  margin: 20px;
  color: #aaaaaa;
}
.search>>>.mu-expansion-panel-content{
  padding: 8px 8px 0;
}
.search-paper{
  position: absolute;
  top: 0.5rem;
  left: 50%;
  z-index: 9999;
  width: 17rem;
  margin-left: -8.5rem;
  border-radius: 4px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.search-paper .mu-input{
  margin-bottom: 0;
  padding-bottom: 0;
  padding-top: 6px;
}
.search-input{
  width: 100%;
  height: 32px;
  padding: 6px;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0);
  outline: none;
  border-radius: 5px;
}
</style>
