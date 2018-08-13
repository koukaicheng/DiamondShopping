<template>
  <div class="">
    <ts-header title="订单支付" back></ts-header>
    <page>
      <div class="wrap">
        <div class="order-money">
          <div class="num">订单金额：￥{{pay_amount}}</div>
          <!--<div class="explain">-->
           <!---->
          <!--</div>-->
          <div class="tip"> 订单为您保留{{minute}}分{{second}}秒，超时未付款，订单自动取消</div>

        </div>
        <div class="boxs">
          <div class="predeposit-checked">
            <div class="checked">
              <kc-checkbox v-model="checked" stauts @input="poswaord"></kc-checkbox>
            </div>
            <div class="title">是否使用余额支付</div>

          </div>
          <div class="predeposit" v-show="syatus">
            当前余额
            <span>
          ￥{{predepoit}}
          </span>
          </div>
        </div>

        <div class="checkboxs">
          <div class="item border-1px" @click.prevent="Choice(0)">
            <div class="checked">
              <kc-checkbox v-model="payment_code[0].checked"></kc-checkbox>
            </div>
            <div class="icon zhifubao">
              <icon font-name="icon-zhifubao"
                    color="#fff"
                    size="55"></icon>
            </div>
            <div class="title">支付宝支付</div>
          </div>
          <div class="item" @click.prevent="Choice(1)">
            <div class="checked">
              <kc-checkbox v-model="payment_code[1].checked"></kc-checkbox>
            </div>
            <div class="icon weixin">
              <icon font-name="icon-ai-weixin"
                    color="#fff"
                    size="40"></icon>
            </div>
            <div class="title">微信支付</div>
          </div>
          <div class="item border-1px" @click.prevent="Choice(2)">
            <div class="checked">
              <kc-checkbox v-model="payment_code[2].checked"></kc-checkbox>
            </div>
            <div class="icon yinlian">
              <img src="../../assets/imgs/yinlian.png" alt="">
            </div>
            <div class="title">汇款支付</div>
          </div>
        </div>
        <div class="submit">
          <ds-button type="primary" size="large" @click="next()" :disabled="!disabled">下一步</ds-button>
        </div>
        <div class="tip">
          如果检测未通过，退款到账户的钱包
        </div>

        <div class="content">
          <div class="header-tip">银行卡支付限额如下：</div>
          <div class="box first">
            <div class="title">1、若超过单笔额度</div>
            <div class="text">您可以分多笔充值到支付宝余额后，再进行付款</div>
          </div>
          <div class="box">
            <div class="title">2、若超过银行卡单日支付限额</div>
            <div class="text">您可以选择使用余额、余额宝或其他银行卡进行付款，再进行付款</div>
          </div>
          <div class="box">
            <div class="title">3、若超过月累计限额</div>
            <div class="text">您有开通网银，且网银额度足够支付时，可以在电脑端使用网银充值到支付宝余额后，再进行付款，再进行付款
            </div>
          </div>
          <div class="tobody">
            <div class="item ">
              <div class="title">银行</div>
              <div class="text">额度</div>
            </div>
            <div class="item ">
              <div class="title">工商银行</div>
              <div class="text">单笔1万、单日10万、单月10万</div>
            </div>
            <div class="item">
              <div class="title">农业银行</div>
              <div class="text">单笔2万、单日2万、单月20万</div>
            </div>
            <div class="item">
              <div class="title">建设银行</div>
              <div class="text">单笔5万、单日5万、单月10万</div>
            </div>
            <div class="item">
              <div class="title">中国银行</div>
              <div class="text">卡额度</div>
            </div>
            <div class="item">
              <div class="title">平安银行</div>
              <div class="text">单笔5万、单日5万、单月无限额</div>
            </div>
            <div class="item">
              <div class="title">交通银行</div>
              <div class="text">单笔4万、单日5万、单月无限额</div>
            </div>
            <div class="item">
              <div class="title">招商银行</div>
              <div class="text">单笔5万、单日无限额、单月无限额</div>
            </div>
            <div class="item">
              <div class="title">浦发银行</div>
              <div class="text">单笔10万、单日10万、单月无限额</div>
            </div>
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
        <input type="password" v-model="info.password"/>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import { PayNew, Pay, CheckPdPwd} from '../../assets/js/api'

  export default {
    data () {
      return {
        syatus: false,
        time: 1800,
        cInterval:null,
        payment_code: [
          {checked: true, value: 'alipay', val: 'alipay_native'},
          {checked: false, value: 'wxpay', val: 'wxpay'}, {
            checked: false,
            value: 'transfer_pay',
            val: 'transfer_pay'
          }],
        pays: {},
        checked: false,
        vissrle: false,
        pay_amount: '',
        predepoit: '',
        info: {
          pay_sn: '',
          password: '',
          rcb_pay: 0,
          pd_pay: 0,
          payment_code: 'alipay_native'
        }
      }
    },
    created () {
      this.info.pay_sn = this.$route.query.pay_sn
      this.memberBuy()
    },
    mounted () {
      this.timeChange()
      if ($prod) {
        this.plusReady()
      }
    },
    methods: {
      timeChange () {
        this.cInterval = window.setInterval(() => {
          this.time = this.time-1
          if(this.time===0){
            window.clearInterval(this.cInterval);
            this.cInterval = null;
          }
        }, 1000);
      },
      plusReady () {
        let self  = this
        plus.payment.getChannels((channels) => {
          console.log(channels,'channels')
          for (let i in channels) {
            let channel = channels[i]
            console.log(channel,'i')
            if (channel.id == 'qhpay' || channel.id == 'qihoo') {	// 过滤掉不支持的支付通道：暂不支持360相关支付
              continue
            }
            self.pays[channel.id] = channel
            self.checkServices(channel)
          }
          console.log(self.pays,'pays')
        }, (error) => {
          console.log('获取支付通道失败：' + error)
        })
      },
      checkServices (pc) {
        if (!pc.serviceReady) {
          let txt = null
          switch (pc.id) {
            case 'alipay':
              txt = '检测到系统未安装“支付宝快捷支付服务”，无法完成支付操作，是否立即安装？'
              break
            default:
              txt = '系统未安装“' + pc.description + '”服务，无法完成支付，是否立即安装？'
              break
          }
          // plus.nativeUI.confirm(txt, function (e) {
          //   if (e.index == 0) {
          //     pc.installService()
          //   }
          // }, pc.description)
        }
      },
      cancel () {
        this.vissrle = false
        this.checked = false
        this.info.password = ''
      },
      async determine () {
        if (this.info.password.length >= 6) {
          let json = await this.$http.post(CheckPdPwd, {post: {password: this.info.password}}, {})
          if (json.code === 200) {
            this.$toast({message: '验证成功', position: 'middle'})
            this.syatus = true
            this.vissrle = false
          }
        } else {
          this.$toast({message: '请正确输入', position: 'middle'})
        }
      },
      poswaord (val) {
        if (!val) return
        if (!this.syatus) {
          this.vissrle = true
        }
      },
      Choice (num) {
        let checked = this.payment_code[num].checked
        if (checked) return
        this.payment_code.forEach((item, index, arr) => {
          item.checked = false
        })
        this.payment_code[num].checked = !checked
        let obj = this.payment_code.filter((i) => i.checked === true)[0]
        if (obj) {
          this.info.payment_code = obj.val
        } else {
          this.info.payment_code = ''
        }
      },
      async memberBuy () {
        let json = await this.$http.post(Pay, {
          post: {
            pay_sn: this.info.pay_sn
          }
        }, {show: true, type: 'mini'})
        this.predepoit = json.datas.pay_info.member_available_pd
        this.pay_amount = json.datas.pay_info.pay_amount
      },
      async next () {
        await this.$http.get(PayNew, this.info).then((res) => {
          if (res.datas && res.datas.success) {
            this.$toast('支付成功')
            let {pay_amount, payment_code_str} = res.datas
            let data = {pay_amount, payment_code_str}
            if (data) {
              setTimeout(() => {
                this.$router.replace({name: 'paymentSuccess', params: {data}})
              }, 800)
            }
            return
          }
          if ($prod) {
            let key = this.payment_code.filter((i) => i.checked === true)[0]['value']
            let obj = this.pays[key]
            console.log(obj,'this.pays',this.pays)
            plus.payment.request(obj, res.datas.signStr, (result) => {
              let pay_amount = this.pay_amount
              let payment_code_str = key
              let data = {
                payment_code_str,
                pay_amount
              }
              this.$toast('支付成功')
              setTimeout(() => {
                this.$router.replace({name: 'paymentSuccess', params: {data}})
              }, 800)
            }, (e) => {
              this.$toast('您当前可能未安装该支付软件，支付失败')
            })
          }
          if (res.datas && res.datas.account_name && res.datas.amount) {
            // 挑选汇款支付
            let info = Object.assign({}, res.datas, {pay_sn: this.info.pay_sn})
            this.$router.replace({name: 'remittance', params: {info}})
          }
        })
      }
    },
    watch: {
      checked (val) {
        this.info.pd_pay = val === true ? 1 : 0
      },
      vissrle (val) {
        if (!val && !this.syatus) {
          this.checked = false
        }
      }
    },
    computed: {
      disabled () {
        let checked = this.payment_code.some((i) => i.checked === true)
        return this.checked === true || checked === true
      },
      minute(){
        return parseInt(this.time/60);
      },
      second(){
        return parseInt(this.time%60);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/mixin";
  @import "../../assets/css/variables";

  .wrap {
    .order-money {
      /*height: pxTorem(130);*/
      background-color: #ffffff;
      padding-left: pxTorem(54);
      .num {
        padding-top: pxTorem(24);
        font-size: pxTorem(30);
        color: #2c2c2c;
      }
      .tip {
        padding-top: pxTorem(10);
        font-size: pxTorem(24);
        color: #999999;
        text-align: left;
        padding-bottom: pxTorem(20);
      }
    }
    .boxs {
      margin-top: pxTorem(10);
      padding: pxTorem(20) pxTorem(25) 0 pxTorem(25);
      background: #fff;
      /*padding: pxTorem(10) 0;*/
      @include fja();
      justify-content: flex-start;
      .predeposit-checked {
        @include fja();
        .title {
          margin-left: pxTorem(25);
          font-size: pxTorem(30);
        }
      }
      .predeposit {
        margin-left: pxTorem(10);
        font-size: pxTorem(30);
        padding: pxTorem(10) 0;
        span {
          color: $themeColor;
        }
      }
    }
    .checkboxs {
      margin-top: pxTorem(20);
      /*height: pxTorem(325);*/
      background: #fff;
      .item {
        margin: pxTorem(20) pxTorem(25) 0 pxTorem(25);
        height: pxTorem(106);
        @include fja();
        justify-content: flex-start;
        .checked {
        }
        .icon {
          margin-left: pxTorem(36);
          border-radius: pxTorem(8);
          width: pxTorem(70);
          height: pxTorem(70);
          @include fja();
          overflow: hidden;
          &.zhifubao {
            background: #63a9ff;
          }
          &.weixin {
            background: #09b908;
          }
          &.yinlian {

          }
          &.yue {
            background: $themeColor;
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
        .title {
          margin-left: pxTorem(30);
          font-size: pxTorem(30);
          color: #2c2c2c;
        }
      }
    }
    .submit {
      margin: pxTorem(48) pxTorem(35) 0 pxTorem(35);
      padding-bottom: 0.6rem;
    }
    .tip {
      text-align: center;
      font-size: pxTorem(28);
      color: #999999;
    }
    .content {
      padding-bottom: pxTorem(102);
      margin-top: pxTorem(40);
      .header-tip {
        padding-top: pxTorem(40);
        margin: 0 pxTorem(35) 0 pxTorem(42);
        font-size: pxTorem(30);
        color: $themeColor;
      }
      background: #fff;
      .box {
        margin: pxTorem(40) pxTorem(35) 0 pxTorem(44);
        .title {
          font-size: pxTorem(30);
          color: #121212;
        }
        .text {
          padding-top: pxTorem(25);
          font-size: pxTorem(28);
          color: #999999;
        }
      }
      .first {
        margin: pxTorem(30) pxTorem(35) 0 pxTorem(42);
      }
      .tobody {
        margin: pxTorem(32) pxTorem(66) 0 pxTorem(44);
        /*height: pxTorem(710);*/
        background-color: #ffffff;
        border: solid 1px #cccccc;
        .item {
          height: pxTorem(80);
          line-height: pxTorem(80);
          border-bottom: 1px solid #d6d6d6;
          font-size: pxTorem(24);
          color: #000000;
          @include fja();
          &:first-child {
            background-color: #f2f2f2;
            border-bottom: none;
          }
          &:last-child {
            border-bottom: none;
          }
          .title {
            width: pxTorem(186);
            flex-shrink: 0;
            height: 100%;
            border-right: 1px solid #d6d6d6;
            text-indent: pxTorem(38);
          }
          .text {
            flex: 1;
            height: 100%;
            text-indent: pxTorem(40);
          }
        }
      }
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
