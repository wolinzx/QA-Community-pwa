<template>
  <div class="history">
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click="routerBack">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
        浏览历史
      <mu-menu slot="right" cover placement="bottom-end">
        <mu-button icon @click="deleteAllHistory">
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
  </div>
</template>

<script>
import * as localStorage from '../util/localStorage'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      historyList: [],
      allHistoryList: {}
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

</style>
