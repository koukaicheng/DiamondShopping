<template>
  <div class="wrapper">
    <ts-header back title="送检"></ts-header>
    <page>
      <div class="wrap">
        <div class="map-box">
          <baidu-map :cityText="cityText" :cityCenterList="cityCenterList"></baidu-map>
        </div>
        <div class="box">
          <div class="head border-1px">
            <span>选择城市</span>
            <div class="choise-city" @click="cityChange">
              <span class="title">{{cityText}}</span>
              <icon font-name="icon-jiantou-copy" size="36"></icon>
            </div>
          </div>
          <div class="address-box border-1px">
            <p v-for="(item,index) in cityCenterList" :key="index">检测中心地址：{{item.area_info+item.center_address+item.center_name}}</p>

          </div>
          <div class="mode-box">
            <span class="title">送检方式:</span>
            <div class="mode-item" @click.prevent="Choice1">
              <kc-checkbox v-model="checked"></kc-checkbox>
              <p class="word">发快递</p>
            </div>
            <div class="mode-item" @click.prevent="Choice2">
              <kc-checkbox v-model="checked1"></kc-checkbox>
              <p class="word">亲自送</p>
            </div>
          </div>
          <div class="mode-box" v-show="checked">
            <span class="title">快递单号:</span>
            <div class="mode-item">
              <input type="text" placeholder="发完快递后，请输入快递单号" v-model="info.send_check_shipping_code">
            </div>
          </div>
          <p class="explain">如送件样本与提交参数不符，将退回样本，并由卖家承担运费</p>
          <div class="footer">
            <ds-button type="primary" size="large" @click="next">确认</ds-button>
          </div>
        </div>
      </div>
      <gender-picker v-model="vissrle" @complete="setGender" :options="options"></gender-picker>
    </page>
  </div>
</template>
<script>
  import BaiduMap from '../../components/module/Map/Map'
  import { OrderCheckSend, OpenCityList, CenterList } from '../../assets/js/api'

  export default {
    data () {
      return {
        checked: true,
        checked1: false,
        vissrle: false,
        cityText:'',
        cityCenterList:[],
        options: [],
        info: {
          order_id: '', //订单号
          send_check_shipping_code: '', //快递号
          send_check_type: '1', // 0 亲自送 1 快递
        }
      }
    },
    created () {
      this.info.order_id = this.$route.query.order_id
      this.cityList()
    },
    methods: {
      async cityList () {
        let json = await this.$http.post(OpenCityList, {}, {}, {show: true, type: 'mini'})
        console.log(json)
        if (json.code === 200) {
          json.datas.forEach((item, index, arr) => {
            this.options.push({text: item.area_name, value: item.area_id})
          })
          this.cityText = json.datas[0].area_name
          this.cityCenter(json.datas[0].area_id)
        }
      },
      async cityCenter(city_id){
        let json = await this.$http.post(CenterList,{get:{city_id}},{},{show:true,type:'mini'})
        if(json.code===200){
          this.cityCenterList = json.datas
        }
      },
      cityChange () {
        this.vissrle = true
      },
      Choice1 () {
        this.checked = true
        this.checked1 = false
      },
      Choice2 () {
        this.checked1 = true
        this.checked = false
      },
      setGender (val) {
        let city_id = val.value
        this.cityText = val.text
        this.cityCenter(city_id)
      },
      async next () {
        let json = await this.$http.post(OrderCheckSend, {
          post: this.info
        }, {},{show: true, type: 'mini'})
        if (json.code === 200) {
          this.$toast('请求成功')
          setTimeout(() => {
            this.$router.goBack()
          }, 1000)
        }
        // console.log(json)
      }
    },
    watch: {
      checked (val) {
        this.info.send_check_type = val === true ? '1' : '0'
        if(!val){
          this.info.send_check_shipping_code = ''
        }
      }
    },
    computed: {},
    components: {
      BaiduMap,
      'gender-picker': () => import('../../components/module/GenderPicker/GenderPicker'),
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../assets/css/mixin.scss';

  .wrapper {
    background: #fff;
    .wrap {
      .map-box {
        height: pxTorem(500);
      }
      .box {
        width: 100%;
        font-size: pxTorem(28);
        color: #2a2a2a;
        .head {
          display: flex;
          align-items: center;
          margin: 0 pxTorem(27);
          padding: 0 pxTorem(20);
          height: pxTorem(90);
          .choise-city {
            display: flex;
            align-items: center;
            height: 100%;
            .title {
              padding-left: pxTorem(85);
              padding-right: pxTorem(10);
            }
          }
        }
        .address-box {
          margin: 0 pxTorem(27);
          padding: 0 pxTorem(20);
          p {
            margin: pxTorem(30) 0;
          }
        }
        .mode-box {
          display: flex;
          align-items: center;
          margin: 0 pxTorem(27);
          padding: 0 pxTorem(20);
          line-height: pxTorem(90);
          .title {
            flex-shrink: 0;
          }
          .mode-item {
            width: 100%;
            display: flex;
            align-items: center;
            padding-left: pxTorem(20);

            .word {
              padding: 0 pxTorem(20);
            }
            input {
              width: 100%;
              height: pxTorem(75);
              border: 1px #cfcfcf solid;
              padding: 0 pxTorem(27);
            }
          }
        }
        .explain {
          margin-top: pxTorem(25);
          font-size: pxTorem(24);
          color: #bd081c;
          text-align: center;
        }
        .footer {
          padding: pxTorem(35);
        }
      }
    }
  }
</style>
