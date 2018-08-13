<template>
  <div class="slide-wrapper">
    <swipeout>
      <swipeout-item v-for="(item,index) in list" :key="index"  :ref="'item'+index"  >
        <div slot="right-menu">
          <swipeout-button @click.native="onButtonClick('contrast',item.goods_id)" type="primary" text="对比">
            <i slot="icon" class="iconfont icon-jiahao"></i>
          </swipeout-button>
          <swipeout-button @click.native="onButtonClick('addCart',item.goods_id)" type="warn" text="购物车">
            <i slot="icon" class="iconfont icon-jiarugouwuche"></i>
          </swipeout-button>
        </div>
        <div slot="content" class="border-1px" :key="index">
          <slide-del-content :edit="edit" :list="item" :isOpen="isOpen" @openChange="openChange"></slide-del-content>
          <div class="round" @click="open(index)">...</div>
        </div>
      </swipeout-item>
    </swipeout>

  </div>
</template>
<script>
import SlideDelContent from './SlideDel-content.vue'
import { Swipeout, SwipeoutItem, SwipeoutButton } from '../../module/Swipeout'
export default {
  props: {
    list: {
      type: Array,
      default: []
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isOpen:false,
      swipeData: [
        {
          item: {
            text: '测试1',
            value: 1
          },
          btns: [
            {
              action: 'clear',
              text: '不再关注',
              color: '#c8c7cd'
            },
            {
              action: 'delete',
              text: '删除',
              color: '#ff3a32'
            }
          ]
        }
      ]
    }
  },
  methods: {
    onButtonClick(type, index) {
      this.$emit(type, index)
    },
    open(index){
      console.log(index)
      if(!this.isOpen){
        this.$refs[`item${index}`][0].open('right')
      }else{
        this.$refs[`item${index}`][0].close()
      }
      this.isOpen =  !this.isOpen;
    },
    openChange(){
      this.isOpen= false
    },
  },
  created() {

  },
  components: {
    SlideDelContent,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/icon';
@import '../../../assets/css/mixin';
.border-1px {
  margin: 0 pxTorem(20);
  position: relative;
  .round{
    position: absolute;
    font-size: pxTorem(40);
    right: 0;
    bottom: 0;
    padding: pxTorem(20);
    color: #ababab;
  }
}
.slide-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: pxTorem(20) 0;
  margin: 0 pxTorem(20);
  // border-bottom: 1px #dbdbdb solid;
  font-size: pxTorem(26);
  box-sizing: border-box;
  color: #2a2a2a;
  background: #fff;
  /*transition: left 0.3s linear;*/
  /*&:after {*/
    /*content: '';*/
    /*position: absolute;*/
    /*right: 0;*/
    /*left: 0;*/
    /*bottom: 0;*/
    /*display: block;*/
    /*border-bottom: 1px solid #e5e5e5;*/
    /*transform-origin: 0 0;*/
    /*transform: scaleY(0.6);*/
  /*}*/
  .slide-head {
    width: pxTorem(60);
    height: pxTorem(60);
    overflow: hidden;
    margin: pxTorem(20);
    img {
      width: 100%;
      height: 100%;
    }
  }
  .slide-content {
    padding-left: pxTorem(20);
    line-height: 1.8;
    .moreny {
      font-size: pxTorem(30);
      color: #bd081c;
    }
    .tag {
      margin-top: pxTorem(5);
      span {
        padding: pxTorem(6) pxTorem(12);
        margin-right: pxTorem(10);
        border-radius: pxTorem(8);
        border: solid 1px #d8d8d8;
        color: #4b4b4b;
      }
    }
  }
}
</style>
