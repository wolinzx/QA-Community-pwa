<template>
    <div class="msgbox" :class="{'msgbox-move': showMsg}">
        <div class="msg">
            <p>{{msg}}</p>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            msg: '',
            showMsg: false,
            t: '',
        }
    },
    // props:['msg','showMsg'],
    methods: {
        // clearTimeOut:function(){
        //     clearTimeout(this.t);
        // },
        showMsgBox: function(msg) {
            // this.$options.methods.clearTimeOut();
            this.msg = msg;
            this.showMsg = true;
            this.t = setTimeout(()=>{
                this.showMsg = false;
            },1500);
        },
       
    }
}
</script>


<style scoped>
.msgbox{
    position: fixed;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    bottom: -2.8rem;
    z-index: 999;
    transition: all 300ms ease;
}
.msg{
    width: 95%;
    height: 2.5rem;
    background: #04BB73;
    font-size: 0.9rem;
    color: white;
    border-radius: 0.5rem;
    line-height: 2.5rem;
    text-align: center;
}
.msgbox-move{
    bottom: 0.5rem;
}
</style>
