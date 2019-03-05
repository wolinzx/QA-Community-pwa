<template>
  <div>
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click="routerBack">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
        举报
    </mu-appbar>
    <mu-list class="select-control-group">
      <mu-list-item button v-for="(list, i) of reportList" :key="i">
        <mu-radio :label-left="true" :value="list.reportTitle" v-model="radio.value1" :label="list.reportTitle"></mu-radio>
      </mu-list-item>
    </mu-list>
    <mu-flex class="report-save" justify-content="center">
      <mu-button style="width: 70%" color="primary" @click="openSimple = true" :disabled="!radio.value1">举报</mu-button>
    </mu-flex>
    <mu-dialog title="确定举报？" width="360" :open.sync="openSimple">
      举报类型为 {{radio.value1}}
      <mu-button slot="actions" flat color="primary" @click="openSimple = false">否</mu-button>
      <mu-button slot="actions" flat color="primary" @click="commitReport">是</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
import { commitReprotGet } from '../api/api.js'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      reportList: [
        { reportTitle: '低质问题/回答' },
        { reportTitle: '垃圾广告信息' },
        { reportTitle: '有害信息' },
        { reportTitle: '涉嫌侵权' }
      ],
      radio: {
        value1: '',
        value2: false,
        value3: false
      },
      openSimple: false
    }
  },
  methods: {
    routerBack () {
      this.$router.go(-1)
    },
    commitReport () {
      commitReprotGet({
        reporter: this.userInfo.user_datas[0].account,
        reportQId: this.$route.query.questionId,
        reportAId: this.$route.query.answerId,
        reportType: this.radio.value1
      }).then(res => {
        if (res.data) {
          this.$toast.success('举报成功')
          this.routerBack()
        } else {
          this.$toast.error('举报失败')
        }
        this.openSimple = false
      }).catch(err => {
        console.log(err)
      })
    }
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style scoped>
.select-control-group .mu-radio{
  width: 100%;
  padding: 0 5px;
}
</style>
