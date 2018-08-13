<template>
    <div class="">
        <ts-header back title="证书查询" rightIcon="icon-fenxiang" @headerEvent="share"></ts-header>
        <page>
            <div class="wrapper-box">
                <div class="box-top-list">
                    <div class="top-list-item">
                        <span>证书类型</span>
                        <div class="top-list-right">
                            <span class="list-right-tag red">GIA</span>
                            <!-- <span class="list-right-tag">NGTC</span> -->
                        </div>
                    </div>
                    <div class="top-list-item">
                        <span>证书编号</span>
                        <div class="top-list-right color">
                            <input type="number" v-model="val" placeholder="请输入证书编号">
                        </div>
                    </div>
                    <div class="button-box" @click="submitSearch">
                        <button>查询</button>
                    </div>
                </div>

                <div v-if="isShow" class="box-title">分级证书</div>
                <ul v-if="isShow" class="book-image">
                    <li>
                        <img :src="list.report_pic" @click="previewImage(list.report_pic)" alt=""/>
                    </li>
                    <!--<li>-->
                        <!--<img src="../../assets/imgs/banner.jpg" alt="">-->
                    <!--</li>-->

                </ul>

                <div v-if="isShow" class="box-title">基本信息</div>

                <ul v-if="isShow" class="center-list-item">
                    <li>
                        <span>日期</span>
                        <span class="">{{list.report_date}}</span>
                    </li>
                    <li>
                        <span>形状</span>
                        <span class="">{{list.shape}}</span>
                    </li>
                    <li>
                        <span>尺寸</span>
                        <span class="">{{list.measurements}}mm</span>
                    </li>
                    <li>
                        <span>重量</span>
                        <span class="">{{list.carat_weight}}Ct</span>
                    </li>
                    <li>
                        <span>颜色</span>
                        <span class="">{{list.color}}</span>
                    </li>
                    <li>
                        <span>净度</span>
                        <span class="">{{list.clarity}}</span>
                    </li>
                    <li>
                        <span>切工</span>
                        <span class="">{{list.cut}}</span>
                    </li>
                    <li>
                        <span>抛光</span>
                        <span class="">{{list.polish}}</span>
                    </li>
                    <li>
                        <span>对称</span>
                        <span class="">{{list.symmetry}}</span>
                    </li>
                    <li>
                        <span>荧光</span>
                        <span class="">{{list.fluorescence}}</span>
                    </li>
                    <li>
                        <span>净度特征</span>
                        <span class="">{{list.clarity_keys}}</span>
                    </li>
                    <li>
                        <span>备注</span>
                        <span class="">{{list.report_comments}}</span>
                    </li>
                </ul>
                <div v-if="isShow" class="box-title">比例</div>

                <ul v-if="isShow" class="center-list-item">
                    <li v-if="list.depth_pct">
                        <span>全深比</span>
                        <span class="">{{list.depth_pct}}%</span>
                    </li>
                    <li v-if="list.table_pct">
                        <span>台宽比</span>
                        <span class="">{{list.table_pct}}</span>
                    </li>
                    <li v-if="list.crown_pct">
                        <span>冠高比</span>
                        <span class="">{{list.crown_pct}}%</span>
                    </li>
                    <li v-if="list.pavilion_pct">
                        <span>亭深比</span>
                        <span class="">{{list.pavilion_pct}}%</span>
                    </li>
                    <li v-if="list.star_pct">
                        <span>星小面比</span>
                        <span class="">{{list.star_pct}}%</span>
                    </li>
                    <li v-if="list.lumbar_pct">
                        <span>下腰小面比</span>
                        <span class="">{{list.lumbar_pct}}%</span>
                    </li>
                    <li v-if="list.crown_angle">
                        <span>冠角比</span>
                        <span class="">{{list.crown_angle}}%</span>
                    </li>
                    <li v-if="list.pavilion_angle">
                        <span>亭角比</span>
                        <span class="">{{list.pavilion_angle}}%</span>
                    </li>
                    <li v-if="list.girdle">
                        <span>腰楞</span>
                        <span class="">{{list.girdle}}</span>
                    </li>
                    <li v-if="list.culet">
                        <span>底尖</span>
                        <span class="">{{list.culet}}</span>
                    </li>

                </ul>
                <div v-if="isShow" class="share-button-box">
                    <button class="share-button">分享 (积分+1)</button>
                </div>
                <div v-if="isShow" class="share-button-box submit" @click="evaluation">
                    <button class="share-button">去估价</button>
                </div>

            </div>
        </page>
    </div>
