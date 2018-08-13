<template>
  <div>
    <ts-header title="修改密码"
               back></ts-header>
    <page>
      <div class="wrap">
        <ds-input type="password"
                  placeholder="旧密码"
                  iconClass="icon-mima"
                  v-model="formData.oldPasswrod"></ds-input>
        <ds-input type="password"
                  placeholder="新密码"
                  iconClass="icon-mima"
                  v-model="formData.newPassword"></ds-input>
        <ds-input type="password"
                  placeholder="确认新密码"
                  v-model="formData.rePassword"
                  iconClass="icon-mima"></ds-input>
        <div class="btn"
             @click="next">
          <ds-button type="primary" :disabled="!isValid"
                     size="large">完成
          </ds-button>
        </div>

      </div>
    </page>
  </div>
</template>
<script>
  import { ModifyPwd } from '../../../assets/js/api'
  import verify from '../../../utils/verify'
  import { SET_KEY, SET_USER } from '../../../store/mutations/mutations-types'
  import { mapMutations } from 'vuex'

  export default {
    data () {
      return {
        formData: {
          oldPasswrod: '',
          newPassword: '',
          rePassword: ''
        }
      }
    },
    methods: {
      ...mapMutations([SET_KEY, SET_USER]),
      next () {
        if (this.isValid) {
          this.editPassword()
        } else {
          let valid = this.checkPwd
          if (valid.key === 'rePassword')
            this.formData.rePassword = ''
          this.$toast({message: valid.message, duration: valid.duration, position: 'bottom'})
        }
      },
      async editPassword () {
        if(this.checkPwd.isValid){
          let json = await this.$http.post(ModifyPwd, {
            post: {old_password: this.formData.oldPasswrod, new_password: this.formData.newPassword}
          }, {}, {show: true, type: 'mini'})
          if (json.code === 200) {
            console.log(json)
            this[SET_KEY]('')
            this[SET_USER]({})
            this.$toast('修改成功')
            setTimeout(() => {
              this.$router.replace({path: '/profile'})
            }, 200)
          }
        }else{
          let valid = this.checkPwd
          if (valid.key === 'rePassword')
            this.formData.rePassword = ''
          this.$toast({message: valid.message, duration: valid.duration, position: 'bottom'})
        }
      },
    },
    created () {
    },
    mounted () {},
    computed: {
      isValid () {
        return verify.requiredObjProp(this.formData).isValid
      },
      checkPwd () {
        console.log()
        if (!verify.password(this.formData.newPassword)) {
          return {
            isValid: false, message: '密码为6-16位英文数字组合',
            duration: 3000, key: 'password'
          }
        }
        if (this.formData.newPassword !== this.formData.rePassword) {
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
  @import "../../../assets/css/mixin";
  @import "../../../assets/css/variables";

  .wrap {
    background: #fff;
    .btn {
      margin-top: pxTorem(90);
      padding: 0 0.3rem;
    }
    .box {
      padding: 0 0.3rem;
      margin-top: 0.8rem;
      font-size: 0.4rem;
      .left {
        .text {
          color: #989898;
        }
        .register {
          color: $themeColor;
          padding-left: 0.2rem;
        }
      }
      .right {
        color: #989898;
      }
    }
    .otherLogins {
      position: fixed;
      bottom: pxTorem(174);
      width: 100%;
      padding: 0 0.3rem;
      font-size: pxTorem(28);
      color: #4a4a4a;
      text-align: center;
      .other-box {
        display: flex;
        margin-top: pxTorem(60);
        .other-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          .other-icon {
            display: flex;
            justify-content: center;
            align-items: center;
            width: pxTorem(82);
            height: pxTorem(82);
            border-radius: pxTorem(8);
            margin-bottom: pxTorem(35);
            &.weixin {
              background: #09b908;
            }
            &.xinlang {
              background: #bd081c;
            }
            &.zhifubao {
              background: #63a9ff;
            }
          }
        }
      }
    }
  }
</style>
