<template>
  <!--&lt;!&ndash;.stop.prevent&ndash;&gt;-->
  <div class="slide-item"  @click.stop.prevent="goodsDetail(list.goods_id)">
    <div v-if="edit" class="checkbox" @click.stop="">
      <ds-checkbox v-model="list.checked"></ds-checkbox>
    </div>
    <div class="slide-head">
      <img :src="list.affiliated.img_url" alt="">
    </div>
    <div class="slide-content">
      <div class="title">{{list.goods_name}}</div>
      <div class="moreny">RMB {{list.goods_price}}</div>
      <div class="tag" v-if="list.affiliated">
        <span>{{list.affiliated.is_new==='0'?'二手':'全新'}}</span>
        <span>{{list.affiliated.delivery_time}}日发货</span>
      </div>
    </div>
  </div>

</template>
<script>
  export default {
    props: {
      list: {
        type: Object,
        default: {}
      },
      edit: {
        type: Boolean,
        default: false
      },
      isOpen: {
        type: Boolean,
        default: false
      },
    },

    data () {
      return {
        checked: this.list.checked
      }
    },
    methods: {
      end () {

      },
      goodsDetail (index) {
        if (!this.isOpen) {
          if (this.$route.name === 'diamondDetail') {
            this.$router.push({path: '/diamondDetailtwo', query: {goods_id: index}})
          } else {
            this.$router.push({path: '/diamondDetail', query: {goods_id: index}})
          }
        } else {
         this.$emit('openChange')
        }
      }
    },
    created () {

    },
    watch: {
      checked (val) {
        this.list.checked = val
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../assets/css/icon';
  @import '../../../assets/css/mixin';

  .slide-item {
    position: relative;
    display: flex;
    align-items: center;
    padding: pxTorem(10) 0;
    font-size: pxTorem(26);
    box-sizing: border-box;
    color: #2a2a2a;
    background: #fff;
    .checkbox {
      margin-left: pxTorem(20);
    }
    &:last-child::after {
      display: none;
    }
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

    /*transition: left 0.3s linear;*/
    .slide-head {
      width: pxTorem(90);
      height: pxTorem(90);
      overflow: hidden;
      margin: pxTorem(20);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .slide-content {
      padding: 0 pxTorem(20);
      line-height: 1.6;
      overflow: hidden;
      .title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .moreny {
        font-size: pxTorem(30);
        color: #bd081c;
      }
      .tag {
        margin-top: pxTorem(5);
        span {
          padding: pxTorem(3) pxTorem(8);
          margin-right: pxTorem(10);
          border-radius: pxTorem(8);
          border: solid 1px #d8d8d8;
          color: #4b4b4b;
          font-size: pxTorem(22);
        }
      }
    }
  }
</style>
