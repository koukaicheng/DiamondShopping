<template>
  <div class="wrap">
    <ts-header title="镶嵌服务" back rightIcon="icon-gouwuche2" @headerEvent="link"></ts-header>

    <page>
      <cube-scroll ref="scroll" :options="options" listenScroll :data="goodsList"
                   @pulling-down="onPullingDown"
                   @pulling-up="onPullingUp">
        <div v-if="temporaryInfo!==null">
          <div class="cell border-1px">
            <div class="left">
              <icon font-name="icon-zuanshi" size="50" color="#a2a5a9"></icon>
              <span class="title">已选择钻石</span>
            </div>
            <div class="right" @click="cartLink">
              <span class="text">换一颗</span>
              <icon font-name="icon-fanhui" size="30" color="#b4b4b4"></icon>
            </div>
          </div>
          <div class="goodsList-inline">
            <div class="slide-item">
              <div class="slide-head">
                <img :src="temporaryInfo.img_url" alt="">
              </div>
              <div class="slide-content">
                <div class="title">{{temporaryInfo.goods_name}}</div>
                <div class="flex-status">
                  <div class="moreny">￥{{temporaryInfo.goods_price}}</div>
                  <div class="tag">
                    <span>{{temporaryInfo.is_new==='0'?'全新':'二手'}}</span>
                    <span>{{temporaryInfo.delivery_time}}日发货</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="banner" ref="banner" v-if="temporaryInfo===null">
          <img src="../../assets/imgs/banner2.jpg" alt="">
        </div>
        <div class="topBox">
          <div class="line_top"></div>
          <div class="screen-box">
            <div class="item" @click="listSort('price')">
              <div class="name">价格</div>
              <div class="icon">
                <div class="botm" :class="{'active':order_by==='price'&&order==='asc'}"></div>
                <div class="line"></div>
                <div class="top" :class="{'active':order_by==='price'&&order==='desc'}"></div>
              </div>

            </div>
            <div class="item" @click="listSort('view')">
              <div class="name">人气</div>
              <div class="icon">
                <div class="botm" :class="{'active':order_by==='view'&&order==='asc'}"></div>
                <div class="line"></div>
                <div class="top" :class="{'active':order_by==='view'&&order==='desc'}"></div>
              </div>
            </div>
            <div class="item" @click="listSort('cycle')">
              <div class="name">订货时间</div>
              <div class="icon">
                <div class="botm" :class="{'active':order_by==='cycle'&&order==='asc'}"></div>
                <div class="line"></div>
                <div class="top" :class="{'active':order_by==='cycle'&&order==='desc'}"></div>
              </div>
            </div>
            <div class="item" @click="switchClass">
              <icon :font-name="iconClass" size="30"></icon>
            </div>
          </div>
        </div>
        <div :class="goodsStatus?'goodsList-inline ':'goodsList-block'">
          <div class="slide-item " v-for="(item,index) in goodsList" :class="goodsStatus?'border-1px ':''"
               @click="goodsDetail(item.goods_id)">
            <div class="slide-head">
              <img :src="item.goods_image_url" alt="">
            </div>
            <div class="slide-content">
              <div class="title">{{item.goods_name}}</div>
              <div class="flex-status">
                <div class="moreny">￥{{item.goods_price}}</div>
                <div class="tag">
                  <span>1日</span>
                  <span>15日</span>
                </div>
              </div>
            </div>
            <div class="icon" v-show="goodsStatus">
              <icon font-name="icon-fanhui" size="36" color="#ababab"></icon>
            </div>
          </div>
        </div>
      </cube-scroll>
    </page>
    <div class="footer" v-if="temporaryInfo===null">
      <div class="tip">您还可以先挑选钻石</div>
      <div class="btn" @click="cartLink">去挑选钻石</div>
    </div>
  </div>
