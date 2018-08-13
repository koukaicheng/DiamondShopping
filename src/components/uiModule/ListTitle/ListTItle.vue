<template>
  <div class="h-wrap"
       @click="moreclick">
    <div class="h-wrap-box"
         :class="borderAll === 'none'?'':(borderAll === ''?'border-bottom':'border-bottom-all')">

      <div v-if="line"
           class="left-line"></div>
      <div class="title"
           :style="{'color':tcolor}">{{name}}</div>
      <p class="more">
        <slot>
          <span class="right-wrod" style="font-size: 0.36rem">{{moreName}}</span>
        </slot>
        <icon v-if="more"
              font-name="icon-fanhui"
              size='22'
              color="#b4b4b4"></icon>
      </p>
    </div>

  </div>
</template>
<script>
export default {
  name: "dsHead",
  props: {
    name: {
      type: String,
      default: "默认标题"
    },
    tcolor: {
      type: String,
      default: "#bd081c"
    },
    line: {
      type: Boolean,
      default: true
    },
    more: {
      type: Boolean,
      default: true
    },
    moreName: {
      type: String,
      default: "更多"
    },
    borderAll: {
      type: [String, Boolean],
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {
    moreclick(e) {
      if (!this.more) {
        return false;
      }
      this.$emit("tap");
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
@import "../../../assets/css/mixin";
@import "../../../assets/css/icon";

.h-wrap {
  font-size: pxTorem(26);
  color: #bd081c;
  background: #fff;
  .h-wrap-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 0 pxTorem(20);
    height: pxTorem(80);
    .left-line {
      width: pxTorem(8);
      height: pxTorem(35);
      background: #bd081c;
      border-radius: 20px;
      margin-right: pxTorem(18);
    }
    .title {
      width: 100%;
      text-align: left;
      font-size: pxTorem(26);
    }
    &.border-bottom {
      position: relative;
      padding: 0;
      margin: 0 pxTorem(20);
      border-bottom: 1px rgba(0, 0, 0, 0) solid;
      border-width: 0 0 1px 0px;
      -webkit-border-image: url("data:image/jpeg;base64,/9j/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAgICAgICAgICAgMDAwMDAwMDAwMBAQEBAQEBAgEBAgICAQICAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDA//dAAQAAf/uAA5BZG9iZQBkwAAAAAH/wAARCAAEAAEDABEAAREBAhEB/8QATwABAAAAAAAAAAAAAAAAAAAACgEBAAAAAAAAAAAAAAAAAAAAABAAAQUAAAAAAAAAAAAAAAAAAAYWZpXkEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMAAAERAhEAPwB4jMla0vcoH//Z")
        2 0 stretch;
    }
    &.border-bottom-all {
      border-bottom: 1px rgba(0, 0, 0, 0) solid;
      border-width: 0 0 1px 0px;
      -webkit-border-image: url("data:image/jpeg;base64,/9j/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAgICAgICAgICAgMDAwMDAwMDAwMBAQEBAQEBAgEBAgICAQICAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDA//dAAQAAf/uAA5BZG9iZQBkwAAAAAH/wAARCAAEAAEDABEAAREBAhEB/8QATwABAAAAAAAAAAAAAAAAAAAACgEBAAAAAAAAAAAAAAAAAAAAABAAAQUAAAAAAAAAAAAAAAAAAAYWZpXkEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMAAAERAhEAPwB4jMla0vcoH//Z")
        2 0 stretch;
    }
    .more {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      color: #b4b4b4;
      font-size: pxTorem(24);
      height: 100%;
      min-width: pxTorem(100);
      .right-wrod {
        padding-right: pxTorem(10);
      }
    }
  }
}
</style>
