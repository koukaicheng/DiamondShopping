<template>
  <div class="">
    <ts-header back title="提现"></ts-header>
    <page>
      <div>
        <div class="wrap">
          <div class="list-item">
            <div class="list-content" @click="link">
              <div v-if="isShow" class="content-item">
                <p>{{listItem.true_name}}</p>
                <p class="card-num">{{listItem.card_number}}</p>
              </div>
              <div v-else class="content-word">请选择提现账户</div>
            </div>
            <div class="list-right">
              <icon font-name="icon-fanhui" size="35" color="#ababab"></icon>
            </div>
          </div>
          <div class="content">
            <div class="top border-1px">
              <p class="title">提现金额</p>
              <div class="money">
                <span>￥</span>
                <input type="number" class="input" v-model.number="fromData.pdc_amount" v-on:input="change"
                       placeholder="请输入提现金额">
              </div>
            </div>
            <div class="bottom">
              <div class="bottom-title">
                可用余额：{{listItem.pdc_amount}}元
              </div>
              <div class="bottom-button" @click="all">
                全部提现
              </div>
            </div>
          </div>
          <p class="info">手续费：5元 实际到账{{trueMoney}}元</p>
          <div class="button" @click="submit">
            <ds-button type="primary" size="large">提交</ds-button>
          </div>

        </div>
      </div>
    </page>
    <mt-popup position="bottom" v-model="vissrle" style="width:100%;">
      <div class="heder border-1px">
        <div class="item" @click="cancel">取消</div>
        <div class="item" @click="determine">确定</div>
      </div>
      <div class="boxssss">
        <div class="title">请输入登录密码</div>
        <input type="password" v-model="fromData.password"/>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import transfer from '../../../utils/transfer'
  import { custom } from '../../../utils/currency.js'
  import { MyAsset, CheckPdPwd } from '../../../assets/js/api'

  export default {
    props: {},
    data () {
      return {
        vissrle: false,
        syatus: false,
        isShow: false,
        listItem: {
          pdc_amount: ''
        },
        fromData: {
          pdc_amount: '',
          password: '',
        },
        a: ''
      }
    },
    created () {
      let self = this
      this.getMyAsset()
      console.log(this.fromData)
      custom.receive('WITHDRAWALS', res => {
        self.isShow = true
        console.log(res)
        let obj = Object.assign({pdc_amount: this.fromData.pdc_amount}, res.listItem)
        self.listItem = obj
        self.fromData.id = self.listItem.id
      })
    },
    methods: {
      change (val) {
        console.log(1111)

        if (this.fromData.pdc_amount > this.listItem.pdc_amount) {
          this.fromData.pdc_amount = this.listItem.pdc_amount
        }
      },
      all () {
        this.fromData.pdc_amount = this.listItem.pdc_amount
      },
      link () {
        //
        this.$router.push({
          path: '/bankCard',
          query: {type: true}
        })
      },
      cancel () {
        this.vissrle = false
        this.fromData.password = ''
      },
      async determine () {
        if (this.fromData.password.length >= 6) {
          let json = await this.$http.post(CheckPdPwd, {post: {password: this.fromData.password}}, {})
          if (json.code === 200) {
            this.$toast({message: '验证成功', position: 'middle'})
            this.vissrle = false
            this.getPdCashAdd(this.fromData)
          }
        } else {
          this.$toast({message: '请正确输入', position: 'middle'})
        }
      },
      async getPdCashAdd (fromData) {
        let getPdCashAddData = await this.$http.post(MyAsset, {
          post: fromData
        })
        if (getPdCashAddData.code === 200) {
          this.$toast('提现成功')
          setTimeout(() => {
            this.$router.goBack()
          }, 1000)
        }
      },
      submit () {
        if (!this.fromData.id) {
          this.$toast('请选择提现支付宝账户')
          return
        }
        if (!this.fromData.pdc_amount) {
          this.$toast('请输入提现金额')
          return
        } else {
          if (Number(this.fromData.pdc_amount) <= 5) {
            this.$toast('提现金额大于5元')
            return
          }
        }
        // if(!this.syatus){
        this.vissrle = true
        // }
        // this.getPdCashAdd(this.fromData)
      },
      async getMyAsset () {
        let getMyAssetData = await this.$http.post(MyAsset, {
          get: {
            fields: 'predepoit' // 钱包余额
          }
        })
        if (getMyAssetData.code === 200) {
          console.log(getMyAssetData.datas.predepoit)
          this.listItem.pdc_amount = getMyAssetData.datas.predepoit
        }
      }
    },
    computed: {
      trueMoney () {
        let money =
          Number(this.fromData.pdc_amount) - 5 < 0
            ? 0
            : Number(this.fromData.pdc_amount) - 5
        return money
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import '../../../assets/css/mixin';
  /*input{*/
  /*background: none !important;*/
  /*}*/
  .wrap {
    font-size: pxTorem(30);
    .list-item {
      display: flex;
      padding: pxTorem(30) pxTorem(50);
      padding-right: pxTorem(45);
      background: #fff;
      .list-content {
        display: flex;
        align-items: center;
        width: 100%;
        color: #2c2c2c;
        // line-height: 1;
        .card-num {
          margin-top: pxTorem(20);
          font-size: pxTorem(26);
          color: #999;
        }
      }
      .list-right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-shrink: 0;
        width: pxTorem(100);
      }
    }
    .content {
      margin-top: pxTorem(22);
      background: #fff;
      .top {
        margin: 0 pxTorem(25);
        margin-top: pxTorem(25);
        padding: 0 pxTorem(25);
        overflow: hidden;
        .title {
          margin-top: pxTorem(45);
        }
        .money {
          margin-top: pxTorem(35);
          padding-bottom: pxTorem(40);
          font-size: pxTorem(48);
          color: #bd081c;
          input {
            border: none;
          }
        }
      }
      .bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 pxTorem(50);
        height: pxTorem(97);
        font-size: pxTorem(26);
        color: #999999;
        background: #fff;
        .bottom-button {
          display: flex;
          align-items: center;
          height: 100%;
          padding-right: pxTorem(136);
          color: #2c2c2c;
        }
      }
    }
    .info {
      padding: pxTorem(40);
      padding-left: pxTorem(50);
      font-size: pxTorem(26);
      color: #2c2c2c;
    }
    .button {
      padding: 0 pxTorem(25);
    }
  }

  .heder {
    @include fja();
    padding: pxTorem(16) pxTorem(8);
    .item {
      flex: 1;
      @include fja();
      font-size: .28rem;
      &:first-child {
        justify-content: flex-start;
      }
      &:last-child {
        justify-content: flex-end;
      }
    }
  }

  .boxssss {
    height: pxTorem(260);
    background: #fff;
    @include fja();
    justify-content: flex-start;
    flex-direction: column;
    .title {
      margin-top: pxTorem(30);
      color: #707274;
      font-size: pxTorem(30);
    }
    input {
      text-indent: 2em;
      height: pxTorem(60);
      border-radius: pxTorem(8);
      margin-top: pxTorem(50);
      border: 1px solid #707274;
    }
  }
</style>
