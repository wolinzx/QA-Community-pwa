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
      <mu-card-title title="如何看待“舔狗”一词忽然火了？"></mu-card-title>
      <mu-card-text :class="{'detail-content': showMore}" @click="showMore = true">
        最近几月，多年来早已出现的一种现象——舔狗，忽然爆红网络。

        各种段子、感悟、表情包，夹杂着戏谑、自嘲又或是辛酸，出现在各个角落。

        基本涉及了爱情，友情，又或是其他关系。

        题主作为曾经当过“舔狗”，也被人“舔过”的人，忽然对全网忽然纷纷开始谈论“舔狗”的现象感兴趣，不知道这是否意味着什么呢？

        你怎么看呢？
      </mu-card-text>
      <mu-card-actions class="detail-action">
        <span>1,418 人关注  28 条评论</span>
        <mu-button color="primary">
          <mu-icon left value="add"></mu-icon>
          关注问题
        </mu-button>
      </mu-card-actions>
    </mu-card>
    <mu-list>
      <mu-sub-header class="detail-answer-bar">
        <span>349 个回答</span>
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
    <mu-card style="width: 100%; margin: 0 auto 10px;">
      <mu-card-header title="Myron Avatar">
        <mu-avatar slot="avatar" :size="20">
          <img src="../assets/image/avatar.jpeg">
        </mu-avatar>
      </mu-card-header>
      <mu-card-text @click="toAnswer">
        散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
        调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
        似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
        找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
      </mu-card-text>
      <mu-card-actions>
        <span>331 赞同 · 40 评论 · 12 小时前</span>
      </mu-card-actions>
    </mu-card>
    <mu-card style="width: 100%; margin: 0 auto 10px;">
      <mu-card-header title="Myron Avatar">
        <mu-avatar slot="avatar" :size="20">
          <img src="../assets/image/avatar.jpeg">
        </mu-avatar>
      </mu-card-header>
      <mu-card-text>
        散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
        调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
        似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
        找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
      </mu-card-text>
      <mu-card-actions>
        <span>331 赞同 · 40 评论 · 12 小时前</span>
      </mu-card-actions>
    </mu-card>
    <mu-card style="width: 100%; margin: 0 auto 10px;">
      <mu-card-header title="Myron Avatar">
        <mu-avatar slot="avatar" :size="20">
          <img src="../assets/image/avatar.jpeg">
        </mu-avatar>
      </mu-card-header>
      <mu-card-text>
        散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
        调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
        似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
        找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
      </mu-card-text>
      <mu-card-actions>
        <span>331 赞同 · 40 评论 · 12 小时前</span>
      </mu-card-actions>
    </mu-card>
    <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openAnswer">
      <mu-appbar color="primary" title="如何看待“舔狗”一词忽然火了？">
        <mu-button slot="left" icon @click="openAnswer = false">
          <mu-icon value="close"></mu-icon>
        </mu-button>
        <mu-button slot="right" flat  @click="openAnswer = false">
          <mu-icon value="send"></mu-icon>
        </mu-button>
      </mu-appbar>
      <div style="padding: 24px;">
        <mu-text-field multi-line :rows="10" placeholder="写回答..." full-width></mu-text-field><br/>
      </div>
    </mu-dialog>
    <div class="answer-action">
      <mu-button fab color="premary" @click="openAnswer = true">
        <mu-icon value="create"></mu-icon>
      </mu-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sortWay: '按质量排序',
      openAnswer: false,
      showMore: false
    }
  },
  methods: {
    routerBack () {
      this.$router.go(-1)
    },
    toAnswer () {
      this.$router.push({ name: 'Answer' })
    }
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
</style>