</template>
<script>
import { ReportSearch } from '../../assets/js/api'
import {shareMixins} from '../../utils/mixins'
import { Indicator } from 'mint-ui'
export default {
  name:'certificateQuery',
  data() {
    return {
      list: {},
      val: '',
      isShow: false
    }
  },
  created() {
    this.val = this.$route.query.num
  },
  mounted() {},
  mixins:[shareMixins],
  methods: {
    share(){
      console.log(123)
      if($prod){
        this.shareHref()
      }
    },
    submitSearch() {
      if(this.val){
        this.getReportSearch()
      }else{
        this.$toast('请输入证书编号')
      }
    },
    async getReportSearch() {
      if (this.val === '') {
        this.$toast('请输入证书编号')
        return
      }
      let getReportSearch = await this.$http.get(ReportSearch, {
        report_no: this.val
      },{show: true, type: 'mini'})
      if (getReportSearch.code === 200) {
        this.isShow = true
        this.list = getReportSearch.datas
      }
    },
    previewImage(src){
      if($prod){
        plus.nativeUI.previewImage(src)
      }
    },
    evaluation(){
      let report_no = this.val
      this.$router.push({path:'/evaluation',query:{report_no}})
    },
  },
  components: {}
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin';
@import '../../assets/css/icon.css';
.wrapper-box {
  background: #f5f5f5;
  .box-top-list {
    font-size: pxTorem(28);
    padding: 0 pxTorem(10);
    margin: pxTorem(16);
    color: #2c2c2c;
    border-radius: pxTorem(6);
    background: #fff;
    .top-list-item {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: pxTorem(28);
      padding-right: pxTorem(35);
      line-height: pxTorem(95);
      border-bottom: 1px #e0e0e0 solid;
      .icon-jiantou {
        position: absolute;
        right: pxTorem(16);
        top: 0;
        bottom: 0;
        margin: auto;
        transform: rotate(-90deg);
        font-size: pxTorem(32);
      }
      .top-list-right {
        display: flex;
        input {
          border: none;
          background: none;
          text-align: right;
        }
        .list-right-tag {
          display: block;
          width: pxTorem(132);
          height: pxTorem(48);
          line-height: pxTorem(48);
          text-align: center;
          border-radius: pxTorem(8);
          border: 1px #bcbcbc solid;
          font-size: pxTorem(26);
          color: #666;
          margin-left: pxTorem(30);
          &.red {
            color: #bd081c;
            border-color: #bd081c;
          }
          &.color {
            color: #2c2c2c;
          }
        }
      }
    }
    .button-box {
      position: relative;
      padding: pxTorem(28) 0;
      text-align: center;
      button {
        width: pxTorem(280);
        height: pxTorem(80);
        margin: 0 auto;
        border-radius: pxTorem(8);
        background: #bd081c;
        font-size: pxTorem(30);
        color: #fff;
        border: none;
      }
    }
  }

  .box-title {
    padding: pxTorem(25) pxTorem(40);
    font-size: pxTorem(28);
    color: #bd081c;
    border-bottom: 1px #e0e0e0 solid;
    margin: 0 pxTorem(16);
    background: #fff;
    border-top-left-radius: pxTorem(6);
    border-bottom-left-radius: pxTorem(6);
  }
  .book-image {
    display: flex;
    flex-wrap: wrap;
    padding: pxTorem(16);
    box-sizing: border-box;
    background: #fff;
    margin: 0 pxTorem(16);
    margin-bottom: pxTorem(16);
    border-bottom-left-radius: pxTorem(6);
    border-bottom-right-radius: pxTorem(6);
    li {
      width: 33.33%;
      height: pxTorem(154);
      padding: pxTorem(10);
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .center-list-item {
    font-size: pxTorem(24);
    padding: 0 pxTorem(15);
    margin: 0 pxTorem(16);
    // margin-bottom: pxTorem(16);
    color: #999;
    background: #fff;
    li {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: pxTorem(15) pxTorem(25);
      border-bottom: 1px #e0e0e0 solid;
      &:last-child {
        border: none;
      }
      span:last-child {
        color: #2c2c2c;
      }
    }
  }

  .share-button-box {
    padding: pxTorem(25) pxTorem(35);
    text-align: center;
    background: #fff;
    margin: 0 pxTorem(16);
    .share-button {
      width: 100%;
      height: pxTorem(80);
      background: none;
      border: 1px #bd081c solid;
      border-radius: pxTorem(8);
      font-size: pxTorem(28);
      color: #bd081c;
    }
    &.submit {
      margin: 0;
      margin-top: pxTorem(16);
      .share-button {
        background: #bd081c;
        color: #fff;
      }
    }
  }
}
</style>
