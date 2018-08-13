<template>
    <div class="">
        <ts-header title="升级明细" back> </ts-header>
        <page>
            <div>
              <refresh v-if="list.length > 0" @refresh="refresh" @loadmore="loadmore($event)">
                <ul class="list-box">
                    <li v-for="(item,index) in list" class="list-item border-1px" :key="index">
                        <div class="left">
                            <div class="title">
                                <div class="title-icon">
                                    <icon class="icon-v"
                                          font-name="icon-vip5"
                                          color="#bd081c"
                                          size="30"></icon>
                                </div>
                                <span>{{item.pl_desc}}</span>
                            </div>
                            <p class="desc">{{item.addtimetext}}</p>
                        </div>
                        <div class="right">
                            +{{item.pl_points}}
                        </div>
                    </li>
                </ul>
              </refresh>
              <no-data v-else tip="您还没有足迹，先去看看钻石吧"></no-data>
            </div>
        </page>
    </div>
</template>
<script>
  import Refresh from "../../../components/module/Refresh/Refresh";
  import { uploadMixins } from '../../../utils/mixins'
  import {Pointslog} from '../../../assets/js/api'
  import NoData from '../../../components/uiModule/NoData/noData'
export default {
  data() {
    return {
      list: []
    };
  },
  mixins:[uploadMixins],
  methods: {
    tolink(url) {
      this.$router.push(url);
    },
    detail(url) {
      this.$router.push(url);
    },
    async requestUploadData(type) {
      let getOrderList = await this.$http.post(Pointslog,  {post:{page: 10, curpage: this.a_page,}
      }, {},{ show: true, type: 'mini' })
      this._mixinsRequestData(
        type,
        getOrderList,
        getOrderList.datas.log_list
      )
    }
  },
  created() {},
  components:{
    Refresh,
    NoData
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/css/icon.css";
@import "../../../assets/css/mixin";
.list-box {
  font-size: pxTorem(30);
  color: #2c2c2c;
  background: #fff;
  .list-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 pxTorem(25);
    padding: pxTorem(35) pxTorem(15);
    .title {
      display: flex;
      .title-icon {
        padding-right: pxTorem(10);
      }
    }
    .desc {
      margin-top: pxTorem(20);
      font-size: pxTprem(24);
      color: #999;
    }
  }
}
</style>
