<template>
  <div class="ts-input-container">
    <div class="ts-input">
      <div class="ts-left">
        <i v-if="iconClass" class="iconfont" :class="iconClass"></i>
        <span class="ts-label" v-if="label" >{{label}}</span>
      </div>
      <input class="ts-filed"
             @focus="toFocus"
             @change="$emit('change', currentValue)"
             :value="currentValue"
             @input="handleInput"
             :placeholder="placeholder"
             :type="type"
      />
      <div class="other-slot">
        <slot></slot>
      </div>
    </div>
  </div>

</template>

<script>
  /**
   * @desc 输入框组件
   * @param [label] 标签
   * @param [type] 目前只适合传 默认text || password || number || tel
   * @param [placeholder] 同input placeholder
   * @param [disableClear] 禁用清除图标
   * @param [value] v-model
   */

  export default {
    name: 'ds-input',
    props: {
      label: String,
      type: {type: String, default: 'text'},
      placeholder: String,
      disableClear: Boolean,
      value: {},
      iconClass: {type: String}
    },
    data() {
      return {
        currentValue: this.value,
        active: false
      }
    },
    methods: {
      doCloseActive() {
        this.active = false;
      },
      toFocus() {
        this.active = true;
        document.getElementsByClassName('router')[0].style.height = document.body.clientHeight + 'px';
      },
      handleInput(evt) {
        this.currentValue = evt.target.value;
      },
      handleClear() {
        this.currentValue = '';
      }
    },
    watch: {
      value(val) {
        this.currentValue = val;
      },
      currentValue(val) {
        this.$emit('input', val);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/mixin";
  @import "../../../assets/css/variables";
  @import "../../../assets/css/icon.css";

  :-moz-placeholder {
    @include sc(.4rem, #c6c6c6);
  }

  ::-moz-placeholder {
    @include sc(.4rem, #c6c6c6);
  }

  input:-ms-input-placeholder {
    @include sc(.4rem, #c6c6c6);
  }

  input::-webkit-input-placeholder {
    @include sc(.4rem, #787878);
  }

  .ts-input-container {
    margin: 0.3rem 0.4rem .20rem 0.3rem;
    &::after {
      content: '';
      display: block;
      height: 1px; /*no*/
      background-color: #E5E5E5;
      transform-origin: 0 0;
      transform: scaleY(.6);
    }
  }

  .ts-input {
    background-color: #ffffff;
    letter-spacing: .02rem;
    padding-bottom: 8px;
    @include fja(flex-start);
    .ts-left {
      @include sc(.4rem, #050505);
      .iconfont{
        font-size: 0.5rem;
        padding-right: 0.2rem;
        margin-left: 0.16rem;
      }
      .ts-label {
        @include wot();
        width: 1.70rem;
        position: relative;
        top: -0.02rem;
        display: block;
      }
    }
    .ts-filed {
      flex: 1;
      border: none;
      line-height: 0.9rem;
      @include wh(100%, .90rem);
      @include sc(.4rem, #050505);
    }
    .input-clear {
      @include wh(.30rem, .30rem);
    }

  }
</style>
