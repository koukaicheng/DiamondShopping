<template>
  <div class="scroll-wrapper" :style="{'backgroundColor':bakColor}">
     <slot></slot>
  </div>
</template>

<script>

  export default {
    name: 'Page',
    props: {
      bakColor:String
    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
  .scroll-wrapper{
    position: relative;
    flex: 1;
    /*height: 100%;*/
    width: 100%;
    transition: all .4s;
    & > div:first-child {
      -webkit-tap-highlight-color: transparent;
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      position: absolute;
      top: 0;
      left: 0;
      user-select: none;
      transition: all .4s;
    }
    ::-webkit-scrollbar {
      display: none;
    }
  }
</style>
