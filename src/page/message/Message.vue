<template>
  <div id="home">
    <mu-list textline="three-line">
      <mu-sub-header>通知列表</mu-sub-header>
      <mu-list-item avatar button>
        <mu-list-item-action>
          <mu-avatar>
            <img src="../../assets/image/avatar.jpeg">
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-list-item-title>奔跑的兔子 回答了问题</mu-list-item-title>
          <mu-list-item-sub-title>
            <span style="color: rgba(0, 0, 0, .87); font-weight: bold">如何自学C++？</span>
            <div style="display: flex">
              <mu-icon size="20" value="email" color="primary"></mu-icon>&nbsp;
              <span>8天前</span>
            </div>
          </mu-list-item-sub-title>
        </mu-list-item-content>
      </mu-list-item>
      <mu-divider></mu-divider>
    </mu-list>
  </div>
</template>

<script>
import { getFollowQuestionMsgGet } from '../../api/api.js'
import { mapState } from 'vuex'
import dateDiff from '../../util/dateDiff.js'
export default {
  data () {
    return {
      msgList: []
    }
  },
  mounted () {
    // this.$socket.emit('hhh', '56456565')
    this.getFollowQuestionMsg()
  },
  methods: {
    getFollowQuestionMsg () {
      getFollowQuestionMsgGet({
        follower: this.userInfo.user_datas[0].account
      }).then(res => {
        console.log(res)
        this.msgList = res.data
        for (const msg of this.msgList) {
          for (const msgDet of msg.answersDetail) {
            let msgDetDate = msgDet.answerDate
            msgDet['computedDate'] = dateDiff(msgDetDate).diff
          }
        }
        console.log(this.msgList)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  computed: {
    ...mapState(['userInfo'])
  }
  // sockets: {
  //   connect: function () {
  //     console.log('socket connected')
  //   },
  //   res: function (val) {
  //     console.log('接收到服务端消息', val)
  //   },
  //   mmm: function (val) {
  //     console.log(1, val)
  //   }
  // }
}
</script>
