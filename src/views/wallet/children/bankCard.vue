<template>
  <div class="">
    <ts-header back title="我的支付宝" rightIcon="icon-jiahao" @headerEvent="link"></ts-header>
    <Page>
      <div class="wrap">
        <!--<Refresh v-if="list.length > 0" @refresh="refresh" @loadmore="loadmore($event)">-->
            <swipeout class="list">
              <div class="list-box" v-for="(item , index) in list" @click="select(item)" >
                <swipeout-item  transition-mode="follow" >
                  <div slot="right-menu">
                    <swipeout-button @click.native="onButtonClick(item.id,index)" type="warn" text="删除">
                      <i slot="icon" class="iconfont icon-shanchu1"></i>
                    </swipeout-button>
                  </div>
                  <div slot="content">
                    <div class="list-item">
                      <div class="list-content">
                        <p>{{item.true_name}}</p>
                        <p class="card-num">{{item.card_number}}</p>
                      </div>
                      <div class="list-right">
                        <icon font-name="icon-fanhui" size="35" color="#ababab"></icon>
                      </div>
                    </div>
                  </div>

                </swipeout-item>
              </div>
            </swipeout>
        <!--</Refresh>-->
        <!--<no-data v-else></no-data>-->
      </div>
    </Page>
  </div>
</template>
<script>
import { CardList, CardDel } from '../../../assets/js/api'

import {
  Swipeout,
  SwipeoutItem,
  SwipeoutButton
} from '../../../components/module/Swipeout'
import Refresh from '../../../components/module/Refresh/Refresh'
import noData from '../../../components/uiModule/NoData/noData'
import { uploadMixins } from '../../../utils/mixins'
import { custom } from '../../../utils/currency.js'

export default {
  data() {
    return {
      list: [], // 必须
      types: false
    }
  },
  mixins: [uploadMixins],
  methods: {
    select(listItem) {
      if (this.types) {
        custom.emit('WITHDRAWALS', { listItem })
        this.$router.goBack()
      }

    },
    link() {
      this.$router.push({ path: '/addBankCard' })
    },
    onButtonClick(type) {
      // console.log('on Button click ' + type);
      this.$emit('addordel', type)
    },
    handleEvents(type) {
      console.log('event: ', type)
    },
    onButtonClick(id, index) {
      console.log(id)
      this.$modal({
        title: '是否删除',
        message: '是否删除当前支付宝账户？删除后不可恢复。'
      }).then(res => {
        if (res === 'confirm') {
          this.getCardDel(id, index)
        }
      })
    },
    async requestUploadData(type) {
      let getCardListData = await this.$http.get(CardList, {
        curpage: this.a_page,
        page: 10
      })
      console.log(getCardListData)
      this._mixinsRequestData(type, getCardListData, getCardListData.datas.list)
    },
    async getCardDel(id, index) {
      let getCardDelData = await this.$http.get(CardDel, { id })
      console.log(getCardDelData)
      if (getCardDelData.code === 200) {
        this.$toast('删除成功')
        this.list.splice(index, 1)
        if (this.list.length === 0) {
          this.a_page = 1
          this.requestUploadData(true)
        }
      }
    }
  },
  created() {
    this.types = this.$route.query.type
  },
  components: {
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    Refresh,
    noData
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/icon.css';
@import '../../../assets/css/mixin';
.wrap {
  height: 100%;
  font-size: pxTorem(30);
  .list {
    .list-box {
      // margin: pxTorem(17) 0;
      border-bottom: pxTorem(17) #f5f5f5 solid;
      &:first-child {
        margin: 0;
      }
    }
    .list-item {
      display: flex;
      padding: pxTorem(30) pxTorem(45);
      background: #fff;

      .list-content {
        width: 100%;
        color: #2c2c2c;
        line-height: 1;
        .card-num {
          margin-top: pxTorem(20);
          font-size: pxTorem(26);
          color: #999;
        }
      }
      .list-right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-shrink: 0;
        width: pxTorem(100);
      }
    }
    .fixed {
      width: 100%;
      height: 100px;
    }
  }
}
</style>
