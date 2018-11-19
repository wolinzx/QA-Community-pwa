<template>
  <div id="FormButton">
    <div :class="['com-container', align]" >
      <button :class="['button', type]">{{title}}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'formButton',
  data () {
    return {

    }
  },
  props: ['title', 'align', 'type']
}
</script>

<style scoped>
.button{
  margin: 0.5rem;
  display: block;
  width: 5.6rem;
  height: 1.8rem;
  background: #FFFFFF;
  border: 1px solid #DCDFE6;
  /* margin: 1.3rem auto; */
  text-align: center;
  line-height: 1.8rem;
  border-radius: 2rem;
  font-size: 0.6rem;
  display: inline-block;
}
.center{
  text-align: center;
}
.right{
  text-align: right;
}
.left{
  text-align: left;
}
.primary,.info,.warning,.danger{
  color: #FFFFFF;
}
.primary{
  background: #04bb73;
  border: 1px solid #04bb73;
}
.info{
  background: #909399;
  border: 1px solid #909399;
}
.warning{
  background: #E6A23C;
  border: 1px solid #E6A23C;
}
.danger{
  background: #F56C6C;
  border: 1px solid #F56C6C;
}
</style>
