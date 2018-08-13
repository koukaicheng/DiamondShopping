<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive :include="includePath">
        <router-view class="router"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  import transfer from './utils/transfer'
  import { SET_KEY, SET_USER, SUB_DIAMONDS_INFO ,SELL_AGREEMENT_STATUS} from './store/mutations/mutations-types'

  export default {
    name: 'App',
    data () {
      return {
        transitionName: 'slide-left',
        includePath: ['index', 'sellDrill', 'buyDrill', 'college', 'profile', 'cart', 'address', 'userinfo', 'lnlayService', 'register'],
        excludePath: {
          index: true,
          buyDrill: true,
          sellDrill: true,
          college: true,
          profile: true,
          search: true
        },
        meiqia: MEIQIAOFF
      }
    },
    computed: {
      fullPath () {
        return this.$route.fullPath
      }
    },
    mounted () {
      this.plusPush()
      transfer.$on('resErr', (val) => {
        let errCode = val.error_code
        switch (errCode) {
          case 10002:
            this.$store.commit(SET_KEY, '')
            this.$store.commit(SET_USER, {})
            this.$store.commit(SUB_DIAMONDS_INFO, null)
            this.$store.commit(SELL_AGREEMENT_STATUS,false)
            this.$toast('登录异常，请重新登录')
            this.$router.push({path: '/login'})
            break
          default:
            this.$toast(val.datas.error)
            break
        }
      })
      this.meiQiaPanel()
    },
    methods: {
      plusPush () {
        if ($prod) {
          if (!this.$store.state.key) return
          // 监听点击推送消息事件
          plus.push.addEventListener('click', (msg) => {
            if (msg.payload) {
              if (typeof(msg.payload) == 'string') {
                this.$toast(msg.payload)
              } else {
                alert(JSON.stringify(msg.payload))
              }
            }
          }, false)
          plus.push.addEventListener('receive', function (res) {
            console.log(res)
          })
        }
      },
      meiQiaPanel () {
        _MEIQIA('getPanelVisibility', (val) => {
          let MEIQIAOFF = val !== 'visible' ? true : false
          window.MEIQIAOFF = MEIQIAOFF
        })
      },
    },
    watch: {
      $route (to, from) {
        let isBack = this.$router.isBack
        const isInclude = this.excludePath[from.name]
        const isToInclude = this.excludePath[to.name]
        if (isBack) {
          this.transitionName = 'slide-right'
        } else {
          if (isInclude && isToInclude) {
            this.transitionName = ''
          } else if (to.name === 'index' && from.name === null) {
            this.transitionName = ''
          } else {
            this.transitionName = 'slide-left'
          }
        }
        this.$router.isBack = false
      },
      meiqia (val) {
        // console.log(val, 'watch')
      },
    }
  }
</script>

<style lang="scss">
  @import "./assets/css/global";
  @import "./assets/css/variables";

  .includeRouter {
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  @mixin routeAnimation($duration) {
    z-index: $childZIndex;
    @extend .includeRouter;
    height: 100%;
    transition: $duration;
    background-color: #f7f7f7;
  }

  .router {
    @include routeAnimation(0.3s);
    backface-visibility: hidden;
    perspective: 1000;
    transform: translate3d(0, 0, 0);
    -webkit-transform: translate3d(0, 0, 0);
  }

  .slide-left-enter,
  .slide-right-leave-active {
    z-index: 1000;
    transform: translate3d(100%, 0, 0);
    -webkit-transform: translate3d(100%, 0, 0);
  }

  .slide-left-leave-active {
    transform: translate3d(-100px, 0, 0);
    -webkit-transform: translate3d(-100px, 0, 0);
  }

  .slide-right-enter {
    transform: translate3d(-200px, 0, 0);
    -webkit-transform: translate3d(-200px, 0, 0);
  }

  .slide-child-leave-active,
  .slide-child-enter {
    transform: translate3d(100%, 0, 0);
    -webkit-transform: translate3d(100%, 0, 0);
  }

  @mixin fullScreen {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .child-route {
    @include fullScreen;
    transition: all 0.3s ease;
    z-index: 1000;
    display: flex;
    flex-direction: column;
  }
</style>
