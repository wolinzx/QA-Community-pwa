<template>
  <div id="Message">
    <div class="container-inner message-title">
      <h3>消息</h3>
    </div>
    <!-- <div>
      <input name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="uploadtest" />
      <button @click="test"></button>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'Message',
  data () {
    return {
      msg: 'this is test'
    }
  },
  methods: {
    test () {
      this.$http.get('/img/test', {

      })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          throw err
        })
    },
    uploadtest (e) {
      // var self = this
      console.log(e.target)
      let file = e.target.files[0]
      /* eslint-disable no-undef */
      let param = new FormData() // 创建form对象
      param.append('file', file, file.name) // 通过append向form对象添加数据
      param.append('chunk', '0') // 添加form表单中其他数据
      console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去

      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      // 添加请求头
      this.$http.post('/api/testupload', param, config)
        .then(response => {
          if (response.data.code === 0) {
            console.log(response.data.data)
          }
          console.log(response.data)
        })
    }
  }
}
</script>

<style scoped>
#Message {
  height: 100%;
  background: #f9f9fa;
}
.message-title {
  margin-top: 0;
  /* text-align: center; */
  font-size: 1rem;
}
</style>
