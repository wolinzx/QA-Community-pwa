<template>
  <div id="profile">
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click="routerBack">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
      {{this.$route.query.user}}
      <mu-menu slot="right" cover placement="bottom-end">
        <mu-button icon>
          <mu-icon value="more_vert"></mu-icon>
        </mu-button>
        <mu-list slot="content" v-if="this.$route.query.user === this.userInfo.user_datas[0].account">
          <mu-list-item button @click="openEdit = true">
            <mu-list-item-content>
              <mu-list-item-title>编辑个人资料</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </mu-menu>
    </mu-appbar>
    <mu-dialog v-loading="loading2" width="360" transition="slide-bottom" fullscreen :open.sync="openEdit">
      <mu-appbar color="primary" title="编辑个人资料">
        <mu-button slot="left" icon @click="openEdit = false">
          <mu-icon value="close"></mu-icon>
        </mu-button>
        <mu-button slot="right" flat  @click="updateProfile">
          <mu-icon value="check"></mu-icon>
        </mu-button>
      </mu-appbar>
      <mu-container>
        <mu-avatar class="edit-avatar" :size="70" @click="openMenu = true">
          <img :src="form.avatar || this.default_avatar" alt="">
          <mu-icon class="camera-alt" value="camera_alt" color="primary"></mu-icon>
          <mu-bottom-sheet :open.sync="openMenu">
            <mu-list @item-click="openMenu = false">
              <mu-sub-header>选择头像</mu-sub-header>
              <mu-list-item button>
                <mu-list-item-action>
                  <mu-icon value="camera" color="orange"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-title>拍照</mu-list-item-title>
                <input class="select-from-photo" type="file" accept="image/*" capture="camera">
              </mu-list-item>
              <mu-list-item button>
                <mu-list-item-action>
                  <mu-icon value="photo" color="blue"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-title>从相册选择</mu-list-item-title>
                <input class="select-from-photo" name="file" type="file" accept="image/png, image/jpeg" @change="upLoadAvatar"/>
              </mu-list-item>
            </mu-list>
          </mu-bottom-sheet>
        </mu-avatar>
        <mu-form :model="form" class="mu-demo-form">
          <mu-form-item prop="accountName" icon="account_circle" label="用户名" label-float>
             <mu-text-field v-model="form.accountName" full-width disabled></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="userSex" icon="face"  label="性别">
            <mu-radio v-model="form.userSex" :value="0" label="男"></mu-radio>
            <mu-radio v-model="form.userSex" :value="1" label="女"></mu-radio>
          </mu-form-item>
          <mu-form-item prop="userBirth" icon="today" label="生日" label-float>
            <mu-date-input v-model="form.userBirth"  container="bottomSheet" full-width></mu-date-input>
          </mu-form-item>
          <mu-form-item prop="userDescribe" icon="description" label="一句话描述" label-float>
             <mu-text-field v-model="form.userDescribe" full-width></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="userIndustry" icon="business" label="行业" label-float>
             <mu-text-field v-model="form.userIndustry" full-width></mu-text-field>
          </mu-form-item>
        </mu-form>
      </mu-container>
    </mu-dialog>
    <div class="mine-back">
      <img src="../../assets/image/flat-back.png" alt="">
    </div>
    <mu-avatar :size="80" class="mine-avatar">
      <img :src="form.avatar || this.default_avatar" alt="">
    </mu-avatar>
    <div class="mine-content">
      <h3>{{this.$route.query.user}}</h3>
      <span>{{form.userDescribe}}</span>
      <div class="follow">
        <span>回答 {{answers.length}}</span>&nbsp;
        <span>提问 {{questions.length}}</span>
      </div>
      <div class="follow-button" v-if="this.$route.query.user !== this.userInfo.user_datas[0].account">
        <mu-button small color="primary" v-if="!isFollow" @click="setFollow"><mu-icon value="add"></mu-icon>关注</mu-button>
        <mu-button small color="gray" @click="unFollow" v-else>已关注</mu-button>
      </div>
    </div>
    <mu-tabs class="mine-tabs" :value.sync="active2" inverse color="primary" text-color="primary"  indicator-color="primary" full-width>
      <mu-tab>回答</mu-tab>
      <mu-tab>提问</mu-tab>
    </mu-tabs>
    <div class="demo-text" v-if="active2 === 0">
      <mu-card style="width: 100%; margin: 10px auto;" v-for="(answer, i) of answers" :key="i" @click="toAnswer(answer)">
        <mu-card-title :title="answer.questionId.title"></mu-card-title>
        <mu-card-text>
          {{answer.contentData | contentFilter}}
        </mu-card-text>
        <mu-card-actions class="list-buttom">
          <span>{{answer.computedDate}}</span>
        </mu-card-actions>
      </mu-card>
      <mu-flex class="flex-wrapper" justify-content="center" direction="column" align-items="center" style="width:100%; height: 10rem;" v-if="answers.length === 0">
        <mu-flex class="flex-wrapper" justify-content="center" direction="column" align-items="center">
          <mu-icon value="storage" size="150" color="#ececec"></mu-icon>
          <span style="color: #b0b0b0">还没有内容</span>
        </mu-flex>
      </mu-flex>
      <span class="nomore" v-else>没有更多内容</span>
    </div>
    <div class="demo-text" v-if="active2 === 1">
      <mu-card style="width: 100%; margin: 10px auto;" v-for="(question, i) of questions" :key="i" @click="toDetail(question._id, question.title)">
        <mu-card-title :title="question.title"></mu-card-title>
        <mu-card-text>
          {{question.contentData | contentFilter}}
        </mu-card-text>
        <mu-card-actions class="list-buttom">
          <span>{{question.answers}} 回答 · {{question.follows}} 关注</span>
        </mu-card-actions>
      </mu-card>
      <mu-flex class="flex-wrapper" justify-content="center" direction="column" align-items="center" style="width:100%; height: 10rem;" v-if="questions.length === 0">
        <mu-flex class="flex-wrapper" justify-content="center" direction="column" align-items="center">
          <mu-icon value="storage" size="150" color="#ececec"></mu-icon>
          <span style="color: #b0b0b0">还没有内容</span>
        </mu-flex>
      </mu-flex>
      <span class="nomore" v-else>没有更多内容</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { accountProfileGet, setProfileGet, getQandAListGet, getFollowUserGet2, setFollowUserGet, unFollowUserGet } from '../../api/api.js'
