<template>
  <label class="mint-switch">
    <input class="mint-switch-input"
           :disabled="disabled"
           @change="$emit('change', currentValue)"
           type="checkbox"
           v-model="currentValue">
    <span class="mint-switch-core"></span>
    <div class="mint-switch-label">
      <slot></slot>
    </div>
  </label>
</template>

<script>
/**
 * mt-switch
 * @module components/switch
 * @desc 切换按钮
 * @param {boolean} [value] - 绑定值，支持双向绑定
 * @param {slot} - 显示内容
 *
 * @example
 * <mt-switch v-model="value"></mt-switch>
 */
export default {
  name: "mt-switch",

  props: {
    value: Boolean,
    disabled: {
      type: Boolean,
      default: false
    },
    color:String
  },
  computed: {
    currentValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  }
};
</script>

<style lang="css">
/* Cell Component */
/* Header Component */
/* Button Component */
/* Tab Item Component */
/* Tabbar Component */
/* Navbar Component */
/* Checklist Component */
/* Radio Component */
/* z-index */
.mint-switch {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  position: relative;
}
.mint-switch * {
  pointer-events: none;
}
.mint-switch-label {
  margin-left: 10px;
  display: inline-block;
}
.mint-switch-label:empty {
  margin-left: 0;
}
.mint-switch-core {
  display: inline-block;
  position: relative;
  width: 52px;
  height: 32px;
  border: 1px solid #d9d9d9;
  border-radius: 16px;
  box-sizing: border-box;
  background: #d9d9d9;
}
.mint-switch-core::after,
.mint-switch-core::before {
  content: " ";
  top: 0;
  left: 0;
  position: absolute;
  -webkit-transition: -webkit-transform 0.3s;
  transition: -webkit-transform 0.3s;
  transition: transform 0.3s;
  transition: transform 0.3s, -webkit-transform 0.3s;
  border-radius: 15px;
}
.mint-switch-core::after {
  width: 30px;
  height: 30px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}
.mint-switch-core::before {
  width: 50px;
  height: 30px;
  background-color: #fdfdfd;
}
.mint-switch-input {
  display: none;
}
.mint-switch-input:checked + .mint-switch-core {
  border-color: #bd081c;
  background-color: #bd081c;
}
.mint-switch-input:checked + .mint-switch-core::before {
  -webkit-transform: scale(0);
  transform: scale(0);
}
.mint-switch-input:checked + .mint-switch-core::after {
  -webkit-transform: translateX(20px);
  transform: translateX(20px);
}
</style>
