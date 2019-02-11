<template>
  <div class="follow">
    <mu-appbar style="width: 100%;" color="primary" :z-depth="0">
      <mu-button icon slot="left" @click="routerBack">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
        我的关注
      <!-- <mu-menu slot="right" cover placement="bottom-end">
        <mu-button icon>
          <mu-icon value="delete"></mu-icon>
        </mu-button>
      </mu-menu> -->
    </mu-appbar>
    <mu-tabs class="tabs" :value.sync="active" indicator-color="white" full-width>
      <mu-tab>问题</mu-tab>
      <mu-tab>话题</mu-tab>
      <mu-tab>用户</mu-tab>
    </mu-tabs>
    <div class="demo-text" v-if="active === 0">
      <mu-list textline="two-line">
        <div v-for="(question,i) of followQuestions" :key="i">
          <mu-list-item avatar button @click="toDetail(question._id)">
            <mu-list-item-content>
              <mu-list-item-title>{{question.title}}</mu-list-item-title>
              <mu-list-item-sub-title>{{question.answers}} 个回答 · {{question.follows}} 人关注</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider></mu-divider>
        </div>
      </mu-list>
    </div>
    <div class="follow-topic" v-if="active === 1">
      <mu-list textline="two-line">
        <div v-for="(topic,i) of followTopics" :key="i" @click="toTopicDetail(topic)">
          <mu-list-item avatar button>
            <mu-list-item-action>
              <mu-avatar>
                <img src="../assets/image/avatar.jpeg">
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>{{topic}}</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider></mu-divider>
        </div>
      </mu-list>
    </div>
    <div class="demo-text" v-if="active === 2">
      <mu-list textline="two-line">
        <div v-for="(user,i) of followUsers" :key="i">
          <mu-list-item avatar button>
            <mu-list-item-action>
              <mu-avatar>
                <img src="../assets/image/avatar.jpeg">
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>{{user.accountName}}</mu-list-item-title>
              <mu-list-item-sub-title>
                {{user.userDescribe}}
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-list-item-action>
              <mu-button color="primary" small @click="()=>{openAlert = true; unFollower = user.accountName;}">
                已关注
              </mu-button>
            </mu-list-item-action>
          </mu-list-item>
          <mu-divider></mu-divider>
        </div>
      </mu-list>
      <mu-dialog title="取消关注" width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openAlert">
        确定不再关注 {{unFollower}} 吗?
        <mu-button slot="actions" flat color="primary" @click="openAlert = false">放弃</mu-button>
        <mu-button slot="actions" flat color="primary" @click="unFollow(unFollower)">取消关注</mu-button>
      </mu-dialog>
    </div>
  </div>
</template>

<script>
import { getFollowQuestionGet, getFollowUsersGet, unFollowUserGet, getFollowTopicGet } from '../api/api.js'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      active: 0,
      selects: [],
      openAlert: false,
      followQuestions: [],
      followUsers: [],
      followTopics: [],
      unFollower: ''
    }
  },
  methods: {
    routerBack () {
      this.$router.go(-1)
    },
    toDetail (id) {
      this.$router.push({ name: 'Detail', query: { questionId: id } })
    },
    unFollow (userId) {
      let param = {
        follower: this.userInfo.user_datas[0].account,
        userId
      }
      unFollowUserGet(param).then(res => {
        if (res) {
          this.getFollowUsers()
          this.openAlert = false
          this.$toast.success('取消关注成功')
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
      }).catch(err => {
        console.log(err)
      })
    },
    toTopicDetail (topicName) {
      this.$router.push({ name: 'TopicDetail', query: { topicName } })
    }
  },
  created () {
    getFollowQuestionGet({
      follower: this.userInfo.user_datas[0].account
    }).then(res => {
      this.followQuestions = res.data
    }).catch(err => {
      console.log(err)
    })
    getFollowTopicGet({
      follower: this.userInfo.user_datas[0].account
    }).then(res => {
      this.followTopics = res.data.topics
    }).catch(err => {
      console.log(err)
    })
    this.getFollowUsers()
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style scoped>
.tabs{
  box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14);
}
.mu-raised-button{
  min-width: 56px;
  background-color: #e6e6e6;
  color: rgba(0,0,0,.3);
  box-shadow: none;
}
</style>
