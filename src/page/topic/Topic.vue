<template>
  <div class="demo-loadmore-wrap">
    <mu-expansion-panel style="position: relative; z-index: 999;">
      <div slot="header">已关注话题</div>
      <mu-list textline="three-line">
        <div class="chip-container">
          <mu-chip :color="initChips[i % 10]" v-for="(topic, i) of followTopics" :key="i"  @click="toTopicDetail(topic)">
            {{topic}}
          </mu-chip>
          <span class="nomore" v-if="!userInfo.isLogined">登陆更精彩</span>
          <span class="nomore" v-else-if="followTopics === undefined || followTopics.length === 0">去关注话题吧</span>
        </div>
      </mu-list>
    </mu-expansion-panel>
    <mu-list textline="three-line" class="demo-loadmore-content">
      <mu-sub-header>话题广场</mu-sub-header>
      <div>
        <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
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
          <span class="nomore" v-show="nomore">无更多内容</span>
        </mu-load-more>
      </div>
    </mu-list>
    <!-- <mu-dialog title="取消关注" width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openAlert">
      确定不再关注 {{unFollower}} 吗?
      <mu-button slot="actions" flat color="primary" @click="openAlert = false">放弃</mu-button>
      <mu-button slot="actions" flat color="primary" @click="unFollow(unFollower)">取消关注</mu-button>
    </mu-dialog> -->
    <div class="sit"></div>
  </div>
</template>

<script>
import { getTopicGet, followTopicGet, getFollowTopicGet, unFollowTopicGet } from '../../api/api.js'
import { mapState } from 'vuex'
import { globalBus } from '@/util/globalBus'
export default {
  data () {
    return {
      topicList: [],
      followTopics: [],
      initChips: ['primary', 'blue300', 'teal', 'green', '#72c052', '#a7cd3c', '#04649d', '#3f51b5', 'teal', 'teal900'],
      refreshing: false,
      loading: false,
      pageSize: 10,
      currentPage: 1,
      nomore: false
    }
  },
  methods: {
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
    toTopicDetail (topicName) {
      this.$router.push({ name: 'TopicDetail', query: { topicName } })
    },
    refresh () {
      this.refreshing = true
      setTimeout(() => {
        this.getTopic(1, true)
      }, 1000)
    },
    load () {
      if (!this.nomore) {
        this.loading = true
        this.getTopic(++this.currentPage, false)
      }
      // setTimeout(() => {
      //   this.loading = false
      //   // this.num += 10
      // }, 2000)
    },
    getTopic (currentPage, isFresh) {
      getTopicGet({
        pageSize: this.pageSize,
        currentPage
      }).then(res => {
        console.log(res)
        for (const topic of res.data.docs) {
          topic['followed'] = false
        }
        let list = res.data.docs
        if (list.length === 0) {
          this.nomore = true
        }
        if (isFresh) {
          this.topicList = []
          this.refreshing = false
          this.currentPage = 1
          this.nomore = false
        }
        this.topicList = this.topicList.concat(list)
        this.loading = false
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
            console.log(res.data)
            for (const i of this.topicList) {
              i.followed = res.data.topics.includes(i.topicName)
            }
            this.followTopics = res.data.topics
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  },
  created () {
    this.getTopic(1, true)
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
  padding: 0;
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
.demo-loadmore-wrap {
  width: 100%;
  /* max-width: 360px; */
  position: absolute;
  top: 56px;
  bottom: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
}
.demo-loadmore-content {
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
