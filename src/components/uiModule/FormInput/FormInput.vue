<template>
  <div class="upd-form">
    <ds-input type="tel" v-model="formData.tel" label="手机号" placeholder="请输入手机号"></ds-input>
    <ds-input type="number" v-model.number="formData.code" label="验证码" placeholder="请输入验证码">
      <div class="ts-right" :class="{'disabled':cInterval||!checkTel}">
        <span class="right" v-show="!cInterval" @click="handleGetCode">点击获取</span>
        <span class="right" v-show="cInterval">{{seconds}}秒</span>
      </div>
    </ds-input>
    <ds-input type="password" v-model.trim="formData.password" label="新密码" placeholder="请输入密码"></ds-input>
    <ds-input type="password" v-model.trim="formData.rePassword" label="确认密码" placeholder="请输入密码"></ds-input>
    <div class="btn-reset" :style="{paddingTop:mode!=='register'?'.95rem':'.45rem'}">
      <ds-button :disabled="!checkForm" @click="handleNext()" type="primary" size="large">{{btnText}}</ds-button>
    </div>
  </div>
</template>

<script>
  import verify from '../../../utils/verify'
  // import DsInput from '../../../components/module/Input/input'
  // import {GET_CODE} from '../../assets/js/api'
  import { get_sms_captcha ,CLIENT} from '../../../assets/js/api'

  export default {
    name: 'FormInputs',
    props: {
      mode: String,
      btnText: String,
      formData: Object,
      codeSeconds: Number,
      codeInterval: Number
    },
    data () {
      return {
        seconds: this.codeSeconds,
        cInterval: this.codeInterval
      }
    },
    watch: {
      codeSeconds (val) {
        this.seconds = val
      },
      codeInterval (val) {
        console.log(val)
        this.cInterval = val
      }
    },
    methods: {
      async getCode () {
        let json = await this.$http.get(get_sms_captcha, {
            phone: this.formData.tel,
            type: 3
        })
        console.log(json)
        // let json = await this.$http.post(GET_CODE, {
        //   'tel': this.formData.tel,
        //   'type': this.formData.type
        // });
        // this.$toast({message: json.data, duration: 1500, position: 'bottom'});
        if(json.code===200){
          this.cInterval = window.setInterval(() => {
            if (this.seconds === 1) {
              window.clearInterval(this.cInterval);
              this.cInterval = null;
              this.seconds = 60;
              return;
            }else{

            }
            this.seconds--;
          }, 1000)
        }
      },
      handleNext () {
        if (this.checkPwd.isValid) {
          this.$emit('submit')
        } else {
          let valid = this.checkPwd
          if (valid.key === 'rePassword')
            this.formData.rePassword = ''
          this.$toast({message: valid.message, duration: valid.duration, position: 'bottom'})
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
        let rePwd = verify.required(this.formData.rePassword)
        let {tel, code, password, rePassword} = this.formData
        let objProp = verify.requiredObjProp({tel, code, password, rePassword})
        return objProp.isValid && rePwd
      }
      ,
      checkTel () {
        return verify.mobile(this.formData.tel)
      },
      checkPwd () {
        if (!verify.password(this.formData.password)) {
          return {
            isValid: false, message: '密码为6-16位英文数字组合',
            duration: 3000, key: 'password'
          }
        }
        if (this.formData.password !== this.formData.rePassword) {
          return {
            isValid: false, message:
              '两次密码不一致，请重新输入', key: 'rePassword', duration: 1500,
          }
        }
        return {isValid: true}
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/variables";
  @import "../../../assets/css/mixin";

  .upd-form {
    padding-top: .10rem;
    .ts-right {
      width: 2.06rem;
      border-left: 1px solid #efefef;
      @include sc(.30rem, $themeColor);
      .right {
        display: block;
        height: .62rem;
        line-height: .62rem;
        text-align: center;
      }
      &.disabled {
        color: #C6C6C6;
      }
    }
    .register-tips {
      margin-top: .38rem;
      @include sc(.26rem, #909090);
      text-align: center;
      a {
        color: $themeColor;
      }
    }
    .btn-reset {
      padding: .40rem .35rem 0;
      .go-login {
        margin-top: .18rem;
        text-align: center;
        span {
          @include sc(.26rem, #909090)
        }
        a {
          @include sc(.26rem, #020202)
        }
      }
    }
  }
</style>
