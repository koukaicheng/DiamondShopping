<template>
  <div class="ts-loading" v-show="visible">
    <mt-spinner class="snake-spin" type="snake" color="#ddd" :size="28"></mt-spinner>
  </div>
</template>

<script>
  export default {
    name: 'Loading',
    data() {
      return {
        visible: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/variables";

  .ts-loading {
    z-index: 201;
    background: rgba(0, 0, 0, .7);
    position: fixed;
    left: 50%;
    top: 50%;
    color: #ddd;
    padding: 8px 10px;
    border-radius: 5px;
    transform: translate3d(-50%, -50%, 0);
  }
</style>
