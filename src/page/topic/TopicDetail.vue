<template>
  <div>
    <mu-dialog title="此话题已禁用" width="360" :open.sync="openHanded" :overlay-close="false">
      此话题已禁用！
      <mu-button slot="actions" flat color="primary" @click="routerBack">返回</mu-button>
    </mu-dialog>
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click="routerBack">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
      话题详情
    </mu-appbar>
    <mu-paper>
      <mu-flex class="flex-wrapper" justify-content="center" align-items="center" style=" padding: 16px; border-bottom: 1px solid #dcdcdc;">
        <mu-flex class="flex-demo" justify-content="start">
          <div style="width: 80px;">
            <img style="width: 100%; border-radius: 10%" :src="topicDetail.topicAvatar" alt="">
          </div>
        </mu-flex>
        <mu-flex class="flex-demo" fill>
          <mu-flex class="flex-wrapper" direction="column" justify-content="start" style="padding: 0 10px;">
            <h3 style="margin: 0">{{this.$route.query.topicName}}</h3>
            <div class="topic-describe">{{topicDetail.topicDescribe | contentFilter}}</div>
            <span>{{topicDetail.followCount}} 人关注</span>
          </mu-flex>
        </mu-flex>
        <mu-flex class="flex-demo" justify-content="end">
          <mu-button color="primary" small v-if="!isFollowed" @click="followTopic(topicDetail.topicName)">关注</mu-button>
          <mu-button color="gray" small v-else  @click="unFollowTopic(topicDetail.topicName)">已关注</mu-button>
        </mu-flex>
      </mu-flex>
    </mu-paper>
    <mu-paper :z-depth="1" class="topic-info-card">
      <h4>话题简介</h4>
      <div v-html="topicDetail.topicDescribe">
      </div>
    </mu-paper>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getTopicDetailGet, getFollowTopicGet, followTopicGet, unFollowTopicGet } from '../../api/api.js'
import contentFilter from '../../util/contentFilter.js'
export default {
  data () {
    return {
      topicDetail: {},
      followTopics: [],
      isFollowed: false,
      openHanded: false
    }
  },
  methods: {
    routerBack () {
      this.$router.go(-1)
    },
    getTopicDetail () {
      getTopicDetailGet({
        topicName: this.$route.query.topicName
      }).then(res => {
        console.log(res)
        this.topicDetail = res.data
        if (this.topicDetail.topicHandled) {
          this.openHanded = true
          return ''
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getFollowTopic () {
      getFollowTopicGet({
        follower: this.userInfo.user_datas[0].account
      }).then(res => {
        this.followTopics = res.data.topics
        this.isFollowed = this.followTopics.includes(this.$route.query.topicName)
      }).catch(err => {
        console.log(err)
      })
    },
    followTopic (topic) {
      followTopicGet({
        follower: this.userInfo.user_datas[0].account,
        topic
      }).then(res => {
        console.log(res)
        this.getFollowTopic()
      }).catch(err => {
        console.log(err)
      })
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
    }
  },
  created () {
    this.getTopicDetail()
    this.getFollowTopic()
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
.mu-raised-button{
  min-width: 60px;
}
.topic-describe{
  white-space: normal;
  word-break: break-all;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.topic-info-card{
  padding: 16px;
  margin-top: 8px;
}
.topic-info-card h4{
  margin: 0;
}
.topic-info-card div{
  margin-top: 16px;
}
</style>
