<template>
  <div class="">
    <ts-header title="支付成功" custom  @onBack="link" right-text="完成" right-color="#030303" @headerEvent="headerEvent"></ts-header>
    <page>
      <div class="wrap"  @touchmove.prevent="">
        <div class="order-content">
          <div class="left">
            <icon font-name="icon-dingdan" size="80" color="#FF6B6A"></icon>
          </div>
          <div class="right">
            <div class="item">
              <span class="title">支付方式：</span>
              <span class="num">{{payment_code_str}}</span>
            </div>
            <div class="item">
              <span class="title">支付金额：</span>

              <span class="num">￥{{pay_amount}}</span>
            </div>
          </div>
        </div>
        <div class="btn-box">
          <ds-button plain size="large" @click="headerEvent">查看订单</ds-button>
        </div>
        <div class="tip">
          注意：平台及卖家不会以订单异常、系统升级为理由要求您点击任何网址链接进行退款操作
        </div>
        <div class="feng_line">继续选购</div>
        <slide ref="slide" :list="List" @addordel="addordel" @addCart="addCart"></slide>
      </div>
    </page>
  </div>
</template>

<script>
  import { GoodsList,CartAdd } from '../../assets/js/api'
  export default {
    name: 'paymentSuccess',
    data () {
      return {
        List:[],
        payment_code_str:'',
        pay_amount:''
      }
    },
    created () {
      if(this.$route.params.data){
        let payment_code_str =  this.$route.params.data.payment_code_str;
          switch (payment_code_str) {
            case '余额支付':
              this.payment_code_str =  '余额支付';
              break;
            case 'zlipay':
              this.payment_code_str =  '支付宝支付';
              break
            case 'wxpay':
              this.payment_code_str =  '微信支付';
              break;
            default:
              break
          }
        // this.payment_code_str = this.$route.params.data.payment_code_str;
        this.pay_amount = this.$route.params.data.pay_amount;
      }
      this.getGoddsList();
    },
    methods: {
      link(){
        this.$router.goBack()
      },
      headerEvent () {
        this.$router.replace({path:'/diamondOrder',query:{types:0,index:0}});
      },
      async getGoddsList () {
        let json = await this.$http.get(GoodsList, {type:'recommend'}, {
          // show: true,
          // type: 'mini'
        })
        if (json.code === 200) {
          this.List = json.datas.goods_list
        }
      },
      addordel(id) {
        let item = this.goodsList.filter((i) => i.goods_id === id)[0];
        this[CONTRASTLIST](item);
      },
      async addCart(index) {
        let json = await this.$http.post(CartAdd, {
          post: {
            quantity: 1,
            goods_id: index
          }
        }, {show: true, type: 'mini'});
        if (json.code !== 200) {
          this.$toast({
            message: json.datas.error,
            position: 'bottom'
          })
        } else {
          this.$toast({
            message: '加入成功',
            position: 'bottom'
          });
        }
      },
    },
    components: {},
    computed: {}
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/mixin";
  @import '../../assets/css/variables';

  .wrap {
    background: #fff;
    .order-content {
      padding: pxTorem(40) 0;
      @include fja();
      font-size: pxTorem(30);
      .left {
      }
      .right {
        padding: pxTorem(30) pxTorem(30);
        .item{
          .num{
            color: #FF6B6A;
          }
         &:last-child{
           padding-top: pxTorem(20);

         }
        }
      }
    }
    .btn-box{
      margin: 0 pxTorem(80);
    }
    .tip{
      margin: pxTorem(30) pxTorem(40);
      font-size: pxTorem(26);
      color: #7a7a7a;
    }
    .feng_line{
      height: pxTorem(90);
      background: #cdcdcd;
      font-size: pxTorem(30);
      @include fja();
    }
  }
</style>
