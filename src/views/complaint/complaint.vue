<template>
  <div class="">
    <!-- rightIcon="icon-jiahao" @headerEvent="detail('/complaintAsk')" -->
    <ts-header back title="我的投诉与反馈"></ts-header>
    <page>
      <div class="wrapper">
        <refresh @refresh="refresh" @loadmore="loadmore($event)">
          <div v-for="(item , index) in list" class="list-box" :key="index" v-if="list.length>0">
            <div class="list-title">
              [{{item.inform_subject_type_name}}] {{item.inform_datetime}}
            </div>
            <p class="content">
              {{item.inform_content}}
            </p>
            <div class="list-timeorstatus">
              <span class="red">{{item.inform_state == 1?'待回复':'已回复'}}</span>
              <span v-if="item.inform_state == 2">{{item.inform_handle_datetime}}</span>
            </div>
            <p v-if="item.inform_state == 2" class="reply">{{item.inform_handle_message}}</p>
            <div class="detail" @click="detail('/complaintDetail',item.inform_id)">
              <p>查看详情》</p>
            </div>
          </div>
          <div v-if="list.length===0">
            <no-data tip="您暂时没有反馈" ></no-data>
          </div>

        </refresh>

      </div>

    </page>
    <transition name="slide-child">
      <router-view class="child-route"></router-view>
    </transition>
  </div>
</template>

<script>
import Refresh from '../../components/module/Refresh/Refresh'
import noData from '../../components/uiModule/NoData/noData'
import { uploadMixins } from '../../utils/mixins'
import { InformList } from '../../assets/js/api'

export default {
  name:'complaint',
  data() {
    return {
      list: [] // 必须
    }
  },

  mounted() {},
  mixins: [uploadMixins],

  methods: {
    // 必须
    async requestUploadData(type) {
      let getOrderList = await this.$http.post(InformList, {
        page: 10,
        curpage: this.a_page // 必须
      })
      // 必须
      this._mixinsRequestData(type, getOrderList, getOrderList.datas.list)
    },
    detail(url,id){
      this.$router.push({path:url,query:{id}})
      console.log(id)
    },
  },

  components: {
    Refresh,
    noData
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/icon.css';
@import '../../assets/css/mixin';
.wrapper {
  font-size: pxTorem(28);
  color: #2a2a2a;
  .list-box {
    margin: pxTorem(20);
    padding: 0 pxTorem(27);
    border-radius: pxTorem(6);
    background: #fff;
    .list-title {
      padding-top: pxTorem(30);
    }
    .content {
      margin-top: pxTorem(20);
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .list-timeorstatus {
      margin-top: pxTorem(20);
      font-size: pxTorem(22);
      color: #999;
      .red {
        font-size: pxTorem(26);
        color: #bd081c;
        padding-right: pxTorem(20);
      }
    }
    .reply {
      margin-top: pxTorem(15);
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .detail {
      position: relative;
      padding: pxTorem(24) 0;
      margin-top: pxTorem(25);
      text-align: right;
      font-size: pxTorem(24);
      color: #999999;
      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: #e2e2e2;
      }
    }
  }
}
</style>
