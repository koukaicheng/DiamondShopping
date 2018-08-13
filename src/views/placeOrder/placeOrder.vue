<template>
  <div class="">
    <ts-header title="确认订单" back></ts-header>
    <div class="heaer">企业LV5</div>
    <page>
      <div class="wrap">
        <div class="header-address" @click="link">
          <div class="left-icon">
            <icon font-name="icon-dizhi" size="50" color="#6a6a6a"></icon>
          </div>
          <div class="address-content" v-if="addressData">
            <div class="user-info">
              <span class="name">收货人：{{addressData.true_name}}</span>
              <span class="tel">{{addressData.mob_phone}}</span>
            </div>
            <div class="address-text">
              <div class="text">
                收货地址：{{addressData.address}}
              </div>
            </div>
          </div>

          <div class="address-content" v-else style="padding: 0.5rem 0">
            <!--<div class="user-info" style="justify-content:center">-->
            <span class="name">当前没有收货地址</span>
            <!--</div>-->
          </div>

          <div class="right-icon">
            <icon font-name="icon-fanhui" size="34" color="#ababab"></icon>
          </div>
        </div>
        <div class="order-list">
          <cart-list name="order" :list="list"></cart-list>
        </div>

        <div class="order-info">
          <div class="order-text border-1px">
            <div class="item">
              <div class="tile">商品总价</div>
              <div class="num">{{totalMoney}}</div>
            </div>
            <div class="item">
              <div class="tile">运费（快递）</div>
              <div class="num">0.00</div>
            </div>
            <div class="item">
              <div class="tile">保险（平台赠送）</div>
              <div class="num">0.00</div>
            </div>
          </div>
          <!--<div class="order-num-time">-->
            <!--<div class="goods-money">-->
              <!--<div class="title">订单总额</div>-->
              <!--<div class="num">￥ {{totalMoney}}</div>-->
            <!--</div>-->
            <!--<div class="time">-->
              <!--<div class="title">发货时间</div>-->
              <!--<div class="btn">22日</div>-->
            <!--</div>-->
          <!--</div>-->
        </div>

        <div class="form">
          <!--<ds-cell theme="list"  textAlin="right" title="发票" tip="请填写发票信息" isLink mode="edit"-->
          <!--tipStatus></ds-cell>-->
          <!--<ds-cell theme="list" readonly="readonly" title="付款方式" isLink textAlin="right" tip="线上付款" mode="edit"-->
                   <!--tipStatus v-model="textData.pay_name" @click="pickerStatus('pay_name')"></ds-cell>-->
          <ds-cell theme="list" readonly="readonly" title="发票" isLink textAlin="right" tip="请填写发票信息" mode="edit"
                   tipStatus @click="editInvocie" v-model="invoice.text"></ds-cell>
          <ds-cell theme="list" readonly="readonly" title="送达方式" :tip="textData.shipping_type" textAlin="right"
                   tipStatus
                   mode="edit" v-model="textData.shipping_type"></ds-cell>
          <ds-cell theme="list" readonly="readonly" title="积分" textAlin="right" tip="" mode="edit" tipStatus></ds-cell>


          <ds-cell theme="list" readonly title="留言" inputBg="#fafafa"   textAlin="right" tip="" mode="edit" tipStatus
                   v-model="info.pay_message"></ds-cell>
          <div class="line"></div>
        </div>
        <div class="tip">如果检测未通过，将退款到账户的钱包</div>
      </div>
    </page>
    <div class="footer">
      <div class="content">
        <div class="num">
          <div class="title">订单总额：</div>
          <div class="money-num">￥ {{totalMoney}}</div>
        </div>
        <div class="checkbox">
          <div class="chenked" @click="ruler">
            <icon v-show="chenked" font-name="icon-choice" color="#bd081c"></icon>
          </div>
          <div class="text">
            <span>我已认真阅读并同意</span>
            <router-link to="/placeOrder/userProtocol"><span style="color:#bd081c">《用户交易协议》</span> </router-link>

          </div>
        </div>
      </div>
      <div class="submit-btn" @click="next">
        <div class="btn">去支付</div>
      </div>
    </div>
    <gender-picker @complete="setGender" v-model="genderVisible" :options="options"></gender-picker>
    <transition name="slide-child">
      <router-view class="child-route" @invoice="changeinvoice"></router-view>
    </transition>
  </div>
