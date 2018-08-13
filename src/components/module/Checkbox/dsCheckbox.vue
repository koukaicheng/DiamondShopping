<template>
  <div class="checkbox"
       :class="{'active':checkValue}">
    <label>
      <input type="checkbox"
             :disabled="disabled"
             v-model="checkValue">
    </label>
    <div class="spans" v-if="title">{{title}}</div>
    <div class="large" :class="stauts===true?'fan':''">
      <div class="small"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "kc-checkbox",
  data() {
    return {
      checkCalue: this.value
    };
  },
  props: {
    stauts:{
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    value: {
      type: [Boolean, String]
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  created() {},
  methods: {},
  components: {},
  computed: {
    checkValue: {
      get() {
        return Boolean(this.checkCalue);
      },
      set(newValue) {
        this.checkCalue = newValue;
        this.$emit("input", newValue);
      }
    }
  },
  watch:{
    value(val){
      this.checkCalue = val
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/css/variables";
@import "../../../assets/css/mixin";

.checkbox {
  position: relative;
  width: pxTorem(48);
  label {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    input {
      z-index: 1;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }
  .spans {
    font-size: pxTorem(24);
    color: #898989;
    padding-bottom: pxTorem(16);
    margin-top: pxTorem(10);
    /*display: inline-block;*/
  }
  .large {
    width: pxTorem(48);
    height: pxTorem(48);
    border: 1px solid #898989;
    border-radius: 50%;
    position: relative;
    .small {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      display: none;
      width: pxTorem(18);
      height: pxTorem(18);
      background: #898989;
      border-radius: 50%;
    }
  }
  .fan{
    border-radius: 20%;
  }
  &.active {
    .large {
      border: solid 1px #bd081c !important;
      .small {
        display: block;
        background: #bd081c !important;
      }
    }
  }
}
</style>
