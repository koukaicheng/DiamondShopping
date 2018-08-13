<template>
  <div class="">
    <ts-header title="检测结果" back></ts-header>
    <page>
      <div class="wrap">
        <div class="header-good border-1px">
          <div class="good-img">
          </div>
          <div class="good-content">
            <div class="good-class">重量1.02Ct 颜色F 净度WS 切工EX 荧光N</div>
            <div class="good-number">证书号：1252123365</div>
          </div>
        </div>
        <div class="result">
          <div class="gth">!</div>
          <h3>检测未通过</h3>
          <div class="reason">
            原因：送检样品与提交钻石参数不符
          </div>
          <div class="handle">
            已将付款退回至余额，请重新选择
          </div>
        </div>
        <div class="good-list">
          <ds-head name="精选推荐"></ds-head>
          <slide></slide>
          <slide></slide>
          <slide></slide>
          <slide></slide>
          <slide></slide>
        </div>
      </div>
    </page>
  </div>
</template>
<script>

  export default {
    data() {
      return {};
    },
    created() {
    },
    methods: {},
    components: {},
    computed: {}
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/css/mixin";
  @import "../../assets/css/variables";

  .wrap {
    .header-good {
      background: #fff;
      @include fja();
      height: pxTorem(154);
      .good-img {
        width: pxTorem(62);
        height: pxTorem(62);
        /*border-radius: 50%;*/
        background: #2a2a2a;
        margin-left: pxTorem(36);
      }
      .good-content {
        @include fja();
        flex-direction: column;
        flex: 1;
        align-items: flex-start;
        margin-left: pxTorem(40);
        .good-class {
          font-size: pxTorem(26);
          color: #2a2a2a
        }
        .good-number {
          padding-top: pxTorem(16);
          font-size: pxTorem(26);
          color: #a1a5a8;
        }
      }
    }
    .result {
      background: #fff;
      height: pxTorem(406);
      @include fja(flex-start);
      flex-direction: column;
      .gth {
        @include fja();
        width: pxTorem(90);
        height: pxTorem(90);
        background: $themeColor;
        border-radius: 50%;
        color: #fff;
        flex-shrink: 0;
        margin-top: pxTorem(64);
      }
      h3 {
        margin-top: pxTorem(40);
        font-size: pxTorem(40);
      }
      .reason {
        margin-top: pxTorem(36);
      }
      .reason, .handle {
        font-size: pxTorem(26);
        color: #999999;
      }
      .handle{
        margin-top: 0.1rem;
      }
    }
    .good-list{
      margin-top: pxTorem(10);
    }
  }
</style>
