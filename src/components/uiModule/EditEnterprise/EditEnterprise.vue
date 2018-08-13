<template>
  <div class="group">
    <!--<ds-cell theme="list" title="证书类型" isLink mode="edit" v-model="text" readonly="readonly" direction></ds-cell>-->

    <ds-cell theme="list" type="number" title="证书编号" tip="请填写真实编号" @toBlur="reportNum"
             v-model="info.report_no"></ds-cell>
    <div class="report-data border-1px" :class="textinfo.SearchData.carat_weight!==''?'block':'none'">
      <div class="item">
        <div class="text">形状圆形</div>
        <div class="text">重量{{textinfo.SearchData.carat_weight}}克拉</div>
        <div class="text">净度 {{textinfo.SearchData.clarity}}</div>
      </div>
      <div class="item">
        <div class="text">抛光{{textinfo.SearchData.polish}}</div>
        <div class="text">对称{{textinfo.SearchData.symmetry}}</div>
        <div class="text">切工{{textinfo.SearchData.cut}}</div>
      </div>

      <div class="item">
        <div class="text">荧光{{textinfo.SearchData.fluorescence}}</div>
        <div class="text">尺寸{{textinfo.SearchData.measurements}}</div>
      </div>
    </div>
    <ds-cell theme="list" readonly="readonly" title="奶绿咖" isLink mode="edit" v-model="textinfo.textData.color_type"
             direction @click="pickerStatus('color_type')"></ds-cell>
    <ds-cell theme="list" readonly="readonly" title="内含物" isLink mode="edit" tip=" "
             v-model="textinfo.textData.inclusion" direction @click="pickerStatus('inclusion')"></ds-cell>
    <ds-cell theme="list" readonly="readonly" title="所在地" isLink mode="edit" tip=" " v-model="textinfo.textData.city"
             direction @click="sheetVisibleOff "></ds-cell>
    <ds-cell theme="list" readonly="readonly" title="送检时间" isLink mode="edit" tip=" "
             v-model="textinfo.textData.delivery_time" direction
             tipStatus @click="pickerStatus('delivery_time')"></ds-cell>
    <city-choice ref='choice'
                 :active-tab="activeTab"
                 @change="cityChange"></city-choice>
    <gender-picker @complete="setGender" v-model="genderVisible" :options="options"></gender-picker>
    <mt-actionsheet
      :actions="actions2"
      v-model="sheetVisible">
    </mt-actionsheet>
  </div>

</template>

<script>
  import { AreaList } from '../../../assets/js/api'
  import { Actionsheet } from 'mint-ui'
  import { submitMixins } from '../../../utils/mixins'

  export default {
    name: 'edit-enterprise',
    props: {
      edit: {
        type: Boolean,
        default: true
      },
      // info:Object,
    },
    data () {
      return {
        optiosTest: {
          inclusion: [{text: '深色包裹体', value: 1}, {text: '浅色包裹体', value: 2}, {text: '无', value: 0}],
          color_type: [{text: '奶', value: 1}, {text: '绿', value: 2}, {text: '咖', value: 3}, {
            text: '多项',
            value: 4
          }, {text: '无', value: 0}],
          delivery_time: [{text: '24小时内', value: 1}, {text: '72小时内', value: 3}, {text: '7天内', value: 7}],
          city_id: []
        },
        actions2: [
          {name: '境内', method: this.cityVal},
          {name: '境外', method: this.abroad}
        ],
        sheetVisible: false,
      }
    },
    mixins: [submitMixins],
    created () {
      this.abroadData()
    },
    methods: {
      sheetVisibleOff () {
        if (!this.edit) return
        this.sheetVisible = true
      },
      abroad () {
        this.pickerStatus('city_id')
      },
      async abroadData () {
        let json = await this.$http.get(AreaList, {foreign: '1'}, {})
        if (json.code === 200) {
          let {area_list} = json.datas
          area_list.forEach((item, index, arr) => {
            this.optiosTest.city_id.push({text: item.area_name, value: item.area_id})
          })
        }
      },
    },
    components: {
      'gender-picker': () => import('../../../components/module/GenderPicker/GenderPicker'),
      'cityChoice': () => import('../../../components/module/CityChoice/CityChoice'),
      'mt-actionsheet': Actionsheet
    },
    computed: {}
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/mixin";

  .report-data {
    padding: 0 pxTorem(22);
    overflow: hidden;
    transition: .2s ease-out;
    .item {
      @include fja(space-between);
      padding: pxTorem(8) pxTorem(2);
      &:last-child {
        justify-content: flex-start;
        .text {
          &:last-child {
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

  .none {
    height: 0;
    border: none;
  }

  .block {
    height: pxTorem(160);
  }
</style>