import contentFilter from '../../util/contentFilter.js'
import dateDiff from '../../util/dateDiff.js'
import * as localStorage from '../../util/localStorage'
import { globalBus } from '@/util/globalBus'
export default {
  data () {
    return {
      active2: 0,
      openEdit: false,
      openMenu: false,
      form: {
        accountName: '',
        userSex: '',
        userDescribe: '',
        userIndustry: '',
        userBirth: ''
      },
      loading2: false,
      default_avatar: '/static/img/default_avatar.jpeg',
      answers: [],
      questions: [],
      isFollow: false
    }
  },
  methods: {
    routerBack () {
      this.$router.go(-1)
    },
    upLoadAvatar (e) {
      // var self = this
      // console.log(e.target);
      let file = e.target.files[0]
      let param = new FormData() // 创建form对象
      param.append('file', file, file.name) // 通过append向form对象添加数据
      console.log(this.userInfo)
      param.append('account', this.userInfo.user_datas[0].account) // 添加form表单中其他数据
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      // 添加请求头
      this.$http.post('/img/uploadavatar', param, config)
        .then((res) => {
          if (res.data) {
            this.showAvatarMenu = false
            this.$toast.success('上传成功')
            setTimeout(() => {
              // window.location.reload()
            }, 1500)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    updateProfile () {
      this.loading2 = true
      setTimeout(() => {
        let param = Object.assign({}, this.form)
        console.log(param)
        setProfileGet(param).then(res => {
          this.$toast.success('修改成功')
        }).catch(err => {
          console.log(err)
          this.$toast.error('修改错误')
        })
        this.loading2 = false
      }, 1000)
    },
    getFollow () {
      getFollowUserGet2({
        follower: this.userInfo.user_datas[0].account
      }).then(res => {
        if (res.data) {
          console.log(res)
          this.isFollow = res.data.userId.includes(this.$route.query.user)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    setFollow () {
      if (this.userInfo.isLogined) {
        let param = {
          follower: this.userInfo.user_datas[0].account,
          userId: this.$route.query.user
        }
        setFollowUserGet(param).then(res => {
          if (res) {
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
        userId: this.$route.query.user
      }
      unFollowUserGet(param).then(res => {
        if (res) {
          this.getFollow()
          this.$toast.success('取消关注成功')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    toAnswer (answer) {
      this.$router.push({
        name: 'Answer',
        query: {
          answerId: answer._id,
          questionTitle: answer.questionId.title,
          questionId: answer.questionId._id,
          answersCount: answer.questionId.answers
        }
      })
    },
    toDetail (id, title) {
      let user = this.userInfo.user_datas[0].account
      console.log()
      let hhh = localStorage.userHistory.get() || {}
      if (!localStorage.userHistory.get()[user]) {
        hhh[user] = []
      }
      let fff = hhh[user].filter(item => item.questionId !== id)
      fff.push({ questionTitle: title, questionId: id, hDate: Date.now() })
      console.log(1, hhh)
      hhh[user] = fff
      console.log(2, hhh)
      localStorage.userHistory.set(hhh)
      this.$router.push({ name: 'Detail', query: { questionId: id } })
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  mounted () {
    if (this.$route.query.user !== this.userInfo.user_datas[0].account) {
      this.getFollow()
    }
    console.log(this.userInfo.user_datas[0].account)
    let param = {
      account: this.$route.query.user
    }
    accountProfileGet(param).then(res => {
      this.form = Object.assign({}, res.data)
    }).catch(err => {
      console.log(err)
    })
    getQandAListGet({
      account: this.$route.query.user
    }).then(res => {
      console.log(res)
      this.answers = res.data.answers
      this.questions = res.data.questions
      for (const answer of this.answers) {
        let answerDate = answer.answerDate
        answer['computedDate'] = dateDiff(answerDate).diff
        answer['sec'] = dateDiff(answerDate).sec
      }
      this.answers.sort((a, b) => {
        return a.sec - b.sec
      })
    }).catch(err => {
      console.log(err)
    })
  },
  filters: {
    contentFilter
  }
}
</script>

<style scoped>
.mine-back{
  width: 100%;
  height: 6rem;
  overflow: hidden;
}
.mine-back img{
  width: 100%;
}
.mine-avatar{
  position: absolute;
  top: 6.8rem;
  left: 1rem;
}
.mine-content{
  padding: 2.4rem 1rem 0;
  position: relative;
}
.mine-content h3{
  font-size: 1rem;
  margin: 0;
}
.mine-content .follow{
  margin: 0.7rem 0;
}
.mine-tabs{
  /* border-bottom: 1px solid rgba(0,0,0,.12); */
  box-shadow: 0 2px 1px -1px rgba(0,0,0,.2);
  position: sticky;
  top: 56px;
}
.mu-card-title-container,
.mu-card-text,
.mu-card-actions,
.mu-card-header
{
  padding: 0;
}
.mu-card-text{
  margin: 0;
}
.mu-card-actions{
  margin-top: 12px;
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
  padding: 16px;
}
.edit-avatar{
  position: relative;
  margin: 16px auto;
  display: flex;
}
.camera-alt{
  position: absolute;
  right: 0px;
  bottom: -3px;
}
.select-from-photo{
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0;
}
.nomore{
  display: block;
  text-align: center;
  margin: 20px;
  color: #aaaaaa;
}
.follow-button{
  position: absolute;
  bottom: 0;
  right: 20px;
}
</style>
