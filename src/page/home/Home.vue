<template>
    <div id="home">
        <header id="home-header">
            <nav id="home-nav">
                <!-- <span class="home-logo"><img src="/static/img/logos/login_logo2.png" alt=""></span>/ -->
                <div class="search-bar">
                    <span class="search-ico"><i class="iconfont icon-sousuo search-ico-size"></i></span>
                    <input class="search" type="text" placeholder="搜索">
                    <a class="edit" href=""><i class="iconfont icon-bianji"></i></a>
                </div>
                <div class="home-nav"> 
                    <router-link :to="{name:'Follow'}"><span>关注</span></router-link>
                    <router-link :to="{name:'Recommend' }"><span>推荐</span></router-link>
                    <router-link :to="{name:'Popular'}"><span>热门</span></router-link>
                </div>
            </nav>
        </header>
        <section class="container">
            <router-view></router-view>
        </section>
        <p class="nomore">没有更多内容</p>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data(){
        return {
            msg: 'this is test',
        } 
    },
    methods: {
        test () {
            this.$http.get('/api/test',{

            })
            .then((res)=>{
                console.log(res);
            })
            .catch((err)=>{
                throw err;
            })
        }
    },
    created: function () {
        //this.$router.push({path: '/Home/Follow'});
    }
}
</script>

<style scoped>
#home{
    background: #F9F9FA;
}
#home-header{
    width: 100%;
    background: #FFFFFF;
}
#home-nav{
    /* height: 2.4rem; */
    /* display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center; */
    /* color: #000000; */
    /* box-shadow: 0 0 5px rgb(133, 133, 133); */
    border: 1px solid #F2F2F2;
    font-size: 0.8rem;
}
.search-bar{
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    /* height: 2.3rem; */
    box-sizing: border-box;
    padding: 0.6rem;
}
.search-bar .search-ico{
    position: absolute;
    left: 1.1rem;
    /* top: 0.8rem; */
    font-size: 0.6rem;
    color: #646263;
}
.search-bar .search{
    width: 13.5rem;
    height: 1.5rem;
    border: none;
    border-radius: 0.2rem;
    background: #F2F2F2;
    text-indent: 1.6rem;
    font-size: 0.6rem;
}
.search-bar .edit{
    width: 1.8rem;
    height: 1.2rem;
    font-size: 1.2rem;
    /* align-self: center; */
    color: #04BB73;
}
.search-ico-size{
    font-size: 0.7rem;
}
.home-title{
    box-sizing: border-box;
    padding: 0.6rem;
    margin: 0;
    width: 100%;
}
.home-nav{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    background: #FFFFFF;
    box-sizing: border-box;
    padding: 0 0.6rem;
}
.home-nav a{
    -webkit-box-flex: 1;
    -ms-flex: 1;
    height: 1.5rem;
    text-align: center;
    /* line-height: 2.2rem; */
    color: #646263;
    margin-right: 1.4rem;
}
.router-link-active{
    border-bottom: 0.08rem solid #04BB73;
    color: #04BB73 !important;
}
/* .container{
    box-sizing: border-box;
    padding: 0.6rem;
} */
</style>


