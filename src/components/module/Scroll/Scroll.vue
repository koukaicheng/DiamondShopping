<template>
  <div ref="wrapper" class="cube-scroll-wrapper asfsafgdsgdsgsg">
    <div class="cube-scroll-content">
      <div ref="listWrapper" class="cube-scroll-list-wrapper">
        <slot>
          <ul class="cube-scroll-list">
            <li @click="clickItem(item)" class="cube-scroll-item border-bottom-1px" v-for="item in data">{{item}}</li>
          </ul>
        </slot>
      </div>
      <slot name="pullup" :pullUpLoad="pullUpLoad" :isPullUpLoad="isPullUpLoad">
        <div class="cube-pullup-wrapper" v-if="pullUpLoad">
          <div class="before-trigger" v-if="!isPullUpLoad">
            <span class="refreshTxt">{{ pullUpTxt }}</span>
          </div>
          <div class="after-trigger" v-else>
            <div v-if="pullUpLoad" class="loading">
              <div class="spinner ">
                <img src="../../../assets/imgs/loding/rings.svg" />
              </div>
            </div>
          </div>
        </div>
      </slot>
    </div>
    <slot
      name="pulldown"
      :pullDownRefresh="pullDownRefresh"
      :pullDownStyle="pullDownStyle"
      :beforePullDown="beforePullDown"
      :isPullingDown="isPullingDown"
      :bubbleY="bubbleY">
      <div class="cube-pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
        <div class="before-trigger" v-if="beforePullDown">
          <bubble :y="bubbleY"></bubble>
        </div>
        <div class="after-trigger" v-else>
          <div v-if="isPullingDown" class="loading">
            <!--<loading  size="32"></loading>-->
             <div class="spinner ">
               <img src="../../../assets/imgs/loding/rings.svg" />
             </div>
          </div>
          <div v-else><i style="color: red;" class="iconfont icon-cubeic-right"></i> <span class="refreshTxt">{{ refreshTxt }}</span></div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  // import Loading from './Loading.vue'
  import Bubble from './Bubble.vue'
  import {getRect} from './dom'

  const COMPONENT_NAME = 'cube-scroll';
  const DIRECTION_H = 'horizontal';
  const DIRECTION_V = 'vertical';
  const DEFAULT_REFRESH_TXT = 'Refresh success';

  const EVENT_SCROLL = 'scroll';
  const EVENT_BEFORE_SCROLL_START = 'before-Scroll-start';
  const EVENT_CLICK = 'click';
  const EVENT_PULLING_DOWN = 'pulling-down';
  const EVENT_PULLING_UP = 'pulling-up';

  const DEFAULT_OPTIONS = {
    observeDOM: true,
    click: true,
    probeType: 1,
    scrollbar: false,
    pullDownRefresh: false,
    pullUpLoad: false
  };
  export default {
    name: COMPONENT_NAME,
    props: {
      data: {
        type: Array,
        default() {
          return []
        }
      },
      options: {
        type: Object,
        default() {
          return {}
        }
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      listenBeforeScroll: {
        type: Boolean,
        default: false
      },
      direction: {
        type: String,
        default: DIRECTION_V
      },
      refreshDelay: {
        type: Number,
        default: 20
      },
      listRef: {
        type: String,
        default: 'list'
      },
      bounce:{
        type:Boolean,
        default: true
      }
    },
    data() {
      return {
        beforePullDown: true,
        isPullingDown: false,
        isPullUpLoad: false,
        pullUpDirty: true,
        bubbleY: 0,
        pullDownStyle: ''
      }
    },
    computed: {
      pullUpLoad() {
        return this.options.pullUpLoad
      },
      pullDownRefresh() {
        return this.options.pullDownRefresh
      },
      pullUpTxt() {
        const pullUpLoad = this.pullUpLoad
        const txt = pullUpLoad && pullUpLoad.txt
        const moreTxt = txt && txt.more || ''
        const noMoreTxt = txt && txt.noMore || ''

        return this.pullUpDirty ? moreTxt : noMoreTxt
      },
      refreshTxt() {
        const pullDownRefresh = this.pullDownRefresh
        return pullDownRefresh && pullDownRefresh.txt || DEFAULT_REFRESH_TXT
      }
    },
    created() {
      this.pullDownInitTop = -50
    },
    mounted() {
      this.$nextTick(() => {
        this.initScroll()
      })
    },
    methods: {
      initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        this._calculateMinHeight();

        let options = Object.assign({}, DEFAULT_OPTIONS, {
          scrollY: this.direction === DIRECTION_V,
          scrollX: this.direction === DIRECTION_H,
          bounce:this.bounce,
          // stopPropagation:true
        }, this.options);

        this.scroll = new BScroll(this.$refs.wrapper, options)

        if (this.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            this.$emit(EVENT_SCROLL, pos)
          });
          this.scroll.on('scrollEnd', (pos) => {
            this.$emit('scrollEnd', pos)
          })
          this.scroll.on('touchEnd', (pos) => {
            this.$emit('touchEnd', pos)
          })
        }

        if (this.listenBeforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit(EVENT_BEFORE_SCROLL_START)
          })
        }

        if (this.pullDownRefresh) {
          this._initPullDownRefresh()
        }

        if (this.pullUpLoad) {
          this._initPullUpLoad()
        }
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      refresh() {
        this._calculateMinHeight();
        this.scroll && this.scroll.refresh()
      },
      destroy() {
        this.scroll.destroy()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      },
      clickItem(item) {
        this.$emit(EVENT_CLICK, item)
      },
      forceUpdate(dirty) {
        if (this.pullDownRefresh && this.isPullingDown) {
          this.isPullingDown = false;
          this._reboundPullDown().then(() => {
            this._afterPullDown(dirty)
          })
        } else if (this.pullUpLoad && this.isPullUpLoad) {
          this.isPullUpLoad = false
          this.scroll.finishPullUp()
          this.pullUpDirty = dirty
          dirty && this.refresh()
        } else {
          dirty && this.refresh()
        }
      },
      _calculateMinHeight() {
        if (this.$refs.listWrapper && (this.pullDownRefresh || this.pullUpLoad)) {
          this.$refs.listWrapper.style.minHeight = `${getRect(this.$refs.wrapper).height + 1}px`
        }
      },
      _initPullDownRefresh() {
        this.scroll.on('pullingDown', () => {
          this.beforePullDown = false
          this.isPullingDown = true
          this.$emit(EVENT_PULLING_DOWN)
        })

        this.scroll.on('scroll', (pos) => {
          if (this.beforePullDown) {
            this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop)
            this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 10)}px`
          } else {
            this.bubbleY = 0;
            this.pullDownStyle = `top:${Math.min(pos.y - 30, 10)}px`;
          }
          // console.log(this.bubbleY )
        })
      },
      _initPullUpLoad() {
        this.scroll.on('pullingUp', () => {
          this.isPullUpLoad = true;
          this.$emit(EVENT_PULLING_UP);
        })
      },
      _reboundPullDown() {
        const {stopTime = 600} = this.pullDownRefresh
        return new Promise((resolve) => {
          setTimeout(() => {
            this.scroll.finishPullDown()
            this.isPullingDown = false
            resolve()
          }, stopTime)
        })
      },
      _afterPullDown(dirty) {
        setTimeout(() => {
          this.pullDownStyle = `top:${this.pullDownInitTop}px`
          this.beforePullDown = true
          dirty && this.refresh()
        }, this.scroll.options.bounceTime)
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.forceUpdate(true)
        }, this.refreshDelay)
      }
    },
    components: {
      // Loading,
      Bubble
    }
  }

</script>

<style lang="scss" scoped>
 @import "../../../assets/css/icon.css";
 .spinner{
   width: 40px;
   height: 40px;
   text-align: center;
   font-size: 10px;
   img{
     width: 100%;
     height: 100%;
   }
 }
.refreshTxt{
  font-size: 16px;
  color: #F23030;
}
 .spinner > div {
   background-color: #F23030;
   height: 100%;
   width: 6px;
   display: inline-block;

   -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
   animation: stretchdelay 1.2s infinite ease-in-out;
 }
 .spinner .rect2 {
   -webkit-animation-delay: -1.1s;
   animation-delay: -1.1s;
 }

 .spinner .rect3 {
   -webkit-animation-delay: -1.0s;
   animation-delay: -1.0s;
 }

 .spinner .rect4 {
   -webkit-animation-delay: -0.9s;
   animation-delay: -0.9s;
 }

 .spinner .rect5 {
   -webkit-animation-delay: -0.8s;
   animation-delay: -0.8s;
 }

 @-webkit-keyframes stretchdelay {
   0%, 40%, 100% { -webkit-transform: scaleY(0.4) }
   20% { -webkit-transform: scaleY(1.0) }
 }

 @keyframes stretchdelay {
   0%, 40%, 100% {
     transform: scaleY(0.4);
     -webkit-transform: scaleY(0.4);
   }  20% {
        transform: scaleY(1.0);
        -webkit-transform: scaleY(0.8);
      }
 }

 .cube-scroll-wrapper {
    position: relative;
    height: 100%;
    overflow: hidden
  }

  .cube-pulldown-wrapper {
    position: absolute;
    width: 100%;
    left: 0;
    display: -webkit-box;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    -webkit-transition: all;
    transition: all
  }

  .cube-pulldown-wrapper .after-trigger {
    margin-top: 5px
  }

  .cube-pullup-wrapper {
    width: 100%;
    display: -webkit-box;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center
  }

  .cube-pullup-wrapper .before-trigger {
    padding: 22px 0;
    min-height: 1em
  }

  .cube-pullup-wrapper .after-trigger {
    /*padding: 19px 0*/
  }

  .cube-scroll-content {
    position: relative;
    z-index: 1
  }

  .cube-scroll-item {
    height: 60px;
    line-height: 60px;
    font-size: 18px;
    padding-left: 20px
  }



  @-webkit-keyframes spinner-fade {

  0% {opacity:.85} 50% {opacity:.25} to {opacity:.25}
  }
  @keyframes spinner-fade {

  0% {opacity:.85} 50% {opacity:.25} to {opacity:.25}
  }
  .cube-scroll-wrapper {
    position: relative;
    height: 100%;
    overflow: hidden
  }

  .cube-pulldown-wrapper {
    position: absolute;
    width: 100%;
    left: 0;
    display: -webkit-box;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    -webkit-transition: all;
    transition: all
  }

  .cube-pulldown-wrapper .after-trigger {
    margin-top: -10px
  }

  .cube-pullup-wrapper {
    width: 100%;
    display: -webkit-box;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center
  }

  .cube-pullup-wrapper .before-trigger {
    padding:  0;
    min-height: .4em
  }

  .cube-pullup-wrapper .after-trigger {
    /*padding: 19px 0*/
  }

  .cube-scroll-content {
    position: relative;
    z-index: 1
  }

  .cube-scroll-item {
    height: 60px;
    line-height: 60px;
    font-size: 18px;
    padding-left: 20px
  }


  @-webkit-keyframes spinner-fade {

  0% {opacity:.85} 50% {opacity:.25} to {opacity:.25}
  }
  @keyframes spinner-fade {

  0% {opacity:.85} 50% {opacity:.25} to {opacity:.25}
  }
</style>

