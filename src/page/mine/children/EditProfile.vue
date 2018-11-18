<template>
    <div id="EditProfile">
        <child-header :title="title"></child-header>
        <div class="user-tag">
            <div class="user-avatar" @click="showAvatarMenu=true">
                <img :src="userInfo.user_datas[0].avatar" alt="">
            </div>
            <i class="iconfont icon-xiangji camera-ico" @click="showAvatarMenu=true"></i>
        </div>
        <div class="container-inner profile-form">
            <div class="profile-edit-input">
                <span>昵称</span>
                <input type="text">
            </div>
            <div class="profile-edit-input">
                <span>性别</span>
                <input type="text">
            </div>
        </div>
        <div class="black-float" v-show="showAvatarMenu" @click="showAvatarMenu=false"></div>
        <div class="avatar-menu" :class="{'avatar-menu-show':showAvatarMenu}">
            <div class="avatar-menu-main">
                <h4 class="menu-title">更换头像</h4>
                <span class="upload-button" >
                    <span >从相册选择</span>
                    <input  name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="upLoadAvatar"/>
                </span>
                <span @click="showLargeImage = true">查看大图</span>
            </div>
            
            <div class="cancel-button" @click="showAvatarMenu=false">取消</div>
        </div>
        <MessageBox ref="messageBox"></MessageBox>
        <div class="img-container" v-show="showLargeImage" @click="showLargeImage = false">
            <img :src="userInfo.user_datas[0].avatar" alt="">
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import MessageBox from '@/components/TheMessageBox'
import ChildHeader from '@/components/TheChildHeader'

export default {
    data (){
        return {
            title: '修改个人资料',
            showAvatarMenu:false,
            showLargeImage:false
        }
    },
    components:{
        MessageBox,
        ChildHeader
    },
    computed: {
        ...mapState(['userInfo']),
    },
    methods: {
        routerBack () {
            this.$router.go(-1);
        },
        upLoadAvatar (e) {
            var self = this
            // console.log(e.target);
            let file = e.target.files[0]
            let param = new FormData()  // 创建form对象
            param.append('file', file, file.name)  // 通过append向form对象添加数据
            console.log(this.userInfo);
            param.append('account', this.userInfo.user_datas[0].account) // 添加form表单中其他数据
            let config = {
                headers: {'Content-Type': 'multipart/form-data'}
            }
            // 添加请求头
            this.$http.post('/img/uploadavatar', param, config)
                .then((res) => {
                    if (res.data) {
                        this.showAvatarMenu = false;
                        this.$refs.messageBox.showMsgBox('上传成功！'); 
                        setTimeout(() => {
                            window.location.reload();
                        }, 1500);
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
        }
    },
}
</script>

<style scoped>
#EditProfile{
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: #F9F9FA;
    /* overflow: hidden; */
    overflow:auto;
    box-shadow: 0 0 8px rgb(133, 133, 133);
}
.user-tag{
    position: relative;
    width: 100%;
    background: #FFFFFF;
    box-sizing: border-box;
    padding: 0.8rem 0.6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #F2F2F2;
    margin: 0.5rem 0;
}
.user-tag .user-avatar{
    width: 4.3rem;
    height: 4.3rem;
    background: url('../../../assets/image/default_avatar.png') top center no-repeat;
    background-size: cover;
    overflow: hidden;
    border-radius: 2.8rem;
}
.user-avatar img{
    width: 100%;
    height: 100%;
}
.camera-ico{
    position: absolute;
    top: 3.9rem;
    right: 6.4rem;
    color: #04BB73;
}
.profile-edit-input{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}


.black-float{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    background: rgba(0, 0, 0, 0.3);
}
.avatar-menu{
    position: fixed;
    bottom: -9.5rem;
    width: 95%;
    /* border: 1px solid #b9b9b9; */
    -webkit-transition: bottom 0.3s ease 0s;
    transition: bottom 0.3s ease 0s;
    left: 50%;
    transform: translate(-50%, -4%);
    color: #04BB73;
}
.avatar-menu-main,.cancel-button{
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    background: #FFFFFF; 

}
.avatar-menu-main{
    margin: 0.5rem 0;
}
.avatar-menu-main>span,.cancel-button{
    width: 100%;
    height: 2.2rem;
    line-height: 2.2rem;
    text-align: center;
    border-top: 1px solid #F2F2F2;
    font-size: 0.9rem;
}
.menu-title{
    font-size: 0.6rem;
    text-align: center;
    line-height: 1.6rem;
    height: 1.6rem;
    font-weight: normal;
    color: rgb(165, 165, 165);
}
.avatar-menu-show{
    bottom: 0.2rem;
} 

.upload-button input{
    position: absolute;
    right: 0px;
    top: 2.1rem;
    width: inherit;
    height: inherit;
    opacity: 0;
}
.img-container{
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000000;

}
.img-container img{
    width: 100%;
}
</style>


