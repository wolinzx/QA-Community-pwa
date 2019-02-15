<template>
  <div>
    <mu-list textline="three-line">
      <mu-sub-header>已关注话题</mu-sub-header>
      <div class="chip-container">
        <mu-chip :color="initChips[Math.floor(Math.random()*7)]" v-for="(topic, i) of followTopics" :key="i"  @click="toTopicDetail(topic)">
          {{topic}}
        </mu-chip>
        <span class="nomore" v-if="!userInfo.isLogined">登陆更精彩</span>
        <span class="nomore" v-else-if="followTopics === undefined || followTopics.length === 0">去关注话题吧</span>
      </div>
    </mu-list>
    <mu-list textline="three-line">
      <mu-sub-header>话题广场</mu-sub-header>
      <div v-for="(topic,i) of topicList" :key="i" @click="toTopicDetail(topic.topicName)">
        <mu-list-item avatar button>
          <mu-list-item-action>
            <mu-avatar>
              <img src="../../assets/image/avatar.jpeg">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>{{topic.topicName}}</mu-list-item-title>
            <mu-list-item-sub-title>
              {{topic.topicDescribe}}
            </mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action @click.stop="followTopic(topic.topicName, i)" v-if="!topic.followed">
            <!-- <mu-button color="primary" small @click="()=>{openAlert = true; unFollower = user.accountName;}"> -->
            <mu-button color="primary" small>
              关注
            </mu-button>
          </mu-list-item-action>
          <mu-list-item-action @click.stop="()=>{}" v-else>
            <!-- <mu-button color="primary" small @click="()=>{openAlert = true; unFollower = user.accountName;}"> -->
            <mu-button color="gray" small>
              已关注
            </mu-button>
          </mu-list-item-action>
        </mu-list-item>
        <mu-divider></mu-divider>
      </div>
    </mu-list>
    <!-- <mu-dialog title="取消关注" width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openAlert">
      确定不再关注 {{unFollower}} 吗?
      <mu-button slot="actions" flat color="primary" @click="openAlert = false">放弃</mu-button>
      <mu-button slot="actions" flat color="primary" @click="unFollow(unFollower)">取消关注</mu-button>
    </mu-dialog> -->
    <span class="nomore">无更多内容</span>
    <div class="sit"></div>
  </div>
</template>

<script>
import { getTopicGet, followTopicGet, getFollowTopicGet } from '../../api/api.js'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      topicList: [],
      followTopics: [],
      initChips: ['primary', 'blue300', 'teal', 'green', '#72c052', '#a7cd3c', '#04649d']
    }
  },
  methods: {
    followTopic (topic, index) {
      followTopicGet({
        follower: this.userInfo.user_datas[0].account,
        topic
      }).then(res => {
        console.log(res)
        this.topicList[index].followed = !this.topicList[index].followed
        console.log(this.topicList)
      }).catch(err => {
        console.log(err)
      })
    },
    toTopicDetail (topicName) {
      this.$router.push({ name: 'TopicDetail', query: { topicName } })
    }
  },
  created () {
    getTopicGet().then(res => {
      console.log(res)
      for (const topic of res.data) {
        topic['followed'] = false
      }
      let list = res.data
      // this.topicList = res.data
      if (this.userInfo.isLogined) {
        getFollowTopicGet({
          follower: this.userInfo.user_datas[0].account
        }).then(res => {
          console.log(res)
          if (res.data) {
            this.topicList = list.filter((item) => {
              for (const topic of res.data.topics) {
                if (item.topicName === topic) {
                  return false
                }
              }
              return true
            })
            this.followTopics = res.data.topics
          } else {
            this.topicList = list
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.topicList = list
      }
    }).catch(err => {
      console.log(err)
    })
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style scoped>
.mu-raised-button{
  min-width: 56px;
}
.chip-container{
  padding: 0 16px;
  max-height: 108px;
}
.mu-chip{
  margin: 0 10px 10px 0;
}
/* .mu-list-three-line .mu-item-action .mu-avatar{
  margin-top: 0;
}
.mu-avatar img{
  border-radius: 10%;
} */

.nomore{
  display: block;
  text-align: center;
  margin: 20px;
  color: #aaaaaa;
}
.sit{
  width: 100%;
  height: 56px;
}
</style>
