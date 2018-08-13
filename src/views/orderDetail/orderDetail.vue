<template>
  <div class="">
    <ts-header title="订单详情" back></ts-header>
    <page>
      <div class="wrap">
        <div class="box-wrap">
          <div class="stutas-box">
            <p class="title">订单状态：{{list.state_desc}}</p>
            <p>订单标号：{{list.order_sn}}</p>
            <p class="time">创建时间：{{list.add_time}}</p>
            <p class="time" v-show="list.payment_time!==''">成交时间：{{list.payment_time}}</p>
          </div>

        </div>
        <div class="box-wrap" @click="tolink('logistics',list.order_id)">
          <div class="stutas-box wuliu">
            <p class="title">物流状态</p>
            <div class="right">
              <span>2018/01/01 10:00</span>
              <icon font-name="icon-fanhui" size="30"></icon>
            </div>

          </div>
        </div>
        <div class="box-wrap">
          <div class="header-box">
            <div class="left-icon">
              <icon font-name="icon-dizhi" size="50" color="#6a6a6a"></icon>
            </div>
            <div class="address-content">
              <div class="user-info">
                <span class="name">收货人：{{list.reciver_name}}</span>

                <span class="tel">{{list.reciver_phone}}</span>
              </div>
              <div class="address-text">
                <div class="text">
                  收货地址：{{list.reciver_addr}}
                </div>
              </div>
            </div>

          </div>

        </div>

        <div class="box-wrap">
          <div class="goods-box">
            <div class="header border-1px">
              <p>卖家:{{list.store_name}}</p>
              <p>镶嵌服务商：爱福瑞卡</p>
              <p></p>
            </div>
            <div v-for="(item, index) in list.goods_list" :key="index" class="goods-list border-1px">
              <div class="goods-head">
                <img :src="item.image_url" alt=""/>
              </div>
              <div class="content">
                <div class="title">{{item.goods_name}}</div>
                <div class="money">￥{{item.goods_price}}</div>
              </div>
            </div>

          </div>
        </div>
        <div class="box-wrap">
          <div class="stutas-box wuliu">
            <p class="title">实付款</p>
            <div class="right color">
              <span>￥{{list.real_pay_amount}}</span>
            </div>
          </div>
        </div>
        <div class="box-wrap">
          <div class="logistics-box">
            <div class="log-item active" v-for="(item,index) in list.state_list" :key="index" :class="index===list.state_list.length?'active':''">
              <div class="icon-type">
                <div class="circle "></div>
                <div class="line" v-show="list.state_list.length>1"></div>
              </div>
              <div class="content border-1px">
                <div class="title">{{item.state}}</div>
                <div class="time">
                  <p>2017-01-03</p>
                  <p>12:16</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </page>
    <div class="footer">
      <button v-if="list.if_buyer_cancel">删除订单</button>
      <button class="look" @click="tolink('logistics',list.order_id)">查看物流</button>
      <!--<button class="active">出售</button>-->
    </div>
  </div>
</template>

<script>
import { OrderInfo } from '../../assets/js/api'
export default {
  data() {
    return {
      order_id: '',
      list: []
    }
  },
  created() {
    this.order_id = this.$route.query.id
    this.getDetail(this.order_id)
  },
  methods: {
    tolink(url, id) {
      this.$router.push({name: url, query: {id}})
    },
    async getDetail(order_id) {
      let getDetail = await this.$http.get(OrderInfo, {order_id}, {
        show: true,
        type: 'mini'
        }
      )
      // 必须
      if (getDetail.code === 200) {
        this.list = getDetail.datas.order_info
      }

    }
  },
  components: {
    // CartList
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
@import "detail";
</style>
