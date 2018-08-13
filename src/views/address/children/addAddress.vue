<template>
  <div class="">
    <ts-header :title="isEdit?'修改收获地址':'添加收获地址'" back> </ts-header>
    <page>

      <div class="wrapper">
        <ul class="box">
          <li class="box-item border-1px">
            <p class="title">收件人</p>
            <input class="input" type="text" v-model="fromData.true_name" placeholder="输入姓名">
          </li>
          <li class="box-item border-1px">
            <p class="title">联系电话</p>
            <input class="input" type="text" v-model="fromData.mob_phone" placeholder="输入电话">
          </li>
          <li class="box-item border-1px" @click="address">
            <p class="title">所在地区</p>
            <div class="right">
              <span class="right-word">{{fromData.area_info}}</span>
              <icon font-name="icon-fanhui" size="30"></icon>
            </div>

          </li>
          <li class="textarea border-1px">
            <textarea class="textarea-item" placeholder="请填写详细地址，不少于5个字" name="" v-model="fromData.address" id=""></textarea>
          </li>
          <li class="box-item border-1px">
            <p class="title moren">
              <kc-checkbox v-model="checked" @input="isCheck"></kc-checkbox>
              <span class="word">设为默认</span>
            </p>
          </li>
        </ul>
        <div class="logout" @click="add">
          <ds-button type="primary" size="large">{{isEdit?'修改':'添加'}}</ds-button>
        </div>
      </div>
      <city-choice ref="choice" :active-tab="activeTab" @change="closeAddr"></city-choice>

    </page>
  </div>
</template>
<script>
import verify from '../../../utils/verify'
import cityChoice from '../../../components/module/CityChoice/CityChoice'
import { AddressAdd, AddressEdit } from '../../../assets/js/api'
import transfer from '../../../utils/transfer'

export default {
  data() {
    return {
      isEdit: false,
      activeTab: [
        // {
        //   id: 3,
        //   name: "河北"
        // },
        // {
        //   id: 78,
        //   name: "保定市"
        // },
        // {
        //   id: 1209,
        //   name: "南市区"
        // }
      ],
      checked: true,
      fromData: {
        province_id: 0,
        city_id: 0,
        area_id: 0,
        address: '',
        true_name: '',
        is_default: 1,
        mob_phone: '',
        area_info: ''
      }
    }
  },
  methods: {
    isCheck(isCheck) {
      this.fromData.is_default = isCheck ? 1 : 0
    },
    admin(url) {
      this.$router.push(url)
    },
    address() {
      this.$refs.choice.open()
    },
    closeAddr(obj) {
      if (obj.length > 0) {
        this.fromData.area_info =
          obj[0].name + ' ' + obj[1].name + ' ' + obj[2].name
        this.fromData.province_id = obj[0].area_id
        this.fromData.city_id = obj[1].area_id
        this.fromData.area_id = obj[2].area_id
      } else {
        this.fromData.area_info = ''
        this.fromData.area_id = ''
      }
    },
    add() {
      if (!verify.mobile(this.fromData.mob_phone)) {
        this.$toast('请输入正确的手机号码')
        return
      }
      if (this.fromData.area_info === '') {
        this.$toast('请选择地区')
        return
      }
      if (this.fromData.address === '') {
        this.$toast('请输入详细地址')
        return
      } else {
        if (this.fromData.address.length < 5) {
          this.$toast('详细地址，不少于5个字')
          return
        }
      }
      // return;
      this.getAddressAddData(this.fromData)
    },
    async getAddressAddData(fromData) {
      let getAddressAddData = await this.$http.post(
        this.isEdit ? AddressEdit : AddressAdd,
        {
          post: fromData
        }
      )
      console.log(getAddressAddData)

      if (getAddressAddData.code === 200) {
        transfer.$emit('RefreshPage')
        this.$toast(`${this.isEdit ? '修改' : '添加'}地址成功`)
        setTimeout(() => {
          this.$router.goBack()
        }, 1000)
      }
    }
  },
  created() {
    console.log(this.$route.query)
    if (this.$route.query.address_id) {
      let city = []
      this.isEdit = true
      this.checked = this.$route.query.is_default === '1' ? true : false
      this.fromData = this.$route.query
      city = this.$route.query.area_info.split(' ')
      this.activeTab = [
        {
          id: this.$route.query.province_id,
          name: city[0]
        },
        {
          id: this.$route.query.city_id,
          name: city[1]
        },
        {
          id: this.$route.query.area_id,
          name: city[2]
        }
      ]
    }
  },
  components: {
    cityChoice
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin';
.wrapper {
  font-size: pxTorem(30);

  .box {
    background: #fff;
    .box-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 pxTorem(25);
      padding: 0 pxTorem(15);
      height: pxTorem(100);
      font-size: pxTorem(28);
      color: #2c2c2c;
      .title {
        flex-shrink: 0;
        &.moren {
          display: flex;
          align-items: center;
          .word {
            padding-left: pxTorem(20);
          }
        }
      }
      .right {
        display: flex;
        align-items: center;
        .right-word {
          line-height: 2;
          padding-right: pxTorem(10);
        }
      }
      .input {
        width: 100%;
        border: none;
        text-align: right;
        padding-left: pxTorem(100);
        font-size: pxTorem(26);
      }
    }
    .textarea {
      margin: 0 pxTorem(25);
      min-height: pxTorem(240);
      .textarea-item {
        padding: pxTorem(35) pxTorem(15);
        width: 100%;
        min-height: pxTorem(240);
        font-size: pxTorem(26);
        border: none;
      }
    }
  }
  .logout {
    padding: 1.5rem 0.5rem 0;
    margin-bottom: pxTorem(100);
  }
}
</style>
