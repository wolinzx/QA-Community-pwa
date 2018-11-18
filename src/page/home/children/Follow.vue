<template>
  <div id="Follow">
    <div class="container-inner excellent">
      <h3 class="excellent-title">优秀回答者</h3>
      <div class="excellent-content">
        <ul class="excellent-list">
          <a href="">
            <li>
              <div class="user-avatar">

              </div>
              <h3 class="user-name">
                MoonMonster
              </h3>
            </li>
          </a>
          <a href="">
            <li>
              <div class="user-avatar">

              </div>
              <h3 class="user-name">
                你好
              </h3>
            </li>
          </a>
          <a href="">
            <li>
              <div class="user-avatar">

              </div>
              <h3 class="user-name">
                你好
              </h3>
            </li>
          </a>
          <a href="">
            <li>
              <div class="user-avatar">

              </div>
              <h3 class="user-name">
                你好
              </h3>
            </li>
          </a>
          <a href="">
            <li>
              <div class="user-avatar">

              </div>
              <h3 class="user-name">
                你好
              </h3>
            </li>
          </a>
          <a href="">
            <li>
              <div class="user-avatar">

              </div>
              <h3 class="user-name">
                你好
              </h3>
            </li>
          </a>
        </ul>
      </div>
    </div>

    <div class="container-inner interesting">
      <h3 class="interesting-title">你可能感兴趣的人</h3>
      <div class="interesting-content">
        <ul class="interesting-list">
          <a href="">
            <li>
              <div class="user-avatar">

              </div>
              <div class="user-intro">
                <h3 class="user-name">一个男人在流浪</h3>
                <p class="user-card">[相机]话题的活跃用户</p>
                <p class="user-overview">339回答·3,174关注</p>
              </div>
            </li>
          </a>
          <a href="">
            <li>
              <div class="user-avatar">

              </div>
              <div class="user-intro">
                <h3 class="user-name">一个男人在流浪</h3>
                <p class="user-card">[相机]话题的活跃用户</p>
                <p class="user-overview">339回答·3,174关注</p>
              </div>
            </li>
          </a>
          <a href="">
            <li>
              <div class="user-avatar">

              </div>
              <div class="user-intro">
                <h3 class="user-name">一个男人在流浪</h3>
                <p class="user-card">[相机]话题的活跃用户</p>
                <p class="user-overview">339回答·3,174关注</p>
              </div>
            </li>
          </a>
          <a href="">
            <li>
              <div class="user-avatar">

              </div>
              <div class="user-intro">
                <h3 class="user-name">一个男人在流浪</h3>
                <p class="user-card">[相机]话题的活跃用户</p>
                <p class="user-overview">339回答·3,174关注</p>
              </div>
            </li>
          </a>
          <a href="">
            <li>
              <div class="user-avatar">

              </div>
              <div class="user-intro">
                <h3 class="user-name">一个男人在流浪</h3>
                <p class="user-card">[相机]话题的活跃用户</p>
                <p class="user-overview">339回答·3,174关注</p>
              </div>
            </li>
          </a>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import TheContainer from '@/components/TheContainer';
export default {
  name: 'Follow',

  data() {
    return {
      msg: 'this is Follow '
    }
  },
  components: {
    'the-container': TheContainer,
  }
}
</script>

<style scoped>
/* #Follow{
    box-sizing: border-box;
    padding: 0.6rem;
} */
/* .excellent,.interesting{
    margin: 0.5rem 0;
    box-sizing: border-box;
    padding: 0.6rem;
    background: #FFFFFF;
    border: 1px solid #F2F2F2;

} */
.excellent-title,
.interesting-title {
  font-size: 0.7rem;
  padding: 0.2rem 0;
}
.excellent-content,
.interesting-content {
  /* background: #e9e9e9; */
  width: 100%;
  /* border-radius: 1rem; */
}
.excellent-list {
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  overflow-x: auto;
}
.excellent-list::-webkit-scrollbar {
  display: none;
}
.excellent-list a {
  -webkit-box-flex: 0;
  -ms-flex: none;
  flex: none;
  width: 3.3rem;
  /* height: 6rem; */
  /* background: darkblue; */
  margin-right: 0.7rem;
}
.excellent-list .user-avatar {
  width: 100%;
  height: 3.3rem;
  border-radius: 0.2rem;
  background: #f2f2f2;
}
.excellent-list .user-name {
  text-align: center;
  font-size: 0.6rem;
  color: #000000;
  margin: 0.3rem 0;
  word-wrap: break-word;
}
.interesting-list li {
  display: flex;
  flex-direction: row;
}
.interesting-list .user-avatar {
  flex: 1;
  height: 2rem;
  background: firebrick;
  margin-top: 0.5rem;
}
.interesting-list .user-intro {
  flex: 5;
  box-sizing: border-box;
  padding: 0.5rem;
  /* color: #000000; */
  border-bottom: 1px solid #f2f2f2;
}
.interesting-list .user-intro .user-name {
  color: #000000;
  font-size: 0.9rem;
}
.interesting-list .user-intro .user-card {
  font-size: 0.7rem;
}
.interesting-list .user-intro .user-overview {
  font-size: 0.6rem;
  color: #b6b6b6;
}
</style>


