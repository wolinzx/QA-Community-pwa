<template>
  <div id="FormInputText">
    <span class="title">{{title}}</span>
    <input class="input" type="text">
  </div>
</template>

<script>
export default {
  name: 'formInputText',
  data () {
    return {

    }
  },
  props: ['title']
}
</script>

<style scoped>
#FormInputText{
  font-size: 0.8rem;
  border-bottom: 1px solid #DCDFE6;
  margin: 0.4rem 0;
  padding: 0.3rem 0;
}
.title{
  border-right: 1px solid #DCDFE6;
  padding-right: 0.2rem;
}
.input{
  border: none;
  width: 10rem;
}
</style>
