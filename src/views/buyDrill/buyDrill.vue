<template>
  <div class="" style="background: #fff">
    <ts-header title="查找钻石" rightIcon="icon-duihao" rightText="确定" @headerEvent="edit">
      <span slot="rightText" class="rightText">确定</span>
    </ts-header>
    <div v-show="gradeStatus">
      <ds-grade :FinalNum="FinalNum" :experiencesNum="experiencesNum" @close="close"></ds-grade>
    </div>
    <page bakColor="#fff">
      <div id="wrapper" @touchmove.prevent="">
        <cube-scroll ref="scroll"
                     listenScroll :bounce="false" @scrollEnd="scrollEnd" @scroll="scroll_" :data="randomList"  @touchEnd="touchEnd">
          <div class="">
            <div class="shapeBox">
              <div class="titleText" style="padding-top: 0.2rem">形状 Shape</div>
              <div class="shapeImg">
                <div class="imgItem" v-for="(item,index) in shape" :key="index" @click="shapeEvent(index)"
                     :class="{'active':item.checked===true}">
                  <!--<img :src="../../assets/imgs/shape1.jpg" alt="">-->
                  <img :src="item.url" alt="">
                </div>
              </div>
            </div>
            <div class="wrap">
              <div class="silder_">
                <div class="titleText">价格 Price</div>
                <div style="margin: 0 0.2rem">
                  <double-slider :max="price_max" :min="price_min" :def-val="[price_min,price_max]"
                                 @sliderChange="priceEvent"></double-slider>
                </div>
              </div>
              <div class="silder_">
                <div class="titleText">克拉 Carat</div>
                <div style="margin: 0 0.2rem">
                  <double-slider :max="weight_max" :min="weight_min" leftValue=" " rightValue="ct" :toFixedNum=2
                                 :defVal="[weight_min,weight_max]" @sliderChange="caratEvent"></double-slider>
                </div>
              </div>
              <div class="silder_">
                <div class="titleText">颜色Color</div>
                <div style="margin: 0 0.2rem">
                  <double-slider block :values="['L','K','J','I','H','G','F','E','D']"
                                 @sliderChange="colorEvent"></double-slider>
                </div>

              </div>
              <div class="silder_">
                <div class="titleText">净度 Clarity</div>
                <div style="margin: 0 0.2rem">
                  <double-slider block :values="['SI2','SI1','VS2','VS1','VV2','VV1','IF','FL']"
                                 @sliderChange="clarityEvent"></double-slider>
                </div>
              </div>
              <div class="silder_">
                <div class="titleText">切工 Cut</div>
                <div style="margin: 0 0.2rem">
                  <double-slider block :values="['F','G','VG','EX']" @sliderChange="cutEvent"></double-slider>
                </div>
              </div>
              <div class="silder_">
                <div class="titleText">对称 Symmetry</div>
                <div style="margin: 0 0.2rem">
                  <double-slider block :values="['F','G','VG','EX']" @sliderChange="symmetryEvent"></double-slider>
                </div>
              </div>
              <div class="silder_">
                <div class="titleText">抛光 Polish</div>
                <div style="margin: 0 0.2rem">
                  <double-slider block :values="['F','G','VG','EX']" @sliderChange="polishEvent"></double-slider>
                </div>
              </div>
              <div class="silder_">
                <div class="titleText">荧光 Fluorescence</div>
                <div style="margin: 0 0.2rem">
                  <double-slider block :values="['VS','S','M','F','N']"
                                 @sliderChange="fluorescenceEvent"></double-slider>
                </div>
              </div>
              <div class="silder_">
                <div class="titleText">发货 Delivery</div>
                <div style="margin: 0 0.2rem">
                  <double-slider :max=30 leftValue=" " rightValue="" :defVal="[0,30]"
                                 @sliderChange="deliveryEvent"></double-slider>
                </div>
              </div>
            </div>
            <div class="silder_ small">
              <div class="titleText">证书 Report</div>
              <div class="chekbox_">
                <div class="item" @click.stop="">
                  <kc-checkbox v-model="checked" title="GIA" disabled></kc-checkbox>
                </div>
              </div>
            </div>
            <div class="silder_ small">
              <div class="titleText">其他 Other</div>
              <div class="chekbox_">
                <div class="item">
                  <kc-checkbox v-model="fromData.is_new.new" title="全新"></kc-checkbox>
                </div>
                <div class="item">
                  <kc-checkbox v-model="fromData.is_new.old" title="二手"></kc-checkbox>
                </div>
              </div>
            </div>

            <div class="explain">
              本平台所展示的二手钻石，仅指检测结果与原分级证书完全一致的未镶嵌钻石
            </div>
          </div>
        </cube-scroll>
      </div>
    </page>
    <div class="btn-wrap border-top-1px">
      <div class="btn" @click="reset">
        重置
      </div>
      <div class="btn active" @click="next">
        确定
      </div>
    </div>
    <transition name="fade">
      <div v-show="footerStatus" class="showFooter">
        <ds-footer></ds-footer>
      </div>
    </transition>

  </div>
