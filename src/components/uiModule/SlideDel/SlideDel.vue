<template>
  <div class="slide-wrapper">
    <template>
      <div v-if="slide">
        <slide-del-item :list="list" @contrast="addordel" @addCart="addCart"></slide-del-item>
      </div>

      <div v-else class="border-1px" v-for="(item ,index) in list" :key="index">
        <slide-del-content :edit="edit" :list="item"></slide-del-content>
      </div>
    </template>

  </div>

</template>
<script>
import SlideDelItem from './SlideDel-item.vue'
import SlideDelContent from './SlideDel-content.vue'
export default {
  name: 'slide',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    slide: {
      type: Boolean,
      default: false
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    goodsDetail(index) {
      // console.log(index)
    },
    addordel(index) {
      console.log(index)
      this.$emit('addordel', index)
    },
    addCart(index) {
      this.$emit('addCart', index)
    }
  },

  components: {
    SlideDelItem,
    SlideDelContent
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/icon';
@import '../../../assets/css/mixin';
.slide-wrapper {
  background: #fff;
}
</style>
