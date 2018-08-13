<template>
  <div class="ts-forgot">
    <ts-header title="忘记密码" back></ts-header>
    <form-inputs :formData="formData"
                 btnText="确认重置" :codeSeconds="codeSeconds" :codeInterval="codeInterval"
                 @submit="updPwd"></form-inputs>
  </div>
</template>

<script>
  import FormInputs from '../../components/uiModule/FormInput/FormInput'
  import { CheckSmsCaptcha, FindPassword, CLIENT } from '../../assets/js/api'
  import { SET_KEY, SET_USER } from '../../store/mutations/mutations-types'
  import { mapMutations } from 'vuex'
  export default {
    components: {FormInputs},
    name: 'forgot',
    data () {
      return {
        formData: {
          tel: '',
          code: null,
          password: '',
          rePassword: '',
          type: 3
        },
        codeSeconds: 60,
        codeInterval: null
      }
    },
    created () {

    },
    methods: {
      ...mapMutations([SET_KEY, SET_USER]),
      async updPwd () {
        let json = await this.$http.post(CheckSmsCaptcha, {
          get: {
            type: 3,
            phone: this.formData.tel,
            captcha: this.formData.code
          }
        })
        if(json.code===200){
          this.editPassword()
        }
      },
      async editPassword () {
        let json = await this.$http.post(FindPassword, {
          post: {
            phone: this.formData.tel,
            captcha: this.formData.code,
            password: this.formData.password,
            client: CLIENT || 'ios'
          }
        },{},{show:true,type:'mini'})
        if(json.code===200){
          this.$toast('修改成功')
          this[SET_KEY]('')
          this[SET_USER]({})
          setTimeout(()=>{
            this.$router.goBack()
          },200)
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .ts-forgot {
    height: 100%;
    background-color: #ffffff;
  }
</style>
