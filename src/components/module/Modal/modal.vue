<template>
  <div class="ts-modal" @touchmove.prevent="">
    <ts-mask v-model="visible" :lock="lock"></ts-mask>
    <div class="modal-box" :class="{'alert':theme==='alert'}" v-show="visible">
      <div class="modal-close" v-if="closeTag">
        <img @click="visible=false" src="../../../assets/imgs/close.png"/></div>
      <div class="modal-header" v-if="title!==''">
        <div class="modal-title">{{title}}</div>
      </div>
      <div class="modal-message">
        <div class="msg" v-if="message!==''" v-html="message"></div>
        <slot></slot>
      </div>

      <div class="modal-footer">
        <button v-show="theme==='box'" class="modal-btn" @click="handleAction('cancel')">{{leftBtn}}</button>
        <button class="modal-btn" @click="handleAction('confirm')">{{rightBtn}}</button>
      </div>
    </div>
  </div>
</template>

<script>
  import tsMask from './Mask.vue'

  /**
   * @desc 模态框(ios风格)
   * @param [title] 标题
   * @param [message] 消息
   * @param [lock] 点击遮罩层是否关闭模态框
   * @param [value] v-model主要用来控制隐藏显示
   *
   * @event [onClose] 触发关闭
   * @event [onConfirm] 触发确认
   */
  export default {
    name: 'ds-modal',
    components: {tsMask},
    props: {
      title: {
        type: String,
        default: '温馨提示'
      },
      message: {
        type: String,
        default: ''
      },
      lock: {
        type: Boolean,
        default: false
      },
      theme: {
        type: String,
        default: 'box'
      },
      leftBtn: {
        type: String,
        default: '取消'
      },
      rightBtn: {
        type: String,
        default: '确定'
      },
      closeTag: {
        type: Boolean,
        default: false
      },
      value: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        visible: this.value,
        action: '',
        callback: null,
        type: 'confirm'
      }
    },
    methods: {
      handleAction(type) {
        if (type === 'cancel') {
          this.visible = false;
          this.$emit('onClose', this.$el);
          if (this.callback)
            this.callback(type);
        }
        else if (type === 'confirm') {
          this.visible = false;
          this.$emit('onConfirm', this.$el);
          if (this.callback)
            this.callback(type);
        }
      }
    },
    watch: {
      value(val) {
        this.visible = val;
      },
      visible(val) {
        window.$intercept = val;
        this.$emit('input', val);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/variables";
  @import "../../../assets/css/mixin";

  .ts-modal {
    .modal-box {
      transition: .2s;
      backface-visibility: hidden;
      -webkit-user-select: none;
      overflow: hidden;
      position: fixed;
      top: 46%;
      left: 50%;
      transform: translate3d(-50%, -46%, 0);
      border-radius: 12px; /*no*/
      width: 82%;
      z-index: $maskZIndex+1;
      background: #fff;
      .modal-close {
        position: relative;
        img {
          @include wh(.30rem, .30rem);
          top: .15rem;
          right: .15rem;
          position: absolute;
        }
      }
      .modal-header {
        padding: .58rem 0;
        .modal-title {
          text-align: center;
          @include sc(.54rem, #020202);
          /*font-weight: 600;*/
        }
      }
      .modal-message {
        .msg {
          margin-top: .2rem;
          margin-bottom: 1.3rem;
          text-align: center;
          @include sc(.40rem, #2E2E2E);
        }
        margin: 0 .05rem;
        &:after {
          transform-origin: 0 0;
          border-bottom: 1px solid #C9C9C9; /*no*/
          transform: scaleY(.5);
          content: '';
          display: block;
        }
      }

      &.alert {
        .modal-header {
          padding: .30rem 0;
        }
        .modal-message {
          .msg {
            margin-top: 0;
            margin-bottom: .30rem;
          }
        }
      }

      .modal-footer {
        width: 100%;
        @include fja();
        &:after {
          content: '';
          display: block;
          clear: both;
        }
        .modal-btn {
          flex: 1;
          border: 0;
          background: rgba(255, 255, 255, .2);
          &:before {
            content: '';
            display: block;
            width: 100%;
            height: 1px;
          }
          height: 1.3rem;
          @include sc(.4rem, $themeColor);
          font-weight: 500;
          &:first-child {
            position: relative;
            color: #888888;
            &:before {
              transform-origin: 0 0;
              transform: scaleX(.6);
              content: '';
              display: block;
              height: 0.8rem;
              width: 1px; /*no*/
              right: 0;
              top: 0.25rem;
              position: absolute;
              border-right: 1px solid #C9C9C9; /*no*/
            }
          }
          &:focus {
            outline: none;
          }
          &:active {
            background: #ECECEC;
          }
        }
      }
    }
  }

  /*
    .Modal-scale-enter {
      opacity: 0;
      transform: translate3d(-50%, -46%, 0) scale(1.3) !important;
    }

    .Modal-scale-leave-active {
      opacity: 0;
      transform: translate3d(-50%, -46%, 0) scale(0.9) !important;
    }*/
</style>
