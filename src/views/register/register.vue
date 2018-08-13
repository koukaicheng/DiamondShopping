<template>
  <div class="ts-register"
       ref="fullScreen">
    <ts-header title="注册"
               back></ts-header>
    <page>
      <div>
        <form-input :formData="formData"
                    btnText="注册"
                    :codeSeconds="codeSeconds"
                    :codeInterval="codeInterval"
                    mode="register"
                    @submit="next()"></form-input>
      </div>
    </page>
    <transition name="slide-child">
      <router-view class="child-route"></router-view>
    </transition>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui'
  import FormInput from '../../components/module/Register/Register'
  import { Segister, CLIENT ,Member} from '../../assets/js/api'
  import { SET_KEY, SET_USER } from '../../store/mutations/mutations-types'
  import { mapMutations } from 'vuex'
  export default {
    components: {FormInput},
    name: 'register',
    data () {
      return {
        formData: {
          type: 1,
          phone: '',
          captcha: null,
          password: '',
          rePassword: '',
          invite_code: ''
        },
        codeSeconds: 60,
        codeInterval: null
      }
    },
    methods: {
      ...mapMutations([SET_KEY,SET_USER]),
      async next () {
        let getSmsCaptchaData = await this.$http.post(Segister, {
          post: {
            client: CLIENT,
            password: this.formData.password,
            phone: this.formData.phone,
            captcha: this.formData.captcha,
            invite_code: this.formData.invite_code
          }
        })
        if (getSmsCaptchaData.code === 200) {
          this[SET_KEY](getSmsCaptchaData.datas.key)
          this.getUserInfo(getSmsCaptchaData.datas.key)
          this.$toast('注册成功')
          setTimeout(() => {
            this.$router.replace('/index')
          }, 1000)
        }
      },
      async getUserInfo (key) {
        let getUserInfoData = await this.$http.get(Member, {
          u_id: 3,
          key: key,
          t: TIMESTAMP
        })
        if (getUserInfoData.code === 200) {
          this[SET_USER](getUserInfoData.datas)
        }
      },
    },
    created () {

    }
  }

</script>

<style lang="scss" scoped>
  @import "../../assets/css/variables";
  @import "../../assets/css/mixin";

  .ts-register {
    height: 100%;
    background-color: #ffffff;
  }
</style>
