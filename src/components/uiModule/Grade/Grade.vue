<template>
  <div class="grade">
    <div class="left">
       <span>企业Lv</span>
    </div>
    <div class="num">
      <span>{{experiencesNum}}/{{FinalNum}}</span>
    </div>
    <div class="right" @click="close">
      <!--<icon fontName="icon-jiaochacross80" size="30"></icon>-->
    </div>
  </div>
</template>

<script>

  export default {
    name: "ds-grade",
    data() {
      return {};
    },
    created() {
    },
    props:{
      gradeNum: {
        type: [Number,String],
        default: ''
      },
      experiencesNum: {
        type: [Number,String],
        default: ''
      },
      FinalNum:{
        type: [Number,String],
        default: ''
      }
    },
    methods: {
      close(){
        this.$emit('close');
      }
    },
    components: {},
    computed: {}
  };
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/mixin";
  .grade {
    @include fj();
    align-items: center;
    height: pxTorem(54);
    background: #F5F5F5;
    font-size: pxTorem(26);
    color: #707070;
    padding: 0 pxTorem(20);
    div{
      flex: 1;
    }
    .num{
      text-align: center;
    }
    .right{
      text-align: right;
    }
  }

</style>
