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
      <h3>如何看待“舔狗”一词忽然火了？</h3>
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
            <mu-list-item-title>奔跑的兔子</mu-list-item-title>
            <mu-list-item-sub-title>
              深藏不露是一种卓越的才能
            </mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-button color="primary" small @click="openAlert = true">
              <mu-icon value="add"></mu-icon>关注
            </mu-button>
          </mu-list-item-action>
        </mu-list-item>
        <mu-divider></mu-divider>
      </mu-list>
      <swiper class="answer-swiper" :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide>
          从二连回到北京了，现在在单位无聊的验证算法准确率来聊一下，消费主义与部分女性合作的基础以及社会背景。首先，按照进化心理学的理论，女性对于男性的物质条件（财富积累）以及长期来看获取物质条件的能力（赚钱能力）是非常看重的，尤其是长期择偶偏好下的首位需求，而短期择偶偏好又有所不同。在这个背景下，尤其是在资本主义发展以前，不同文化背景下，对于男性的物质条件和获取物质条件的能力的偏好不同，能有稳定的生产水平的社会环境（例如农耕文明，对于物质条件积累更为看重）而生产水平不稳定，需要打秋风或者海盗劫掠的社会环境，对于能够稳定的获取物质财富（武力和破坏力的偏好）能力的偏好。
        </swiper-slide>
        <swiper-slide>回答 2</swiper-slide>
        <swiper-slide>回答 3</swiper-slide>
        <swiper-slide>回答 4</swiper-slide>
        <swiper-slide>回答 5</swiper-slide>
        <swiper-slide>回答 6</swiper-slide>
        <swiper-slide>回答 7</swiper-slide>
        <!-- Optional controls -->
        <!-- <div class="swiper-pagination"  slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
        <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
      </swiper>
    </mu-paper>
    <mu-paper class="answer-foot">
      <div>
        <mu-button flat>
          <mu-icon left value="thumb_up" color="rgba(0,0,0,.54)"></mu-icon>
          赞同 858
        </mu-button>
        <mu-button icon>
          <mu-icon value="thumb_down" color="rgba(0,0,0,.54)"></mu-icon>
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
export default {
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  // mounted () {
  //   // current swiper instance
  //   // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
  //   console.log('this is current swiper instance object', this.swiper)
  //   this.swiper.slideTo(3, 1000, false)
  // },
  methods: {
    routerBack () {
      this.$router.go(-1)
    }
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
