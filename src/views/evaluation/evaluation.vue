<template>
  <div class="">
    <ts-header back title="估价" rightIcon="icon-fenxiang" @headerEvent="share"></ts-header>
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
              <input type="number" v-model="fromData.report_no" placeholder="请输入证书编号">
            </div>
          </div>
          <div class="top-list-item" @click="pickerFn(0)">
            <span>奶绿咖</span>
            <div class="top-list-right color">
              <template v-if="fromData.color_type == 0">无</template>
              <template v-if="fromData.color_type == 1">奶</template>
              <template v-if="fromData.color_type == 2">绿</template>
              <template v-if="fromData.color_type == 3">咖</template>
              <template v-if="fromData.color_type == 4">多项</template>
            </div>
            <i class="iconfont icon-jiantou"></i>

          </div>
          <div class="top-list-item" @click="pickerFn(1)">
            <span>新旧</span>
            <div class="top-list-right color">
              <template v-if="fromData.is_new == 0">二手</template>
              <template v-if="fromData.is_new == 1">全新</template>
            </div>
            <i class="iconfont icon-jiantou"></i>
          </div>
          <div class="button-box">
            <button @click="submit">估价</button>
            <span class="little-button" @click="link">证书查询》</span>
          </div>
        </div>

        <ul v-if="isShow" class="center-list-item">
          <li>
            <span>形状</span>
            <span class="">{{shapeData(list.report.shape)}}</span>
          </li>
          <li>
            <span>重量</span>
            <span class="">{{list.report.carat_weight}}t</span>
          </li>
          <li>
            <span>颜色</span>
            <span class="">{{list.report.color}}</span>
          </li>
          <li>
            <span>净度</span>
            <span class="">{{list.report.clarity}}</span>
          </li>
          <li>
            <span>切工</span>
            <span class="">{{list.report.cut}}</span>
          </li>
          <li>
            <span>抛光</span>
            <span class="">{{list.report.polish}}</span>
          </li>
          <li>
            <span>对称</span>
            <span class="">{{list.report.symmetry}}</span>
          </li>
          <li>
            <span>荧光</span>
            <span class="">{{list.report.fluorescence}}</span>
          </li>
        </ul>
        <div v-if="isShow" class="slide-box">
          <span>估价结果</span>
          <ul class="slide-wrap">
            <li class="slide-item">
              <div class="slide-left">
                <span>￥{{list.low}}</span>
              </div>
              <div class="slide-left-bottom"></div>
            </li>
            <li class="slide-item">
              <div class="slide-right">
                <span>￥{{list.high}}</span>
              </div>
              <div class="slide-right-bottom"></div>
            </li>
          </ul>
          <span class="explain">估价结果包含交易产生的税费</span>
        </div>
        <div v-if="isShow" class="share-button-box">
          <button class="share-button">分享 (积分+1)</button>

        </div>
        <!--<p v-if="isShow" class="explain">结果不正确，-->
          <!--<span>反馈</span>-->
        <!--</p>-->
        <ds-head name="估价参考" :more="false" moreName="" tcolor="#2c2c2c"></ds-head>
        <slide :list="goodsList"></slide>
      </div>
      <picker ref="naikalv" :values="chukou" @confirm="confirmChukou"></picker>
      <picker ref="xinjiu" :values="ershou" @confirm="confirmErshou"></picker>
    </page>
  </div>
</template>
<script>
import Picker from '../../components/module/Picker/Picker'
import { EvaluatePrice, GoodsList } from '../../assets/js/api'
import { shape } from '../../utils/currency.js'
import {shareMixins} from '../../utils/mixins'

