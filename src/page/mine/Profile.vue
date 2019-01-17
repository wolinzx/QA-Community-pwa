<template>
  <div id="profile">
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click="routerBack">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
      我的
      <mu-menu slot="right" cover placement="bottom-end">
        <mu-button icon>
          <mu-icon value="more_vert"></mu-icon>
        </mu-button>
        <mu-list slot="content">
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
          <img :src="userInfo.user_datas[0].avatar">
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
      <img :src="userInfo.user_datas[0].avatar">
    </mu-avatar>
    <div class="mine-content">
      <h3>{{userInfo.user_datas[0].account}}</h3>
      <span>计科，web前端方向</span>
      <div class="follow">
        <span>粉丝 0</span>
        <span>关注 1</span>
      </div>
    </div>
    <mu-tabs class="mine-tabs" :value.sync="active2" inverse color="primary" text-color="primary"  indicator-color="primary" full-width>
      <mu-tab>动态</mu-tab>
      <mu-tab>回答</mu-tab>
      <mu-tab>想法</mu-tab>
    </mu-tabs>
    <div class="demo-text" v-if="active2 === 0">
      <mu-card style="width: 100%; margin: 10px auto;">
        <mu-card-header title="奔跑的兔子" sub-title="赞同了回答·1天前">
          <mu-avatar slot="avatar">
            <img src="../../assets/logo.png">
          </mu-avatar>
        </mu-card-header>
        <mu-card-title title="为什么很多职位都要招[应届毕业生]？"></mu-card-title>
        <mu-card-text>
          奔跑的兔子: 好骗（相信加班能提升自我价值升职加薪）
          干的多（肯加班）要的少（肯无偿加班）
        </mu-card-text>
        <mu-card-actions class="list-buttom">
          <span>219 赞同 · 66 评论</span>
        </mu-card-actions>
      </mu-card>
    </div>
    <div class="demo-text" v-if="active2 === 1">
      <mu-card style="width: 100%; margin: 10px auto;">
        <mu-card-title title="为什么很多职位都要招[应届毕业生]？"></mu-card-title>
        <mu-card-text>
          奔跑的兔子: 好骗（相信加班能提升自我价值升职加薪）
          干的多（肯加班）要的少（肯无偿加班）
        </mu-card-text>
        <mu-card-actions class="list-buttom">
          <span>1天前</span>
        </mu-card-actions>
      </mu-card>
    </div>
    <div class="demo-text" v-if="active2 === 2">
      <mu-card style="width: 100%; margin: 10px auto;">
        <mu-card-header title="奔跑的兔子" sub-title="1天前">
          <mu-avatar slot="avatar">
            <img src="../../assets/logo.png">
          </mu-avatar>
        </mu-card-header>
        <mu-card-text>
          奔跑的兔子: 好骗（相信加班能提升自我价值升职加薪）
          干的多（肯加班）要的少（肯无偿加班）
        </mu-card-text>
        <mu-card-actions>
          <mu-button flat>
            <mu-icon left value="call_missed"></mu-icon>
            转发
          </mu-button>
          <mu-button flat>
            <mu-icon left value="chat_bubble_outline"></mu-icon>
            评论
          </mu-button>
          <mu-button flat>
            <mu-icon left value="exposure_plus_1"></mu-icon>
            点赞
          </mu-button>
        </mu-card-actions>
      </mu-card>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { accountProfileGet, setProfileGet } from '../../api/api.js'
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
      loading2: false
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
              window.location.reload()
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
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  mounted () {
    console.log(this.userInfo.user_datas[0].account)
    let param = {
      account: this.userInfo.user_datas[0].account
    }
    accountProfileGet(param).then(res => {
      this.form = Object.assign({}, res.data)
    }).catch(err => {
      console.log(err)
    })
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
</style>
