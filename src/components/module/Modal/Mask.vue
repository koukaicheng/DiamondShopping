<template>
  <div class="modal-mask" v-show="visible" @click="handleClose()"></div>
</template>

<script>
  export default {
    name: 'ts-mask',
    props: {
      lock: Boolean,
      value: Boolean
    },
    data() {
      return {
        visible: this.value,
      }
    },
    methods: {
      handleClose() {
        this.visible = this.lock;
      }
    },
    watch: {
      value(val) {
        this.visible = val;
      },
      visible(val) {
        this.$emit('input', val);
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../assets/css/variables";

  .modal-mask {
    background-color: #000;
    opacity: 0.4;
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    z-index: $maskZIndex;
  }
</style>
