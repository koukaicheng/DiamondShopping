<template>
  <div class="ts-register">
    <ts-header title="卖钻"></ts-header>

    <page>
      <div class="wrap">
        <img class="bk" src="../../assets/imgs/sellDrillbk.jpg" alt="">
        <div class="box">
          <div class="left">
            <div class="title">身份认证</div>
            <div class="status" v-show="is_person===''">您还没有通过身份认证</div>
            <div class="status" v-show="is_person!==''">身份认证：{{is_person}}  {{state}}</div>
          </div>
          <div class="right">
            <icon font-name="icon-yiwancheng" size="38" color="#bd081c" v-show="is_person!==''"></icon>
            <ds-button v-show="is_person===''" width="150" type="primary" @click="link"> <span style="font-size: 0.32rem">立即认证</span>  </ds-button>
          </div>
        </div>
        <div class="box coum">
          <div class="top">
            <div class="title">钻石信息</div>
            <div class="edit" v-show="info!==null" @click="release">编辑</div>
          </div>
          <div class="bottom">
            <div v-show="info!==null" class="status">{{diamondsText}}
            </div>
            <div class="status" v-show="info===null">您还没有发布钻石信息</div>

            <ds-button width="150" v-show="info===null" type="primary" @click="release"><span style="font-size: 0.32rem">发布信息</span></ds-button>
            <icon font-name="icon-yiwancheng" size="38" color="#bd081c" v-show="info!==null"></icon>
          </div>
        </div>
        <div class="box">
          <div class="left">
            <div class="title">卖家协议</div>
            <div class="status">{{sellAGR===false?'请阅读':'已阅读并同意'}} <router-link tag="span"  to="/sellDrill/sellerAgreement">《乐检卖家协议》</router-link></div>
          </div>
          <div class="right">
            <ds-button v-show="!sellAGR" width="150" type="primary" @click="sellerAgr">  <span style="font-size: 0.32rem">签署协议</span> </ds-button>
            <icon v-show="sellAGR" font-name="icon-yiwancheng" size="38" color="#bd081c"></icon>
          </div>
        </div>

        <div class="silder_"  v-if="textInfo!==null">
          <div class="titleText">报价</div>
          <div style="width: 100%;display: flex;justify-content: center;align-items: center;margin-top: 0.8rem">
            <vue-slider @callback="silderChange" :pice=false v-bind="opciton" v-model="g_price"></vue-slider>
          </div>

          <div class="inputbox" style="margin-top: 0.5rem">
              <span class="money">
                ￥
              </span>
            <input type="number"  placeholder="请输入您的报价" v-model="g_price"/>
          </div>
          <div class="submit">
            <div class="text">此报价应包含交易中产生的税费，
               <router-link tag="span" to="/taxation">
                 <span style="color: #bd081c;">查看税费标准</span>
               </router-link>
              </div>
            <div class="btn">
              <ds-button width="230" height="60" type="primary" @click="next">确认提交</ds-button>
            </div>
          </div>
        </div>
        <div class="sectionBk"></div>
        <div class="goodListBox">
          <ds-head name="最新成交" @tap="diamondOrder"></ds-head>
          <slide :list="goodsList"></slide>
          <!--<slide @addordel="" v-for="(item,index) in 5" :key="index"></slide>-->
        </div>
      </div>
    </page>
    <transition name="slide-child">
      <router-view class="child-route"></router-view>
    </transition>
    <div ref="save">
      <ds-footer></ds-footer>
    </div>

  </div>
