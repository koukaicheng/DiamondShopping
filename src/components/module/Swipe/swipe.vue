<template>
  <div class="cube-swipe">
    <slot>
      <transition-group name="cube-swipe" tag="ul">
        <li v-for="(item,index) in data" :key="item.item.value">
          <cube-swipe-item
            ref="swipeItem"
            :btns="item.btns"
            :item="item.item"
            :index="index"
            :auto-shrink="autoShrink"
            @item-click="onItemClick"
            @btn-click="onBtnClick"
            @active="onItemActive">
          </cube-swipe-item>
        </li>
      </transition-group>
    </slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import CubeSwipeItem from './swipe-item.vue'

  const COMPONENT_NAME = 'cube-swipe';
  const EVENT_ITEM_CLICK = 'item-click';
  const EVENT_BTN_CLICK = 'btn-click';

  export default {
    name: COMPONENT_NAME,
    props: {
      data: {
        type: Array,
        default() {
          return []
        }
      },
      autoShrink: {
        type: Boolean,
        default: false
      }
    },
    created() {
      this.activeIndex = -1
    },
    methods: {
      onItemClick(item, index) {
        this.$emit(EVENT_ITEM_CLICK, item, index)
      },
      onBtnClick(btn, index) {
        this.$emit(EVENT_BTN_CLICK, btn, index)
      },
      onItemActive(index) {
        if (index === this.activeIndex) {
          return
        }
        if (this.activeIndex !== -1) {
          const activeItem = this.$refs.swipeItem[this.activeIndex]
          activeItem.shrink()
        }
        this.activeIndex = index
      }
    },
    components: {
      CubeSwipeItem
    }
  }
</script>

<style>
  .cube-swipe {
    overflow: hidden
  }

  .cube-swipe-enter-active, .cube-swipe-enter-active .cube-swipe-item-inner, .cube-swipe-leave-active, .cube-swipe-leave-active .cube-swipe-item-inner {
    -webkit-transition: all .3s;
    transition: all .3s
  }

  .cube-swipe-enter .cube-swipe-item-inner, .cube-swipe-leave-to .cube-swipe-item-inner {
    height: 0
  }
</style>
