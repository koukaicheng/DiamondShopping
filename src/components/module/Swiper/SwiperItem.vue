<template>
  <div class="cube-slide-item">
    <slot>
      <a>
        <img :src="item.image">
      </a>
    </slot>
  </div>
</template>

<script type="text/ecmascript-6">
const COMPONENT_NAME = "cube-slide-item";
export default {
  name: COMPONENT_NAME,
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {

  },
  watch: {
  },
  mounted() {

  }
};
</script>

<style>
.cube-slide-item {
  float: left;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 100%;
  text-align: center;
}

.cube-slide-item > a {
  overflow: hidden;
  text-decoration: none;
}

.cube-slide-item > a,
.cube-slide-item img {
  display: block;
  width: 100%;
   height: 100%;
}
.active {
  transition: transform 0.3s;
}
</style>