</template>
<script>
  import { adPosition } from '../../utils/mixins'
  import {shape} from '../../utils/currency';
  import {StoreInfo, Price, GoodsAdd ,GoodsList} from '../../assets/js/api'
  function required(val) {
    if (val instanceof Array) {
      return val.length > 0;
    }
    return val !== undefined && val !== null && (val + '').trim() !== ''
  }
  export default {
    name: 'sellDrill',
    data () {
      return {
        opciton: {
          min: 2469,
          max: 6788,
          width: '8.8rem',
          clickable: false,
          processStyle: {
            'display': 'none'
          },
          tooltip: 'always',
          section: {
            minSectionVal: 6171,
            maxSectionVal: 3086
          },
          sliderStyle: {
            'top': '-0.74rem',
            'display': 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            'background': 'none',
            'boxShadow': 'none'
          },
          tooltipStyle: {
            'display': 'none'
          }
        },
        g_price:'',
        is_person: '',
        state:'',
        info: null,
        loginOff: false,
        textInfo: null,
        diamondsText: '',
        goodsList:[]
      }
    },
    activated () {
      this.storeData()
      if (this.$store.state.subDiamondsInfon !== null) {
        [this.info, this.textInfo] = [this.$store.state.subDiamondsInfon.info, this.$store.state.subDiamondsInfon.text]
        let {report, textData} = this.textInfo
        let shapeText = shape(this.textInfo.SearchData.shape)
        this.diamondsText = `${shapeText} ${report.report_comments} ${textData.is_new} ${textData.is_inlay} ${report.info.carat_weight.name + report.info.carat_weight.value} ct    ${report.info.color.name + report.info.color.value} ${report.info.clarity.name + report.info.clarity.value} ${report.info.cut.name + report.cut + ''}  ${report.info.fluorescence.name + report.fluorescence+' '}   ${textData.delivery_time + '送检'}`

        let {report_no} = report
        this.sectionVal(report_no)
      } else {
        [this.info, this.textInfo, this.diamondsText, this.opciton.section] = [null, null, '', null]
      }
    },
    created () {
      this.getGoddsList()
    },
    mixins: [adPosition],
    methods: {
      async sectionVal (num) {
        let json = await this.$http.get(Price, {report_no: num, color_type: '', is_new: ''}, {})
        if (json.code === 200) {
          let low = parseInt(json.datas.low)
          let high = parseInt(json.datas.high)
          let val = parseInt((high - low) / 5)
          let min = low - val
          let max = high + val
          this.opciton.min = min
          this.opciton.max = max
          this.g_price = low+200
          this.opciton.section = {
            minSectionVal: low,
            maxSectionVal: high,
          }
        }
      },
      async getGoddsList() {
        let goodsList = await this.$http.get(GoodsList, {type:'new_deals'}, {
          show: true,
          type: 'mini'
        })
        this.goodsList = goodsList.datas.goods_list
      },
      async next () {
       if(!this.sellAGR) {
         this.$toast('请同意乐检卖家协议')
         return
       }
        if(typeof this.info.image_all !=='string') {
          this.info.image_all =  this.info.image_all.join()
        }
        let obj = Object.assign({},this.info,{g_price:this.g_price})
        let json = await this.$http.post(GoodsAdd, {post: obj}, {show: true, type: 'mini'})
        if (json.code === 200) {
          this.$toast('提交成功')
          setTimeout(() => {
            this.$router.push({name: 'submissionResult', params: {diamondsText: this.diamondsText,shape:this.textInfo.SearchData.shape}})
          })
        }
      },
      silderChange (val) {
        this.opciton.value = val
      },
      link () {
        this.$router.push({name: 'enterpriseCertification'})
      },
      sellerAgr(){
        this.$router.push({path: '/sellDrill/sellerAgreement'})
      },
      release () {
        let name = this.is_person === '企业卖家' ? 'enterpriseSubmission' : 'personalSubmit'
        this.$router.push({name})
      },
      diamondOrder(){
        this.$router.push({name:'diamondOrder',params:{id:0,type:1}})
      },
      async storeData () {
        if(!this.$store.state.key){
          this.is_person = ''
          return
        }
        let json = await this.$http.post(StoreInfo, {}, {})
        if (json.code === 200&&required(json.datas)) {
          this.is_person = json.datas.is_person == 0 ? '企业卖家' : '个人卖家'
          this.state = json.datas.joinin_state_str
        }
      },
    },
    computed:{
     sellAGR(){
       return this.$store.state.sellAgreementStatus
     },
    },
    components: {
      'vueSlider': () => import('../../components/module/Silder/Silder.vue'),
    }
  }
</script>

<style lang="scss" scoped>

  @import "../../assets/css/variables";
  @import "../../assets/css/mixin";

  .wrap {
    background: #fff;
    .bk {
      height: pxTorem(228);
      width: 100%;
    }
  }

  .box {
    position: relative;
    padding: 0.4rem 0;
    margin: 0 0.4rem;
    /*background: red;*/
    @include fja(space-between);
    &:after {
      position: absolute;
      content: '';
      width: 100%;
      height: 2px;
      background: #E5E5E5;
      left: 0;
      bottom: 0;
      transform: scaleY(0.4);
    }
    &.coum {
      position: relative;
      display: block !important;
      .top {
        display: block;
        @include fja(space-between);
        .title {
          font-size: pxTorem(30);
          color: #191919;
        }
        .edit {
          font-size: pxTorem(26);
          color: #989898;
        }
      }
      .bottom {
        @include fja(space-between);
        .status {
          font-size: pxTorem(24);
          color: #989898;
          max-width: pxTorem(520);
        }
      }
    }
    .left {
      .title {
        font-size: pxTorem(30);
        color: #191919;
        padding-bottom: 0.1rem;
      }
      .status {
        font-size: pxTorem(24);
        color: #989898;
        max-width: pxTorem(540);
        span {
          color: #bd081c;
        }
      }
    }
  }

  .silder_ {
    position: relative;
    margin: 0 0.1rem;
    padding: 0.2rem 0 0.4rem 0;
    .inputbox {
      @include fja();
      margin: 0.2rem auto;
      width: pxTorem(390);
      height: pxTorem(80);
      border-radius: 8px;
      border: solid 1px #c0c0c0;
      .money {
        color: #bd081c;
        font-size: pxTorem(36);
        padding-left: pxTorem(80);
      }
      input {
        border: none;
        width: pxTorem(220);
        height: pxTorem(28);
        font-size: pxTorem(30);
      }
    }
  }

  .submit {
    /*padding-bottom: pxTorem(28);*/
    .text {
      margin-top: 0.4rem;
      text-align: center;
      font-size: pxTorem(26);
      color: #878787;
    }
    .btn {
      margin-top: 0.4rem;
      @include fja();
    }
  }

  .sectionBk {
    background: #F5F5F5;
    height: pxTorem(18);
  }

  .titleText {
    color: #191919;
    font-size: pxTorem(26);
    display: inline-block;
    padding-left: pxTorem(26);
  }
</style>