</template>

<script>
  import CartList from '../../components/uiModule/CartList/CartList'
  import { toDecimal2 } from '../../utils/currency'
  import { BuyStep1, BuyStep2 } from '../../assets/js/api'

  const OPTIONS = {
    pay_name: [{text: '线上付款', value: 'online'}, {text: '货到付款', value: 'offline'}],
  }
  export default {
    name: 'placeOrder',
    data () {
      return {
        kkc: 'ffff',
        pickerKey: null,
        chenked: false,
        genderVisible: false,
        list: [],
        addressData: null,
        options: [],
        textData: {
          pay_name: '线上付款',
          shipping_type: '快递'
        },
        orderDeatil: {
          address_api: {
            offpay_hash_batch: '',
            offpay_hash: '',
          },
          vat_hash: ''
        },
        allTime:'',
        info: {
          ifcart: 1, //购物车购买标志 1
          cart_id: '', //购买参数
          rcb_pay: 0, //是否使用预存款支付 1-使用 0-不使用
          pay_message: '', //1|这是订单留言
          pd_pay: 0,
          address_id: '', //收货地址编号
          invoice_id: -1, //发票信息编号
          pay_name: 'online', //付款方式，可选值 online(线上付款) offline(货到付款)
          offpay_hash_batch: '',// 店铺是否支持货到付款hash
          offpay_hash: '', // 是否支持货到付款hash，通过更换收货地址接口获得
          vat_hash: '', //发票信息hash，第一步接口提供
          shipping_type: 1
        },
        invoice: {
          text:'',
          inv_id:''
        },
        str: ''
      }
    },
    activated () {
      this.getOrderDeatil()
    },
    created () {
      this.getOrderDeatil()
      console.log(132)

    },
    mounted () {
    },
    watch: {},
    methods: {
      changeinvoice(val){
        this.invoice = val
      },
      async getOrderDeatil () {
        let info = this.$store.state.orderInfo;
        [this.list, this.str] = [info.list, info.str]
        let json = await this.$http.post(BuyStep1, {
          post: {ifcart: 1, cart_id: this.str}
        }, {show: true, type: 'mini'})
        if (json.code === 200) {
          this.orderDeatil = json.datas;
          [this.info.vat_hash, this.info.cart_id] = [this.orderDeatil.vat_hash, this.str]
          if (this.orderDeatil.address_api !== '' && this.orderDeatil.address_info.length !== 0) {
            [this.info.offpay_hash_batch, this.info.offpay_hash, this.addressData, this.info.address_id] = [this.orderDeatil.address_api.offpay_hash_batch, this.orderDeatil.address_api.offpay_hash, this.orderDeatil.address_info, this.orderDeatil.address_info.address_id]
          } else {
            this.addressData = null
            this.$modal({message: '请选择地址', lock: true}).then(action => {
              this.$router.push({path: '/address'})
            })
          }
        }
      },
      setGender (val) {
        this.textData[this.pickerKey] = val.text
        this.info[this.pickerKey] = val.value
      },
      ruler () {
        this.chenked = !this.chenked
      },
      pickerStatus (key) {
        this.pickerKey = key
        this.options = OPTIONS[key]
        setTimeout(() => {
          this.genderVisible = true
        }, 200)
      },
      link () {
        this.$router.push({path: '/address'})
      },
      editInvocie () {
        this.$router.push({name: 'invoice'})
      },
      async next () {
        if (this.chenked) {
          let json = await this.$http.post(BuyStep2, {
            post: this.info
          }, {show: true, type: 'mini'})
          if (json.code === 200) {
            let {pay_sn} = json.datas
            this.$router.replace({path: '/payment', query: {pay_sn: pay_sn}})
          }
        } else {
          this.$toast('请同意用户协议')
        }
      }
    },
    components: {
      CartList,
      'gender-picker': () => import('../../components/module/GenderPicker/GenderPicker'),
    },
    computed: {
      totalMoney () {
        let price = this.list.reduce((total, item) => total + (Number(item.goods_total)), 0)
        return toDecimal2(price)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/mixin";
  @import "../../assets/css/variables";

  .heaer {
    @include fja();
    justify-content: flex-start;
    font-size: pxTorem(26);
    color: #707070;
    height: pxTorem(32);
    padding: pxTorem(30) pxTorem(28);
  }

  .header-address {
    border-radius: pxTorem(6);
    margin: 0 pxTorem(19);

    background: #fff;
    @include fja(space-between);
    .left-icon {
      padding-left: pxTorem(10);
      padding-right: pxTorem(10);
    }
    .address-content {
      flex: 1;
      font-size: pxTorem(28);
      padding-right: pxTorem(36);
      .user-info {
        padding-top: pxTorem(34);
        @include fja(space-between);
        @include fja(space-between);
        color: #2a2a2a;
      }
      .address-text {
        padding-top: pxTorem(12);
        padding-bottom: pxTorem(34);
        color: #a1a5a8;
      }

    }
    .right-icon {
      padding-right: pxTorem(10);
    }
  }

  .order-list {
    margin-top: pxTorem(18);
  }

  .order-info {
    background: #fff;
    margin: pxTorem(20) pxTorem(20);
    .order-text {
      margin: 0 pxTorem(10);
      padding: pxTorem(24) pxTorem(18);
      .item {
        padding: pxTorem(5) 0;
        font-size: pxTorem(24);
        color: #a1a5a8;
        @include fja(space-between);
      }
    }
    .order-num-time {
      padding: pxTorem(18) pxTorem(20);
      .goods-money {
        @include fja(space-between);
        .title {
          font-size: pxTorem(26);
          color: #2a2a2a;
        }
        .num {
          color: $themeColor;
          font-size: pxTorem(30);
        }
      }
      .time {
        margin-top: pxTorem(4);
        @include fja(space-between);
        .title {
          font-size: pxTorem(24);
          color: #a1a5a8;
        }
        .btn {
          @include fja(space-between);
          padding: pxTorem(9) pxTorem(18);
          border-radius: pxTorem(8);
          border: solid 1px #d8d8d8;
          font-size: pxTorem(22);
          color: #4b4b4b;
        }
      }
    }
  }

  .form {
    position: relative;
    background: #fff;
    margin: 0 pxTorem(20);
    padding: 0 pxTorem(10);
    .line {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0;
      height: 1px;
      background: #fff;
    }
  }

  .tip {
    padding: pxTorem(32) 0;
    text-align: center;
    font-size: pxTorem(26);
    color: #878787;
  }

  .footer {
    padding: 0 pxTorem(32);
    background: #fff;
    height: pxTorem(120);
    @include fja();

    .content {
      flex: 1;
      .num {
        @include fja();
        justify-content: flex-start;
        .title {
          font-size: pxTorem(30);
          color: #2a2a2a;
        }
        .money-num {
          font-size: pxTorem(30);
          color: $themeColor;
        }
      }
      .checkbox {
        @include fja(flex-start);
        padding-top: pxTorem(10);
        font-size: pxTorem(24);
        .chenked {
          @include fja();
          width: pxTorem(32);
          height: pxTorem(32);
          border-radius: pxTorem(4);
          border: solid 1px #c1c1c1;
        }
        .text {
          padding-left: pxTorem(12);
        }
      }
    }
    .submit-btn {
      .btn {
        padding: pxTorem(18) pxTorem(40);
        font-size: pxTorem(26);
        color: #fff;
        border-radius: 8px;
        background: $themeColor;
        margin-left: pxTorem(47);
      }
    }
  }
</style>
