<template>
  <div id="home">
    <mu-list textline="three-line">
      <mu-sub-header>通知列表</mu-sub-header>
      <mu-list-item avatar :ripple="false" button>
        <mu-list-item-action>
          <mu-avatar>
            <img src="../../assets/image/avatar.jpeg">
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-list-item-title>奔跑的兔子 的提问等你来回答</mu-list-item-title>
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
      <mu-list-item avatar :ripple="false" button>
        <mu-list-item-action>
          <mu-avatar>
            <img src="../../assets/image/avatar.jpeg">
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-list-item-title>摩尔斯 的提问等你来回答</mu-list-item-title>
          <mu-list-item-sub-title>
            <span style="color: rgba(0, 0, 0, .87); font-weight: bold">泰拉瑞亚或者饥荒用什么编译语言？</span><br/>
            <div style="display: flex">
              <mu-icon size="20" value="email" color="primary"></mu-icon>&nbsp;
              <span>8天前</span>
            </div>
          </mu-list-item-sub-title>
        </mu-list-item-content>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item avatar :ripple="false" button>
        <mu-list-item-action>
          <mu-avatar>
            <img src="../../assets/image/avatar.jpeg">
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-list-item-title>masq 的提问等你来回答</mu-list-item-title>
          <mu-list-item-sub-title>
            <span style="color: rgba(0, 0, 0, .87); font-weight: bold">学Web前端和后端开发哪个更好一点？</span><br/>
            <div style="display: flex">
              <mu-icon size="20" value="email" color="primary"></mu-icon>&nbsp;
              <span>14天前</span>
            </div>
          </mu-list-item-sub-title>
        </mu-list-item-content>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item avatar :ripple="false" button>
        <mu-list-item-action>
          <mu-avatar>
            <img src="../../assets/image/avatar.jpeg">
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-list-item-title>Eva 的提问等你来回答</mu-list-item-title>
          <mu-list-item-sub-title>
            <span style="color: rgba(0, 0, 0, .87); font-weight: bold">Web前端实习工资多少？</span><br/>
            <div style="display: flex">
              <mu-icon size="20" value="email" color="primary"></mu-icon>&nbsp;
              <span>14天前</span>
            </div>
          </mu-list-item-sub-title>
        </mu-list-item-content>
      </mu-list-item>
      <mu-divider></mu-divider>
    </mu-list>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>
