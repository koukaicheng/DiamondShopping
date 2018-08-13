<template>
  <div class="">
    <ts-header back title="确认发票信息"></ts-header>
    <page>
      <div class="wrapper">
        <div class="wrap-top border-1px">
          <p class="title" :class="info.inv_state==='1'?'active':''" @click="invState('1')">增值税普票</p>
          <p class="title" :class="info.inv_state==='2'?'active':''" @click="invState('2')"> 增值税专票</p>
        </div>
        <div class="content-box">
          <div class="content-item border-1px ">
            <span class="name first">抬头类型</span>
            <div class="right-box">
              <p v-show="info.inv_state==='1'" :class="info.inv_title_select==='person'?'active':''"
                 @click="invSelect('person')">个人</p>
              <p :class="info.inv_title_select==='company'?'active':''" @click="invSelect('company')">企业</p>
            </div>
          </div>
          <div class="content-item border-1px" v-show="info.inv_state==='1'&&info.inv_title_select==='person'">
            <span class="name">个人姓名</span>
            <input class="input" type="text" placeholder="请输入个人名称" v-model="info.inv_name"/>
          </div>
          <div v-show="info.inv_title_select!=='person'">
            <div class="content-item border-1px">
              <span class="name">企业名称</span>
              <input class="input" type="text" placeholder="请输入企业名称" v-model="info.inv_company"/>
            </div>
            <div class="content-item border-1px">
              <span class="name">企业纳税人识别号</span>
              <input class="input" type="text" placeholder="请输入企业纳税人识别号" v-model="info.inv_code"/>
            </div>
            <div class="content-item border-1px">
              <span class="name">开户行</span>
              <input class="input" type="text" placeholder="请输入开户行" v-model="info.inv_reg_bname"/>
            </div>
            <div class="content-item border-1px">
              <span class="name">银行账号</span>
              <input class="input" type="number" placeholder="请输入银行账号" v-model="info.inv_reg_baccount"/>
            </div>

            <div class="content-item border-1px">
              <span class="name">企业地址</span>
              <input class="input" type="text" placeholder="请输入企业地址" v-model="info.inv_reg_addr"/>
            </div>
            <div class="content-item border-1px">
              <span class="name">企业电话</span>
              <input class="input" type="number" placeholder="请输入企业电话" v-model="info.inv_reg_phone"/>
            </div>
          </div>

          <div class=" explain">
            发票和分级证书是再次出售钻石的重要材料，请妥善保管
          </div>
          <div class="button">
            <button @click="next">确定</button>
          </div>
        </div>

      </div>
    </page>
  </div>
</template>
<script>
  import { EditInvoice } from '../../assets/js/api'
  import transfer from '../../utils/transfer'

  export default {
    data () {
      return {
        info: {
          inv_state: '1', //1普通发票2增值税发票
          inv_title_select: '',//person 个人,company 企业
          inv_name: '', //个人名称
          inv_company: '', //单位名称(公司),
          inv_code: '',//纳税人识别号(公司)
          inv_reg_addr: '',//注册地址(公司)
          inv_reg_phone: '',//注册电话(公司)
          inv_reg_bname: '',//开户银行(公司)
          inv_reg_baccount: '',//银行账户(公司)
        }
      }
    },
    created () {},
    mounted () {},
    methods: {
      invState (num) {
        this.info.inv_state = num
      },
      invSelect (text) {
        this.info.inv_title_select = text
      },
      async next () {
        let json = await this.$http.post(EditInvoice, {post: this.info}, {show: true, type: 'mini'})
        if (json.code === 200) {
          let inv_id = json.datas.inv_id
          let enghti = this.info.inv_state === '1' ? '增值税普票' : '增值税专票'
          let pepoe = this.info.inv_title_select === 'person' ? '个人' : '企业'
          let text = pepoe + enghti
          let obj = {
            text,
            inv_id
          }
          this.$toast('提交成功')
          setTimeout(() => {
            this.$router.goBack()
          }, 200)
          this.$emit('invoice', obj)
        }
      },
    },
    components: {},
    // beforeRouteLeave (to, from, next) {
    //
    //   next()
    // },
    watch: {
      'info.inv_state' (val) {
        if (val === '2') {
          this.info.inv_title_select = 'company'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/mixin";
  @import "../../assets/css/icon.css";

  .wrapper {
    background: #fff;
    font-size: pxTorem(28);
    .wrap-top {
      display: flex;
      justify-content: center;
      .title {
        /*color: #666666;*/
        height: 100%;
        width: pxTorem(236);
        text-align: center;
        padding: pxTorem(30) 0;
        font-size: pxTorem(28);
        color: #2c2c2c;
        box-sizing: border-box;
        &.active {
          color: #bd081c;
          border-bottom: 2px #bd081c solid;
        }
      }
    }
    .content-box {
      .content-item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 pxTorem(25);
        padding-left: pxTorem(8);
        padding-right: pxTorem(50);
        height: pxTorem(90);
        // border-bottom: 1px red solid;
        .right-box {
          display: flex;
          p {
            padding: pxTorem(10) pxTorem(30);
            font-size: pxTorem(22);
            border: 1px #d8d8d8 solid;
            border-radius: pxTorem(8);
            margin-left: pxTorem(40);
            &.active {
              color: #bd081c;
              border: 1px #bd081c solid;
            }
          }
        }
        .name {
          font-size: pxTorem(26);
          color: #7a7a7a;
          &.first {
            color: #2c2c2c;
          }
        }
        .input {
          font-size: pxTorem(24);
          color: #999999;
          border: none;
          text-align: right;
        }
        .right {
          font-size: pxTorem(24);
          color: #2c2c2c;
          .moreicon {
            position: absolute;
            top: pxTorem(3);
            bottom: 0;
            right: pxTorem(10);
            margin: auto;
            line-height: pxTorem(90);
          }
        }
        .look {
          padding: pxTorem(12) pxTorem(25);
          margin-right: pxTorem(-30);
          font-size: pxTorem(18);
          color: #4b4b4b;
          border: 1px #d8d8d8 solid;
          border-radius: pxTorem(8);
        }
      }
      .explain {
        margin-top: pxTorem(80);
        font-size: pxTorem(26);
        color: #878787;
        text-align: center;
      }
      .button {
        margin-top: pxTorem(60);
        padding: 0 pxTorem(35);
        button {
          width: 100%;
          height: pxTorem(80);
          font-size: pxTorem(30);
          color: #fff;
          border: none;
          border-radius: pxTorem(12);
          background: #bd081c;
        }
      }
    }
  }
</style>
