<template>
  <div class="height-fixed" v-if="list.length >0">
    <Refresh @refresh="refresh" @loadmore="loadmore($event)">
      <div class="ht-list-container">
        <div v-for="(item, index) in list" :key="index">
          <order-list-sub :isBuy="isBuy" :listItem='types==0?item.order_list[0]:item'
                          @cancel="cancel(index)" @editChange="editChange"></order-list-sub>
        </div>
      </div>
    </Refresh>
  </div>
  <div class="height-fixed" v-else>
    <no-data></no-data>
  </div>
</template>
<script>
  import Refresh from '../../module/Refresh/Refresh'
  import noData from '../../uiModule/NoData/noData'
  import OrderListSub from './OrderListSub.vue'
  import { OrderList, SellerOrderList, StoreInfo } from '../../../assets/js/api'
  import { uploadMixins } from '../../../utils/mixins'

  export default {
    name: 'dsOrderList',
    props: {
      types: {
        type: [Number, String],
        default: ''
      },
      stateType: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        list: [], // 必须
        is_person: 1
      }
    },
    mixins: [uploadMixins],
    methods: {
      cancel (index) {
        this.list.splice(index, 1)
      },
      // 必须
      async requestUploadData (type) {
        let url = this.types == 0 ? OrderList : SellerOrderList
        let getOrderList = await this.$http.post(url, {
          get: {
            page: 10,
            curpage: this.a_page, // 必须
          },
          post: {
            state_type: this.stateType
          }
        }, {}, {show: true, type: 'll', text: '加载中...'})
        // 必须
        console.log(getOrderList)
        this._mixinsRequestData(
          type,
          getOrderList,
          getOrderList.datas[this.types == 0 ? 'order_group_list' : 'goods_list']
        )
      },
      editChange (id) {
        console.log(id)
        let url = this.is_person === 1 ? '/sellOrderDetailsP' : '/sellOrderDetailsE'
        this.$router.push({path: url, query: {id}})
      },
      async storeData () {
        let json = await this.$http.post(StoreInfo, {}, {})
        if (json.code === 200) {
          this.is_person = parseInt(json.datas.is_person)
        }
      },
    },
    activated () {
      // console.log(333333)
    },
    computed: {
      isBuy () {
        let types = this.types
        return types == 0 ? true : false
      }
    },
    created () {
      this.storeData()
    },
    components: {
      OrderListSub,
      Refresh,
      noData
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../assets/css/mixin';
  @import '../../../assets/css/icon';

  .height-fixed {
    height: 100%;
    background: #dbdbdb;
  }
</style>
