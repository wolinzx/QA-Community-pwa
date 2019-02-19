<template>
  <div class="answer">
    <mu-dialog title="此提问已被封禁" width="360" :open.sync="openHanded" :overlay-close="false">
      此提问存在违规内容，已被封禁！
      <mu-button slot="actions" flat color="primary" @click="routerBack">返回</mu-button>
    </mu-dialog>
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click="routerBack">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
        回答
      <mu-menu slot="right" cover placement="bottom-end" :open.sync="openTheme">
        <mu-button icon>
          <mu-icon value="more_vert"></mu-icon>
        </mu-button>
        <mu-list slot="content">
          <mu-list-item button @click="toReport">
            <mu-list-item-content>
              <mu-list-item-title>举报回答</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item button @click="themeSwitch('dark')" v-if="this.themeMode === 'light'">
            <mu-list-item-content>
              <mu-list-item-title>夜间模式</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item button @click="themeSwitch('light')" v-if="this.themeMode === 'dark'">
            <mu-list-item-content>
              <mu-list-item-title>日间模式</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </mu-menu>
    </mu-appbar>
    <mu-paper class="answer-title" :z-depth="1">
      <h3>{{this.$route.query.questionTitle}}</h3>
      <mu-flex class="flex-wrapper" justify-content="end">
        <mu-flex class="flex-demo" justify-content="center" >
          <mu-button class="see-all-answers" flat color="primary" @click="toAllAnswers">
            查看全部{{this.$route.query.answersCount}}个回答
            <mu-icon right value="keyboard_arrow_right"></mu-icon>
          </mu-button>
        </mu-flex>
      </mu-flex>
    </mu-paper>
    <mu-paper class="answer-content" :z-depth="1">
      <mu-list textline="two-line" @click="toProfile(answers[swiperIndex].answerer)">
        <mu-list-item avatar :ripple="false" button>
          <mu-list-item-action>
            <mu-avatar>
              <img :src="answers[swiperIndex].avatar || default_avatar">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>{{answers[swiperIndex].answerer}}</mu-list-item-title>
            <mu-list-item-sub-title>
              {{answers[swiperIndex].userDescribe}}
            </mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-button color="#e6e6e6" textColor="rgba(0,0,0,.3)" small v-if="userInfo.user_datas[0].account == answers[swiperIndex].answerer">
              <mu-icon value="perm_identity"></mu-icon>&nbsp;&nbsp;我
            </mu-button>
            <mu-button color="primary" small @click.stop="setFollow" v-else-if="!isFollow">
              <mu-icon value="add"></mu-icon>关注
            </mu-button>
            <mu-button color="#e6e6e6" textColor="rgba(0,0,0,.3)" small @click.stop="unFollow" v-else>
              <mu-icon value="check"></mu-icon>已关注
            </mu-button>
          </mu-list-item-action>
        </mu-list-item>
        <mu-divider></mu-divider>
      </mu-list>
      <swiper class="answer-swiper" :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(answer,i) of answers" :key="i" v-html=" !answer.handled ? answers[i].contentData : '内容涉嫌违规已被封禁！'">
        </swiper-slide>
      </swiper>
    </mu-paper>
    <br>
    <br>
    <br>
    <br>
    <mu-paper class="answer-foot">
      <div>
        <mu-button flat @click="endorse(1)" v-if="!isEndorse">
          <mu-icon class="endorse-ico" left value="arrow_drop_up" color="rgba(0,0,0,.54)"></mu-icon>
          赞同 {{allEndorse}}
        </mu-button>
        <mu-button flat @click="endorse(0)" v-else>
          <mu-icon class="endorse-ico" left value="arrow_drop_up" color="primary"></mu-icon>
          已赞同 {{allEndorse}}
        </mu-button>
        <mu-button icon @click="endorse(2)" v-if="!isNoEndorse">
          <mu-icon class="endorse-ico" value="arrow_drop_down" color="rgba(0,0,0,.54)"></mu-icon>
        </mu-button>
        <mu-button icon @click="endorse(3)" v-else>
          <mu-icon class="endorse-ico" value="arrow_drop_down" color="primary"></mu-icon>
        </mu-button>
      </div>
      <div>
        <mu-button icon @click="openBotttomSheet" v-if="!isCollected">
          <mu-icon value="grade" color="rgba(0,0,0,.54)"></mu-icon>
        </mu-button>
        <mu-button icon @click="openBotttomSheet" v-else>
          <mu-icon value="grade" color="primary"></mu-icon>
        </mu-button>
        <!-- <mu-button icon>
          <mu-icon value="chat_bubble" color="rgba(0,0,0,.54)"></mu-icon>
        </mu-button> -->
      </div>
    </mu-paper>
    <mu-container>
      <mu-bottom-sheet :open.sync="openCollection">
        <mu-list>
          <mu-sub-header>选择收藏夹</mu-sub-header>
          <div class="select-control-group" >
            <mu-list-item button @click="openFullscreenDialog">
              <mu-list-item-action>
                <mu-icon value="add"></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>新建收藏夹</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button v-for="(list, i) of collectionList" :key="i">
              <mu-radio :label-left="true" :value="list.collectionTitle" v-model="radio.value1" :label="list.collectionTitle"></mu-radio>
            </mu-list-item>
            <div class="collection-save">
              <mu-button color="primary" full-width @click="commitCollection" :disabled="!radio.value1">完成</mu-button>
            </div>
          </div>
        </mu-list>
      </mu-bottom-sheet>
    </mu-container>
    <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openCreateCollection">
      <mu-appbar color="primary" title="新建收藏夹">
        <mu-button slot="left" icon @click="openCreateCollection = false">
          <mu-icon value="close"></mu-icon>
        </mu-button>
        <mu-button slot="right" flat  @click="commitAddColList" :disabled="!collectionTitle">
          完成
        </mu-button>
      </mu-appbar>
      <div style="padding: 24px;">
        <mu-text-field v-model="collectionTitle" placeholder="请输入标题" full-width></mu-text-field><br/>
      </div>
    </mu-dialog>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {
  setEndorseGet,
  getFollowUserGet,
  setFollowUserGet,
  unFollowUserGet,
  getEndorseAnswerGet,
  addCollectionGet,
  addCollectionListGet,
  getCollectionListGet,
  getAnswerListGet,
  getUsersProfileGet,
  getReprotedGet
} from '../api/api.js'
import { mapState, mapMutations } from 'vuex'
import { globalBus } from '@/util/globalBus'

