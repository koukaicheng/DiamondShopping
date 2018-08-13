<template>
  <div class="ts-cell" @click="toLink" :class="{
  'ts-cell-menu':theme==='menu','ts-cell-list':isList,'ts-cell-profile':isProfile}">
    <div class="active-bg" v-if="theme==='menu'"></div>
    <div class="left-img" v-if="leftImg">
      <slot name="leftImg"></slot>
    </div>
    <div class="icon" v-if="icon">
      <i class="iconfont" :class="icon"></i>
    </div>
    <div class="ts-cell-title">
      <span v-if="isProfile" class="ts-cell-avator">
        <slot name="avatar"></slot>
      </span>
      <label v-if="!isProfile" class="ts-label" :style="{width:labelWidth}">{{title}}</label>
    </div>

    <div v-if="theme==='menu'" class="ts-cell-menu-value">
      <slot name="menuValue"></slot>
    </div>

    <div class="ts-cell-value" v-if="!tipStatus">
      <div :class="{'ts-cell-middle':isProfile}">
        <span v-if="isProfile" class="title">{{title}}</span>
        <span v-if="isProfile" class="text">{{text}}</span>
        <input v-if="isList&&type!=='select'"
               :style="{'text-align':textAlin,'background':inputBg}"
               @change="handleChange"
               @focus="toFocus"
               @blur="toBlur"
               :value="currentValue"
               :type="type"
               @input="handleInput"
               class="inputVal"
               :class="{'input-read':isReadonly,'input-edit':isEdit&&!currentValue}"
               :readonly="readonly||isReadonly"
               :id="id"
               @click=""
               :placeholder="tip"/>
        <select v-else-if="type==='select'"
                @change="handleChange"
                @focus="toFocus"
                @blur="toBlur"
                :value="currentValue"
                @input="handleInput"
                :disabled="isReadonly?'disabled':false"
                class="inputVal"
                :class="{'input-read':isReadonly,'input-edit':isEdit&&currentValue===-1}">
          <option selected value="-1" class="select-tip" disabled>请选择</option>
          <option v-for="(item,index) in options" :value="item.value" :key="index">{{item.text}}</option>
        </select>
      </div>
    </div>
    <div class="ts-cell-readonly" v-else >
      <div class="value">{{currentValue}}</div>
      <div class="tip">
       {{tipStatus}}
        <slot name="tiptext">

        </slot>
      </div>

    </div>

    <!-- 兼容date类型tip -->
    <span v-if="!currentValue&&type==='date'&&isEdit" class="ts-cell-tip">{{tip}}</span>

    <slot name="menuTips"></slot>

    <div class="ts-cell-ft" :class="{'ts-cell-hide':isEdit&&isLink||!!link}">
      <icon v-if="!direction" font-name="icon-fanhui" color="#9e9e9e" size="22"></icon>
      <icon v-else font-name="icon-jiantou-copy" color="#9e9e9e" size="22"></icon>
    </div>

  </div>
</template>

