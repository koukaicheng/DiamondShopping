<template>
  <div class="Cart">
    <div class="wrap">
      <div class="content" v-for="(item,index) in list" :key="index" :class="{'status':item.good_num}">
        <div class="header-title border-1px">
          <div class="seller-name">
            卖家：{{item.store_name}}
          </div>
          <div class="service-provider">
            镶嵌服务商：艾福瑞卡
          </div>
        </div>
        <div class="goods-list border-1px" v-if="name==='cart'">
          <div class="checkbox">
            <ds-checkbox :disabled="item.good_num" v-model="item.checked"/>
          </div>
          <div class="goods-item">
            <div class="item">
              <div class="goods-img">
                <img :src="item.affiliated.img_url" alt="">
              </div>
              <div class="goods-content border-1px">
                <div class="box_">
                  <div class="parameter">
                    {{item.goods_name}}
                  </div>
                  <div class="num">
                    <div class="money_num">
                      ￥{{item.goods_price}}
                    </div>
                    <div class="btn-box">
                      <div class="btn">{{item.affiliated.is_new==='0'?'二手':'全新'}}</div>
                      <div class="btn">{{item.affiliated.delivery_time}}日</div>
                    </div>
                  </div>
                  <div class="service_price">服务费: {{item.service_price}}</div>
                </div>
                <div class="icon  ss" @click="cartDel(item.cart_id)">
                  <icon font-name="icon-jiaochacross80" color="#bfbfbf"></icon>
                </div>
              </div>
            </div>
            <div class="item" v-if="item.inlay!==null">
              <div class="goods-img">
                <img :src="item.inlay.goods_image" alt="">
              </div>
              <div class="goods-content">
                <div class="box_">
                  <div class="parameter">
                    {{item.inlay.goods_name}}
                  </div>
                  <div class="num">
                    <div class="money_num">
                      ￥{{item.inlay.goods_price}}
                    </div>
                    <!--<div class="btn-box">-->
                    <!--<div class="btn">二手</div>-->
                    <!--<div class="btn">15日</div>-->
                    <!--</div>-->
                  </div>
                </div>
                <div class="icon" @click="delLnlay(item.cart_id)">
                  <icon font-name="icon-jiaochacross80" color="#bfbfbf"></icon>
                </div>
              </div>
            </div>
            <div class="item" v-else>
              <div class="goods-img">
                <icon font-name="icon-icon-test2" size="55" color="#cfcfcf"></icon>
              </div>
              <div class="goods-content">
                <div class="box_">
                  <div class="box">
                    <div class="tip">未有选择镶嵌款式</div>
                    <div class="btn" @click="addRing(item.cart_id)">去挑选</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="goods-list border-1px" v-else>
          <div class="goods-item">
            <div style="padding-left: 1rem" class="item">
              <div class="goods-img">
                <img :src="item.affiliated.img_url" alt="">
              </div>
              <div class="goods-content ">
                <div class="box_">
                  <div class="parameter">
                    {{item.goods_name}}
                  </div>
                  <div class="num">
                    <div class="money_num">
                      ￥{{item.goods_price}}
                    </div>
                    <div class="btn-box">
                      <div class="btn">{{item.affiliated.is_new==='0'?'二手':'全新'}}</div>
                      <div class="btn">{{item.affiliated.delivery_time}}日</div>
                    </div>
                  </div>
                  <!--<div class="service_price">服务费: {{item.service_price}}</div>-->
                </div>
              </div>
            </div>
            <div style="padding-left: 1rem" class="item" v-if="item.inlay!==null">
              <div class="goods-img">
                <img src="" alt="">
              </div>
              <div class="goods-content">
                <div class="box_">
                  <div class="parameter">
                    {{item.inlay.goods_name}}
                  </div>
                  <div class="num">
                    <div class="money_num">
                      ￥{{item.inlay.goods_price}}
                    </div>
                    <!--<div class="btn-box">-->
                    <!--<div class="btn">二手</div>-->
                    <!--<div class="btn">15日</div>-->
                    <!--</div>-->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer">
          <div class="title">合计</div>
          <div class="money-num">￥{{item.goods_total}}</div>
          <!--<div class="btn " :class="{'cartS':name!=='cart'}">{{item.affiliated.delivery_time}}日</div>-->
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import { TEMPORARY_INFO } from '../../../store/mutations/mutations-types'

  export default {
    name: 'CartList',
    props: {
      name: {
        type: String,
        default: 'cart'
      },
      list: {
        type: Array,
        default: () => []
      },
    },
    data () {
      return {
      }
    },
    created () {
    },
    methods: {
      cartDel (id) {
        this.$emit('cartDel', id)
      },
      delLnlay (id) {
        this.$emit('lnlaytDel', id)
      },
      addRing (cartId) {
        let info = this.list.filter((i) => i.cart_id === cartId)[0]
        let {goods_name, goods_image_url, goods_price, service_price, goods_id} = info
        let {is_new, delivery_time,img_url} = info.affiliated
        let obj = {cartId, goods_name, img_url, goods_price, service_price, is_new, delivery_time, goods_id}
        this.$store.commit(TEMPORARY_INFO, obj)
        this.$router.push({path: '/lnlayService'})
      }
    },
    watch: {
      list (val) {
        // console.log(this.list)
      },
    },
    mounted () {
    },
    components: {},
    computed: {}
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/mixin";
  @import "../../../assets/css/variables";

  .wrap {
    margin: 0 pxTorem(20) 0 pxTorem(20);
    .status {
      background-color: #ececec !important;
    }
    .content {
      &:first-child {
        text-align: center;
        margin-top: 0;
      }
      padding: 0 pxTorem(10);
      margin-top: pxTorem(18);
      /*height: pxTorem(395);*/
      border-radius: pxTorem(6);
      background: #fff;
      .header-title {
        padding-left: pxTorem(12);
        @include fja();
        justify-content: flex-start;
        height: pxTorem(68);
        color: #999999;
        font-size: pxTorem(24);
        .service-provider {
          padding-left: pxTorem(104);
        }
      }
      .checkbox {
        padding: 0 pxTorem(22);
      }
      .goods-list {
        /*height: pxTorem(254);*/
        @include fja(space-between);
        .goods-item {
          height: 100%;
          flex: 1;
          .item {
            height: pxTorem(138);
            @include fja(space-between);
            .goods-img {
              flex-shrink: 0;
              @include fja();
              width: pxTorem(60);
              height: pxTorem(60);
              img {
                width: 100%;
                height: 100%;
              }
            }
            .goods-content {
              padding: 0 pxTorem(18);
              height: 100%;
              @include fja(space-between);
              flex: 1;
              .box_ {
                @include fja();
                flex: 1;
                align-items: flex-start;
                flex-direction: column;
              }
              .icon {
                @include fja();
                height: 100%;
                padding-left: pxTorem(10);
              }
              .box {
                @include fja();
                flex: 1;
                .tip {
                  font-size: pxTorem(26);
                  color: #a3a3a3;
                }
                .btn {
                  padding: pxTorem(9) pxTorem(18);
                  font-size: pxTorem(22);
                  color: $themeColor;
                  border-radius: 8px;
                  border: solid 1px $themeColor;
                  margin-left: pxTorem(31);
                }
              }
              .parameter {
                width: pxTorem(478);
                font-size: pxTorem(26);
                color: #2a2a2a;
                flex: 1;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                text-align: left;
              }
              .num {
                width: 100%;
                padding-right: pxTorem(20);
                margin-top: pxTorem(10);
                @include fja(space-between);
                .money_num {
                  color: $themeColor;
                  font-size: pxTorem(30);

                }
                .btn-box {
                  @include fja(space-between);
                  /*padding:0 pxTorem(18);*/
                  .btn {
                    @include fja(space-between);
                    padding: pxTorem(2) pxTorem(18);
                    border-radius: pxTorem(8);
                    border: solid 1px #d8d8d8;
                    font-size: pxTorem(22);
                    color: #4b4b4b;
                    margin-left: 0.2rem;
                  }
                }
              }
              .service_price {
                font-size: pxTorem(22);
                color: #999999;
              }

            }
          }
        }
      }
      .footer {
        @include fja(space-between);
        height: pxTorem(70);
        .title {
          padding-left: pxTorem(16);
          padding-right: pxTorem(16);
          font-size: pxTorem(26);
          color: #2a2a2a;
        }
        .money-num {
          flex: 1;
          font-size: pxTorem(30);
          color: $themeColor;
          text-align: left;
        }
        .btn {
          margin-right: pxTorem(70);
          @include fja(space-between);
          padding: pxTorem(2) pxTorem(18);
          border-radius: pxTorem(8);
          border: solid 1px #d8d8d8;
          font-size: pxTorem(22);
          color: #4b4b4b;
        }
        .cartS {
          margin-right: pxTorem(36);
        }
      }
    }
  }
</style>
