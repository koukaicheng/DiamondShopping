<template>
  <section class="ts-footer border-top-1px">
    <router-link class="footer-tab-item" to="/index">
      <img class="icon-index" :src="getPath('weidianjiindex')"/>
      <span class="text-item">首页</span>
    </router-link>
    <router-link class="footer-tab-item" to="/buyDrill">
      <img class="icon-order" :src="getPath('weidianjibuyDrill')"/>
      <span class="text-item">买钻</span>
    </router-link>
    <router-link class="footer-tab-item" to="/sellDrill">
      <img class="icon-personal" :src="getPath('weidianjisellDrill')"/>
      <span class="text-item">卖钻</span>
    </router-link>
    <router-link class="footer-tab-item" to="/college">
      <img class="icon-personal" :src="getPath('weidianjicollege')"/>
      <span class="text-item">学院</span>
    </router-link>
    <router-link class="footer-tab-item" to="/profile">
      <img class="icon-personal" :src="getPath('weidianjiwode')"/>
      <span class="text-item">我的</span>
    </router-link>
  </section>
</template>

<script>
  export default {
    name: 'ds-footer',
    data() {
      return {
        status: '',
        imgNames: {index: 'weidianjiindex', buyDrill: 'weidianjibuyDrill', sellDrill: 'weidianjisellDrill', college: 'weidianjicollege', profile: 'weidianjiwode'},
        getPath: (path) => {
          let currentRouterName = this.$route.name;
          if (this.imgNames[currentRouterName] === path) {
            path = path.substr(3);
          }
          return require(`../../../assets/imgs/widgets/${path}.png`)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/variables";
  @import '../../../assets/css/mixin';

  .ts-footer {

   /*padding-bottom: 2px;*/
    z-index: $tabbarZIndex;
    @include fja(space-between);
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    background-color: #fff;
    /*background: red;*/
    height: pxTorem(100);
    //box-shadow: 0 -0.01667rem 0.01333rem  rgba(152, 151, 166, 0.1);
    .footer-tab-item {
      flex: 1;
      /*display: block;*/
      @include fja();
      flex-direction: column;
      width: 0;
      text-align: center;
      /*padding-top: 0.06rem;*/
      height: 100%;
      &.router-link-active {
        .text-item {
          color: $themeColor;
        }
      }
      .icon-index {
        @include wh(.6rem, .6rem);
      }
      .icon-order {
        @include wh(.6rem, .6rem);
      }
      .icon-personal {
        @include wh(.6rem, .6rem);
      }
      .text-item {
        @include sc(.3rem, #2E2E2E);
        margin-top: pxTorem(10);
        /*display: block;*/
      }
    }
  }

</style>
