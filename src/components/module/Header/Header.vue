<template>
  <Header class="ts-header">
    <div class="ts-wrapper">
      <div v-if="back"
           class="ts-left"
           @click="goBack()">
        <!--<svg class="ts-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16"-->
        <!--height="32"-->
        <!--fill="#F23030"-->
        <!--viewBox="0 0 16 32">-->
        <!--<image width="16" height="32"-->
        <!--xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAgCAMAAAAsVwj+AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA8FBMVEUAAAAjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUAAACLSBE9AAAATnRSTlMAJN/AHO4V1vpGD839VgrCZwa3fAOqjwGdoY6yf2/OYNtT5B/sKzv29TfpRd7tJjbyHULcFk7TW8lovXexhqOWlKWFdQe+C1kRTRfx2blrbb3DAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB+EIDhcYAS0WQ08AAAC/SURBVCjPVdFZO0JhFIbhT5GvbdtJm62iURJKgwZTZQhRz///OU7Xu86e++y9lnP2dlJp6d0Ue7Yz+/is6eCA8NB0lIMj0/ljKJiOT+DUdHIGxcRACcqx6XNIR6YvoBKYrkItY7oe0miaznouW6av2lx37KIb/K1MvqPbE7jv0xiIDNuMHkTGnkkgMg2ZRSKP8JQXeYaXWOQV5onIApYCyRu8i8Rl+BD5XOkbnPuaEX6L/Ezwa5HfEX8CrrnZ/gOmxhvEKwXZugAAAABJRU5ErkJggg=="></image>-->
        <!--</svg>-->
        <i class="ts-svg iconfont icon-jiantou"></i>
      </div>
      <div class="ts-left "
           @click="$emit('onBack')"
           v-if="!back&&custom">
        <svg class="ts-svg"
             xmlns="http://www.w3.org/2000/svg"
             xmlns:xlink="http://www.w3.org/1999/xlink"
             width="16"
             height="32"
             viewBox="0 0 16 32">
          <image width="16"
                 height="32"
                 xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAgCAMAAAAsVwj+AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA8FBMVEUAAAAjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUjGBUAAACLSBE9AAAATnRSTlMAJN/AHO4V1vpGD839VgrCZwa3fAOqjwGdoY6yf2/OYNtT5B/sKzv29TfpRd7tJjbyHULcFk7TW8lovXexhqOWlKWFdQe+C1kRTRfx2blrbb3DAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB+EIDhcYAS0WQ08AAAC/SURBVCjPVdFZO0JhFIbhT5GvbdtJm62iURJKgwZTZQhRz///OU7Xu86e++y9lnP2dlJp6d0Ue7Yz+/is6eCA8NB0lIMj0/ljKJiOT+DUdHIGxcRACcqx6XNIR6YvoBKYrkItY7oe0miaznouW6av2lx37KIb/K1MvqPbE7jv0xiIDNuMHkTGnkkgMg2ZRSKP8JQXeYaXWOQV5onIApYCyRu8i8Rl+BD5XOkbnPuaEX6L/Ezwa5HfEX8CrrnZ/gOmxhvEKwXZugAAAABJRU5ErkJggg=="></image>
        </svg>
      </div>
      <div class="middle-title">
        <h1 v-if="navbar.length === 0"
            class="ts-title">{{title}}</h1>
        <div v-else
             class="nav-bar-box">
          <div v-for="(item, index) in navbar"
               :key="index"
               @click="tabSwitch(index)"
               class="nav-bar-item"
               :class="{'active':tabIndex === index}">
            {{item}}
          </div>
        </div>
      </div>
      <div class="right-handle"
           v-if="rightIcon"
           @click="event">
        <slot name="rightIcon">
          <i class="iconfont"
             :class="rightIcon"></i>
        </slot>
      </div>

      <div class="right-handle rightText"
           @click="event">
        <slot name="rightText">
          <span :style="{'color':rightColor}">{{rightText}}</span>
        </slot>
      </div>
    </div>
  </Header>
</template>

<script>
/**
 * @desc 头部组件
 * @param [title] 头部标题
 * @param [back] 显示返回箭头
 * @param [navbar] 显示导航
 * @param [slot="right"] 自定义头部右边
 * @event 向父组件传递状态
 **/
export default {
  name: "ts-header",
  props: {
    title: { type: String },
    navbar: {
      type: Array,
      default: () => []
    },
    back: Boolean,
    custom: Boolean,
    rightIcon: {
      type: String,
      default: ""
    },
    rightText: {
      type: String,
      default: ""
    },
    rightColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      tabIndex: 0
    };
  },
  methods: {
    goBack() {
      this.$router.goBack();
    },
    event() {
      this.$emit("headerEvent");
    },
    tabSwitch(index) {
      this.tabIndex = index;
      this.$emit("tabIndex");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/css/mixin";
@import "../../../assets/css/variables";
@import "../../../assets/css/icon.css";
.iconfont {
  font-size: 0.6rem;
  color: #ababab;
}
.ts-header {
  position: relative;
  z-index: $headerZIndex;
  background: #ffffff;
  margin-bottom: 0.03rem;
  box-shadow: 0 0 0 0.03rem #f0f0f0;
  @include wh(100%, 1.2rem);
  .ts-wrapper {
    .ts-left {
      @include sc(0.3rem, $themeColor);
      color: #3194fb;
      left: 0.24rem;
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      .ts-svg {
        @include wh(0.18rem, 0.36rem);
      }
    }
    .middle-title {
      //@include center();
      position: absolute;
      height: 100%;
      top: 0;
      left: 50%;
      transform: translate(-50%, 0%);
      line-height: 1.38rem;
      @include wot();
      .ts-title {
        height: 100%;
        flex: 1;
        @include sc(0.46rem, #020202);
        font-weight: 500;
      }
      .nav-bar-box {
        display: flex;
        align-items: center;
        font-size: pxTorem(34);
        line-height: 1;
        height: 100%;
        .nav-bar-item {
          position: relative;
          padding: pxTorem(14) pxTorem(10);
          box-sizing: border-box;
          &:last-child {
            margin-left: pxTorem(80);
          }
          &.active {
            color: #bd081c;
            &::after {
              content: "";
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              border-bottom: 2px #bd081c solid;
            }
          }
        }
      }
    }
    .right-handle {
      @include sc(0.3rem, $themeColor);
      color: #3194fb;
      right: 0.24rem;
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      &:active {
        opacity: 0.6;
      }
    }
    .rightText {
      font-size: 0.36rem;
    }
  }
}
</style>
