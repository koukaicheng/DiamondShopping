<template>
  <div class="upd-form">

    <ds-input iconClass="icon-zhanghao"
              type="number"
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
    <ds-input iconClass="icon-mima"
              type="password"
              v-model.trim="formData.password"
              label=""
              placeholder="设置密码"></ds-input>
    <ds-input iconClass="icon-mima"
              type="password"
              v-model.trim="formData.rePassword"
              label=""
              placeholder="确认密码"></ds-input>
    <ds-input iconClass="icon-zhanghao"
              type="tel"
              v-model="formData.invite_code"
              label=""
              placeholder="邀请码"></ds-input>
    <p class="register-tips"
       v-if="mode==='register'">点击注册即视为同意
      <router-link to="/register/agreement">《Letest用户服务协议》</router-link>
    </p>
    <div class="btn-reset"
         :style="{paddingTop:mode!=='register'?'.95rem':'.45rem'}">
      <ds-button :disabled="!checkForm"
                 @click="handleNext()"
                 type="primary"
                 size="large">{{btnText}}</ds-button>
    </div>
    <p class="register-tips"
       v-if="mode==='register'">已有账号,
      <!--<router-link to="/login"></router-link>-->
      <a @click="back">立即登录</a>
    </p>
  </div>
</template>

<script>
import verify from "../../../utils/verify";
import { get_sms_captcha } from "../../../assets/js/api";
export default {
  name: "form-input",
  props: {
    mode: String,
    btnText: String,
    formData: Object,
    codeSeconds: Number,
    codeInterval: Number
  },
  data() {
    return {
      seconds: this.codeSeconds,
      cInterval: this.codeInterval
    };
  },
  watch: {
    codeSeconds(val) {
      this.seconds = val;
    },
    codeInterval(val) {
      this.cInterval = val;
    }
  },
  methods: {
    async getCode() {
      let getSmsCaptchaData = await this.$http.get(get_sms_captcha, {
        phone: this.formData.phone,
        type: 1
      });
      console.log(getSmsCaptchaData);
      // this.$toast({message: json.data, duration: 1500, position: 'bottom'});
      if (getSmsCaptchaData.code === 200) {
        this.$toast("验证码发送成功，请注意查看！");

        this.cInterval = window.setInterval(() => {
          if (this.seconds === 1) {
            window.clearInterval(this.cInterval);
            this.cInterval = null;
            this.seconds = 60;
            return;
          } else {
          }
          this.seconds--;
        }, 1000);
      }
    },
    handleNext() {
      if (this.checkPwd.isValid) {
        this.$emit("submit");
      } else {
        let valid = this.checkPwd;
        if (valid.key === "rePassword") this.formData.rePassword = "";
        this.$toast({message: valid.message, duration: valid.duration, position: 'bottom'});
      }
    },
    handleGetCode() {
      if (this.checkTel) {
        this.getCode();
      }
    },
    back(){
      this.$router.goBack()
    }
  },
  computed: {
    checkForm() {
      let rePwd = verify.required(this.formData.rePassword);
      let { phone, captcha, password, rePassword } = this.formData;
      let objProp = verify.requiredObjProp({ phone, captcha, password, rePassword });
      return objProp.isValid && rePwd;
    },
    checkTel() {
      return verify.mobile(this.formData.phone);
    },
    checkPwd() {
      if (!verify.password(this.formData.password)) {
        return {
          isValid: false,
          message: "密码为6-16位英文数字组合",
          duration: 3000,
          key: "password"
        };
      }
      if (this.formData.password !== this.formData.rePassword) {
        return {
          isValid: false,
          message: "两次密码不一致，请重新输入",
          key: "rePassword",
          duration: 1500
        };
      }
      return { isValid: true };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/css/mixin";
@import "../../../assets/css/variables";

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
