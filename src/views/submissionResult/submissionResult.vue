<template>
  <div class="">
    <ts-header title="提交成功" custom @onBack="back"></ts-header>
    <page>
      <div class="wrap">
        <div class="goods-content border-1px">
          <div class="goods-img">
            <img src="../../assets/imgs/buyDrill/round.png" alt="" />
          </div>
          <div class="goods-data">
            <div class="title">钻石信息</div>
            <div class="text">{{diamondsText}}</div>
          </div>
        </div>

        <div class="box">
          <div class="icon">
            <icon font-name="icon-chenggong" color="#bd081c" size="80"></icon>
            <h3>提交成功</h3>
            <div class="tip">
              钻石信息提交成功，审核结果将尽快反馈
            </div>
          </div>

          <div class="btn">
            <ds-button width="230" height="80" type="default" plain @click="back"> <span style="font-size: 0.36rem">继续上传</span> </ds-button>
            <ds-button width="230" height="80" type="primary" @click="next"><span style="font-size: 0.36rem">确定</span> </ds-button>
          </div>
        </div>
      </div>
    </page>

  </div>
</template>

<script>
  import { SUB_DIAMONDS_INFO } from '../../store/mutations/mutations-types'
  import {HttpImgUrl} from '../../assets/js/api'

  export default {
    name:'submissionResult',
    data () {
      return {
        diamondsText:'',
        shape:'',
        imgUrl:''
      }
    },
    created () {
      this.diamondsText = this.$route.params.diamondsText;
      this.shape = this.$route.params.shape
      this.imgUrl = `../../assets/imgs/buyDrill/${this.shape}.png`

    },
    methods: {
      next(){
        this.$store.commit(SUB_DIAMONDS_INFO,null);
        setTimeout(()=>{
          this.$router.replace({path:'/diamondOrder',query:{types:1,index:0}})
        },200)
      },
      back(){
        this.$store.commit(SUB_DIAMONDS_INFO,null);
        setTimeout(()=>{
          this.$router.goBack()
        },200)
      },
    },
    components: {},
    computed: {
      // imgUrl(){
      //   return `../../assets/imgs/buyDrill/${this.shape}.png`
      // }
    },

  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/variables";
  @import "../../assets/css/mixin";

  .wrap {
    background: #fff;
    .goods-content {
      min-height: pxTorem(184);
      padding-left: pxTorem(36);
      @include fja(space-between);
      .goods-img {
        flex-shrink: 0;
        width: pxTorem(60);
        height: pxTorem(60);
        img {
          width: 100%;
          height: 100%;
        }
      }
      .goods-data {
        padding-left: pxTorem(30);
        padding-right: pxTorem(120);
        flex: 1;
        //@include fja();
        .title {
          font-size: pxTorem(26);
          color: #2a2a2a;
        }
        .text {
          padding-top: pxTorem(8);
          font-size: pxTorem(24);
          color: #a1a5a8;
        }
      }
    }
    .box {
      @include fja();
      flex-direction: column;
      .icon {
        margin-top: pxTorem(120);
        @include fja();
        flex-direction: column;
        h3 {
          padding-top: pxTorem(30);
          font-size: pxTorem(40);
        }
        .tip {
          padding-top: pxTorem(30);
          font-size: pxTorem(26);
          color: #999999;
        }
      }
      .btn {
        width: 80%;
        @include fja();
        margin-top: pxTorem(140);
        justify-content: space-between;
      }
    }
  }
</style>
