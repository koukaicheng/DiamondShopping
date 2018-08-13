<template>
  <div class="wrapper">
    <ts-header back :title="types==0?'我买的钻石':'我卖的钻石'"></ts-header>
    <ul class="tab-container">
      <li v-for="(item,index) in tabList" :key="index" class="tab-item" :class="{'active':tabIndex == index}"
          @click="tab(index)">{{item}}
      </li>
      <!-- <li class="tab-item" :class="{'active':tabIndex === 1}" @click="tab(1)">待付款</li>
      <li class="tab-item" :class="{'active':tabIndex === 2}" @click="tab(2)">待检测</li>
      <li class="tab-item" :class="{'active':tabIndex === 3}" @click="tab(3)">待发货</li>
      <li class="tab-item" :class="{'active':tabIndex === 4}" @click="tab(4)">待收货</li>
      <li class="tab-item" :class="{'active':tabIndex === 5}" @click="tab(5)">已完成</li> -->
    </ul>
    <page>
      <div>
        <keep-alive>
          <div class="wrap-box" v-if="tabIndex == '0'">
            <ds-order-list :types="types" stateType=""></ds-order-list>
          </div>
        </keep-alive>
        <keep-alive>
          <!-- <div class="wrap-box" v-if="tabIndex === 1"> -->
          <ds-order-list :types="types" v-if="tabIndex == 1"
                         :stateType="types== 1?'state_checking':'state_new'"></ds-order-list>
          <!-- </div> -->
        </keep-alive>

        <keep-alive>

          <!-- <div class="wrap-box" v-if="tabIndex === 2"> -->
          <ds-order-list :types="types" v-if="tabIndex == 2"
                         :stateType="types== 1?'state_show':'state_pay'"></ds-order-list>
          <!-- </div> -->
        </keep-alive>

        <keep-alive>
          <!-- <div class="wrap-box" v-if="tabIndex === 3"> -->
          <ds-order-list :types="types" v-if="tabIndex == 3"
                         :stateType="types== 1?'state_pay':'state_wait_send'"></ds-order-list>
          <!-- </div> -->
        </keep-alive>

        <keep-alive>
          <!-- <div class="wrap-box" v-if="tabIndex === 4"> -->
          <ds-order-list :types="types" v-if="tabIndex == 4"
                         :stateType="types== 1?'state_trading':'state_send'"></ds-order-list>
          <!-- </div> -->
        </keep-alive>

        <keep-alive>
          <div class="wrap-box" v-if="tabIndex == 5">
            <ds-order-list :types="types" :stateType="types== 1?'state_success':'state_successl'"></ds-order-list>
          </div>
        </keep-alive>

      </div>

    </page>
  </div>
</template>

<script>
  const BUYTEXT = ['全部', '待付款', '待检测', '待发货', '待收货', '已完成']
  const SELLTEXT = ['全部', '审核中', '展示中', '待送检', '交易中', '已完成']
  export default {
    data () {
      return {
        tabList: BUYTEXT,
        tabIndex: 0,
        types: ''
      }
    },
    created () {
      this.tabIndex = this.$route.query.index ? this.$route.query.index : 0
      this.types = this.$route.query.types ? this.$route.query.types : 0
      if (this.types === 1) {
        this.tabList = SELLTEXT

      }
    },
    methods: {
      tab (index) {
        this.tabIndex = index
      },
    },
    components: {},
    computed: {}
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/css/icon.css';
  @import '../../assets/css/mixin';

  .wrapper {
    // background: #fff;
    font-size: pxTorem(26);
    .tab-container {
      position: relative;
      display: flex;
      width: 100%;
      overflow-y: scroll;
      border-bottom: 1px #dedede solid;
      background: #fff;
      .tab-item {
        position: relative;
        flex-shrink: 0;
        padding: pxTorem(30) pxTorem(23);
        &:after {
          content: '';
          position: absolute;
          right: 0;
          top: pxTorem(26);
          bottom: pxTorem(26);
          width: 1px;
          background: #dbdbdb;
        }
        &:last-child {
          &:after {
            width: 0;
          }
        }

        &.active {
          padding: pxTorem(30) pxTorem(23);
          color: #bd081c;
          &:before {
            content: '';
            position: absolute;
            right: 0;
            left: 0;
            bottom: 0;
            display: block;
            border-bottom: 2px solid #bd081c;
          }
        }
      }
    }
    .wrap-box {
      height: 100%;
    }
  }
</style>
