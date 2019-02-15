<template>
  <div class="history">
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click="routerBack">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
        浏览历史
      <mu-menu slot="right" cover placement="bottom-end">
        <mu-button icon @click="openAlert = true">
          <mu-icon value="delete"></mu-icon>
        </mu-button>
      </mu-menu>
    </mu-appbar>
    <mu-list textline="two-line">
      <mu-sub-header inset>最近浏览</mu-sub-header>
      <mu-list-item avatar button v-for="(history, i) of historyList" :key="i" @click="toDetail(history.questionId)">
        <mu-list-item-action>
          <mu-avatar color="primary">
            <mu-icon value="subject"></mu-icon>
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-list-item-title>{{history.questionTitle}}</mu-list-item-title>
          <mu-list-item-sub-title>{{ history.hDate | timeFormat}}</mu-list-item-sub-title>
        </mu-list-item-content>
        <mu-list-item-action>
          <mu-button icon @click.stop="deleteHistory(history.questionId)">
            <mu-icon value="cancel"></mu-icon>
          </mu-button>
        </mu-list-item-action>
      </mu-list-item>
    </mu-list>
    <mu-dialog title="删除所有历史记录？" width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openAlert">
      <mu-button slot="actions" flat color="primary" @click="openAlert = false">否</mu-button>
      <mu-button slot="actions" flat color="primary" @click="deleteAllHistory">是</mu-button>
    </mu-dialog>
    <mu-flex class="flex-wrapper" justify-content="center" direction="column" align-items="center" style="width:100%; height: 20rem;" v-if="historyList.length === 0">
      <mu-flex class="flex-wrapper" justify-content="center" direction="column" align-items="center">
        <mu-icon value="storage" size="150" color="#ececec"></mu-icon>
        <span style="color: #b0b0b0">还没有内容</span>
      </mu-flex>
    </mu-flex>
    <span class="nomore" v-else>无更多内容</span>
  </div>
</template>

<script>
import * as localStorage from '../util/localStorage'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      historyList: [],
      allHistoryList: {},
      openAlert: false
    }
  },
  methods: {
    routerBack () {
      this.$router.go(-1)
    },
    deleteHistory (id) {
      let user = this.userInfo.user_datas[0].account
      let result = this.allHistoryList[user].filter(item => item.questionId !== id)
      this.allHistoryList[user] = result
      localStorage.userHistory.set(this.allHistoryList)
      this.getHistoryList()
    },
    getHistoryList () {
      let user = this.userInfo.user_datas[0].account
      if (localStorage.userHistory.get()[user]) {
        this.allHistoryList = localStorage.userHistory.get()
        this.historyList = localStorage.userHistory.get()[user].concat()
        this.historyList.sort((a, b) => {
          return b.hDate - a.hDate
        })
      }
    },
    deleteAllHistory () {
      let user = this.userInfo.user_datas[0].account
      this.allHistoryList[user] = []
      localStorage.userHistory.set(this.allHistoryList)
      this.getHistoryList()
      this.openAlert = false
    },
    toDetail (id) {
      this.$router.push({ name: 'Detail', query: { questionId: id } })
    }
  },
  mounted () {
    this.getHistoryList()
  },
  computed: {
    ...mapState(['userInfo'])
  },
  filters: {
    timeFormat (time) {
      let enMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Dec']
      let hDate = new Date(time)
      return `${enMonth[hDate.getMonth()]} ${hDate.getDate()}, ${hDate.getFullYear()}`
    }
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
</style>
