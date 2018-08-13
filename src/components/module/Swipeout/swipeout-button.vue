<template>
  <button class="vux-swipeout-button"
          :class="{'vux-swipeout-button-primary': type === 'primary', 'vux-swipeout-button-warn': type === 'warn', 'vux-swipeout-button-default': type === 'default'}"
          :style="{width: `${width}px`, backgroundColor: backgroundColor}" @click="onButtonClick" type="button">
    <div class="box">
      <slot name="icon">
      </slot>
      <div>{{text}}</div>
    </div>


  </button>
</template>

<script>
  export default {
    name: 'swipeout-button',
    props: {
      text: String,
      backgroundColor: String,
      type: String,
      width: {
        type: Number,
        default: 80
      }
    },
    methods: {
      onButtonClick () {
        if (this.$parent.$options._componentTag === 'swipeout-item') {
          this.$parent.onItemClick(this.text)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/icon.css";

  .vux-swipeout-button {
    position: relative;
    .box {
      width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      .iconfont {
        font-size: 28px;
      }

    }
  }
</style>
