<template>
  <div :key="fullPath">
    <!--<ts-header title="戒指详情" back></ts-header>-->
    <ts-header back title="戒指详情" rightIcon="icon-diandiandianshu" @headerEvent="headOff"></ts-header>
    <page>
      <div class="wrap" @touchstart.stop="kkc">
        <div class="swiper border-1px">
          <ds-swiper :data="items" :auto-play="items.length>1" :loop="items.length>1">
            <template slot="dots" slot-scope="props">
              <div class="dots">
                <div>
                  {{props.current+1}}/{{props.dots.length}}
                </div>
              </div>
            </template>
          </ds-swiper>
        </div>

        <div class="good-content">
          <div class="goods-info border-1px">
            <div class="goods-class">
              <div class="text">{{info.goods_name}}</div>
              <!--<div class="share">-->
              <!--<icon font-name="icon-fenxiang" size="40"></icon>-->
              <!--</div>-->
            </div>

            <div class="goods-price">
              <div class="money_num">
                <div class="num">
                  ¥{{info.goods_price}}
                </div>

                <div class="lv" v-if="level!==null">
                  <lv :num="level"></lv>
                </div>
              </div>
              <!--<div class="original-price ">¥1231</div>-->
            </div>

            <div class="bottom">
              <div class="left-btn">
                <div class="btn" v-for="(item,index) in info.goods_custom" :key="index"
                     v-text="item.name+item.value+'日发货'"></div>
              </div>
              <div class="collection-num" @click="favorate">
                <icon :font-name="favorateName" size="40" :color="favorateColor"></icon>

                <span class="num" v-show="info.goods_collect!='0'">{{info.goods_collect}}</span>
              </div>
            </div>
          </div>
          <div class="brand ">
            <!--<div class="brand-log">-->
            <!--<img src="" alt="">-->
            <!--</div>-->
            <div class="brand-name">卖家: 艾福瑞卡钻石</div>
            <!--<div class="btn-box">-->
            <!--<div class="btn">-->
            <!--保-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="brand-grande">-->
            <!--<icon font-name="icon-zuanshi1" size="40"></icon>-->
            <!--</div>-->
          </div>
          <div class="back"></div>
          <div class="process ">
            <ds-head name="成品空托"
                     border-all="none"
                     more-name=" "
                     :more=false>
              <span slot="tip" style="position: absolute;width: 4.3rem;left: 2.4rem;">建议搭配的钻石大小：1~1.1ct</span>
            </ds-head>
            <div class="btn-box border-1px">
              <div class="btn-item" v-for="(item,index) in spec_info.standard" :key="index"
                   :class="{'active':item.checked&&tabIndex===0}" @click="format(index,0)">
                {{item.spec_name}}
              </div>
            </div>
            <ds-head name="定制镶嵌"
                     border-all="none"
                     more-name=" "
                     :more=false>
            </ds-head>
            <div class="customized border-1px">

              <!--<div class="title">定制镶嵌</div>-->
              <div class="box">
                <div class="title">材质</div>
                <div class="btn-item" v-for="(item,index) in spec_info.custom" :key="index"
                     :class="{'active':item.checked&&tabIndex===1}" @click="format(index,1)">
                  {{item.spec_name}}
                </div>
              </div>
              <div class="box cume" style="display: flex;align-items: center">
                <div class="title">手寸
                </div>
                <div class="silder-box" :key="fullPath" style="margin-left: 0.3rem">
                  <vue-slider v-bind="opctions" off  v-model="opctions.value"></vue-slider>
                </div>
              </div>
            </div>
            <div class="tbody">
              <div class="tip-text">
                手寸测量方法
              </div>
              <div class="status" @click="boxStatus">
                <icon font-name="icon-jiantou-copy" size="36" color="#a7a7a7"></icon>
              </div>
              <div :class="{'hide':off===false,'box':off===true}" class="all-box" ref="allBox"></div>
            </div>
            <div class="back"></div>
            <div class="cell-box">
              <div class="bix">
                <ds-cell title="镶嵌服务说明"
                         link="/inlayDescription"
                         icon="icon-icon6"></ds-cell>
                <ds-cell title="价值保障"
                         link="/valueGuarantee"
                         icon="icon-icon6"></ds-cell>
                <ds-cell title="投诉与反馈" isLink mode="edit"
                         icon="icon-icon6" @click="complaintAsk(info.goods_id)"></ds-cell>
              </div>
            </div>
            <div class="back"></div>
          </div>
          <ds-head name="推荐款式" border-all=" " more-name=" " :more=false></ds-head>
          <div class="goodsList-block">
            <div class="slide-item " v-for="(item,index) in goodsList" :key="index"
                 @click="goodsDetailLink(item.goods_id)">
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
            </div>
          </div>
          <div class="back"></div>
        </div>
      </div>
    </page>
    <head-modal v-model="headStatus"></head-modal>
    <div class="footer">
      <div class="goods-text border-1px" v-if="temporaryInfo!==null">
        <div class="title">已选钻石：</div>
        <div class="content">{{temporaryInfo.goods_name}}</div>
        <div class="icon" @click="delGoods">
          <icon font-name="icon-jiaochacross80" size="34"></icon>
        </div>
      </div>
      <div class="box">
        <div class="left">
          <div class="item" @click="link('cart',false)">
            <i class="iconfont icon-gouwuche2"></i>
            <span class="title">购物车</span>
            <span v-if="cartListLength>0" class="contrastLength">{{cartListLength}}</span>
          </div>
        </div>
        <div class="right" v-if="temporaryInfo!==null">
          <div class="tip">选择此镶嵌款式</div>
          <div class="btn" @click="addCart">
            <span>加入购物车</span>
          </div>
        </div>
        <div class="right" v-else>
          <div class="tip">您还可以先挑选钻石</div>
          <div class="btn status" @click="link('diamondsList',true)"><span>去挑选钻石</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Lv from '../../components/uiModule/DiamondsLv/DiamondsLv'
  import {
    GoodsDetail,
    RingList,
    CartCount,
    CartAddInlay,
    CartAdd,
    CartListData,
    FavoritesFel,
    FavoritesAdd,
    Agreement
  } from '../../assets/js/api'
  import { TEMPORARY_INFO } from '../../store/mutations/mutations-types'

  export default {
    name: 'cutoffDetails',
    data () {
      return {
        headStatus: false,
        cartListLength: 0,
        items: [],
        info: {},
        spec_info: {},
        level: 0,
        tabIndex: 0,
        temporaryInfo: null,
        goodsList: [],
        off: false,
        is_favorate: false,
        goodsId: '',
        opctions: {
          clickable: false,
          min: 6,
          max: 24,
          value: 20,
          dotSize: 26,
          tooltipStyle: {
            'display': 'none',
          },
          tooltip: 'always',
          tooltipStyle: {
            'background-color': '#fff',
            'border': 'none',
            'color': '#000',
            'font-size': '0.3rem'
          },
          bgStyle: {
            'backgroundColor': '#bd081c'
          },
          processStyle: {
            'backgroundColor': '#bd081c'
          },
        }
      }
    },
    created () {
      this.goodsId = this.$route.query.goods_id
      this.goodDetail(this.goodsId)
      this.getGoddsList()
      this.getAgreementData()
      if (this.$store.state.userinfo && this.$store.state.key) {
        this.level = this.$store.state.userinfo.level
        // this.cartLength()
      }
      this.temporaryInfo = this.$store.state.temporaryInfo
    },
    computed: {},
    methods: {
      async getGoddsList () {
        let json = await this.$http.get(RingList, {page: 6}, {})
        if (json.code === 200) {
          this.goodsList = json.datas.goods_list
        }
      },
      async cartLength () {
        let json = await this.$http.post(CartCount, {}, {})
        this.cartListLength = json.datas.cart_count
      },
      async favorate () {
        let url = this.is_favorate ? FavoritesFel : FavoritesAdd
        let obj = this.is_favorate ? {fav_id: this.goodsId} : {goods_id: this.goodsId}
        let json = await this.$http.post(url, {post: obj}, {}, {
          show: true,
          type: 'mini'
        })
        if (json.code === 200) {
          this.is_favorate = !this.is_favorate
        }
      },
      async format (index, tabIndex) {
        this.tabIndex = tabIndex
        this.forEachSpecfo()
        if (tabIndex === 0) {
          let checked = this.spec_info.standard[index].checked
          this.spec_info.standard[index].checked = !checked
          this.goodsId = this.spec_info.standard[index].goods_id
          let json = await this.$http.get(GoodsDetail, {goods_id: this.goodsId}, {show: true, type: 'mini'})
          this.info = json.datas.goods_info
        } else {
          let checked = this.spec_info.custom[index].checked
          this.spec_info.custom[index].checked = !checked
          this.goodsId = this.spec_info.custom[index].goods_id
        }
      },
      forEachSpecfo () {
        this.spec_info.standard.forEach((item, index, arr) => {
          item.checked = false
        })
        this.spec_info.custom.forEach((item, index, arr) => {
          item.checked = false
        })
      },
      kkc () {
        if (this.headStatus) {
          this.headStatus = false
        }
      },
      delGoods () {
        this.$store.commit(TEMPORARY_INFO, null)
        this.temporaryInfo = null
      },
      link (name, type) {
        if (!type) {
          this.$router.push({name})
        } else {
          this.$router.replace({name})
        }
      },
      goodsDetailLink (goods_id) {
        if (this.$route.name === 'cutoffDetails') {
          this.$router.push({path: '/cutoffDetailstwo', query: {goods_id}})
        } else {
          this.$router.push({path: '/cutoffDetails', query: {goods_id}})
        }
      },
      boxStatus () {
        this.off = !this.off
      },
      async addCart () {
        let inlay_id = this.info.goods_id
        if (this.temporaryInfo.cartId) {
          let cart_id = this.temporaryInfo.cartId
          this.addInlay(inlay_id, cart_id)
        } else {
          let list = []
          let cartList = await this.$http.post(CartListData, {}, {})
          cartList.datas.cart_list.forEach((item, index, arr) => {
            list.push(...item.goods)
          })
          let order = list.filter((i) => i.goods_id === this.temporaryInfo.goods_id)[0]
          if (order) {
            let cart_id = order.cart_id
            this.addInlay(inlay_id, cart_id)
          } else {
            let json = await this.$http.post(CartAdd, {post: {quantity: 1, goods_id: this.temporaryInfo.goods_id}}, {})
            if (json.code === 200) {
              let {cart_id} = json.datas
              this.addInlay(inlay_id, cart_id)
            }
          }
        }
      },
      async addInlay (inlay_id, cart_id) {
        let obj = {}
        if (this.tabIndex === 0) {
          obj = {
            inlay_id,
            cart_id
          }
        } else {
          obj = {
            inlay_id,
            cart_id,
            inlay_size: this.opctions.value
          }
        }
        let json = await this.$http.post(CartAddInlay, {post: obj}, {})
        if (json.code === 200) {
          this.$toast('加入成功')
        }
      },
      complaintAsk (goods_id) {
        this.$router.push({path: '/complaintAsk', query: {goods_id}})
      },
      headOff () {
        this.headStatus = !this.headStatus
      },
      async goodDetail (goods_id) {
        let json = await this.$http.get(GoodsDetail, {goods_id}, {show: true, type: 'mini'})
        this.info = json.datas.goods_info
        this.spec_info = json.datas.spec_info
        let banners = json.datas.spec_image
        banners.forEach((item, index, arr) => {
          this.items.push({image: item})
        })
      },
      async getAgreementData(){
        let json = await this.$http.get(Agreement,{doc_code:'measure'},{show:true,type:'mini'})
        this.$refs.allBox.innerHTML = json.datas.doc_content
      },
    },
    components: {
      'ds-swiper': () => import('../../components/module/Swiper/Swiper.vue'),
      'head-modal': () => import('../../components/uimodule/HeadModal/HeadModal.vue'),
      'vueSlider': () => import('../../components/module/Silder/Silder.vue'),
      Lv,
    },
    computed: {
      fullPath () {
        return this.$route.fullPath
      },
      favorateColor () {
        let is_favorate = this.is_favorate
        return is_favorate ? '#bd081c' : '#666'
      },
      favorateName () {
        let is_favorate = this.is_favorate
        return is_favorate ? 'icon-shoucang' : 'icon-xin-xian'
      }
    },
    watch: {
      is_favorate (val) {
        if (val) {
          let num = Number(this.info.goods_collect)
          this.info.goods_collect = num += 1
        } else {
          this.info.goods_collect -= 1
        }
      }
      // fullPath(val){
      //   this.goodsId = this.$route.query.goodsId
      //   this.goodDetail(this.goodsId)
      //   this.getGoddsList()
      //   this.cartLength()
      // }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/mixin";
  @import "../../assets/css/variables";
  @import "../../assets/css/icon.css";

  .wrap {
    .swiper {
      height: pxTorem(628);
      overflow: hidden;
      .dots {
        height: pxTorem(50);
        z-index: 100;
        margin-bottom: pxTorem(22);
        @include fja(flex-end);
        div {
          @include fja();
          width: pxTorem(94);
          height: pxTorem(48);
          background-color: rgba(178, 178, 178, 0.8);
          border-radius: pxTorem(24);
          color: #fff;
          font-size: pxTorem(28);
        }
      }
    }
    .good-content {
      background: #fff;
      .goods-info {
        margin: 0 pxTorem(20);
        padding: 0 pxTorem(26);
        .goods-class {
          padding-top: pxTorem(26);
          @include fja(space-between);
          .text {
            color: #191919;
            font-size: pxTorem(30);
          }
          .share {
            @include fja();
          }
        }
        .goods-price {
          padding-top: pxTorem(24);
          @include fja(flex-start);
          .money_num {
            @include fja();
            font-size: pxTorem(32);
            color: $themeColor;
            .lv {
              margin-left: pxTorem(30);
            }
          }
          .original-price {
            text-decoration: line-through;
            font-size: pxTorem(30);
            color: #a7a7a7;
            margin-left: pxTorem(60);
          }
        }
        .bottom {
          padding: pxTorem(26) 0;
          @include fja(space-between);
          .left-btn {
            @include fja(flex-start);
            .btn {
              padding: pxTorem(6) pxTorem(18);
              border-radius: pxTorem(8);
              border: solid 1px #d8d8d8;
              font-size: pxTorem(22);
              color: #4b4b4b;
              margin-left: pxTorem(10);
              &:first-child {
                margin-left: 0;
              }
            }
          }
          .collection-num {
            @include fja();
            .num {
              font-size: pxTorem(30);
              color: #a7a7a7;
            }
          }
        }
      }
      .brand {
        @include fja(flex-start);
        padding: pxTorem(22) pxTorem(26) pxTorem(22) pxTorem(26);
        margin: 0 pxTorem(20);
        .brand-log {
          width: pxTorem(54);
          height: pxTorem(54);
          background: #2a2a2a;
          border-radius: 50%;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .brand-name {
          /*padding-left: pxTorem(20);*/
          font-size: pxTorem(26);
          color: #191919;
        }
        .btn-box {
          @include fja();
          .btn {
            @include fja(space-between);
            padding: pxTorem(6) pxTorem(9);
            border-radius: pxTorem(8);
            border: solid 1px #d8d8d8;
            font-size: pxTorem(22);
            color: #4b4b4b;
            margin-left: 0.2rem;
          }
        }
        .brand-grande {
          padding-left: pxTorem(10);
          @include fja();
          padding-top: 0.02rem;
        }
      }
      .process {
        .btn-box {
          @include fja();
          justify-content: flex-start;
          padding-left: pxTorem(30);
          flex-wrap: wrap;
          padding-bottom: pxTorem(20);
          .btn-item {
            width: pxTorem(220);
            flex-shrink: 0;
            @include fja();
            margin: pxTorem(10) pxTorem(8);
            padding: pxTorem(10) pxTorem(0);
            border: solid 1px #d8d8d8;
            border-radius: pxTorem(8);
            font-size: pxTorem(22);
            color: #4b4b4b;
            &.active {
              border: solid 1px $themeColor;
              color: $themeColor;
            }
          }
        }
        .customized {
          margin: pxTorem(15) pxTorem(45) pxTorem(0) pxTorem(45);
          padding-bottom: pxTorem(40);
          .title {
            color: #191919;
            font-size: pxTorem(26);
          }
          .box {
            @include fja();
            justify-content: flex-start;
            margin-top: pxTorem(10);
            &.cume {
              display: block;
              .silder-box {
                margin-top: pxTorem(40);
                padding-bottom: pxTorem(20);
                width: pxTorem(520);
              }
            }
            .btn-item {
              margin-left: pxTorem(15);
              padding: pxTorem(14) pxTorem(14);
              border: solid 1px #d8d8d8;
              border-radius: pxTorem(8);
              font-size: pxTorem(22);
              color: #4b4b4b;
              &.active {
                border: solid 1px $themeColor;
                color: $themeColor;
              }
            }
          }
        }
        .tbody {
          margin: 0.2rem 0.26667rem 0 0.26667rem;
          z-index: 100;
          overflow: hidden;
          .tip-text {
            padding-top: pxTorem(20);
            text-align: center;
            font-size: pxTorem(26);
            color: #a7a7a7;
          }
          .status {
            @include fja();
          }
          .all-box {
            transition: .4s ease-out;
            padding: 0 0.8rem;
            font-size: 20px;
            overflow: hidden;
          }
          .box, .hide {
            z-index: 1;
            overflow: hidden;
            .item {
              margin: pxTorem(4) pxTorem(26);
              font-size: pxTorem(24);
              @include fja(space-between);
              padding: pxTorem(8) pxTorem(8);
              position: relative;
              .title {
                color: #999999;
              }
            }
          }
          .box {
            height: pxTorem(652);
          }
          .hide {
            height: 0;
          }
        }
        .cell-box {
          background: #F5F5F5;
          .bix {
            background: #ffffff;
            margin: 0 pxTorem(12);
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
          overflow: hidden;
          margin-top: 0.3rem;
          border-radius: pxTorem(8);
          padding-bottom: pxTorem(20);
          border: solid 1px #efefef;
          @include fja();
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
    }
  }

  .footer {
    border-top: 1px solid #F5F5F5;
    background: #ffffff;
    .box {
      padding: pxTorem(16) 0;
      background-color: #ffffff;
      @include fja(space-between);
      .left {
        @include fja();
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
            /*.title{*/
            /*margin-top: pxTorem(5);*/
            /*}*/
          }
        }
      }
      .right {
        @include fja();
        .tip {
          color: #a7a7a7;
          font-size: pxTorem(30);
          padding-right: pxTorem(30);
        }
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
        .status {
          background: none;
          color: $themeColor;
          border: 1px solid $themeColor;
        }
      }
    }
    .goods-text {
      @include fja(space-between);
      margin: 0 pxTorem(20);
      color: #2a2a2a;
      padding: pxTorem(10) 0;
      font-size: pxTorem(26);

    }
  }

  .back {
    height: pxTorem(17);
    background: #F5F5F5;
  }
</style>
