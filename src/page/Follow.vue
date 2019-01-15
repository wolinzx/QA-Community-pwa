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
        <mu-list-item avatar :ripple="false" button>
          <mu-list-item-content>
            <mu-list-item-title>前端工程师讨厌写CSS是什么心态？</mu-list-item-title>
            <mu-list-item-sub-title>117 个回答 · 512 人关注</mu-list-item-sub-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item avatar :ripple="false" button>
          <mu-list-item-content>
            <mu-list-item-title>销售的最高境界是什么？</mu-list-item-title>
            <mu-list-item-sub-title>117 个回答 · 512 人关注</mu-list-item-sub-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item avatar :ripple="false" button>
          <mu-list-item-content>
            <mu-list-item-title>一个优秀的前端工程师简历应该是怎样的？</mu-list-item-title>
            <mu-list-item-sub-title>117 个回答 · 512 人关注</mu-list-item-sub-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item avatar :ripple="false" button>
          <mu-list-item-content>
            <mu-list-item-title>人在迷茫时该干什么？</mu-list-item-title>
            <mu-list-item-sub-title>117 个回答 · 512 人关注</mu-list-item-sub-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item avatar :ripple="false" button>
          <mu-list-item-content>
            <mu-list-item-title>如何设计一张高品位高水准海报？</mu-list-item-title>
            <mu-list-item-sub-title>117 个回答 · 512 人关注</mu-list-item-sub-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>
      </mu-list>
    </div>
    <div class="demo-text" v-if="active === 1">
      <mu-list textline="three-line">
        <mu-list-item avatar :ripple="false" button>
          <mu-list-item-action>
            <mu-avatar>
              <img src="../assets/image/avatar.jpeg">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>生活方式</mu-list-item-title>
            <mu-list-item-sub-title>
              生活方式不是「生活」。> 社会学中，生活型态（或生活风格、生活方式）是一个人（或团体）生活的方式。
            </mu-list-item-sub-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item avatar :ripple="false" button>
          <mu-list-item-action>
            <mu-avatar>
              <img src="../assets/image/avatar.jpeg">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>极简主义</mu-list-item-title>
            <mu-list-item-sub-title>
              极简主义(Minimalism)，并不是现今所称的简约主义，是第二次世界大战之后60年代所兴起的一个艺术派系，又可称为“Minimal Art”，作为对抽象表现主义的反动而走向极至，以最原初的物自身或形式展示于观者面前为表现方式，意图消弥作者借着作品对观者意识的压迫性，极少化作品作为文本或符号形式出现时的暴力感，开放作品自身在艺术概念上的意像空间，让观者自主参与对作品的建构，最终成为作品在不特定限制下的作者。
            </mu-list-item-sub-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item avatar :ripple="false" button>
          <mu-list-item-action>
            <mu-avatar>
              <img src="../assets/image/avatar.jpeg">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>因特网</mu-list-item-title>
            <mu-list-item-sub-title>
              互联网是由一些使用公用语言互相通信的计算机连接而成的网络，即广域网、局域网及单机按照一定的通讯协议组成的国际计算机网络。互联网（internetwork，简称internet），始于1969年（己酉年）的美国，又称因特网，是全球性的网络，是一种公用信息的载体，这种大众传媒比以往的任何一种通讯媒体都要快。
            </mu-list-item-sub-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>
      </mu-list>
    </div>
    <div class="demo-text" v-if="active === 2">
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
              已关注
            </mu-button>
          </mu-list-item-action>
        </mu-list-item>
        <mu-divider></mu-divider>
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
              已关注
            </mu-button>
          </mu-list-item-action>
        </mu-list-item>
        <mu-divider></mu-divider>
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
              已关注
            </mu-button>
          </mu-list-item-action>
        </mu-list-item>
        <mu-divider></mu-divider>
      </mu-list>
      <mu-dialog title="取消关注" width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openAlert">
        确定不再关注 奔跑的兔子 吗?
        <mu-button slot="actions" flat color="primary" @click="openAlert = false">放弃</mu-button>
        <mu-button slot="actions" flat color="primary" @click="openAlert = false">取消关注</mu-button>
      </mu-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0,
      selects: [],
      openAlert: false
    }
  },
  methods: {
    routerBack () {
      this.$router.go(-1)
    }
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
