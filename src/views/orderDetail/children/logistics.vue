<template>
  <div class="">
    <ts-header title="物流详情" back></ts-header>
    <page>
      <div class="wrap">
        <div class="box-wrap">
          <div class="stutas-box">
            <p class="title">物流状态:已签收</p>
            <p class="time">快递单号（顺丰）：12376321476912837469</p>
            <p class="time">保险单号（太平洋）：12376321476912837469</p>
          </div>
        </div>

        <div class="box-wrap">
          <div class="logistics-box">
            <div class="log-item" v-for="(item,index) in list" :key="index">
              <div class="icon-type">
                <div class="circle "></div>
                <div class="line"></div>
              </div>
              <div class="content border-1px">
                <div class="title">{{item.text}}</div>
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

  </div>
</template>

<script>
  import { SearchDeliver } from '../../../assets/js/api'

  export default {
    data () {
      return {
        order_id: '',
        list: []
      }
    },
    created () {
      this.order_id = this.$route.query.id
      this.getSearchDeliver(this.order_id)
    },
    methods: {
      async getSearchDeliver (order_id) {
        let json = await this.$http.post(SearchDeliver, {post: {order_id}}, {}, {
          show: true,
          typx: 'll',
          text: '加载中...'
        })
        if (json.code === 200) {
          this.list = json.datas.deliver_info
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
  @import '../../../assets/css/mixin';
  @import '../../../assets/css/variables';

  .box-wrap {
    font-size: pxTorem(24);
    color: #2a2a2a;
    margin: pxTorem(20) pxTorem(15);
    width: auto;
    border-radius: pxTorem(6);
    .stutas-box {
      padding: pxTorem(25) pxTorem(30);
      background: #fff;
      line-height: 1.8;
      .title {
        font-size: pxTorem(26);
      }
      .time {
        color: #a1a5a8;
      }
    }

    .logistics-box {
      background: #fff;
      overflow: hidden;
      .log-item {
        display: flex;
        align-items: center;
        width: 100%;
        height: pxTorem(100);
        .icon-type {
          position: relative;
          flex-shrink: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          width: pxTorem(85);
          height: pxTorem(100);
          box-sizing: border-box;
          .circle {
            position: relative;
            width: pxTorem(12);
            height: pxTorem(12);
            border-radius: 50%;
            background: #d4d4d4;
            z-index: 2;
          }
          .line {
            position: absolute;
            width: 2px;
            height: 100%;
            background: #d4d4d4;
            top: 50%;
            &.last {
              display: none;
            }
          }
        }

        .content {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-right: pxTorem(15);
          .title {
            font-size: pxTorem(22);
            color: #2c2c2c;
            padding: 0 pxTorem(15) 0 0;
          }
          .time {
            flex-shrink: 0;
            text-align: center;
            line-height: 1.5;
            font-size: pxTorem(24);
            margin-right: pxTorem(14);
          }
        }
        &:first-child {
          .icon-type {
            .circle {
              width: pxTorem(24);
              height: pxTorem(24);
              border: 1px #cfcfcf solid;
              background: #fff;
              &:after {
                content: '';
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto;
                width: pxTorem(12);
                height: pxTorem(12);
                border-radius: 50%;
                background: #bd081c;
              }
            }
          }
          .content {
            color: #bd081c;
            .title {
              color: #bd081c;
            }
          }
        }
      }
    }
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 pxTorem(20);
    background: #fff;
    height: pxTorem(120);
    button {
      width: pxTorem(182);
      height: pxTorem(64);
      border: 1px #282828 solid;
      border-radius: pxTorem(8);
      background: #fff;
      color: #282828;
      font-size: pxTorem(28);
      margin-left: pxTorem(15);
      &.look {
        color: #9d9d9d;
        border: 1px #9d9d9d solid;
      }
      &.active {
        color: #bd081c;
        border: 1px #bd081c solid;
      }
    }
  }
</style>
