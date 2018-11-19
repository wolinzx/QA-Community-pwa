<template>
  <div id="FormInputRadio">
    <span class="title">{{title}}</span>
    <input class="radio" type="radio" name="sex" value="man">男
    <input class="radio" type="radio" name="sex" value="woman">女
  </div>
</template>

<script>
export default {
  name: 'formInputRadio',
  data () {
    return {

    }
  },
  props: ['title']
}
</script>

<style scoped>
#FormInputRadio{
  font-size: 0.8rem;
  border-bottom: 1px solid #DCDFE6;
  margin: 0.4rem 0;
  padding: 0.3rem 0;
}
.title{
  border-right: 1px solid #DCDFE6;
  padding-right: 0.2rem;
}
.radio{
  border: none;
  height: 1rem;
  width: 1rem;
}
</style>
