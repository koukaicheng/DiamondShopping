<template>
  <span class="iconfont " :style="{'color':color,'font-size':size/75+'rem'}" :class="fontName" @click="event"></span>
</template>
<script>
  export default {
    name:'icon',
    props:{
      fontName:{
        type: String,
        default: ""
      },
      size: {
        type: String,
        default: "16"
      },
      color:{
        type: String,
        default: "#666"
      }
    },
    data() {
      return {}
    },
    methods: {
      event(){
        this.$emit('click')
      }
    },
    created() {
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/icon";

</style>
