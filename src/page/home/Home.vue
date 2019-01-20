<template>
  <div id="home">
    <mu-tabs class="home-tabs" :value.sync="active1" indicator-color="white" full-width>
      <mu-tab>关注</mu-tab>
      <mu-tab>推荐</mu-tab>
      <mu-tab>热门</mu-tab>
    </mu-tabs>
    <div v-show="active1 === 0">
      <div class="demo-loadmore-wrap" ref="container">
        <div ref="container1" class="demo-loadmore-content">
          <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
            <template v-for="i in num">
              <div>
                <mu-card style="width: 100%; margin: 10px auto;">
                  <mu-card-header title="奔跑的兔子" sub-title="赞同了回答·1天前">
                    <mu-avatar slot="avatar">
                      <img src="../../assets/image/avatar.jpeg">
                    </mu-avatar>
                  </mu-card-header>
                  <mu-card-title title="为什么很多职位都要招[应届毕业生]？" @click="toDetail"></mu-card-title>
                  <mu-card-text  @click="toDetail">
                    奔跑的兔子: 好骗（相信加班能提升自我价值升职加薪）
                    干的多（肯加班）要的少（肯无偿加班）
                  </mu-card-text>
                  <mu-card-actions class="list-buttom">
                    <span>219 赞同 · 66 评论</span>
                    <mu-menu cover placement="bottom-end">
                      <mu-button icon color="rgba(0,0,0,.57)">
                        <mu-icon value="more_vert"></mu-icon>
                      </mu-button>
                      <mu-list slot="content">
                        <mu-list-item button>
                          <mu-list-item-title>不感兴趣</mu-list-item-title>
                        </mu-list-item>
                        <mu-list-item button>
                          <mu-list-item-title>取消关注</mu-list-item-title>
                        </mu-list-item>
                        <mu-list-item button>
                          <mu-list-item-title>举报</mu-list-item-title>
                        </mu-list-item>
                      </mu-list>
                    </mu-menu>
                  </mu-card-actions>
                </mu-card>
              </div>
            </template>
          </mu-load-more>
        </div>
      </div>
    </div>
    <div v-show="active1 === 1">
      <div class="demo-loadmore-wrap" ref="container">
        <div ref="container2" class="demo-loadmore-content">
          <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
            <template v-for="recommend of recommendlist">
              <div>
                <mu-card style="width: 100%; margin: 10px auto;">
                  <mu-card-title :title="recommend.title" @click="toDetail(recommend._id)"></mu-card-title>
                  <mu-card-text v-html="recommend.contentData.replace(/<[^>]+>/g,'')" @click="toDetail(recommend._id)"></mu-card-text>
                  <mu-card-actions class="list-buttom">
                    <span>219 赞同 · 66 评论</span>
                    <mu-menu cover placement="bottom-end">
                      <mu-button icon color="rgba(0,0,0,.57)">
                        <mu-icon value="more_vert"></mu-icon>
                      </mu-button>
                      <mu-list slot="content">
                        <mu-list-item button>
                          <mu-list-item-title>不感兴趣</mu-list-item-title>
                        </mu-list-item>
                        <mu-list-item button>
                          <mu-list-item-title>举报</mu-list-item-title>
                        </mu-list-item>
                      </mu-list>
                    </mu-menu>
                  </mu-card-actions>
                </mu-card>
              </div>
            </template>
          </mu-load-more>
        </div>
      </div>
    </div>
    <div v-show="active1 === 2">
      <div class="demo-loadmore-wrap" ref="container">
        <div ref="container3" class="demo-loadmore-content">
          <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
            <template v-for="i in num">
              <div class="hot-list">
                <p>{{i}}</p>
                <div>
                  <h3>如何评价网易云音乐2018年年度报告？</h3>
                  <span>4092 万热度</span>
                </div>
              </div>
              <mu-divider />
            </template>
          </mu-load-more>
        </div>
      </div>
    </div>
    <div class="edit-action">
      <mu-scale-transition>
        <mu-button fab color="premary" v-show="showEdit" @click="openQuiz = true">
          <mu-icon value="edit"></mu-icon>
        </mu-button>
      </mu-scale-transition>
    </div>
    <div>
      <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openQuiz">
        <mu-appbar color="primary" title="提问">
          <mu-button slot="left" icon @click="openQuiz = false">
            <mu-icon value="arrow_back"></mu-icon>
          </mu-button>
          <mu-button slot="right" flat @click="openSelect = true" :disabled="!title">
            下一步
          </mu-button>
        </mu-appbar>
        <div>
          <mu-text-field v-model="title" placeholder="请输入标题" full-width style="font-weight: bold; padding: 15px; margin-bottom: 0;"></mu-text-field>
          <!-- <mu-text-field multi-line :rows="10" placeholder="请输入问题描述（选填）" full-width></mu-text-field><br/> -->
          <quill-editor class="question-edit" v-model="content"
            ref="myQuillEditor"
            :options="editorOption">
          </quill-editor>
        </div>
      </mu-dialog>
      <mu-dialog width="360" transition="slide-right" :overlay="false" fullscreen :open.sync="openSelect">
        <mu-appbar color="primary" title="添加话题">
          <mu-button slot="left" icon @click="openSelect = false">
            <mu-icon value="arrow_back"></mu-icon>
          </mu-button>
          <mu-button slot="right" flat @click="commitQuestion">
            <mu-icon value="send"></mu-icon>
          </mu-button>
        </mu-appbar>
        <div style="padding: 24px;">
          <mu-text-field placeholder="搜索并添加相关话题" full-width style="font-weight: bold" icon="search"></mu-text-field><br/>
        </div>
      </mu-dialog>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
