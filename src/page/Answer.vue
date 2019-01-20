<template>
  <div class="answer">
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click="routerBack">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
        回答
      <mu-menu slot="right" cover placement="bottom-end">
        <mu-button icon>
          <mu-icon value="more_vert"></mu-icon>
        </mu-button>
        <mu-list slot="content">
          <mu-list-item button>
            <mu-list-item-content>
              <mu-list-item-title>没有帮助</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-content>
              <mu-list-item-title>举报回答</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-content>
              <mu-list-item-title>夜间模式</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </mu-menu>
    </mu-appbar>
    <mu-paper class="answer-title" :z-depth="1">
      <h3>{{this.$route.params.questionTitle}}</h3>
    </mu-paper>
    <mu-paper class="answer-content" :z-depth="1">
      <mu-list textline="two-line">
        <mu-list-item avatar :ripple="false" button>
          <mu-list-item-action>
            <mu-avatar>
              <img src="../assets/image/avatar.jpeg">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>{{answers[swiperIndex].answerer}}</mu-list-item-title>
            <mu-list-item-sub-title>
              深藏不露是一种卓越的才能
            </mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-button color="primary" small @click="setFollow" v-if="!isFollow">
              <mu-icon value="add"></mu-icon>关注
            </mu-button>
            <mu-button color="#e6e6e6" textColor="rgba(0,0,0,.3)" small @click="unFollow" v-else>
              <mu-icon value="check"></mu-icon>已关注
            </mu-button>
          </mu-list-item-action>
        </mu-list-item>
        <mu-divider></mu-divider>
      </mu-list>
      <swiper class="answer-swiper" :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="(answer,i) of answers" :key="i" v-html="answers[i].contentData">
        </swiper-slide>
      </swiper>
    </mu-paper>
    <mu-paper class="answer-foot">
      <div>
        <mu-button flat @click="endorse(1)" v-if="!isEndorse">
          <mu-icon left value="thumb_up" color="rgba(0,0,0,.54)"></mu-icon>
          赞同 {{this.answers[this.swiperIndex].endorseCount}}
        </mu-button>
        <mu-button flat @click="endorse(0)" v-else>
          <mu-icon left value="thumb_up" color="primary"></mu-icon>
          已赞同 {{this.answers[this.swiperIndex].endorseCount}}
        </mu-button>
        <mu-button icon @click="endorse(2)" v-if="!isNoEndorse">
          <mu-icon value="thumb_down" color="rgba(0,0,0,.54)"></mu-icon>
        </mu-button>
        <mu-button icon @click="endorse(3)" v-else>
          <mu-icon value="thumb_down" color="primary"></mu-icon>
        </mu-button>
      </div>
      <div>
        <mu-button icon>
          <mu-icon value="favorite" color="rgba(0,0,0,.54)"></mu-icon>
        </mu-button>
        <mu-button icon>
          <mu-icon value="grade" color="rgba(0,0,0,.54)"></mu-icon>
        </mu-button>
        <mu-button icon>
          <mu-icon value="chat_bubble" color="rgba(0,0,0,.54)"></mu-icon>
        </mu-button>
      </div>
    </mu-paper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { setEndorseGet, getAnswerListGet, getFollowUserGet, setFollowUserGet, unFollowUserGet, getEndorseAnswerGet } from '../api/api.js'
import { mapState } from 'vuex'

export default {
  components: {
    swiper,
    swiperSlide
  },
  data () {
    let that = this
    return {
      swiperOption: {
        initialSlide: this.$route.params.tapAnswer,
        autoHeight: true,
        on: {
          slideChangeTransitionStart: function () {
            // this.imgIndex = this.realIndex + 1
            that.swiperIndex = this.realIndex
            that.getEndorseAnswer()
          }
        }
      },
      answers: [],
      swiperIndex: this.$route.params.tapAnswer,
      allEndorse: 0,
      isEndorse: false,
      isNoEndorse: false,
      isFollow: false
    }
  },
  // computed: {
  //   swiper () {
  //     return this.$refs.mySwiper.swiper
  //   }
  // },
  created () {
    this.answers = this.$route.params.answers
    console.log(this.answers)
    console.log(this.$route.params.tapAnswer)
    this.getAllEndorse()
    this.getFollow()
    // console.log('this is current swiper instance object', this.swiper)
    // this.swiper.slideTo(3, 1000, false)
  },
  methods: {
    routerBack () {
      this.$router.go(-1)
    },
    getAllEndorse () {
      console.log(this.$route.params.questionId)
      getAnswerListGet({
        questionId: this.$route.params.questionId
      }).then(res => {
        this.answers = res.data.concat()
      }).catch(err => {
        console.log(err)
      })
      this.getEndorseAnswer()
    },
    getEndorseAnswer () {
      getEndorseAnswerGet({
        endorser: this.userInfo.user_datas[0].account,
        endorseAnswerId: this.answers[this.swiperIndex]._id
      }).then(res => {
        if (res.data) {
          this.isEndorse = false
          this.isNoEndorse = false
          if (res.data.endorseAnswerId.includes(this.answers[this.swiperIndex]._id)) {
            this.isEndorse = true
          } else if (res.data.unendorseAnswerId.includes(this.answers[this.swiperIndex]._id)) {
            this.isNoEndorse = true
          }
        }
      })
    },
    endorse (status) {
      let params = {
        answerId: this.answers[this.swiperIndex]._id,
        endorser: this.userInfo.user_datas[0].account,
        status
      }
      setEndorseGet(params).then(res => {
        console.log(res)
        this.getAllEndorse()
      }).catch(err => {
        console.log(err)
      })
    },
    getFollow () {
      getFollowUserGet({
        follower: this.userInfo.user_datas[0].account,
        questionId: this.$route.params.questionId
      }).then(res => {
        console.log(res)
        let questionIdArr = res.data.doc.userId
        this.isFollow = questionIdArr.includes(this.answers[this.swiperIndex].answerer)
        this.followCount = res.data.followCount
      }).catch(err => {
        console.log(err)
      })
    },
    setFollow () {
      let param = {
        follower: this.userInfo.user_datas[0].account,
        userId: this.answers[this.swiperIndex].answerer
      }
      setFollowUserGet(param).then(res => {
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
        userId: this.answers[this.swiperIndex].answerer
      }
      unFollowUserGet(param).then(res => {
        if (res) {
          this.getFollow()
          this.$toast.success('取消关注成功')
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style scoped>
.answer-swiper div{
  /* height: 300px; */
  padding: 16px;
}
.answer-title{
  padding: 16px;
}
.answer-title h3{
  margin: 0;
  font-size: 20px;
}
.answer-content{
  margin-top: 10px;
}
.answer-foot{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
