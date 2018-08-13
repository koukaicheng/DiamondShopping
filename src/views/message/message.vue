<template>
  <div>
    <ts-header back
               title="消息"
               rightIcon="icon-shezhi1"
               @headerEvent="link('./messageSetting')"></ts-header>
    <page>
      <div class="wrap">
        <refresh @refresh="refresh" @loadmore="loadmore($event)">
          <div class="list-box" v-for="(item,index) in list" :key="index">
            <div class="list-item border-1px">
              <p class="title">{{item.message_body}}</p>
              <p class="time">{{item.message_update_time}}</p>
            </div>
          </div>
          <no-data v-show="list.length===0" tip="您还没有消息"></no-data>
        </refresh>
      </div>
    </page>
  </div>
</template>

<script>
import Refresh from "../../components/module/Refresh/Refresh";
import {SystemMsg} from '../../assets/js/api'
import { uploadMixins } from '../../utils/mixins'
import NoData from '../../components/uiModule/NoData/noData'
export default {
  data() {
    return {
      navbar: ["消息", "客服"],
      list: []
    };
  },
  mixins:[uploadMixins],
  methods: {
    link(url) {
      this.$router.push(url);
    },
    async requestUploadData(type) {
      let getOrderList = await this.$http.get(SystemMsg,  {
            page: 10,
            curpage: this.a_page, // 必须
        }, { show: true, type: 'mini' })
      console.log(getOrderList)
      this._mixinsRequestData(
        type,
        getOrderList,
        getOrderList.datas||[]
      )
    }
  },
  created() {
    // this.requestUploadData(true);
  },
  components: {
    Refresh,
    NoData
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/mixin";
.wrap{
  background: #fff;
}
.list-box {
  background: #fff;
  font-size: pxTorem(30);

  .list-item {
    padding: pxTorem(35) pxTorem(15);
    margin: 0 pxTorem(25);
    .title {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .time {
      margin-top: pxTorem(20);
      font-size: pxTorem(24);
      color: #999;
    }
  }
}
</style>