export default {
  components: {
    swiper,
    swiperSlide
  },
  data () {
    let that = this
    return {
      openHanded: false,
      swiperOption: {
        initialSlide: 0,
        autoHeight: true,
        on: {
          slideChangeTransitionStart: function () {
            this.imgIndex = this.realIndex + 1
            that.swiperIndex = this.realIndex
            that.getEndorseAnswer()
            that.isFollow = that.questionIdArr.includes(that.answers[this.realIndex].answerer)
            for (const i of that.collectionList) {
              that.isCollected = i.collectionContent.includes(that.answers[this.realIndex]._id)
            }
          }
        }
      },
      answers: [{
        answerer: null
      }],
      swiperIndex: 0,
      allEndorse: 0,
      isEndorse: false,
      isNoEndorse: false,
      isFollow: false,
      questionIdArr: [],
      openCollection: false,
      radio: {
        value1: '',
        value2: false,
        value3: false
      },
      openCreateCollection: false,
      collectionTitle: '',
      collectionList: [],
      isCollected: false,
      default_avatar: '/static/img/default_avatar.jpeg',
      accounts: [],
      themeMode: 'light',
      openTheme: false
    }
  },
  created () {
    if (this.$route.query.handled) {
      this.openHanded = true
    }
    this.getAnswerList(this.$route.query.sortWay)
    this.themeMode = localStorage.getItem('theme')
    if (this.themeMode !== 'dark') {
      this.themeMode = 'light'
    }
    // this.answers = this.$route.params.answers
    // console.log(this.answers)
    // console.log(this.$route.params.tapAnswer)
    // this.getEndorseAnswer()
    // this.getFollow()
    // this.getCollectionList()
  },
  methods: {
    ...mapMutations(['SET_THEME']),
    routerBack () {
      this.$router.go(-1)
    },
    toAllAnswers () {
      this.$router.push({ name: 'Detail', query: { questionId: this.$route.query.questionId } })
    },
    toReport () {
      if (this.userInfo.isLogined) {
        getReprotedGet({
          reporter: this.userInfo.user_datas[0].account,
          reportAId: this.answers[this.swiperIndex]._id
        }).then(res => {
          console.log(res.data)
          if (!res.data.length) {
            this.$router.push({ name: 'Report', query: { answerId: this.answers[this.swiperIndex]._id } })
          } else {
            this.$toast.error('您已举报过该回答')
          }
        })
      } else {
        this.$toast.error('请先登录')
        globalBus.$emit('openLogin')
      }
      this.openTheme = false
    },
    getEndorseAnswer () {
      getEndorseAnswerGet({
        endorser: this.userInfo.user_datas[0].account,
        answerId: this.answers[this.swiperIndex]._id
      }).then(res => {
        if (res.data) {
          this.isEndorse = false
          this.isNoEndorse = false
          if (res.data.endorseAnswerId.includes(this.answers[this.swiperIndex]._id)) {
            this.isEndorse = true
          } else if (res.data.unendorseAnswerId.includes(this.answers[this.swiperIndex]._id)) {
            this.isNoEndorse = true
          }
          this.allEndorse = res.data.endorseCount
        }
      })
    },
    endorse (status) {
      if (this.userInfo.isLogined) {
        let params = {
          answerId: this.answers[this.swiperIndex]._id,
          endorser: this.userInfo.user_datas[0].account,
          status
        }
        setEndorseGet(params).then(res => {
          console.log(res)
          this.getEndorseAnswer()
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.$toast.error('请先登录')
        globalBus.$emit('openLogin')
      }
    },
    getFollow () {
      getFollowUserGet({
        follower: this.userInfo.user_datas[0].account,
        questionId: this.$route.params.questionId
      }).then(res => {
        if (res.data) {
          this.questionIdArr = res.data.doc.userId
          this.isFollow = this.questionIdArr.includes(this.answers[this.swiperIndex].answerer)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    setFollow () {
      if (this.userInfo.isLogined) {
        let param = {
          follower: this.userInfo.user_datas[0].account,
          userId: this.answers[this.swiperIndex].answerer
        }
        setFollowUserGet(param).then(res => {
          if (res.data) {
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
        userId: this.answers[this.swiperIndex].answerer
      }
      unFollowUserGet(param).then(res => {
        if (res.data) {
          this.getFollow()
          this.$toast.success('取消关注成功')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    closeBottomSheet () {
      this.openCollection = false
    },
    openBotttomSheet () {
      if (this.userInfo.isLogined) {
        this.getCollectionList()
        this.openCollection = true
      } else {
        this.$toast.error('请先登录')
        globalBus.$emit('openLogin')
      }
    },
    handleCheckAll () {

    },
    openFullscreenDialog () {
      this.openCreateCollection = true
    },
    commitAddColList () {
      addCollectionListGet({
        collecter: this.userInfo.user_datas[0].account,
        collectionTitle: this.collectionTitle
      }).then(res => {
        if (res.data === 'collected') {
          this.$toast.error('已存在的收藏夹')
        } else if (res.data) {
          this.$toast.success('添加收藏夹成功')
          this.getCollectionList()
          this.radio.value1 = this.collectionTitle
        }
      }).catch(err => {
        console.log(err)
        this.$toast.error('添加收藏夹失败')
      })
      this.openCreateCollection = false
    },
    commitCollection () {
      addCollectionGet({
        collecter: this.userInfo.user_datas[0].account,
        collectionTitle: this.radio.value1,
        answerId: this.answers[this.swiperIndex]._id
      }).then(res => {
        console.log(res)
        if (res.data === 'collected') {
          this.$toast.error('内容已存在该收藏夹')
        } else if (res.data) {
          this.$toast.success('添加到收藏夹成功')
          this.getCollectionList()
          this.openCollection = false
        }
      }).catch(err => {
        console.log(err)
        this.$toast.error('添加到收藏失败')
      })
    },
    getCollectionList () {
      getCollectionListGet({
        collecter: this.userInfo.user_datas[0].account
      }).then(res => {
        if (res.data) {
          this.collectionList = res.data.collections
          // this.isCollected = res.data.collectionContent.includes(this.answers[this.swiperIndex]._id)
          for (const i of this.collectionList) {
            this.isCollected = i.collectionContent.includes(this.answers[this.swiperIndex]._id)
          }
        }
      }).catch(err => {
        console.log(err)
      })
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
              i['userDescribe'] = j.userDescribe
            }
          }
        }
        this.answers = temp.concat()
        console.log(this.answers)
      }).catch(err => {
        console.log(err)
      })
    },
    toProfile (user) {
      this.$router.push({ name: 'Profile', query: { user } })
    },
    getAnswerList (sortWay) {
      // this.sortWay = sortWay || '按质量排序'
      let param = {
        questionId: this.$route.query.questionId,
        sortWay
      }
      getAnswerListGet(param).then(res => {
        console.log(res, '厉害了我的歌')
        // this.answers = res.data
        let hh = res.data.filter(item => item._id === this.$route.query.answerId)
        let xx = res.data.filter(item => item._id !== this.$route.query.answerId)
        let arr = [...hh, ...xx]
        this.answers = arr.concat()
        for (const i of this.answers) {
          this.accounts.push(i.answerer)
        }
        this.getEndorseAnswer()
        this.getFollow()
        this.getCollectionList()
        this.getUsersProfile()
        // console.log(this.answers, this.answers[this.swiperIndex], '我去')
      }).catch(err => {
        console.log(err)
      })
    },
    themeSwitch (theme) {
      this.$mu_theme.use(theme)
      this.themeMode = theme
      localStorage.setItem('theme', theme)
      this.SET_THEME(theme)
      this.openTheme = false
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
  z-index: 999;
  border-top: 1px solid #dedede;
}
.answer-swiper div >>> .answer-info{
  font-size: 12px;
  color: #c8c8c8;
}
.see-all-answers>>>.mu-button-wrapper{
  padding: 0;
}
.select-control-group .mu-radio{
  width: 100%;
  padding: 0 5px;
}
.collection-save{
  padding: 16px 21px;
}
.answer-swiper>>>img{
  max-width: 100% !important;
}
.endorse-ico{
  font-size: 38px;
  margin-right: 0;
}
</style>