</template>
<script>
  import scroll from '../../components/module/Scroll/Scroll'
  import DoubleSlider from '../../components/module/DoubleSlider/DoubleSlider'
  import { FilterParam, GoodsNum } from '../../assets/js/api'
  import IScroll from 'iscroll/build/iscroll-probe'
  import transfer from '../../utils/transfer'
  export default {
    name: 'buyDrill',
    data () {
      return {
        kkc: true,
        checked: true,
        checked1: true,
        checked2: true,
        gradeStatus: true, //  头部栏是否显示
        off: true,
        footerStatus: true, //  底部栏显示隐藏状态
        posY: 0,
        price_max: 100000,
        price_min: 0,
        weight_max: 7.5,
        weight_min: 0.1,
        num: 0,
        num1: 20,
        FinalNum: 0,
        randomList:[1,2,1],
        experiencesNum: 0,
        shape: [
          {
            name: 'round',
            url: require('../../assets/imgs/buyDrill/round.png'),
            checked: true
          }, {
            name: 'princess',
            url: require('../../assets/imgs/buyDrill/princess.png'),
            checked: false
          }, {
            name: 'emerald',
            url: require('../../assets/imgs/buyDrill/emerald.png'),
            checked: false
          }, {
            name: 'asscher',
            url: require('../../assets/imgs/buyDrill/asscher.png'),
            checked: false
          }, {
            name: 'marquise',
            url: require('../../assets/imgs/buyDrill/marquise.png'),
            checked: false
          }, {
            name: 'oval',
            url: require('../../assets/imgs/buyDrill/oval.png'),
            checked: false
          }, {
            name: 'radiant',
            url: require('../../assets/imgs/buyDrill/radiant.png'),
            checked: false
          }, {
            name: 'pear',
            url: require('../../assets/imgs/buyDrill/pear.png'),
            checked: false
          }, {
            name: 'heart',
            url: require('../../assets/imgs/buyDrill/heart.png'),
            checked: false
          }, {
            name: 'cushion',
            url: require('../../assets/imgs/buyDrill/cushion.png'),
            checked: false
          }
        ],
        fromData: {
          shape: ['round'],
          price: {
            from: null,
            to: null
          }, //价格
          carat_weight: {
            from: null,
            to: null
          }, // 克拉
          color: ['L', 'K', 'J', 'I', 'H', 'G', 'F', 'E', 'D'], // 颜色
          clarity: ['SI2', 'SI1', 'VS2', 'VS1', 'VV2', 'VV1', 'IF', 'FL'], // 净度
          cut: ['F', 'G', 'VG', 'EX'],// 切工
          symmetry: ['F', 'G', 'VG', 'EX'], //对称
          polish: ['F', 'G', 'VG', 'EX'],//抛光
          fluorescence: ['VG', 'S', 'M', 'F', 'N'], // 荧光
          delivery: [0, 30],// 发货时间
          is_new: {
            new: true,
            old: true
          } // 全新 二手
        }
      }
    },
    created () {
      this.initialVal()
      this.goodsNum()
    },
    activated(){
      this.randomList.push(1)
    },
    mounted () {
      // setTimeout(() => {
      //   let myScroll = new IScroll('#wrapper', {probeType: 3, mouseWheel: true, bounce: false})
      //   let self = this
      //   myScroll.on('scroll', function () {
      //     let posY = this.y
      //     if (posY <= self.posY && self.posY !== 0) {
      //       self.footerStatus = false
      //       self.posY = posY
      //     } else {
      //       self.footerStatus = true
      //       self.posY = posY
      //     }
      //   })
      // }, 200)
    },
    methods: {
      scroll_ (pos) {
        console.log(pos)
        let posY = pos.y
        if (posY <= this.posY && this.posY !== 0) {
          this.footerStatus = false
          this.posY = posY
        } else {
          this.footerStatus = true
          this.posY = posY
        }
      },
      scrollEnd (pos) {
        let posY = pos.y
        this.posY = posY
      },
      touchEnd (pos) {
        let posY = pos.y
        if (posY <= this.posY && posY !== 0) {
          this.footerStatus = false
          this.posY = posY
        } else {
          this.footerStatus = true
          this.posY = posY
        }
      },
      async initialVal () {
        let json = await this.$http.post(FilterParam, {}, {});
        [this.price_max, this.price_min, this.weight_max, this.weight_min] = [json.datas.price_max, json.datas.price_min, json.datas.weight_max, json.datas.weight_min];
        [this.fromData.price.from, this.fromData.price.to, this.fromData.carat_weight.from, this.fromData.carat_weight.to] = [json.datas.price_min, json.datas.price_max, json.datas.weight_min, json.datas.weight_max]
      },
      async goodsNum () {
        let json = await this.$http.get(GoodsNum, {filter: this.fromData}, {});
        [this.FinalNum, this.experiencesNum] = [json.datas.total, json.datas.filter_total]
      },
      shapeEvent (index) {
        this.shape[index].checked = !this.shape[index].checked
        let arr = []
        this.shape.forEach((item, index) => {
          if (item.checked) {
            arr.push(item.name)
          }
        })
        this.fromData.shape = arr
        this.goodsNum()
      },
      priceEvent (val) {
        this.fromData.price.from = val[0]
        this.fromData.price.to = val[1]
        this.goodsNum()
      },
      caratEvent (val) {
        this.fromData.carat_weight.from = val[0]
        this.fromData.carat_weight.to = val[1]
        this.goodsNum()
      },
      colorEvent (val) {
        this.fromData.color = val
        this.goodsNum()
      },
      clarityEvent (val) {
        this.fromData.clarity = val
        this.goodsNum()
      },
      cutEvent (val) {
        this.fromData.cut = val
        this.goodsNum()
      },
      fluorescenceEvent (val) {
        this.fromData.fluorescence = val
        this.goodsNum()
      },
      deliveryEvent (val) {
        this.fromData.delivery = val
        this.goodsNum()
      },
      symmetryEvent (val) {
        this.fromData.symmetry = val
        this.goodsNum()
      },
      polishEvent (val) {
        this.fromData.polish = val
        this.goodsNum()
      },
      reset () {
        transfer.$emit('INIT')
        this.shape.forEach((item, index, arr) => {
          if (index === 0) {
            item.checked = true
          } else {
            item.checked = false
          }
        })
        for (let i in  this.fromData.is_new) {
          this.fromData.is_new[i] = true
        }
        this.goodsNum()
      },
      next () {
        if (this.experiencesNum > 0) {
          this.$router.push({name: 'diamondsList', params: {fromData: this.fromData}})
        } else {
          this.$toast('当前筛选钻石数量为0')
        }
      },
      close () {
        this.gradeStatus = false
      },
      edit () {
        this.next()
        // _MEIQIA('showPanel');
      },
    },
    components: {
      'double-slider': DoubleSlider,
      'cube-scroll': scroll,
    },
    watch: {}
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/variables";
  @import "../../assets/css/mixin";

  /*#wrapper {*/
  /*position: absolute;*/
  /*z-index: 1;*/
  /*top: 0;*/
  /*bottom: 0;*/
  /*left: 0;*/
  /*width: 100%;*/
  /*!*background: #ccc;*!*/
  /*overflow: hidden;*/
  /*}*/

  /*.wrapper {*/
  /*position: absolute;*/
  /*z-index: 1;*/
  /*-webkit-tap-highlight-color: rgba(0, 0, 0, 0);*/
  /*width: 100%;*/
  /*-webkit-transform: translateZ(0);*/
  /*-moz-transform: translateZ(0);*/
  /*-ms-transform: translateZ(0);*/
  /*-o-transform: translateZ(0);*/
  /*transform: translateZ(0);*/
  /*-webkit-touch-callout: none;*/
  /*-webkit-user-select: none;*/
  /*-moz-user-select: none;*/
  /*-ms-user-select: none;*/
  /*user-select: none;*/
  /*-webkit-text-size-adjust: none;*/
  /*-moz-text-size-adjust: none;*/
  /*-ms-text-size-adjust: none;*/
  /*-o-text-size-adjust: none;*/
  /*text-size-adjust: none;*/
  /*}*/

  .chekbox_ {
    @include fja(flex-start);
    padding: 0;
    .item {
      padding-left: 0.6rem;
    }
  }

  .showFooter {
    overflow: hidden;
    height: pxTorem(100);
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .4s;
  }

  .fade-enter, .fade-leave-to {
    height: 0;
  }

  .rightText {
    color: $themeColor;
  }

  .silder_ {
    position: relative;
    margin: 0 0.56rem 0 0.2rem;
    height: pxTorem(180);
    @include borderScale('bottom');
    &:first-child {
      padding-top: pxTorem(10);
      @include borderScale('top');
      height: pxTorem(200);
    }
    &.small {
      height: pxTorem(160);
    }
  }

  .titleText {
    color: #191919;
    font-size: pxTorem(26);
    padding-left: pxTorem(18);
    margin-top: pxTorem(10);
  }

  .shapeImg {
    @include fja();
    flex-wrap: wrap;
    padding: 0 pxTorem(14);
    .imgItem {
      @include fja();
      position: relative;
      width: pxTorem(106);
      height: pxTorem(106);
      box-sizing: border-box;
      border-radius: pxTorem(16);
      border: 1px solid #e4e4e4;
      margin: pxTorem(10) pxTorem(14);
      flex-shrink: 0;
      overflow: hidden;
      &.active {
        box-sizing: border-box;
        border: solid 2px $themeColor;
      }
      img {
        width: 94%;
        height: 94%;
        border-radius: pxTorem(16);
      }
    }
  }

  .explain {
    padding: 0.2rem 0.9rem;
    font-size: pxTorem(24);
    color: #999999;
    text-align: center;
  }

  .btn-wrap {
    transition: all .4s;
    @include fja();
    .btn {
      margin: 0.2rem;
      width: pxTorem(262);
      height: pxTorem(64);
      font-size: pxTorem(28);
      border-radius: pxTorem(8);
      line-height: pxTorem(64);
      border: solid 1px #b7b7b7;
      text-align: center;
      color: #171717;
      &:last-child{
        border: none;
      }
    }
    .active {
      background: #bd081c;
      color: #ffffff;
    }
  }
</style>
