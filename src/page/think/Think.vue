<template>
  <div>
    <mu-card style="width: 100%; margin: 10px auto;">
      <mu-card-header title="奔跑的兔子" sub-title="1天前">
        <mu-avatar slot="avatar">
          <img src="../../assets/image/avatar.jpeg">
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
    <mu-card style="width: 100%; margin: 10px auto;">
      <mu-card-header title="奔跑的兔子" sub-title="1天前">
        <mu-avatar slot="avatar">
          <img src="../../assets/image/avatar.jpeg">
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
    <mu-card style="width: 100%; margin: 10px auto;">
      <mu-card-header title="奔跑的兔子" sub-title="1天前">
        <mu-avatar slot="avatar">
          <img src="../../assets/image/avatar.jpeg">
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
    <div class="think-action">
      <mu-button fab color="premary" @click="openEdit = true">
        <mu-icon value="subject"></mu-icon>
      </mu-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      openEdit: false
    }
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
.mu-card-text{
  padding-left: 56px;
}
.mu-card-actions{
  padding-left: 39px;
}
.think-action{
  position: fixed;
  right: 16px;
  bottom: 80px;
}
</style>
