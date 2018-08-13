<template>
  <div class="">
    <ts-header back title="收支明细"></ts-header>
    <Page>
      <div class="wrap">
        <div class="list">
          <Refresh @refresh="refresh" @loadmore="loadmore($event)">
            <div v-for="(item,index) in list" :key="index" class="list-item border-1px" v-if="list.length>0">
              <div class="list-content">
                <p class="title">{{item.lg_desc}}</p>
                <p class="card-num">{{item.lg_add_time_text}}</p>
              </div>
              <div class="list-right " :class="item.lg_freeze_amount < 0?'add':'reduce'">
                {{item.lg_freeze_amount}}
              </div>
            </div>
           <div v-if="list.length===0">
             <no-data tip="您暂时没有收支明细" ></no-data>
           </div>
          </Refresh>
        </div>
      </div>
    </Page>
  </div>
</template>
<script>
import Refresh from '../../../components/module/Refresh/Refresh'
import noData from '../../../components/uiModule/NoData/noData'
import { uploadMixins } from '../../../utils/mixins'
import { Predepositlog } from '../../../assets/js/api'

export default {
  data() {
    return {
      list: []
    }
  },
  mixins: [uploadMixins],
  methods: {
    async requestUploadData(type) {
      let getPredepositlogData = await this.$http.post(Predepositlog, {
        get: {
          page: 10,
          curpage: this.a_page // 必须
        }
      },{},{show:true,type:'mini'})
    console.log(getPredepositlogData)
      // 必须
      this._mixinsRequestData(
        type,
        getPredepositlogData,
        getPredepositlogData.datas.list
      )
    }
  },
  created() {},
  components: {
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
    background: #fff;
    height: 100%;
    .list-item {
      display: flex;
      padding: pxTorem(30) pxTorem(11);
      margin: 0 pxTorem(25);
      .list-content {
        width: 100%;
        color: #2c2c2c;
        line-height: 1;
        overflow: hidden;
        padding-right: pxTorem(50);
        .title {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
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
        // width: pxTorem(100);
        font-size: pxTorem(40);
        &.add {
          color: #bd081c;
        }
        &.reduce {
          color: #ea9214;
        }
      }
    }
    .fixed {
      width: 100%;
      height: 100px;
    }
  }
}
</style>
