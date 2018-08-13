<template>
  <div class="wrap">
    <ts-header :title="`购物车(${cartList.length})
    `" custom @onBack="back"></ts-header>
    <div class="heaer" v-if="cartList.length>0">企业LV5</div>
    <page>
      <div>
        <cart-list :list="cartList" v-show="cartList.length>0" @cartDel="cartDel" @lnlaytDel="lnlaytDel"></cart-list>
        <div>
          <no-data bk-ground="none" tip="您的购物车是空的" v-show="cartList.length===0"></no-data>
        </div>
        <div class="goods-list">
          <ds-head name="精选推荐" @tap="link"></ds-head>
          <slide :list="goodsList"></slide>
        </div>
      </div>
    </page>
    <div class="footer">
      <div class="checkbox" @click="selection">
        <ds-checkbox v-model="checked">
        </ds-checkbox>
        <span class="text">全选</span>
      </div>
      <div class="money_num">
        <span class="text">共计:</span>
        <span class="num">￥{{totalMoney}}</span>
      </div>
      <div class="submit" @click="submit">
        <div class="btn">去结算</div>
      </div>
    </div>
  </div>
</template>
<script>
  import CartList from '../../components/uiModule/CartList/CartList'
  import { CartListData, GoodsList, BuyStep1, CartDel, CartDelInlay } from '../../assets/js/api'
  import { toDecimal2 } from '../../utils/currency'
  import noData from '../../components/uiModule/NoData/noData.vue'
  import { ORDER_INFO } from '../../store/mutations/mutations-types'

  export default {
    name: 'cart',
    components: {
      CartList,
      'no-data': noData
    },
    data () {
      return {
        cartList: [],
        goodsList: []
      }
    },
    activated () {
      this.getCartData()
      this.getGoddsList()
    },
    // created() {
    //
    // },
    methods: {
      back () {
        this.$router.isBack = true
        this.$router.push({name: 'profile'})
      },
      async getCartData () {
        let list = []
        let cartList = await this.$http.post(CartListData, {}, {}, {show: true, type: 'mini'})
        cartList.datas.cart_list.forEach((item, index, arr) => {
          list.push(...item.goods)
        })
        this.cartList = list
      },
      cartDel (id) {
        this.delOptions(id, CartDel)
      },
      lnlaytDel (id) {
        this.delOptions(id, CartDelInlay)
      },
      link(){
        this.$router.push({path:'/diamondsList'})
      },
      delOptions (id, url) {
        this.$modal({message: '确认删除吗', lock: true}).then(async action => {
          let json = await this.$http.post(url, {post: {cart_id: id}}, {})
          if (json.code === 200) {
            setTimeout(() => {
              this.$toast({message: '删除成功', position: 'bottom'})
              this.getCartData()
            }, 200)
          }
        })
      },
      async getGoddsList () {
        let goodsList = await this.$http.get(GoodsList, {}, {})
        this.goodsList = goodsList.datas.goods_list
      },
      selection () {
        if (this.checked) {
          this.cartList.forEach((item, index, arr) => item.checked = false)
        } else {
          this.cartList.forEach((item, index, arr) => item.checked = true)
        }
      },
      async submit () {
        let orderList = []
        let list = this.cartList.filter((d, i) => d.checked === true)
        if (list.length) {
          list.forEach((item, index, arr) => {
            orderList.push(`${item.cart_id}|1`)
          })
          let str = orderList.join(',')
          let obj = {
            str,
            list
          }
          this.$store.commit(ORDER_INFO, obj)
          this.$router.push({name: 'placeOrder'})
        } else {
          this.$toast('请选择商品')
        }
      },
    },
    computed: {
      totalMoney () {
        let price = this.cartList.reduce((total, item) => total + (item.checked === true ? Number(item.goods_total) : 0), 0)
        return toDecimal2(price)
      },
      checked: {
        get () {
          return this.cartList.length > 0 && this.cartList.every((i) => i.checked === true)
        },
        set (val) {
        }
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

  .goods-list {
    margin-top: 0.2rem;
    background: #fff;
  }

  .footer {
    @include fja(space-between);
    /*justify-content: space-between;*/
    margin-top: pxTorem(14);
    height: pxTorem(100);
    background: #fff;
    .checkbox {
      @include fja();
      padding-left: pxTorem(34);
      padding-top: 0.1rem;
      .text {
        font-size: pxTorem(26);
        padding-bottom: 0.1rem;
        padding-left: pxTorem(24);
        color: #2a2a2a;
      }
    }
    .money_num {
      @include fja();
      justify-content: flex-start;
      padding: 0 pxTorem(26);
      flex: 1;
      .text {
        font-size: pxTorem(26);
        color: #2a2a2a;
      }
      .num {
        padding-top: 0.1rem;
        padding-left: pxTorem(16);
        font-size: pxTorem(30);
        color: $themeColor;
      }
    }
    .submit {
      padding: pxTorem(18) pxTorem(38);
      background: $themeColor;
      border-radius: pxTorem(8);
      margin-right: pxTorem(34);
      @include fja();
      .btn {
        font-size: pxTorem(26);
        color: #ffffff;
      }
    }
  }
</style>
