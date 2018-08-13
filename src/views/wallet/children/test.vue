<template>
  <div class="">
    <ts-header back title="提现"></ts-header>
    <Page>
      <div>

      </div>
    </Page>
  </div>
</template>
<script>
  import { MessageBox } from 'mint-ui'

  export default {
    data () {
      return {}
    },
    methods: {},

    created () {

      // MessageBox({
      //   title: '提示',
      //   message: '请输入密码',
      //   showCancelButton:true,
      //   closeOnClickModal:false,
      //   showInput:true,
      //   inputType:'password'
      // }).then(({ value, action }) => {
      // console.log(action)
      // });

      MessageBox.prompt('请输入姓名').then(({value, action}) => {
        console.log(action)
      })
    },
    components: {}
  }
</script>

<style lang="scss" scoped>
  .wrap {
    height: 100%;
    background: #fff;
  }
</style>
