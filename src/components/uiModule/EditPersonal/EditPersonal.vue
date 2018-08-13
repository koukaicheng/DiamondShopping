<template>
  <div class="">
    <div class="group">
      <ds-cell theme="list" title="证书类型"  v-model="text" readonly="readonly" direction></ds-cell>

      <ds-cell v-if="!reportNumS"  theme="list" type="number" title="证书编号" tip="请填写真实编号" @toBlur="reportNum"
               v-model="info.report_no"></ds-cell>

      <ds-cell v-else theme="list" title="证书编号"  v-model="info.report_no" readonly="readonly" direction></ds-cell>

      <div class="report-data border-1px" v-if="!reportNumS" :class="textinfo.SearchData.carat_weight!==''?'block':'none'">
        <div class="item">
          <div class="text" v-html="'形状 ' + shapeText(textinfo.SearchData.shape)"></div>
          <div class="text">重量 {{textinfo.SearchData.carat_weight}}克拉</div>
          <div class="text">净度 {{textinfo.SearchData.clarity}}</div>
        </div>
        <div class="item">
          <div class="text">抛光 {{textinfo.SearchData.polish}}</div>
          <div class="text">对称 {{textinfo.SearchData.symmetry}}</div>
          <div class="text">切工 {{textinfo.SearchData.cut}}</div>
        </div>
        <div class="item">
          <div class="text">荧光 {{textinfo.SearchData.fluorescence}}</div>
          <div class="text">尺寸 {{textinfo.SearchData.measurements}}</div>
        </div>
      </div>
      <ds-cell theme="list" title="新旧" :isLink="edit" mode="edit" v-model="textinfo.textData.is_new" readonly="readonly" direction
               tipStatus="肉眼不可见划痕，磨损，崩裂" @click="pickerStatus('is_new')"></ds-cell>
      <ds-cell theme="list" readonly="readonly" title="奶绿咖" :isLink="edit" mode="edit" v-model="textinfo.textData.color_type" direction
               @click="pickerStatus('color_type')" tipStatus=" "></ds-cell>
      <ds-cell theme="list" readonly="readonly" title="内含物" :isLink="edit" mode="edit" v-model="textinfo.textData.inclusion" direction
               @click="pickerStatus('inclusion')" tipStatus=" "></ds-cell>
      <ds-cell theme="list" readonly="readonly" title="所在地" tip="" :isLink="edit" mode="edit" v-model="textinfo.textData.city" direction
               @click="cityVal"></ds-cell>
      <ds-cell theme="list" readonly="readonly" title="送检时间" :isLink="edit" mode="edit" v-model="textinfo.textData.delivery_time" direction
               tipStatus="延期将被扣分" @click="pickerStatus('delivery_time')"></ds-cell>
      <ds-cell theme="list" readonly="readonly" title="是否镶嵌" :isLink="edit" mode="edit" v-model="textinfo.textData.is_inlay" direction
               @click="pickerStatus('is_inlay')" tipStatus=" "></ds-cell>
      <!--<ds-cell theme="list" readonly="readonly" title="镶嵌处理" isLink mode="edit" v-model="textinfo.textData.inlay_deal" direction tipStatus=" "-->
      <!--@click="pickerStatus('inlay_deal')">-->
      <!--<div @click.stop="ruleLink" slot="tiptext"><span>查看</span><span style="color: #BD081C;">回收规则</span></div>-->
      <!--</ds-cell>-->
      <ds-cell theme="list" readonly="readonly" title="购买凭证" :isLink="edit" mode="edit" v-model="textinfo.textData.voucher" direction
               @click="pickerStatus('voucher')" tipStatus=" "></ds-cell>
      <!--<ds-cell theme="list" readonly="readonly" title="回收商出价" isLink mode="edit" v-model="textinfo.textData.bid" direction-->
               <!--@click="pickerStatus('bid')" tipStatus=" "></ds-cell>-->
    </div>
    <city-choice ref='choice'
                 :active-tab="activeTab"
                 @change="cityChange"></city-choice>
    <gender-picker @complete="setGender" v-model="genderVisible" :options="options"></gender-picker>
  </div>
</template>

<script>
  import {shape} from '../../../utils/currency';
  import {submitMixins} from '../../../utils/mixins'

  export default {
    name: "edit-personal",
    data() {
      return {
        optiosTest:{
          is_new: [{text: '二手', value: 0}],
          inclusion: [{text: '深色包裹体', value: 1}, {text: '浅色包裹体', value: 2}, {text: '无', value: 0}],
          color_type: [{text: '奶', value: 1}, {text: '绿', value: 2}, {text: '咖', value: 3}, {text: '多项', value: 4},{text: '无', value: 0}],
          delivery_time: [{text: '24小时内', value: 1}, {text: '72小时内', value: 3}, {text: '7天内', value: 7}],
          is_inlay: [{text: '未镶嵌', value: 0}, {text: '镶嵌', value: 1}],
          inlay_deal: [{text: '出售', value: 0}, {text: '寄回', value: 1}],
          voucher: [{text: '境外发票', value: 1}, {text: '境内发票', value: 2}, {text: '其他', value: 3}],
          bid: [{text: '不允许', value: 0}, {text: '允许', value: 1}],
        },
      };
    },
    mixins:[submitMixins],
    created() {
    },
    props: {
    },
    methods: {
      shapeText(str) {
        return shape(str)
      },
    },
    components: {
      'gender-picker':()=>import('../../../components/module/GenderPicker/GenderPicker'),
      'cityChoice': () => import("../../../components/module/CityChoice/CityChoice"),
    },
    computed: {}
  };
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/mixin";
  @import "../../../assets/css/module";

  .group {
    z-index: 1000;
    .report-data {
      padding: 0 pxTorem(22);
      overflow: hidden;
      transition: .2s ease-out;
      .item {
        @include fja(space-between);
        padding: pxTorem(8) pxTorem(2);
        &:last-child{
          justify-content: flex-start;
          .text {
            &:last-child{
              margin-left: pxTorem(110);
            }
          }
        }
        .text {
          min-width: pxTorem(144);
          @include fja();
          font-size: pxTorem(24);
          color: #a1a5a8;
          justify-content: flex-start;
        }
      }
    }
  }

  .none {
    height: 0;
    border: none;
  }

  .block {
    height: pxTorem(160);
  }
</style>
