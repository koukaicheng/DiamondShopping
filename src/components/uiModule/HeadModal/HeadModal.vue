<template>
  <transition name="currentTransition">
    <div class="modal-box" v-show="visible">
      <div class="item" @click="showPel">
        <div class="icon" >
          <icon font-name="icon-kefu1" size="45" color="#191919"></icon>
        </div>
        <div class="text">咨询</div>
      </div>
      <div class="item" @click="message">
        <div class="icon">
          <icon font-name="icon-xiaoxi3" size="45" color="#191919"></icon>
        </div>
        <div class="text">消息</div>
      </div>
      <div class="item" @click="feedback">
        <div class="icon">
          <icon font-name="icon-fankui1" size="45" color="#191919"></icon>
        </div>
        <div class="text">反馈</div>
      </div>
      <div class="item" @click="link('index')">
        <div class="icon">
          <icon font-name="icon-shouye1" size="45" color="#191919"></icon>
        </div>
        <div class="text">首页</div>
      </div>
      <div class="item" @click="share">
        <div class="icon">
          <icon font-name="icon-fenxiang" size="45" color="#191919"></icon>
        </div>
        <div class="text">分享</div>
      </div>
    </div>
  </transition>
</template>

<script>
  import {shareMixins} from '../../../utils/mixins'
  export default {
    name: "head-modal",
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        visible: this.value,
      };
    },
    created() {
    },
    mixins:[shareMixins],
    methods: {
      link(url) {
        this.$router.replace({path:'/'})
      },
      showPel(){
        _MEIQIA('showPanel');
      },
      feedback(){
        let {goods_id} = this.$route.query
        this.$router.push({path: '/complaintAsk', query: {goods_id}})
      },
      message(){
        this.$router.push({path:'/message'})
      },
      share(){
        if($prod){
          this.shareHref()
        }
      }
    },
    components: {},
    computed: {},
    watch: {
      value(val) {
        this.visible = val;
      },
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/mixin";

  .modal-box {
    overflow: hidden;
    position: absolute;
    top: pxTorem(100);
    right: 0;
    width: pxTorem(280);
    /*height: pxTorem(360);*/
    z-index: 1000;
    background-color: rgba(249, 249, 249, 0.7);
    transition: .2s ease-out;
    .item{
      margin: 0 pxTorem(50);
      padding: pxTorem(6) 0;
      @include fja(space-between);
      border-bottom: pxTorem(1) solid #dadada;
      &:last-child{
        border-bottom: none;
      }
      .text{
        color: #191919;
        font-size: pxTorem(30);
      }
    }

  }
  .currentTransition-enter,
  .currentTransition-leave-active {
    opacity: 0.7;
  }
  .currentTransition-leave-active {
    opacity: 0;
  }
</style>
