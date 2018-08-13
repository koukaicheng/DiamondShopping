<template>
  <div class="">
    <ts-header title="帐号" back> </ts-header>
    <page>
      <div class="box">
        <ds-cell title="手机号"  left-img :tipStatus="member_mobile">
          <img slot="leftImg" src="../../assets/imgs/icon/shouji.png" alt="">
        </ds-cell>
        <ds-cell title="微信"  left-img tipStatus="未绑定">
          <img slot="leftImg" src="../../assets/imgs/icon/weixin.png" alt="">
        </ds-cell>
        <ds-cell title="新浪微博"  left-img tipStatus="未绑定">
          <img slot="leftImg" src="../../assets/imgs/icon/xinlang.png" alt="">
        </ds-cell>

      </div>
      <div class="logout">
        <ds-button type="primary" size="large">退出登录</ds-button>
      </div>
    </page>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  computed:{
    member_mobile(){
      return this.$store.state.userinfo.member_mobile
    },
  },
  created() {}
};
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
