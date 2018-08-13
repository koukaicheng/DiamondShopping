<template>
  <Button @click="handleClick"
          :style="{'width':widthRem,'height':heightRem}"
          :class="{
  'btn-default':type==='default',
  'btn-primary':type==='primary',
  'btn-success':type==='success',
  'normal':size==='normal',
  'large':size==='large',
  'mini':size==='mini',
  'common':size==='common',
  'plain':plain,
  'disabled':disabled
  }" :disabled="disabled">
    <slot></slot>
  </Button>
</template>

<script>
  /**
   * @desc 按钮组件
   * @param [type] 按钮类型
   * @param [size] 按钮尺寸
   * @param [plain] 空心
   * @param [disabled] 是否禁用
   *
   * @event [click] 点击按钮触发事件
   */
  export default {
    name: 'ds-button',
    props: {
      type: {type: String, default: 'default'},
      size: {type: String, default: 'normal'},
      plain: Boolean,
      disabled: Boolean,
      width:{
        type:[Number,String],
        default: ''
      },
      height:{
        type:[Number,String],
        default: ''
      }
    },
    methods: {
      handleClick(evt) {
        this.$emit('click', evt);
      }
    },
    computed: {
      widthRem(){
        if(this.width){
          return `${this.width/75}rem`
        }
      },
      heightRem(){
        if(this.height){
          return `${this.height/75}rem`
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/variables";
  @import "../../../assets/css/mixin";

  button {
    border: 0;
    letter-spacing: .02rem;
    border-radius: 3px; /*no*/
  }

  .normal {
    @include wh(1.2rem, .58rem);
    font-size: .24rem;
  }

  .large {
    @include wh(100%, 1.16rem);
    font-size: .40rem;
  }

  .mini {
    @include wh(.94rem, .36rem);
    font-size: .22rem;
  }

  .common {
    @include wh(2.40rem, .76rem);
    font-size: .28rem;
    font-family: inherit;
  }

  .btn-default {
    border: 1px solid #909090;
    color: #4b4b4b;
    background-color: #fff;
    &:active {
      background-color: #ccc;
    }
  }

  .btn-primary {
    color: #fff;
    background-color: $themeColor;
    font-size: pxTorem(30);
    &.disabled {
      background-color: #C6C6C6;
    }
    &:active {
      background-color: $themeColor;
    }
    &.plain {
      color: $themeColor;
      border: 1px solid $themeColor;
      &:active {
        background-color: lightblue;
      }
    }
  }

  .btn-success {
    color: #ffffff;
    background-color: #56d176;
    &:active {
      background-color: forestgreen;
    }
    &.plain {
      color: #56d176;
      border: 1px solid #56d176;
    }
  }

  .plain {
    background-color: #ffffff;
  }

</style>


