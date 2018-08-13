<template>
  <div v-show="pickerShow"
       class="picker-wrapper"
       :class="{'active':bgActive}"
       @click="close">
    <div class="picker-box"
         @click.stop=""
         :class="{'active':active}">
      <div class="head">
        <div class="left"
             @click="close">取消</div>
        <div class="right"
             @click="confirm">确定</div>
      </div>
      <picker :slots="slots"
              value-key='name'
              @change="change"></picker>
    </div>
  </div>

</template>
<script>
import { Picker } from "mint-ui";
export default {
  props: {
    values: {
      type: Array,
      default: []
    }
  },
  data() {
    name: "ds-Pciker";
    return {
      pickerShow: false,
      active: false,
      bgActive: false,
      value: "",
      slots: [
        {
          flex: 1,
          values: this.values,
          className: "slot1",
          textAlign: "center"
        }
      ]
    };
  },
  methods: {
    open() {
      this.pickerShow = true;
      setTimeout(() => {
        this.active = true;
        this.bgActive = true;
      }, 20);
    },
    close() {
      this.active = false;
      setTimeout(() => {
        this.bgActive = false;
        setTimeout(() => {
          this.pickerShow = false;
        }, 100);
      }, 200);
    },
    change(picker, values) {
      this.value = values[0].id;
    },
    confirm() {
      // let num = 0;
      // if (this.value == "男") {
      //   num = 1;
      // }
      // if (this.value == "女") {
      //   num = 2;
      // }
      // if (this.value == "保密") {
      //   num = 3;
      // }
      this.$emit("confirm", this.value);
      this.close();
    }
  },
  computed: {},
  components: {
    Picker
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/css/mixin";

.picker-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: rgba($color: #000000, $alpha: 0.6);
  opacity: 0;
  transition: opacity 0.1s;
  overflow: hidden;
  &.active {
    opacity: 1;
  }
  .picker-box {
    position: absolute;
    width: 100%;
    bottom: 0;
    background: #fff;
    transition: transform 0.2s;
    transform: translateY(100%);
    &.active {
      transform: translateY(0);
    }
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: pxTorem(80);
      font-size: pxTorem(28);
      border-bottom: 1px #dedede solid;
      .left,
      .right {
        display: flex;
        justify-content: center;
        align-items: center;
        width: pxTorem(150);
        height: 100%;
      }
    }
  }
}
</style>
