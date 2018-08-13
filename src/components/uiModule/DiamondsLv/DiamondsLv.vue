<template>
    <div class="">
       <div class="lv">
         <i class="iconfont icon-vip5"></i>
         <span>{{num}}</span>
       </div>
    </div>
</template>

<script>

    export default {
      name:"lv",
      props:{
        num:{
          type:[String,Number],
          default: ''
        },
      },
        data() {
            return {};
        },
        created() {
        },
        methods: {},
        components: {},
        computed: {}
    };
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/mixin.scss";
  @import "../../../assets/css/icon.css";
  .lv{
   @include fja();
    position: relative;
    min-height: pxTorem(22);
    min-width: pxTorem(22);
    span{
      font-size: pxTorem(28);
      position: absolute;
      left: 0.28rem;
      bottom: -0.1rem;
    }
  }
   span{

   }

</style>
