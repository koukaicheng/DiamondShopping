<template>
  <li class="ht-list-item">
    <div v-if="isBuy" class="list-head border-1px">
      <p>卖家:{{listItem.store_name}}</p>
      <p v-if="listItem.inlay_company">镶嵌服务商：{{listItem.inlay_company}}</p>
      <p class="status">{{listItem.state_desc}}</p>
    </div>
    <div v-else class="list-head">
      <p>{{listItem.update_time}}</p>
      <p class="status">{{listItem.global_state_str}}</p>
    </div>
    <div class="list-main border-1px">
      <div v-if="isBuy" v-for="(item ,index) in listItem.extend_order_goods" :key="index" class="list-box">
        <div class="main-head">
          <img :src="item.goods_image_url" alt=""/>
        </div>
        <div class="main-content border-1px">
          <div class="content-title">{{item.goods_name}}</div>
          <div class="content-money">
            <div>
              ￥{{item.goods_price}}
            </div>
            <div class="service_price" v-if="item.service_price">
              服务费: ￥{{item.service_price}}
            </div>
          </div>
        </div>
      </div>
      <div v-if="!isBuy" class="list-box">
        <div class="main-head">
          <img :src="listItem.affiliated.img_url" alt="">
        </div>
        <div class="main-content border-1px">
          <div class="content-title">{{listItem.goods_name}}</div>
          <div class="content-money">
            <div>
              ￥{{listItem.goods_price}}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isBuy" class="list-bottom border-1px ">
      <div v-if="listItem.order_state == 0" class="price">
        <p>检测未通过，已退款至 "我的钱包"</p>
        <button @click="link('/wallet')">查看钱包</button>
      </div>
      <p v-else class="total">合计：￥{{listItem.order_amount}}</p>

    </div>
    <div v-if="isBuy" class="list-bottom ">
      <button v-if="listItem.if_cancel" class="order b-color" @click="delOrder(listItem.order_id,0)">取消订单</button>
      <button v-if="listItem.if_delete" class="order b-color" @click="delOrder(listItem.order_id,1)">删除订单</button>
      <button v-if="listItem.if_deliver" class="order r-color">查看物流</button>
      <button class="order g-color" @click="orderDetail('/orderDetail',listItem.order_id)">订单详情</button>

      <button v-if="listItem.if_cancel" class="order r-color" @click="payment(listItem.pay_sn)">去付款</button>
      <button v-if="listItem.if_receive" class="order r-color" @click="delOrder(listItem.order_id,2)">确认收货</button>
      <!--<button v-if="listItem.if_evaluation" class="order r-color">出售</button>-->
    </div>
    <div v-else class="list-bottom">
      <!-- 审核通过 -->

      <!--<template v-if="listItem.goods_verify == 1 ">-->
      <!--<button v-if="listItem.goods_state ===1" class="order b-color">删除</button>-->
      <!--<button v-if="listItem.goods_state ===1" class="order b-color">编辑</button>-->

      <!--</template>-->
      <button class="order b-color" v-if="listItem.is_delete">删除</button>
      <button class="order b-color" v-if="listItem.is_edit" @click="edit(listItem.goods_commonid)">编辑</button>
      <button class="order b-color" v-if="listItem.is_show" @click="changeGoods(listItem.goods_commonid,true)">上架
      </button>
      <button class="order b-color" v-if="listItem.is_unshow" @click="changeGoods(listItem.goods_commonid,false)">下架
      </button>
      <button class="order b-color" v-if="listItem.is_wallet" @click="link('/wallet')">查看钱包</button>
      <button class="order b-color" v-if="listItem.is_details" @click="orderDetail('/saleDetail',listItem.order_id)">查看详情</button>
      <button class="order r-color" v-if="listItem.is_show_check" @click="inspection(listItem.order_id)">送检</button>

    </div>
  </li>
