<template>
  <div class="collection" ref="globalClick">
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click="routerBack">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
        我的收藏
    </mu-appbar>
    <mu-list textline="two-line">
      <mu-sub-header inset>收藏文件夹</mu-sub-header>
      <mu-list-item avatar button v-for="(list, i) of collectionList" :key="i" @click="getQaList(list.collectionContent, list.collectionTitle, i)">
        <mu-list-item-action>
          <mu-avatar color="primary">
            <mu-icon value="folder"></mu-icon>
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-list-item-title>{{list.collectionTitle}}</mu-list-item-title>
          <mu-list-item-sub-title>{{list.collectionContent.length}}个内容</mu-list-item-sub-title>
        </mu-list-item-content>
      </mu-list-item>
    </mu-list>
    <mu-container>
      <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openFullscreen">
        <mu-appbar color="primary">
          <mu-button slot="left" icon @click="closeFullscreenDialog">
            <mu-icon value="close"></mu-icon>
          </mu-button>
          {{collectionTitle}}
          <mu-menu slot="right" cover placement="bottom-end">
            <mu-button icon>
              <mu-icon value="more_vert"></mu-icon>
            </mu-button>
            <mu-list slot="content">
              <!-- <mu-list-item button @click="openEdit = true">
                <mu-list-item-content>
                  <mu-list-item-title>编辑收藏夹</mu-list-item-title>
                </mu-list-item-content>
              </mu-list-item> -->
              <mu-list-item button @click="openAlert = true">
                <mu-list-item-content>
                  <mu-list-item-title>删除收藏夹</mu-list-item-title>
                </mu-list-item-content>
              </mu-list-item>
            </mu-list>
          </mu-menu>
          <mu-dialog title="确认删除该收藏夹？" width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openAlert">
            <mu-button slot="actions" flat color="primary" @click="openAlert = false">否</mu-button>
            <mu-button slot="actions" flat color="primary" @click="deleteCollection">是</mu-button>
          </mu-dialog>
        </mu-appbar>
        <mu-card style="width: 100%; margin: 10px auto;" v-for="(answer,i) of answerList" :key="i">
          <mu-card-header :title="answer.answerer" @click="toAnswer(answer)">
            <mu-avatar slot="avatar" :size="25">
              <img :src="answer.avatar">
            </mu-avatar>
          </mu-card-header>
          <mu-card-title :title="answer.questionId.title" @click="toAnswer(answer)"></mu-card-title>
          <mu-card-text @click="toAnswer(answer)">
            {{answer.contentData | contentFilter}}
          </mu-card-text>
          <mu-card-actions class="list-buttom">
            <span>{{answer.endorseCount}} 赞同</span>
            <mu-menu cover placement="bottom-end">
              <mu-button icon color="rgba(0,0,0,.57)">
                <mu-icon value="more_vert"></mu-icon>
              </mu-button>
              <mu-list slot="content">
                <mu-list-item button @click="deleteCollectionList(answer._id, i)">
                  <mu-list-item-title>删除</mu-list-item-title>
                </mu-list-item>
              </mu-list>
            </mu-menu>
          </mu-card-actions>
        </mu-card>
      </mu-dialog>
    </mu-container>
    <mu-flex class="flex-wrapper" justify-content="center" direction="column" align-items="center" style="width:100%; height: 20rem;" v-if="collectionList === undefined || collectionList.length === 0">
      <mu-flex class="flex-wrapper" justify-content="center" direction="column" align-items="center">
        <mu-icon value="storage" size="150" color="#ececec"></mu-icon>
        <span style="color: #b0b0b0">去收藏回答吧</span>
      </mu-flex>
    </mu-flex>
  </div>
</template>

<script>
import { getCollectionListGet, getQaListGet, deleteCollectionListGet, deleteCollectionGet, getUsersProfileGet } from '../api/api.js'
import { mapState } from 'vuex'
import contentFilter from '../util/contentFilter.js'
export default {
  data () {
    return {
      collectionList: [],
      openFullscreen: false,
      answerList: [],
      collectionTitle: '',
      collectionIndex: 0,
      openSinDelete: false,
      openAlert: false,
      accounts: []
    }
  },
  methods: {
    routerBack () {
      this.$router.go(-1)
    },
    openFullscreenDialog () {
      this.openFullscreen = true
    },
    closeFullscreenDialog () {
      this.openFullscreen = false
    },
    getQaList (ids, collectionTitle, index) {
      getQaListGet({
        answerId: ids
      }).then(res => {
        this.answerList = res.data
        for (const i of this.answerList) {
          this.accounts.push(i.answerer)
        }
        this.getUsersProfile()
        this.collectionTitle = collectionTitle || this.collectionTitle
        this.collectionIndex = index || this.collectionIndex
      }).catch(err => {
        console.log(err)
      })
      this.openFullscreen = true
    },
    getUsersProfile () {
      console.log({
        accounts: this.accounts
      })
      getUsersProfileGet({
        accounts: this.accounts
      }).then(res => {
        console.log(res.data)
        let temp = this.answerList.concat()
        for (const i of temp) {
          for (const j of res.data) {
            console.log(i.answerer, j.accountName)
            if (i.answerer === j.accountName) {
              i['avatar'] = j.userAvatar
            }
          }
        }
        this.answerList = temp.concat()
        console.log(this.answerList)
      }).catch(err => {
        console.log(err)
      })
    },
    toAnswer (answer) {
      // let answerArr = [answer]
      // console.log(answer)
      this.$router.push({
        name: 'Answer',
        query: {
          answerId: answer._id,
          // sortWay: this.sortWay,
          questionTitle: answer.questionId.title,
          questionId: answer.questionId._id,
          answersCount: answer.questionId.answers
        }
      })
    },
    deleteCollectionList (id, index) {
      this.$refs.globalClick.click()
      deleteCollectionListGet({
        collecter: this.userInfo.user_datas[0].account,
        collectionTitle: this.collectionTitle,
        answerId: id
      }).then(res => {
        this.getCollectionList().then(res => {
          console.log(this.collectionList[this.collectionIndex].collectionContent)
          this.getQaList(this.collectionList[this.collectionIndex].collectionContent)
          this.openSinDelete = false
        })
      }).catch(err => {
        console.log(err)
      })
    },
    getCollectionList () {
      let that = this
      console.log(this.userInfo.user_datas)
      return new Promise(function (resolve, reject) {
        console.log(that.userInfo.user_datas[0].account)
        getCollectionListGet({
          collecter: that.userInfo.user_datas[0].account
        }).then(res => {
          console.log(res)
          that.collectionList = res.data.collections
          console.log(that.collectionList)
          resolve()
        }).catch(err => {
          console.log(err)
        })
      })
    },
    deleteCollection () {
      deleteCollectionGet({
        collecter: this.userInfo.user_datas[0].account,
        collectionTitle: this.collectionTitle
      }).then(res => {
        console.log(res)
        this.getCollectionList()
        this.openFullscreen = false
        this.$toast.success('删除收藏夹成功')
      }).catch(err => {
        console.log(err)
        this.$toast.err('删除收藏夹失败')
      })
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  mounted () {
    this.getCollectionList()
  },
  filters: {
    contentFilter
  }
}
</script>

<style scoped>
.mu-card-title-container .mu-card-title{
  font-size: 18px;
  font-weight: bold;
}
.list-buttom span{
  display: flex;
  align-items: center;
  color: rgba(0,0,0,.57);
}
.list-buttom{
  display: flex;
  justify-content: space-between;
}
.mu-card{
  box-shadow: 0 2px 2px -1px rgba(0,0,0,.14);
  border-radius: 0;
}
</style>
