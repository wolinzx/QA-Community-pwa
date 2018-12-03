<template>
  <div class="edit">
    <header class="head">
      <child-header :title="title"></child-header>
    </header>
    <section class="section">
      <div class="title-input-container flex">
        <input class="title-input" type="text" placeholder="请输入标题">
      </div>
      <div class="edit-content">
        <textarea class="edit-content-textarea" name="edit-content" placeholder="请输入问题描述（选填）"></textarea>
      </div>
    </section>
  </div>
</template>

<script>
import ChildHeader from '@/components/TheChildHeader'

export default {
  data () {
    return {
      title: '提问'
    }
  },
  components: {
    ChildHeader
  }
}
</script>

<style scoped>
.edit{
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: #FFFFFF;
}
.section{
  display: flex;
  width: 100%;
  flex-direction: column;
}
.title-input-container{
  height: 4.5rem;
  justify-content: space-around;
  align-items: center;
}
.title-input-container .title-input{
  width: 88%;
  height: 1.7rem;
  border: none;
  border-bottom: 1px solid #646263;
  font-size: 0.9rem;
}
.edit-content-textarea{
  width: 100%;
  height: 20rem;
  border: none;
  line-height: 1.3rem;
  padding: 0.6rem;
  font-size: 0.7rem;
  box-sizing: border-box;
  font-family: inherit;
  outline: none;
}
</style>