</template>
<script>
  import {
    OrderCancel,
    OrderDelete,
    OrderReceive,
    GoodsShow,
    GoodsUnshow,
    GoodsInfo
  } from '../../../assets/js/api.js'

  export default {
    name: 'dsOrderListSub',
    props: {
      isBuy: {
        type: Boolean,
        default: true
      },
      listItem: {
        type: Object,
        default: () => {}
      }
    },
    data () {
      return {}
    },
    methods: {
      changeGoods (commonids, off) {
        let arr = [commonids]
        let url = off ? GoodsShow : GoodsUnshow
        let message = off ? '是否确认上架' : '是否确认下架'
        this.$modal({
          title: '提示',
          message,
          lock: true
        }).then(async action => {
          let json = await this.$http.post(url, {post: {'commonids[]': arr}}, {}, {show: true, type: 'mini'})
          if (json.code === 200) {
            if (off) {
              this.listItem.is_delete = false
              this.listItem.is_edit = false
              this.listItem.is_show = false
              this.listItem.is_unshow = true
            } else {
              this.listItem.is_delete = true
              this.listItem.is_edit = true
              this.listItem.is_show = true
              this.listItem.is_unshow = false
            }
          }
        })
      },
      async details (goods_commonid) {
        let json = await this.$http.post(GoodsInfo, {post: {goods_commonid}}, {}, {})
        console.log(json)
      },
      link (path) {
        this.$router.push({path})
      },
      // 取消订单
      delOrder (id, type) {
        let str = ''
        if (type === 0) {
          str = '取消'
        } else if (type === 1) {
          str = '删除'
        } else if (type === 2) {
          this.$modal({
            title: '提示',
            message: '是否确认收货',
            lock: true
          }).then(res => {
            if (res === 'confirm') {
              this.getOrderCancel(id, type)
            }
          })

          return
        }
        this.$modal({
          title: '提示',
          message: `是否${str}订单？${str}后不可恢复。`,
          lock: true
        }).then(res => {
          if (res === 'confirm') {
            console.log(id, type)
          }
        })
      },
      //去付款
      payment (pay_sn) {
        this.$router.push({path: '/payment', query: {pay_sn}})
      },
      // 订单详情
      orderDetail (url, id) {
        // console.log(id)
        this.$router.push({path: url, query: {id}})
      },
      // 取消订单
      async getOrderCancel (order_id, type) {
        let url = ''
        switch (type) {
          case 0: // 取消
            url = OrderCancel
            break
          case 1: //删除
            url = OrderDelete
            break
          case 2:
            url = OrderReceive
            break
        }
        let getOrderCancel = await this.$http.post(url, {
          post: {
            order_id
          }
        })
        // 必须
        if (getOrderCancel.code !== 200) {
          console.log(this.getOrderCancel)
          return
        }
        if (type === 2) {
          this.$toast('已确认收货')
        } else if (type === 1) {
          this.$toast('删除成功')
        } else {
          this.$toast('取消成功')
        }
        this.$emit('cancel', {order_id})
      },
      inspection (order_id) {
        this.$router.push({path: '/inspection', query: {order_id}})
      },
      edit (id) {
        this.$emit('editChange', id)
      },
    },
    created () {
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../assets/css/mixin';
  @import '../../../assets/css/icon';

  .ht-list-item {
    margin: pxTorem(20);
    margin-bottom: 0;
    padding: pxTorem(10);
    border-radius: pxTorem(8);

    background: #fff;
    .list-head {
      position: relative;
      display: flex;
      justify-content: space-between;
      padding: pxTorem(20);
      color: #999;
      // border-bottom: 1px red solid;
      // @include borderScale("bottom");
      .status {
        font-size: pxTorem(26);
        color: #bd081c;
      }
    }
    .list-main {
      position: relative;
      .list-box {
        display: flex;
        align-items: center;
        &:last-child .main-content {
          border: none;
        }
        .main-head {
          flex-shrink: 0;
          margin-left: pxTorem(24);
          margin-right: pxTorem(30);
          width: pxTorem(50);
          height: pxTorem(50);
          background: #ccc;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .main-content {
          position: relative;
          padding: pxTorem(25) 0;
          font-size: pxTorem(26);
          color: #2a2a2a;
          width: 100%;
          margin-right: 20%;
          overflow: hidden;

          .content-title {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .content-money {
            @include fja(flex-start);
            margin-top: pxTorem(22);
            font-size: pxTorem(30);
            .service_price {
              margin-left: pxTorem(16);
            }
          }
        }
      }
    }
    .list-bottom {
      position: relative;
      padding: pxTorem(25) 0;
      padding-right: pxTorem(30);
      text-align: right;
      .price {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: pxTorem(24);
        color: #2a2a2a;
        button {
          margin-left: pxTorem(20);
          border: 1px #282828 solid;
          border-radius: pxTorem(8);
          font-size: pxTorem(24);
          padding: 0 pxTorem(20);
          line-height: 2;
          background: none;
          color: #282828;
        }
      }

      .order {
        margin-left: pxTorem(10);
        width: pxTorem(142);
        height: pxTorem(64);
        color: #9d9d9d;
        background: none;
        border: 1px #b2b2b2 solid;
        border-radius: pxTorem(8);
        &.b-color {
          color: #282828;
          border: 1px #282828 solid;
        }
        &.g-color {
          color: #9d9d9d;
          border: 1px #b2b2b2 solid;
        }
        &.r-color {
          color: #bd081c;
          border: 1px #bd081c solid;
        }
      }
    }
  }

  .border-bottom-1px:after {
    content: '';
    pointer-events: none; /* 防止点击触发 */
    box-sizing: border-box;
    position: absolute;
    width: 200%;
    height: 200%;
    left: 0;
    top: 0;
    // border-radius: 8px;
    border-bottom: 1px solid red;
    -webkit-transform: scale(0.5);
    -webkit-transform-origin: 0 0;
    transform: scale(0.5);
    transform-origin: 0 0;
  }
</style>
