<template>
  <div class="cube-checkbox" :class="_containerClass" :data-pos="position">
    <label class="cube-checkbox-wrap iconfont " :class="_wrapClass">
      <input class="cube-checkbox-input" type="checkbox" :disabled="disabled" v-model="checkValue">
      <span class="cube-checkbox-ui icon-icon-cubeic-round-border">
        <i class="icon-cubeic-right iconfont"></i>
      </span>
      <div class="cube-checkbox-label">
        <slot></slot>
      </div>
    </label>
  </div>
</template>
<script type="text/ecmascript-6">
const COMPONENT_NAME = "ds-checkbox";

const EVENT_INPUT = "input";
const EVENT_CHECKED = "checked";
const EVENT_CANCLE_CHECKED = "cancel-checked";

export default {
  name: COMPONENT_NAME,
  props: {
    value: {
      type: [Boolean, String]
    },
    label: {
      type: [Boolean, String]
    },
    disabled: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: "left"
    }
  },
  data() {
    const parent = this.$parent;
    const isInGroup = parent.$data._checkboxGroup;
    const isInHorizontalGroup = isInGroup && parent.$props.horizontal;
    return {
      isInGroup,
      isInHorizontalGroup
    };
  },
  computed: {
    checkValue: {
      get() {
        if (this.isInGroup) {
          return this.$parent.value.indexOf(this.label) > -1;
        } else {
          return Boolean(this.value);
        }
      },
      set(newValue) {
        const emitValue = this.label && newValue ? this.label : newValue;
        const parentEmitEvent = newValue ? EVENT_CHECKED : EVENT_CANCLE_CHECKED;
        this.$emit(EVENT_INPUT, emitValue);
        if (this.isInGroup) {
          this.$parent.$emit(parentEmitEvent, this.label || newValue, this);
        }
      }
    },
    _containerClass() {
      if (this.isInHorizontalGroup) {
        return "border-right-1px";
      }
    },
    _wrapClass() {
      const isInHorizontalGroup = this.isInHorizontalGroup;
      return {
        "cube-checkbox_checked": this.checkValue,
        // "cube-checkbox_disabled": this.disabled,
        "border-bottom-1px": this.isInGroup && !isInHorizontalGroup
      };
    }
  }
};
</script >
<style>
@import "../../../assets/css/icon.css";
.cube-checkbox {
  position: relative;
  padding-left: 2px;
  text-align: left;
  font-size: 100%;
  width: 20px;
  color: #666;
}

.cube-checkbox[data-pos="right"] .cube-checkbox-ui {
  margin-right: 0;
  position: absolute;
  right: 0;
}

.cube-checkbox[data-pos="right"] .cube-checkbox-label {
  margin-right: 1.42em;
}

.cube-checkbox-wrap {
  position: relative;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 11px 0;
  line-height: 1.5;
  word-break: break-word;
  word-wrap: break-word;
}

.cube-checkbox-input {
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.cube-checkbox-ui {
  position: relative;
  width: 1em;
  height: 1em;
  margin-right: 0.42em;
  line-height: 1;
  border-radius: 50%;
}

.cube-checkbox-ui:before,
.cube-checkbox-ui i {
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}

.cube-checkbox-ui::before {
  color: #ccc;
  display: inline-block;
  -webkit-transform: scale(1.2);
  transform: scale(1.2);
}

.cube-checkbox-ui i {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  color: transparent;
  -webkit-transform: scale(0.4);
  transform: scale(0.4);
}

.cube-checkbox_checked .cube-checkbox-ui:before {
  color: transparent;
}

.cube-checkbox_checked .cube-checkbox-ui i {
  color: #f23030;
  -webkit-transform: scale(1.23);
  transform: scale(1.23);
}

.cube-checkbox_disabled .cube-checkbox-ui {
  background-color: #eee;
}

.cube-checkbox_disabled .cube-checkbox-ui:before,
.cube-checkbox_disabled .cube-checkbox-ui i {
  -webkit-transition: none;
  transition: none;
}

.cube-checkbox_disabled .cube-checkbox-ui:before {
  color: transparent;
}

.cube-checkbox_disabled .cube-checkbox-ui i {
  color: #eee;
}

.cube-checkbox_checked.cube-checkbox_disabled .cube-checkbox-ui {
  background-color: #fff;
}
</style>