</template>
<script>
  import scroll from '../../components/module/Scroll/Scroll'
  import { goodsMixins } from '../../utils/mixins'
  import { RingList } from '../../assets/js/api'
  import { TEMPORARY_INFO } from '../../store/mutations/mutations-types'

  export default {
    name: 'lnlayService',
    data () {
      return {
        goodsStatus: false,
        firstStuts: true,
        temporaryInfo: null,
        order_by: '',
        order: '',
        fromPath:''
      }
    },
    activated () {
      this.temporaryInfo = this.$store.state.temporaryInfo
    },
    created () {
      // console.log(this.$router)
    },
    mixins: [goodsMixins],
    methods: {
      listSort (type) {
        if (this.order_by !== type) {
          this.order_by = type
          this.order = 'desc'
        } else {
          let str = this.order === 'asc' ? 'desc' : 'asc'
          this.order = str
        }
        this.firstStuts = true
        this.curpage = 1
        this.getGoddsList(true)
      },
      link () {
        this.$router.push({path: '/cart'})
      },
      cartLink () {
        this.$store.commit(TEMPORARY_INFO, null)
        this.$router.push({path: '/diamondsList'})
      },
      goodsDetail (id) {
        this.$router.push({path: '/cutoffDetails', query: {goods_id: id}})
      },
      linkList () {},
      switchClass () {
        this.goodsStatus = !this.goodsStatus
      },
      async getGoddsList (off) {
        let obj = this.firstStuts === true ? {show: true, type: 'mini'} : {}
        let json = await this.$http.get(RingList, {curpage: this.curpage, page: 6}, obj)
        this.RequestGoodsData(off, json)
        this.firstStuts = false
      },
    },
    components: {
      'cube-scroll': scroll,
    },
    computed: {
      iconClass () {
        return !this.goodsStatus ? 'icon-caidan' : 'icon-gengduo'
      }
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/css/icon.css";
  @import "../../assets/css/mixin";
  @import "../../assets/css/variables";

  .wrap {
    background: #fff;
    .cell {
      @include fja(space-between);
      padding: pxTorem(10) pxTorem(18);
      div {
        @include fja();
        .title {
          color: #191919;
          font-size: pxTorem(26);
          padding-left: pxTorem(21);
        }
        .text {
          font-size: pxTorem(24);
          color: #b4b4b4;
          padding-right: pxTorem(4);
        }
      }
    }
    .banner {
      height: pxTorem(242);
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .cell-tips {
      font-size: pxTorem(24);
      color: #b4b4b4;
      padding-right: 0.2rem;
    }
    .topBox {
      position: relative;
      .line_top {
        position: absolute;
        width: 100%;
        height: 1px;
        background: #fff;
        left: 0;
        top: -1px;
      }
      .screen-box {
        background-color: #fbfbfb;
        height: pxTorem(76);
        @include fja(space-between);
        padding: 0 0.5rem;
        .item {
          @include fja();
          height: 30px;
          .name {
            font-size: pxTorem(28);
            color: #030303;
          }
          .icon {
            @include fja(space-between);
            flex-direction: column;
            padding-left: 0.2rem;
            .top {
              width: 0;
              height: 0;
              border-left: pxTorem(6) solid transparent;
              border-right: pxTorem(6) solid transparent;
              border-top: pxTorem(8) solid #b2b2b2;
              margin-bottom: 2px;
              &.active {
                border-top: pxTorem(8) solid $themeColor;
              }
            }
            .line {
              width: 6px;
              height: 2px;
              background: #fbfbfb;
            }
            .botm {
              margin-top: 2px;
              width: 0;
              height: 0;
              border-left: pxTorem(6) solid transparent;
              border-right: pxTorem(6) solid transparent;
              border-bottom:pxTorem(8) solid #b2b2b2;
              &.active {
                border-bottom: pxTorem(8) solid $themeColor;
              }
            }

          }
          .checkbox {
            width: pxTorem(34);
            height: pxTorem(34);
            background-color: #ffffff;
            border-radius: pxTorem(6);
            border: solid 1px #b9b9b9;
          }
        }
      }
    }
  }

  .goodsList-inline {
    padding-bottom: pxTorem(20);
    margin: 0 pxTorem(24);
    .slide-item {
      position: relative;
      @include fja();
      padding: pxTorem(20) pxTorem(20);
      font-size: pxTorem(26);
      box-sizing: border-box;
      color: #2a2a2a;
      background: #fff;
      .slide-head {
        width: pxTorem(106);
        height: pxTorem(106);
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .slide-content {
        flex: 1;
        padding-left: pxTorem(20);
        line-height: 1.8;
        .title {

        }
        .flex-status {
          @include fja(center, flex-start);
          flex-direction: column;
          .moreny {
            font-size: pxTorem(30);
            color: #bd081c;
          }
          .tag {
            margin-top: pxTorem(5);
            span {
              padding: pxTorem(6) pxTorem(12);
              margin-right: pxTorem(10);
              border-radius: pxTorem(8);
              border: solid 1px #d8d8d8;
              color: #4b4b4b;
            }
          }
        }
      }
      .icon {
        margin-left: pxTorem(230);
      }
      &:last-child {
        /*border-bottom: none;*/
      }
    }
  }

  .goodsList-block {
    @include fja(space-between);
    padding: pxTorem(20) pxTorem(30);
    flex-wrap: wrap;
    .slide-item {
      width: pxTorem(334);
      height: pxTorem(418);
      padding-bottom: pxTorem(20);
      overflow: hidden;
      margin-top: 0.3rem;
      border-radius: pxTorem(8);
      border: solid 1px #efefef;
      @include fja();
      /*justify-content: space-between;*/
      justify-content: flex-start;
      flex-direction: column;
      .slide-head {
        width: 100%;
        height: pxTorem(284);
        overflow: hidden;
        flex-shrink: 0;
        border-bottom: 1px solid #cdcdcd;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .slide-content {
        width: 100%;
        @include fja(center, flex-start);
        flex-direction: column;
        margin-top: pxTorem(16);
        padding: 0 0 0 0.2rem;
        .title {
          /*padding-top: 0.2rem;*/
          font-size: pxTorem(26);
          color: #191919;
        }
        .flex-status {
          width: 100%;
          @include fja(space-between);
          margin-top: 0.1rem;
          .moreny {
            font-size: pxTorem(26);
            color: $themeColor;
          }
          .tag {
            @include fja();
            span {
              font-size: pxTorem(22);
              padding: pxTorem(3) pxTorem(10);
              margin-right: pxTorem(10);
              border-radius: pxTorem(8);
              border: solid 1px #d8d8d8;
              color: #4b4b4b;
              flex-shrink: 0;
            }
          }
        }
      }
    }
  }

  .footer {
    @include fja();
    border-top: 1px solid #F5F5F5;
    height: pxTorem(106);
    background: #ffffff;
    .tip {
      font-size: pxTorem(26);
      color: #999999;
    }
    .btn {
      margin-left: pxTorem(76);
      @include fja();
      width: pxTorem(208);
      height: pxTorem(60);
      border-radius: pxTorem(8);
      border: solid 1px $themeColor;
      color: $themeColor;
      font-size: pxTorem(26);
    }
  }
</style>
