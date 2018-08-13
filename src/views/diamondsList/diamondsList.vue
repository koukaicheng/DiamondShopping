<template>
  <div class="wrap">
    <div class="serbox border-1px" ref="serbox">
      <search-box back>
        <icon font-name="icon-jiantou" color="#999999" size="40"></icon>
      </search-box>
    </div>
    <div class="fradBox" v-show="gradeStatus">
      <ds-grade :FinalNum="FinalNum" :experiencesNum="experiencesNum" @close="close"></ds-grade>
    </div>
    <div v-show="headerOff">
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
          <div class="name">浏览量</div>
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

        <div class="item" @click="isNewStatus">
          <div class="checkbox">
            <icon v-show="is_new" font-name="icon-choice" color="#bd081c"></icon>
          </div>
          <div class="name" style="padding-left: 0.2rem">全新</div>
        </div>
      </div>
    </div>
    <page>
      <div class="scroll-box">
        <cube-scroll ref="scroll" @scroll="scroll_" :data="goodsList" :options="options"
                     listenScroll
                     @pulling-down="onPullingDown"
                     @pulling-up="onPullingUp">
          <div class="banner" ref="banner">
            <img src="../../assets/imgs/banner2.jpg" alt="">
          </div>
          <div ref="navWarp" v-show="!headerOff">
            <div ref="navContent" class="screen-box">
              <div class="item" @click="listSort('price')">
                <div class="name">价格</div>
                <div class="icon">
                  <div class="botm" :class="{'active':order_by==='price'&&order==='asc'}"></div>
                  <div class="line"></div>
                  <div class="top" :class="{'active':order_by==='price'&&order==='desc'}"></div>
                </div>

              </div>
              <div class="item" @click="listSort('view')">
                <div class="name">浏览量</div>
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

              <div class="item" @click="isNewStatus">
                <div class="checkbox">
                  <icon v-show="is_new" font-name="icon-choice" color="#bd081c"></icon>
                </div>
                <div class="name" style="padding-left: 0.2rem">全新</div>
              </div>
            </div>
          </div>
          <div class="boxs" ref="boxs">
            <slide ref="slide" slide :list="goodsList" @addordel="addordel" @addCart="addCart"></slide>
            <div class="bk"></div>
          </div>
        </cube-scroll>
      </div>
    </page>
    <div class="footer">
      <div class="left">
        <div class="item" @click="link('cart')">
          <i class="iconfont icon-gouwuche2"></i>
          <span class="title">购物车</span>
          <span v-if="cartListLength>0" class="contrastLength">{{cartListLength}}</span>
        </div>
        <div class="item" @click="link('diamondContrast')">
          <span class="vs">vs</span>
          <span class="title">对比</span>
          <span v-if="contrastLength>0" class="contrastLength">{{contrastLength}}</span>
        </div>
      </div>
      <div class="right">
        <div class="btn" @click="buyDrill">
          <i class="iconfont icon-shaixuan"></i>
          <span>筛选</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import scroll from '../../components/module/Scroll/Scroll'
  import SearchBox from '../../components/uiModule/SearchBox/SearchBox'
  import { goodsMixins } from '../../utils/mixins'
  import { GoodsList, GoodsNum } from '../../assets/js/api'

  export default {
    name: 'diamondsList',
    data () {
      return {
        off: true,
        posY: 0,
        headerOff: false,
        minHeight: null,
        gradeStatus:true,
        firstStuts: true,
        FinalNum: 0,
        fromData: {
          is_new: {
            new: true, old: true
          }
        },
        order_by: '',
        order: '',
        experiencesNum: 0,
        // is_new: false,
        // goodsList: [],
      }
    },
    mixins: [goodsMixins],
    created () {
      let fromData = this.$route.params.fromData
      if (fromData) {
        this.fromData = fromData
      }
      this.goodsNum()
    },
    mounted () {
      setTimeout(() => {
        let topVal = this.$refs.navWarp.offsetTop
        this.topVal = topVal
      }, 200)
    },
    computed: {
      is_new () {
        let status = this.fromData.is_new.new === true && this.fromData.is_new.old === false
        return status
      }
    },
    // beforeRouteLeave (to, from, next) {
    //   console.log(from)
    //   next()
    // },
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
      close () {
        this.gradeStatus = false
      },
      buyDrill(){
        this.$router.isBack = true
        this.$router.replace({path:'/buyDrill'})
      },
      scroll_ (pos) {
        this.$refs.navWarp.height = this.$refs.navWarp.clientHeight + 'px'
        if (pos.y < 0 && Math.abs(pos.y) >= this.topVal) {
          this.headerOff = true
        } else {
          this.headerOff = false
        }
      },
      async goodsNum () {
        let json = await this.$http.get(GoodsNum, {filter: this.fromData}, {});
        [this.FinalNum, this.experiencesNum] = [json.datas.total, json.datas.filter_total]
      },
      async getGoddsList (off) {
        let obj = this.firstStuts === true ? {show: true, type: 'mini'} : {}
        let json = await this.$http.get(GoodsList, {
          filter: this.fromData,
          curpage: this.curpage,
          order_by: this.order_by,
          order: this.order
        }, obj)
        this.RequestGoodsData(off, json)
        this.firstStuts = false
      },
      isNewStatus () {
        if (this.is_new) {
          this.fromData.is_new.new = true
          this.fromData.is_new.old = true
        } else {
          this.fromData.is_new.new = true
          this.fromData.is_new.old = false
        }
        // console.log()
        this.firstStuts = true
        this.curpage = 1
        this.getGoddsList(true)
      },
    },
    watch: {
      minHeight (val) {
        console.log(val)
      },
    },
    components: {
      SearchBox,
      'cube-scroll': scroll,
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/icon.css";
  @import "../../assets/css/mixin";
  @import "../../assets/css/variables";
  /*.bk{*/
  /*background: #F5F5F5;*/
  /*height: pxTorem(30);*/
  /*}*/
  .nav-fixed {
    z-index: 9999;
    position: fixed;
    top: 4rem;
    left: 0;
    width: 100%;
  }

  .scroll-box {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
  }

  .boxs {
    -webkit-overflow-scrolling: touch;
    padding-bottom: pxTorem(30);
    position: relative;
    .bk {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: pxTorem(30);
      background: #F5F5F5;
    }
  }

  .serbox {
    padding: 0.14rem 0;
  }

  .wrap {
    background: #fff;
    .banner {
      width: 100%;
      overflow: hidden;
      height: pxTorem(242);
      transition: all 0.2s;
      img {
        width: 100%;
        /*height: pxTorem(242);*/
      }
    }
  }

  .fradBox {
    /*margin-top: 0.3rem;*/
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
          margin-bottom: 1px;
          &.active {
            border-top: pxTorem(8) solid $themeColor;
          }
        }
        .line {
          width: 6px;
          height: 1px;
          background: #fbfbfb;
        }
        .botm {
          margin-top: 1px;
          width: 0;
          height: 0;
          border-left: pxTorem(6) solid transparent;
          border-right: pxTorem(6) solid transparent;
          border-bottom: pxTorem(8) solid #b2b2b2;
          &.active {
            border-bottom: pxTorem(8) solid $themeColor;
          }
        }
      }
      .checkbox {
        @include fja();
        width: pxTorem(34);
        height: pxTorem(34);
        background-color: #ffffff;
        border-radius: pxTorem(6);
        border: solid 1px #b9b9b9;
      }
    }
  }

  .footer {
    height: pxTorem(117);
    background-color: #ffffff;
    border-top: 1px solid #F5F5F5;
    @include fja(space-between);
    .left {
      @include fja();
      padding-left: pxTorem(36);
      .item {
        @include fja();
        flex-direction: column;
        position: relative;
        .contrastLength {
          @include fja();
          position: absolute;
          right: -(pxTorem(10));
          top: -(pxTorem(8));
          min-width: pxTorem(28);
          /*width: auto;*/
          height: pxTorem(28);
          padding: pxTorem(2);
          color: #fff;
          font-size: pxTorem(20);
          background: $themeColor;
          border-radius: 100px;
        }
        i {
          font-size: pxTorem(50);
        }
        .vs {
          @include fja();
          width: pxTorem(52);
          height: pxTorem(52);
          border: solid 1px #c4c4c4;
          border-radius: 50%;
          font-size: pxTorem(36);
        }
        .title {
          font-size: pxTorem(22);
          color: #161616;
        }
        &:last-child {
          margin-left: pxTorem(36);
          .title {
            margin-top: pxTorem(8);
          }
        }
      }
    }
    .right {
      .btn {
        @include fja();
        width: pxTorem(280);
        height: pxTorem(80);
        border-radius: pxTorem(8);
        background: #bd081c;
        color: #ffffff;
        margin-right: 0.3rem;
        i {
          font-size: pxTorem(40);
        }
        span {
          font-size: pxTorem(30);
          margin-left: 0.2rem;
        }
      }
    }
  }
</style>
