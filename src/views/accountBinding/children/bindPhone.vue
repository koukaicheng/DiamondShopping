<template>
  <div class="ts-register"
       ref="fullScreen">
    <ts-header title="绑定手机号"
               back></ts-header>
    <page>
      <div>
        <div class="upd-form">

          <ds-input iconClass="icon-zhanghao"
                    type="tel"
                    v-model.number="formData.phone"
                    label=""
                    placeholder="手机号">
            <div class="ts-right"
                 :class="{'disabled':cInterval||!checkTel}">
          <span class="right word"
                v-show="!cInterval"
                @click="handleGetCode">发送验证码</span>
              <span class="right"
                    v-show="cInterval">{{seconds}}秒</span>
            </div>
          </ds-input>
          <ds-input iconClass="icon-zhucedengluyanzhengma"
                    type="number"
                    v-model="formData.captcha"
                    label=""
                    placeholder="验证码"></ds-input>

          <div class="btn-reset">
            <ds-button @click="handleNext()"
                       type="primary"
                       :disabled="!checkForm"
                       size="large">绑定
            </ds-button>
          </div>

        </div>
      </div>
    </page>
  </div>
</template>

<script>
  import verify from '../../../utils/verify'
  import {
    register,
    BindMobileStep2,
    BindMobileStep1,
    get_sms_captcha
  } from '../../../assets/js/api'

  export default {
    name: 'bindPhone',
    data () {
      return {
        formData: {
          type: 1,
          phone: '',
          captcha: '',
        },
        seconds: 60,
        cInterval: null
      }
    },
    watch: {},
    methods: {
      async getCode () {
        let getSmsCaptchaData = await this.$http.post(BindMobileStep1, {post:{mobile: this.formData.phone}})
        if (getSmsCaptchaData.code === 200) {
          this.$toast('验证码发送成功，请注意查看！')
          this.cInterval = window.setInterval(() => {
            if (this.seconds === 1) {
              window.clearInterval(this.cInterval)
              this.cInterval = null
              this.seconds = 60
              return
            } else {
            }
            this.seconds--
          }, 1000)
        }
      },
      async handleNext () {
        let json = await this.$http.post(BindMobileStep2, {post:{auth_code:this.formData.captcha}})
        if(json.code===200){
          this.$toast('绑定成功！')
          this.$router.goBack()
        }
      },
      handleGetCode () {
        if (this.checkTel) {
          this.getCode()
        }
      }
    },
    computed: {
      checkForm () {
        let {phone, captcha} = this.formData
        let objProp = verify.requiredObjProp({
          phone,
          captcha,
        })
        return objProp.isValid
      },
      checkTel () {
        return verify.mobile(this.formData.phone)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/variables";
  @import "../../../assets/css/mixin";

  .ts-register {
    height: 100%;
    background-color: #ffffff;
  }

  .upd-form {
    padding-top: 0.1rem;
    .ts-right {
      width: 2.06rem;
      border-left: 1px solid $themeColor; /*no*/
      padding-left: pxTorem(10);
      @include sc(0.3rem, $themeColor);
      .right {
        display: block;
        height: 0.62rem;
        line-height: 0.62rem;
        text-align: center;
        color: $themeColor;
      }
      &.disabled {
        .word {
          color: #c6c6c6;
        }
      }
    }
    .register-tips {
      margin-top: 1.2rem;
      @include sc(0.26rem, #909090);
      text-align: center;
      color: #4a4a4a;
      a {
        color: $themeColor;
      }
    }
    .btn-reset {
      padding: 0.4rem 0.35rem 0;
      .go-login {
        margin-top: 0.18rem;
        text-align: center;
        span {
          @include sc(0.26rem, #909090);
        }
        a {
          @include sc(0.26rem, #020202);
        }
      }
    }
  }
</style>
