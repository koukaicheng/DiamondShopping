<template>
  <div class="">
    <ts-header back title="我的钱包" rightText="收支明细" right-color="#030303" @headerEvent="expentditure('/expentditureData')"></ts-header>
    <div>
      <div class="wrap">
        <div class="title">全部余额</div>
        <div class="money_num">
          <span class="num">{{list.predepoit}}</span>
          <span class="c">元</span>
        </div>
      </div>
      <div class="backGray"></div>

      <div class="cell">
        <ds-cell title="提现" link="/withdrawals" left-img>
          <img slot="leftImg" src="../../assets/imgs/icon/tixian.png" alt="">

        </ds-cell>
        <ds-cell title="我的支付宝" link="/bankCard" left-img>
          <img slot="leftImg" src="../../assets/imgs/zhifubao.png" alt="">
        </ds-cell>
      </div>

    </div>
    <transition name="slide-child">
      <router-view class="child-route"></router-view>
    </transition>
  </div>
</template>
<script>
import { MyAsset } from '../../assets/js/api'

export default {
  data() {
    return {
      list: {}
    }
  },
  methods: {
    expentditure(url) {
      this.$router.push(url)
    },

    // 获取余额
    async getMyAsset() {
      let getMyAssetData = await this.$http.post(MyAsset, {
        get: {
          fields: 'predepoit' // 钱包余额
        }
      },{},{show:true,type:'mini'})
      if (getMyAssetData.code === 200) {
        this.list = getMyAssetData.datas
      }
    }
  },
  created() {
    // 获取余额
    this.getMyAsset()
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/icon.css';
@import '../../assets/css/mixin';
@import '../../assets/css/variables';
@import '../../assets/css/module';
.wrap {
  background: #fff;
  height: 3.8rem;
  @include fja(center, center);
  flex-direction: column;
  .title {
    font-size: pxTorem(28);
    color: #626262;
  }
  .money_num {
    margin-top: 0.2rem;
    @include fja(center, center);
    .num {
      padding-left: 0.16rem;
      font-size: 0.76rem;
      color: #bd081c;
    }
    .c {
      font-size: 0.2rem;
      color: #626262;
      padding-left: 0.1rem;
      margin-top: 0.2rem;
    }
  }
}
.cell {
  background: #fff;
}
</style>