<script>
  /**
   * @desc 列表组件(配合Group组件使用)
   * @param [theme] cell主题 默认menu || list || profile
   * @param [text] profile 文本
   * @param [title] profile 标题
   * @param [type] cell的文本框或者type=select
   * @param [readonly] 文本框只读
   * @param [isLink] mode为edit 可显示箭头 '>'
   * @param [link] 点击cell前往的路由,自动显示箭头 '>'
   * @param [imgsrc] profile 头像地址
   * @param [tip] 文本框的placeholder提示
   * @param [options] select的选项
   * @param [id] Input id,主要解决选择三级联动时文字居左
   * @param [mode] edit || readonly cell的只读和编辑模式切换
   * @param inputBg 输入框背景
   * @param [value] v-model
   *
   * @slot menuValue theme=menu 可用
   *
   * @event [change] 修改input触发事件
   * @event [click] 单击cell触发事件
   */
  import {go} from './router'

  export default {
    name: 'ds-cell',
    props: {
      title: [String, Number],
      text: [String, Number],
      type: String,
      inputBg:String,
      textAlin:{
        type:String,
        default:'left'
      },
      readonly: [String, Boolean],
      theme: {type: [String, Number], default: 'menu'},
      isLink: Boolean,
      link: [String, Object],
      imgsrc: String,
      tip: String,
      options: [Object, Array],
      id: String,
      mode: String,
      labelWidth: Number,
      value: {},
      icon: {type: String, default: ''},
      direction: {
        type: Boolean,
        default: false
      },
      tipStatus: {
        type: String,
        default: ''
      },
      leftImg:{
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        currentValue: this.value
      }
    },
    watch: {
      value(val) {
        this.currentValue = val;
      },
      currentValue(val) {
        this.$emit('input', val);
        this.$emit('change', val);
      }
    },
    methods: {
      handleInput(evt) {
        console.log(evt)
        if (evt.target.value) {
          evt.target.style.textAlign = 'left';
        }
        this.currentValue = evt.target.value;
      },
      handleChange(evt) {
        if (this.type === 'select') {
          evt.target.style.direction = 'ltr';
          evt.target.style.color = '#020202'
        } else {
          this.$emit('change', this.currentValue)
        }
      },
      toLink(evt) {
        //延迟10毫秒，点击体验更好
        if (this.link && this.theme !== 'list') {
          if (this.theme === 'profile') go(this.link, this.$router);
          else setTimeout(() => {
            go(this.link, this.$router)
          }, 10);
        } else {
          this.$emit('click');
        }
      },
      toFocus(evt) {
        document.getElementsByClassName('router')[0].style.height = document.body.clientHeight + 'px';
        // evt.target.style.textAlign = 'left';
        if (this.type !== 'select') {
          // evt.target.style.color = '#020202';
        }
        evt.target.placeholder = '';
      },
      toBlur(evt) {
        if (!evt.target.value) {
          // evt.target.style.textAlign = 'right';
          evt.target.placeholder = this.tip;
        }
        this.$emit('toBlur');
      }
    },
    computed: {
      isProfile() {
        return this.theme === 'profile';
      },
      isList() {
        return this.theme === 'list';
      },
      isReadonly() {
        return this.readonly === 'readonly';
      },
      isEdit() {
        return this.mode === 'edit';
      },
      isTip() {
        if (!this.isReadonly && !this.currentValue) {
          return this.tip;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/mixin";
  @import "../../../assets/css/icon.css";

  .icon {
    padding-right: 0.2rem;
    .iconfont {
      font-size: pxTorem(50);
    }
  }
.left-img {
  margin-right: 0.2rem;
  width: pxTorem(40);
  height: pxTorem(40);
  background-size: 100% 100%;
  img {
    width: 100%;
    height: 100%;
  }
}
input[type="date"] {
  background-color: #ffffff;
  position: relative;
  left: -0.06rem;
}

  $cellBorderColor: #E5E5E5;
  @mixin borderBefore($theme) {
    @if $theme == 'menu' {
      left: 0;
    } @else if ($theme=='list') {
      height: 1px;
      left: 0;
    }
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    display: block;
    border-bottom: 1px solid #E5E5E5;
    transform-origin: 0 0;
    transform: scaleY(.6);
  }

  .ts-cell {
    position: relative;
    transform: translate3d(0, 0, 0);
    color: #2E2E2E;
    display: flex;
    align-items: center;
    width: 100%;
    overflow: hidden;
    transition: all .2s;
    .active-bg {
      position: absolute;
      margin: auto;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100px;
      height: 50px;
      background: #F5F5F5;
      transition: 0.2s all;
      border-radius: 80%;
      opacity: 0;
      z-index: 1;
    }
    &:active {
    }
    .ts-cell-title {
      flex: 1;
      .ts-label {
        color: #333;
        display: block;
        white-space: nowrap;
        font-size: 0.38rem;
      }
    }
    &.ts-cell-menu {
      font-size: .3rem;
      padding: .4rem .28rem;
      .ts-cell-title {
        width: 1.50rem;
        flex: none;
      }
      .ts-cell-menu-value {
        flex: 1;
      }
      &::before {
        @include borderBefore('menu');

      }
      &:active {
        .active-bg {
          width: 100%;
          height: 100%;
          border-radius: 0;
          opacity: 1;
          z-index: -1;
        }
      }
    }
    &.ts-cell-list {
      font-size: .30rem;
      padding: .1005rem .25rem;
      &::before {
        @include borderBefore('list');
      }
      .ts-cell-title {
        flex: none;
        width: 2rem;
      }
      .ts-cell-readonly {
        flex: 1;
        font-size: .30rem;
        @include fja(space-between);
        .value {
          padding-left: 0.4rem;
          height: 0.8rem;
         line-height: 0.9rem;
          color: #7a7a7a;
        }
        .tip {
          height: 0.8rem;
          line-height: 0.9rem;
          color: #c8c8c8;
          padding-right: 0.2rem;
        }
      }
      .ts-cell-value {
        flex: 1;
        .inputVal {
          z-index: 50;
          color: #7a7a7a;
          width: 100%;
          text-align: left;
          text-indent: 0.4rem;
          direction: ltr;
          padding-right: .2rem;
          font-size: .30rem;
          @include wh(100%, .80rem);
          border: none;
          font-family: PingFangSC-Regular, Tahoma, Arial, 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
        }
        .input-read {
          text-align: left;
          direction: ltr;
          color: #7a7a7a;
        }

        .input-edit {
          color: #c6c6c6;
        }

        :-moz-placeholder {
          @include sc(.30rem, #c6c6c6)
        }

        ::-moz-placeholder {
          @include sc(.30rem, #c6c6c6)
        }

        input:-ms-input-placeholder {
          @include sc(.30rem, #c6c6c6);
        }

        input::-webkit-input-placeholder {
          @include sc(.30rem, #c6c6c6);
        }
      }
    }
    .ts-cell-tip {
      z-index: 2;
      color: #C6C6C6;
      right: .55rem;
      position: absolute;
      top: 50%;
      transform: translateY(-54%);
    }
    &.ts-cell-profile {
      padding: .17rem .25rem;
      &:active {
        background-color: #ececec;
      }
      &:before {
        @include borderBefore('menu');
      }
      .ts-cell-title {
        flex: none;
        .ts-cell-avator {
          margin-right: .20rem;
          display: block;
          @include wh(1.51rem, 1.51rem);
          border-radius: 100%;
          .user-avatar {
            border-radius: 100%;
            @include wh(1.51rem, 1.51rem);
          }
        }
      }
      .ts-cell-value {
        @include fja(space-between);
        flex: 1;
        .ts-cell-middle {
          margin-left: .1rem;
          flex: 1;
          width: 100%;
          span {
            display: block;
          }
          .title {
            @include sc(.30rem, #020202);
            font-weight: 600;
            margin-bottom: .10rem;
          }
          .text {
            @include sc(.26rem, #2E2E2E);
          }
        }
      }
    }
    .menu-tips {
      margin-right: .18rem;
      @include sc(.30rem, #909090);
    }
    .menu-tips-noLink {
      @include sc(.26rem, #909090);
      margin-right: -.18rem;
    }
    .ts-cell-ft {
      position: relative;
      visibility: hidden;
      @include fja();
      &.ts-cell-hide {
        visibility: visible;
        align-items: center;
        /*margin-right: 0.2rem;*/
      }
      .ts-cell-svg {
        position: relative;
        top: 1px;
        height: 13px;
      }
    }
     .ts-cell-readonly {
        flex: 1;
        font-size: .30rem;
        @include fja(space-between);
        .value {
          padding-left: 0.4rem;
          // height: 0.8rem;
         line-height: 0.9rem;
          color: #999999;
        }
        .tip {
          // height: 0.8rem;
          // line-height: 0.9rem;
          color: #999999;
          padding-right: 0.2rem;
        }
      }
  }
</style>
