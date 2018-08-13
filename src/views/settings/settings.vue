<template>
  <div class="">
    <ts-header title="设置" back></ts-header>
    <page>
      <div class="box">
        <ds-cell title="账户/绑定设置" link="./accountBinding" left-img>
          <img slot="leftImg" src="../../assets/imgs/icon/shezhi.png" alt="">
        </ds-cell>
        <ds-cell title="修改密码" link="./editPass" left-img>
          <img slot="leftImg" src="../../assets/imgs/icon/mima.png" alt="">
        </ds-cell>
        <ds-cell title="我的收货地址" link="./address" left-img>
          <img slot="leftImg" src="../../assets/imgs/icon/dizhi.png" alt="">
        </ds-cell>
        <ds-cell title="关于我们" isLink mode="edit" @click="link('/articleDetails',22)" left-img>
          <img slot="leftImg" src="../../assets/imgs/icon/guanyu.png" alt="">
        </ds-cell>
        <ds-cell title="客服电话" left-img>
          <img slot="leftImg" src="../../assets/imgs/icon/dianhua.png" alt="">
          <p slot="menuValue" class="kefu"> 010-65210122 </p>
        </ds-cell>
        <div class="logout" @click="net">
          <ds-button type="primary" size="large">退出登录</ds-button>
        </div>
      </div>

    </page>
  </div>
</template>
<script>
  import { LogOut, CLIENT} from '../../assets/js/api'
  import { SET_KEY, SET_USER ,SUB_DIAMONDS_INFO,SELL_AGREEMENT_STATUS} from '../../store/mutations/mutations-types'
  import { mapMutations } from 'vuex'

  export default {
    data () {
      return {}
    },
    methods: {
      ...mapMutations([SET_KEY, SET_USER]),
      async net () {
        let json = await this.$http.get(LogOut, {client: CLIENT || 'ios'}, {show: true, type: 'mini'})
        if (json.code === 200) {
          this[SET_KEY]('')
          this[SET_USER]({})
          this.$store.commit(SUB_DIAMONDS_INFO,null);
          this.$store.commit(SELL_AGREEMENT_STATUS,false)
          this.$toast('退出成功')
          setTimeout(()=>{
            this.$router.goBack()
          },1000)
        }
      },
      link(url,id){
        this.$router.push({path:url,query:{id}})
      }
    },
     created () {

    }
  }
</script>

<style lang="scss" scoped>
  .box {
    background: #ffffff;
    .kefu {
      float: right;
      font-size: pxTorem(26);
      color: #999999;
    }
  }

  .logout {
    padding: 1.5rem 0.5rem 0;
  }
</style>
