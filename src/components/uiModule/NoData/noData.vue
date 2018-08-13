<template>
    <div class="nodata-wrapper" :style="{'background':bkGround}">
        <div class="box">
            <img :src="isUrl.url"
                 alt="">
        </div>
        <p class="title">{{tip}}</p>
    </div>
</template>

<script>
export default {
  name: "no-data",
  props: {
    types: {
      type: String,
      default: "content"
    },
    tip:{
      type: String,
      default: "暂无内容"
    },
    bkGround:{
      type: String,
      default: "#fff"
    }
  },
  data() {
    return {};
  },
  computed: {
    isUrl() {
      let url = "";
      let name = "";
      if (this.types === "content") {
        url = require("../../../assets/imgs/wuneirong.png");
        name = "暂无内容";
      } else {
        url = require("../../../assets/imgs/wuwangluo.png");
        name = "网络未连接，请检查网络设置";
      }
      return {
        url,
        name
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/css/mixin.scss";
.nodata-wrapper {
  height: 100%;
  overflow: hidden;
  .box {
    width: pxTorem(330);
    margin: 0 auto;
    margin-top: pxTorem(120);
    img {
      width: 100%;
    }
  }
  .title {
    text-align: center;
    margin-top: pxTorem(50);
    font-size: pxTorem(30);
    color: #999;
  }
}
</style>