// import ImageResize from 'quill-image-resize-module'
// Quill.register('modules/imageResize', ImageResize)
import { commitQuestionGet, getQuestionListGet } from '../../api/api.js'

export default {
  data () {
    return {
      active1: 0,
      num: 0,
      refreshing: false,
      loading: false,
      text: 'List',
      containerScroll: 0,
      showEdit: true,
      open: false,
      openQuiz: false,
      openSelect: false,
      title: '',
      content: '',
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image']
          ],
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          }
        },
        placeholder: '对问题进行补充说明，可以更快获得解答（选填）'
      },
      recommendlist: [],
      pagesize: 10,
      currentPage: 1
    }
  },
  methods: {
    ...mapMutations(['SET_SCROLLED']),
    refresh () {
      this.refreshing = true
      this.$refs.container1.scrollTop = 0
      setTimeout(() => {
        this.refreshing = false
        this.getRecommendlist(10, 1, true)
        this.pagesize = 10
        this.currentPage = 1
      }, 1000)
    },
    load () {
      this.loading = true
      this.getRecommendlist(this.pagesize, ++this.currentPage, false)
    },
    handleScroll () {
      let scrollTop = this.$refs.container1.scrollTop || this.$refs.container2.scrollTop || this.$refs.container3.scrollTop
      let scrollTopBool = this.containerScroll < scrollTop
      this.SET_SCROLLED(scrollTopBool)
      this.containerScroll = scrollTop
      scrollTopBool ? this.showEdit = false : this.showEdit = true
    },
    toDetail (id) {
      this.$router.push({ name: 'Detail', query: { questionId: id } })
    },
    commitQuestion () {
      let param = {
        account: this.userInfo.user_datas[0].account,
        title: this.title,
        content: this.content
      }
      console.log(param)
      commitQuestionGet(param).then(res => {
        if (res) {
          this.getRecommendlist(10, 1, true)
          this.$toast.success('提交成功')
          this.openQuiz = false
          this.openSelect = false
        }
      }).catch(err => {
        console.log(err)
        this.$toast.error('提交失败')
      })
    },
    getRecommendlist (pagesize, currentPage, isFresh) {
      let param = {
        pagesize,
        currentPage
      }
      getQuestionListGet(param).then(res => {
        isFresh ? this.recommendlist = res.data.concat() : this.recommendlist = this.recommendlist.concat(res.data)
        this.loading = false
      })
    }
  },
  mounted () {
    this.$refs.container1.addEventListener('scroll', this.handleScroll)
    this.$refs.container2.addEventListener('scroll', this.handleScroll)
    this.$refs.container3.addEventListener('scroll', this.handleScroll)
    // 获取提问列表
    this.getRecommendlist(10, 1, true)
  },
  components: {
    quillEditor
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style scoped>
.demo-loadmore-wrap {
  width: 100%;
  /* max-width: 360px; */
  position: absolute;
  top: 103px;
  bottom: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
}
.mu-appbar {
    width: 100%;
}
.demo-loadmore-content {
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.demo-loadmore-content .mu-icon-button{
  padding: 0;
  width: inherit;
  height: inherit;
}
.home-tabs{
  /* border-bottom: 1px solid rgba(0,0,0,.12); */
  box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14);
}
.edit-action{
  position: fixed;
  right: 16px;
  bottom: 80px;
}
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
.hot-list{
  display: flex;
}
.hot-list p{
  padding: 0 16px;
  font-weight: bold;
  color: brown;
}
.hot-list h3{
  margin: 13px 0 0;
}
.hot-list span{
  margin: 10px 0;
  display: inline-block;
  color: rgba(0,0,0,.57);
}
.question-edit >>> .ql-toolbar.ql-snow{
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 9999;
  left: 0;
  border: none;
  box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
}
.question-edit >>> .ql-toolbar.ql-snow + .ql-container.ql-snow{
  border: none;
}
</style>