export default {
  name:'evaluation',
  data() {
    return {
      chukou: [
        {
          id: 0,
          name: '无'
        },
        {
          id: 1,
          name: '奶'
        },
        {
          id: 2,
          name: '绿'
        },
        {
          id: 3,
          name: '咖'
        },
        {
          id: 4,
          name: '多项'
        }
      ],
      ershou: [
        {
          id: 0,
          name: '二手'
        },
        {
          id: 1,
          name: '全新'
        }
      ],
      fromData: {
        color_type: 0,
        is_new: 0,
        report_no: ''
      },
      list: {},
      isShow: false,
      goodsList: []
    }
  },
  mixins:[shareMixins],
  created() {
    let {report_no} = this.$route.query
    if(report_no){
      this.fromData.report_no = report_no
    }
    this.getGoddsList()
  },
  mounted() {},
  methods: {
    share(){
      if($prod){
        this.shareHref()
      }
    },
    link(){
      this.$router.push({path:'/certificateQuery',query:{num:this.fromData.report_no}})
    },
    shapeData(str) {
      return shape(str)
    },
    pickerFn(type) {
      if (type === 0) {
        this.$refs.naikalv.open()
      } else {
        this.$refs.xinjiu.open()
      }
    },
    confirmChukou(val) {
      this.fromData.color_type = val
    },
    confirmErshou(val) {
      this.fromData.is_new = val
    },
    submit() {
      this.getEvaluatePrice()
    },
    async getEvaluatePrice(type) {
      let EvaluatePriceData = await this.$http.get(EvaluatePrice, this.fromData,{show:true,type:'mini'})
      if (EvaluatePriceData.code === 200) {
        this.list = EvaluatePriceData.datas
        this.isShow = true
        if(typeof EvaluatePriceData.datas==='string'){
          this.$toast(EvaluatePriceData.datas)
        }
      }
    },
    // DOTO 估价参考  ，缺少参数
    async getGoddsList() {
      let goodsList = await this.$http.get(GoodsList, {})
      this.goodsList = goodsList.datas.goods_list
    }
  },
  components: {
    Picker
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin';
@import '../../assets/css/icon.css';
.wrapper-box {
  background: #f5f5f5;
  .box-top-list {
    font-size: pxTorem(28);
    margin: pxTorem(16);
    padding: 0 pxTorem(10);
    color: #2c2c2c;
    background: #fff;
    border-radius: pxTorem(6);

    .top-list-item {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: pxTorem(44);
      padding-right: pxTorem(65);
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
      padding: pxTorem(15) 0;
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
      .little-button {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        padding-right: pxTorem(41);
        font-size: pxTorem(24);
        color: #bd081c;
        text-decoration: underline;
        line-height: pxTorem(115);
      }
    }
  }

  .center-list-item {
    font-size: pxTorem(24);
    padding: 0 pxTorem(60);
    margin: pxTorem(16);
    margin-bottom: 0;
    color: #999;
    background: #fff;
    border-top-left-radius: pxTorem(6);
    border-top-right-radius: pxTorem(6);
    li {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: pxTorem(15) pxTorem(31) pxTorem(15) pxTorem(10);
      border-bottom: 1px #e0e0e0 solid;
      &:last-child {
        border: none;
      }
      span:last-child {
        color: #2c2c2c;
      }
    }
  }
  .slide-box {
    text-align: center;
    padding: 0 pxTorem(60);
    background: #fff;
    margin: 0 pxTorem(16);

    .explain {
      font-size: pxTorem(24);
      color: #a3a3a3;
      font-weight: 100;
    }
    span {
      font-size: pxTorem(36);
      color: #bd081c;
      font-weight: bold;
    }
    .slide-wrap {
      display: flex;
      width: 100%;
      height: pxTorem(10);
      background: #cfcfcf;
      margin-top: pxTorem(22);
      margin-bottom: pxTorem(50);
      .slide-item {
        position: relative;
        width: 100%;
        height: 100%;
        .slide-left,
        .slide-right {
          position: absolute;
          width: 50%;
          height: 100%;
          background: #bd081c;
          z-index: 10;
          &:after {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto;
            width: pxTorem(20);
            height: pxTorem(20);
            border-radius: 50%;
            background: #bd081c;
          }
          span {
            position: absolute;
            display: flex;
            justify-content: center;
            width: 1px;
            top: pxTorem(26);
            font-size: pxTorem(28);
            font-weight: 100;
          }
          &.slide-left {
            right: 0;
            span {
              left: 0;
            }
            &:after {
              left: pxTorem(-10);
            }
          }
          &.slide-right {
            left: 0;
            span {
              right: 0;
            }
            &:after {
              right: pxTorem(-10);
            }
          }
        }
        .slide-left-bottom,
        .slide-right-bottom {
          position: absolute;
          width: 60%;
          height: 100%;
          //   background: blue;
          &.slide-left-bottom {
            right: 0;
          }
          &.slide-right-bottom {
            left: 0;
          }
        }
      }
    }
  }
  .share-button-box {
    padding: 0 pxTorem(25);
    padding-top: pxTorem(31);
    text-align: center;
    background: #fff;
    margin: 0 pxTorem(16);
    padding-bottom: pxTorem(16);
    .share-button {
      width: 100%;
      height: pxTorem(80);
      background: none;
      border: 2px #bd081c solid;
      border-radius: pxTorem(8);
      font-size: pxTorem(28);
      color: #bd081c;
    }
  }
  .explain {
    font-size: pxTorem(26);
    padding: pxTorem(20);
    text-align: center;
    span {
      color: #bd081c;
    }
  }
}
</style>
