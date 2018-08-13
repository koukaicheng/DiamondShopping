<template>
  <div class="">
    <ts-header title="选择收货地址" back> </ts-header>
    <page>
      <div v-if="list.length !== 0" class="wrapper">
        <div class="box">

          <div class="box-wrap" v-for="(item,index) in list" :key="index">
            <!-- -->

            <div class="box-item">
              <p class="title">
                <span>{{item.true_name}}</span>
                <span>{{item.mob_phone}}</span>
              </p>
              <p class="info">{{item.area_info + item.address}}</p>
            </div>
            <div class="box-bottom">
              <div class="radio-box" @click="isDefault(item,index)">
                <input class="input-radio" type="radio"  v-model="radioPicked" >
                <div class="radio-item" :class="{'active':item.is_default === '1'}">
                  <div class="radio-small">
                    <icon font-name="icon-choice" size="30" color="#bd081c"></icon>
                  </div>
                </div>
                <p class="radio-word">{{ item.is_default === '1' ? '默认地址' :'设为默认'}}</p>
              </div>
              <div class="radio-box-right" @click.stop="edit(item)">
                <div class="right-box">
                  <icon font-name="icon-bianji" size="32"></icon>
                  <span>编辑</span>
                </div>
                <div class="right-box" @click.stop="del(item.address_id)">
                  <icon font-name="icon-shanchu" size="32"></icon>
                  <span>删除</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
      <div v-else>
        <no-data></no-data>
      </div>

    </page>
    <div class="logout" @click="tolink('/addAddress')">
      <ds-button type="primary" size="large">添加新地址</ds-button>
    </div>
  </div>
</template>
<script>
import transfer from '../../utils/transfer'
import { AddressList, AddressDel, AddressEdit} from '../../assets/js/api'
import NoData from '../../components/uiModule/NoData/noData'
import {cloneObj} from '../../utils/currency'

export default {
  data() {
    return {
      list: [],
      radioPicked: ''
    }
  },
  methods: {
    async isDefault(item,index){
      let obj = cloneObj(item);
      obj.is_default = '1'
      let json = await this.$http.post(AddressEdit,{post: obj},{},{})
      if(json.code===200){
        this.getAddressListData()
      }
    },
    tolink(url) {
      this.$router.push(url)
    },
    del(id) {
      this.$modal({
        title: '是否删除',
        message: '是否删除当前地址？删除后不可恢复。'
      }).then(res => {
        if (res === 'confirm') {
          this.getAddressDelData(id)
        }
      })
    },
    edit(obj) {
      this.$router.push({
        path: '/addAddress',
        query: obj
      })
    },
    async getAddressListData() {
      let getAddressListData = await this.$http.post(AddressList,{},{},{show:true,type:'mini'})
      if (getAddressListData.code === 200) {
        this.list = getAddressListData.datas.address_list
        for (let i = 0, len = this.list.length; i < len; i++) {
          if (this.list[i].is_default === '1') {
            this.radioPicked = this.list[i].address_id
          }
        }
      }
    },
    async getAddressDelData(id) {
      let getAddressDel = await this.$http.post(AddressDel, {post: {address_id: id}
      })
      if (getAddressDel.code === 200) {
        this.$toast('删除地址成功')
        this.getAddressListData()
      }
    }
  },

  created() {
    this.getAddressListData()
  },
  beforeRouteEnter(to, from, next) {
    // transfer.$once('RefreshPage', () => {
    //   console.log('ssss')
    // })
    next(vm => {})
  },
  components: {
    NoData
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin';
.wrapper {
  font-size: pxTorem(30);

  .box {
    .box-wrap {
      position: relative;
      margin: pxTorem(25) 0;
      background: #fff;

      .box-item {
        position: relative;
        padding: pxTorem(25);
        background: #fff;
        width: 100%;
        .title {
          display: flex;
          align-items: center;
          color: #1b1b1b;
          span {
            margin-right: pxTorem(30);
            &.active {
              padding: pxTorem(4) pxTorem(12);
              font-size: pxTorem(22);
              color: #bd081c;
              border: 1px #bd081c solid;
              border-radius: pxTorem(8);
            }
          }
        }
        .info {
          margin-top: pxTorem(25);
          color: #a5a5a5;
        }
      }
      .box-bottom {
        display: flex;
        justify-content: space-between;
        border-top: 1px #dedede solid;
        padding: pxTorem(5) pxTorem(25);
        .radio-box {
          display: flex;
          align-items: center;
          height: pxTorem(70);

          .radio-word {
            font-size: pxTorem(26);
            // line-height: 1;
            padding-left: pxTorem(20);
          }
          .input-radio {
            position: absolute;
          }
          .radio-item {
            position: relative;
            width: pxTorem(35);
            height: pxTorem(35);
            border: 1px #dedede solid;
            border-radius: pxTorem(8);
            box-sizing: border-box;
            .radio-small {
              display: none;
            }
            &.active {
              border-color: #bd081c;
              .radio-small {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
              }
              // &:after {
              //   content: "";
              //   position: absolute;
              //   top: 0;
              //   left: 0;
              //   right: 0;
              //   bottom: 0;
              //   margin: auto;
              //   width: pxTorem(20);
              //   height: pxTorem(20);
              //   background: #f24618;
              //   border-radius: 50%;
              // }
            }
          }
        }
        .radio-box-right {
          display: flex;
          align-items: center;
          .right-box {
            display: flex;
            align-items: center;
            margin-left: pxTorem(20);
            color: #333;
            span {
              margin-left: pxTorem(10);
            }
          }
        }
      }
    }
  }
}
.logout {
  border-top: 1px #dedede solid;
  padding: pxTorem(35);
  background: #fff;
}
</style>
