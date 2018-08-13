<template>
  <div class="box">
    <div class="brand" @click="backEvent" :style="serBoxStyle">
      <slot></slot>
    </div>

    <div class="input" :style="serBoxStyle" @click="link">
      <input type="text" disabled="" :class="{'active':off}">
      <div class="box_" :class="{'active':off}">
        <icon font-name="icon-search" color="#999" size="30"></icon>
        <span>搜索</span>
      </div>
    </div>
    <span class="icon" :style="serBoxStyle" @click="messge">
      <icon font-name="icon-xiaoxi2" color="#999" size="50"></icon>
      <span class="messgenum" v-show="messgeNum>0"></span>
    </span>
  </div>
</template>
<script>
const COMPONENT_NAME = 'search-box'
export default {
  name: COMPONENT_NAME,
  data() {
    return {}
  },
  props: {
    off:{
      type: Boolean,
      default: false
    },
    box: Object,
    text: {
      type: String,
      default: '乐检'
    },
    rightStyle: Object,
    serBoxStyle: Object,
    back: {
      type: Boolean,
      default: false
    },
    color: {
      type: Boolean,
      default: false
    },
    messgeNum:{
      type: Number,
      default: 0
    }
  },
  methods: {
    backEvent() {
      if (this.back) {
        this.$router.isBack = false;
        this.$router.goBack()
      }
    },
    link(){
      this.$router.push({path:'/search'})
    },
    messge(){
      this.$router.push({path:'/message'})
    }
  },
  created() {}
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/icon.css';
@import '../../../assets/css/mixin';
.box {
  width: 100%;
  padding: 0 12px;
  @include fja(space-between, center);
  .brand {
    font-size: pxTorem(30);
    color: #ffffff;
    margin-right: 6px;
    flex-shrink: 0;
  }
  .input {
    position: relative;
    height: pxTorem(60);
    width: pxTorem(500);
    input {
      width: 100%;
      height: 100%;
     background: #f5f5f5;
      border-radius: pxTorem(50);
      display: block;
      border: none;
      &.active{
        background-color: rgba(255, 255, 255, 0.6);
        border: 1px solid #d8d8d8;
      }
    }
    .box_ {
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      color: #ffffff;
      @include fja(center, center);
      span {
        font-size: pxTorem(26);
        padding-left: 0.2rem;
        color: #9c9c9c;
      }
    }
  }
  span {
    display: flex;
  }
  .icon {
    position: relative;
    .iconfont {
      color: #ffffff;
      font-size: 24px; /*no*/
    }
    .messgenum{
      position: absolute;
      width: pxTorem(12);
      height: pxTorem(12);
      background: #ee0b24;
      border-radius: 50%;
      top: pxTorem(2);
      right: pxTorem(-6);
    }
  }
}
</style>
