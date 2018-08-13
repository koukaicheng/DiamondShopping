<template>
  <div class="Interval">
    <div class="title">
      <div class="text">{{title}}</div>
      <div class="val">{{val}}</div>
    </div>
    <div class="line-val">
      <div class="item" v-for="(item,index) in text" :key="index" :class="{'current-item':index===currentIndex}"></div>
    </div>
  </div>

</template>

<script>

  export default {
    name: "Interval",
    props: {
      title: {
        type: String,
        default: '颜色'
      },
      val: {
        type: [String, Number],
        default: 'g'
      },
      text: {
        type: Array,
        default: () => ['j','d','s','g','h','r']
      }
    },
    data() {
      return {};
    },
    created() {
    },
    methods: {},
    components: {},
    computed: {
      currentIndex(){
        let currentIndex = null;
        this.text.forEach((item,index,arr)=>{
          if(item===this.val){
            currentIndex = index
          }
        });
        return currentIndex
      },
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/mixin";
  @import "../../../assets/css/variables";
  .Interval {
    width: pxTorem(300);
    .title {
      @include fja();
      justify-content: space-between;
      color: #a1a5a8;
      font-size: pxTorem(26);
    }
    .line-val {
      height: pxTorem(5);
      margin-top: pxTorem(28);
      background: #cfcfcf;
      @include fja();
      justify-content: space-between;
      .item{
        width: pxTorem(18);
        height: pxTorem(18);
        background-color: #ffffff;
        border: solid 2px #cfcfcf;
        border-radius: 50%;
      }
      .current-item{
        background: $themeColor;
      }
    }
  }
</style>
