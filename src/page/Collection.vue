<template>
  <div class="collection">
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
        <mu-appbar color="primary" :title="collectionTitle">
          <mu-button slot="left" icon @click="closeFullscreenDialog">
            <mu-icon value="close"></mu-icon>
          </mu-button>
          <mu-menu slot="right" cover placement="bottom-end">
            <mu-button icon>
              <mu-icon value="more_vert"></mu-icon>
            </mu-button>
            <mu-list slot="content">
              <mu-list-item button @click="openEdit = true">
                <mu-list-item-content>
                  <mu-list-item-title>编辑收藏夹</mu-list-item-title>
                </mu-list-item-content>
              </mu-list-item>
              <mu-list-item button @click="deleteCollection">
                <mu-list-item-content>
                  <mu-list-item-title>删除收藏夹</mu-list-item-title>
                </mu-list-item-content>
              </mu-list-item>
            </mu-list>
          </mu-menu>
        </mu-appbar>
        <mu-card style="width: 100%; margin: 10px auto;" v-for="(answer,i) of answerList" :key="i">
          <mu-card-header :title="answer.answerer" @click="toAnswer(answer)">
            <mu-avatar slot="avatar" :size="25">
              <img src="../assets/image/avatar.jpeg">
            </mu-avatar>
          </mu-card-header>
          <mu-card-title :title="answer.questionId.title" @click="toAnswer(answer)"></mu-card-title>
          <mu-card-text @click="toAnswer(answer)">
            {{answer.contentData | contentFilter}}
          </mu-card-text>
          <mu-card-actions class="list-buttom">
            <span>{{answer.endorseCount}} 赞同 · 66 评论</span>
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
  </div>
</template>

<script>
import { getCollectionListGet, getQaListGet, deleteCollectionListGet, deleteCollectionGet } from '../api/api.js'
import { mapState } from 'vuex'
import contentFilter from '../util/contentFilter.js'
export default {
  data () {
    return {
      collectionList: [],
      openFullscreen: false,
      answerList: [],
      collectionTitle: '',
      collectionIndex: 0
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
        console.log(res.data)
        console.log(this.answerList)
        this.collectionTitle = collectionTitle || this.collectionTitle
        this.collectionIndex = index || this.collectionIndex
      }).catch(err => {
        console.log(err)
      })
      this.openFullscreen = true
    },
    toAnswer (answer) {
      let answerArr = [answer]
      console.log(answer)
      this.$router.push({
        name: 'Answer',
        params: {
          answers: answerArr,
          tapAnswer: 0,
          questionTitle: answer.questionId.title,
          questionId: answer.questionId._id,
          answersCount: answer.questionId.answers
        }
      })
    },
    deleteCollectionList (id, index) {
      deleteCollectionListGet({
        collecter: this.userInfo.user_datas[0].account,
        collectionTitle: this.collectionTitle,
        answerId: id
      }).then(res => {
        this.getCollectionList().then(res => {
          console.log(this.collectionList[this.collectionIndex].collectionContent)
          this.getQaList(this.collectionList[this.collectionIndex].collectionContent)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    getCollectionList () {
      let that = this
      return new Promise(function (resolve, reject) {
        getCollectionListGet({
          collecter: that.userInfo.user_datas[0].account
        }).then(res => {
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
  mounted () {
    this.getCollectionList()
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
