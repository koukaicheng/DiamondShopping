<template>
  <div>
    <ts-header title="登录" back></ts-header>
    <page>
      <div class="wrap">
        <ds-input type="number" placeholder="手机号" iconClass="icon-yonghu" v-model="formData.username"></ds-input>
        <ds-input type="password" placeholder="密码" v-model="formData.password" iconClass="icon-mima"></ds-input>
        <div class="btn" @click="loginFn(formData)">
          <ds-button type="primary" size="large">登录</ds-button>
        </div>
        <div class="box">
          <div class="ds-flex-space-between">
            <div class="left ds-flex-center">
              <div class="text">没有账号?</div>
              <router-link to="/register">
                <div class="register">立即注册</div>
              </router-link>

            </div>
            <div class="right" @click="link">
              <div class="text">忘记密码?</div>
            </div>
          </div>
        </div>

        <div class="otherLogins">
          <span>其他方式登录</span>
          <ul class="other-box">
            <li class="other-item" @click="login('weixin')">
              <div class="other-icon weixin">
                <icon font-name="icon-ai-weixin" color="#fff" size="45"></icon>
              </div>
              <span>微信登录</span>
            </li>
            <li class="other-item">
              <div class="other-icon xinlang">
                <icon font-name="icon-weibo" color="#fff" size="55"></icon>
              </div>
              <span>新浪登录</span>
            </li>
            <!--<li class="other-item">-->
            <!--<div class="other-icon zhifubao">-->
            <!--<icon font-name="icon-zhifubao" color="#fff" size="55"></icon>-->
            <!--</div>-->
            <!--<span>支付宝登录</span>-->
            <!--</li>-->
          </ul>
        </div>

      </div>
    </page>
  </div>
</template>
<script>
  import verify from '../../utils/verify'
  import { Login, CLIENT, Member, TIMESTAMP ,GetWxInfo,GetMobileInfo} from '../../assets/js/api'
  import { SET_KEY, SET_USER } from '../../store/mutations/mutations-types'
  import { mapMutations } from 'vuex'

  export default {
    data () {
      return {
        formData: {
          username: '',
          password: ''
        },
        auths: {},
        clientid: ''
      }
    },
    methods: {
      ...mapMutations([SET_KEY, SET_USER]),
      link () {
        this.$router.push({path: '/forgot'})
      },
      loginFn (obj) {
        if (!verify.mobile(obj.username)) {
          this.$toast('请输入正确的手机号')
          return
        }
        this.getLogin()
      },
      async getLogin () {
        let getLoginData = await this.$http.post(Login, {
          post: {
            client: CLIENT || 'ios',
            username: this.formData.username,
            password: this.formData.password,
            client_id: this.clientid
          }
        }, {}, {show: true, type: 'mini'})
        if (getLoginData.code === 200) {
          this.$toast('登陆成功')
          this[SET_KEY](getLoginData.datas.key)
          this.getUserInfo(getLoginData.datas.key)
          setTimeout(() => {
            this.$router.goBack()
          }, 1000)
        }
      },
      async weiLogin(openid,unionid,access_token){
        let json = await this.$http.post(GetWxInfo,{
          post:{
            openid,
            unionid,
            access_token,
            client_id: this.clientid,
            client: CLIENT || 'ios',
          }
        },{},{show:true,type:'mini'})
        if(json.code===200){
          this[SET_KEY](json.datas.key)
          this.getUserInfo(json.datas.key)
          this.getMobileStatus()
        }
      },

      async getMobileStatus(){
        let json = await this.$http.get(GetMobileInfo,{})
        if(json.code===200){
           if(json.datas.mobile===null&&!json.datas.state){
             this.$toast('请您绑定手机号')
             this.$router.replace({path:'/bindPhone'})
           }else{
             this.$router.goBack()
           }
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

      // 初始化登录信息
      loginInit () {
        plus.oauth.getServices(
          services => {
            for (var i in services) {
              var service = services[i]
              console.log(service.id + ': ' + service.authResult + ', ' + service.userInfo)
              this.auths[service.id] = service
            }
          },
          e => {
            this.$toast('获取登录认证失败：' + e.message)
          }
        )
        for (var i in this.auths) {
          this.logout(this.auths[i])
        }
      },
      /**
       * 调取第三方登录
       */
      login (id) {
        let self = this
        let auth = this.auths[id]
        this.logout(auth)
        if (auth) {
          let w = null
          if (plus.os.name == 'Android') {
            w = plus.nativeUI.showWaiting()
          }
          document.addEventListener('pause', function () {
              setTimeout(function () {
                w && w.close()
                w = null
              }, 2000)
            },
            false
          )
          auth.login(() => {
              w && w.close()
              w = null
              self.$toast('登录认证成功：')
              console.log(JSON.stringify(auth.authResult))
              console.log(auth)
              self.weiLogin(auth.authResult.openid,auth.authResult.unionid,auth.authResult.access_token)
            }, e => {
              w && w.close()
              w = null
              self.$toast('登录认证失败：')
              console.log('[' + e.code + ']：' + e.message)
            }
          )
        } else {
          console.log('无效的登录认证通道！')
          plus.nativeUI.alert('无效的登录认证通道！', null, '登录')
        }
      },
      /**
       * 获取用户信息
       */
      // userinfo (auth) {
      //   auth.getUserInfo(
      //     () => {
      //       console.log('获取用户信息成功：')
      //       console.log(JSON.stringify(auth.userInfo))
      //       let nickname =
      //         auth.userInfo.nickname ||
      //         auth.userInfo.name ||
      //         auth.userInfo.miliaoNick
      //       plus.nativeUI.alert('欢迎“' + nickname + '”登录！')
      //     },
      //     e => {
      //       console.log('获取用户信息失败：')
      //       console.log('[' + e.code + ']：' + e.message)
      //       plus.nativeUI.alert('获取用户信息失败！', null, '登录')
      //     }
      //   )
      // },
      /**
       * 注销登录
       */
      logout (auth) {
        auth.logout(
          () => {
            console.log('注销"' + auth.description + '"成功')
          },
          e => {
            console.log('注销"' + auth.description + '"失败：' + e.message)
          }
        )
      }
    },
    created () {
      if ($prod) {
        this.loginInit()
      }
    },
    mounted () {
      if ($prod) {
        // 获取 客户端推送标识信息对象
        let info = plus.push.getClientInfo()
        console.log(info)
        this.clientid = info.clientid
      }
    },
    computed: {}
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/css/mixin';
  @import '../../assets/css/variables';

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
      margin-top: pxTorem(200);
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
