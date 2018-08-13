<template>
  <div class="">
    <ts-header title="钻石对比" back></ts-header>
    <div class="diamoud-num">{{goodsList.length}}</div>
    <page>
      <div class="wrap">
        <div class="contrast-field ">
          <div class="header">已选钻石</div>
          <div class="content">
            <div class="item">编号</div>
            <div class="item">圆形</div>
            <div class="item">价格元</div>
            <div class="item">重量Ct</div>
            <div class="item">尺寸mm</div>
            <div class="item">颜色</div>
            <div class="item">净度</div>
            <div class="item">切工</div>
            <div class="item">抛光</div>
            <div class="item">对称</div>
            <div class="item">荧光</div>
            <div class="item">证书</div>
            <div class="item">卖家</div>
            <div class="item">货源</div>
            <div class="item">新旧</div>
            <div class="item">发货周期</div>
            <div class="btn" v-show="goodsList.length>0" @click="allDel">全部删除</div>
          </div>
        </div>
        <div class="contrast-content">
          <div class="box">
            <div class="contrast-field" v-for="(item,index) in goodsList" :key="index">
              <div class="header">
                <img :src="item.img_url" alt="">
              </div>
              <div class="content">
                <div class="item">{{item.goods_id}}</div>
                <div class="item" v-html="shapeText(item.shape)"></div>
                <div class="item">{{item.goods_price}}</div>
                <div class="item">{{item.carat_weight}}</div>
                <div class="item ">
                  <div class="bj">
                    {{item.measurements}}
                  </div>
                </div>
                <div class="item">{{item.color}}</div>
                <div class="item">{{item.clarity}}</div>
                <div class="item">{{item.cut||'暂无'}}</div>
                <div class="item">{{item.polish}}</div>
                <div class="item">{{item.symmetry||'暂无'}}</div>
                <div class="item">{{item.fluorescence}}</div>
                <div class="item">{{item.report_no}}</div>
                <div class="item">
                  <div class="bj">
                    {{item.store_name}}
                  </div>
                </div>
                <div class="item">{{item.area==='1'?'境内':'境外'}}</div>
                <div class="item">{{item.is_new==='1'?'全新':'二手'}}</div>
                <div class="item">{{item.delivery_time}}</div>
                <div class="btn" @click="delGoods(index)">删除</div>
                <div class="addCart" @click="addCart(item.goods_id)">+购物车</div>
              </div>
            </div>
            <div class="contrast-field " style="height: 100%">
              <div class="header" @click="addContrast">
                <icon font-name="icon-jia" size="50"></icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </page>
  </div>
</template>

<script>
  import {CartAdd} from "../../assets/js/api";
  import {DELATE_CONTRAST, ADD_CARTLIST} from "../../store/mutations/mutations-types";
  import {mapMutations} from "vuex";
  import {shape} from '../../utils/currency'

  export default {
    data() {
      return {
        goodsList: []
      };
    },
    created() {
      let {list} = this.$store.state.contrastList;
      this.goodsList = list;
    },
    methods: {
      ...mapMutations([DELATE_CONTRAST, ADD_CARTLIST]),
      shapeText(str) {
        return shape(str)
      },
      allDel() {
        this.$modal({message: '确认删除吗', lock: true}).then(action => {
          this[DELATE_CONTRAST]('all');
          this.goodsList = [];
          setTimeout(() => {
            this.$toast({message: '删除成功', position: 'bottom'});
          }, 200)
        })
      },
      delGoods(index) {
        this.$modal({message: '确认删除吗', lock: true}).then(action => {
          this[DELATE_CONTRAST](index);
          this.goodsList.splice(index, 1);
          setTimeout(() => {
            this.$toast({message: '删除成功', position: 'bottom'});
          }, 200)
        })
      },
      addContrast() {
        this.$router.push({path: '/diamondsList'})
      },
      async addCart(index) {
        let json = await this.$http.post(CartAdd, {
          post: {
            quantity: 1,
            goods_id: index
          }
        }, {show: true, type: 'mini'});

        if (json.code !== 200) {
          this.$toast({message: json.datas.error, position: 'bottom'})
        } else {
          this.$toast({message: '加入成功', position: 'bottom'});
          let item = this.goodsList.filter((i) => i.goods_id === index)[0];
          this[ADD_CARTLIST](item)
        }
      },
    },
    components: {},
    computed: {}
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/css/mixin";

  .diamoud-num {
    background: #F5F5F5;
    height: pxTorem(53);
    @include fja();
    font-size: pxTorem(28);
    color: #666666;
  }

  .wrap {
    @include fja(space-between);
    align-items: flex-start;
    .contrast-field, .contrast-content {
      position: relative;

    }
    .contrast-content {
      flex: 3;
      overflow-x: scroll;
      .box {
        @include fja(flex-start, flex-start);
        width: 100%;
        .gray {
          color: rgba(44, 44, 44, 0.5);
        }
      }
    }
    background: #ffffff;
  }

  .contrast-field {
    @include fja(space-between);
    width: 25vw;
    flex-shrink: 0;
    flex-direction: column;
    box-sizing: border-box;
    color: #2c2c2c;
    padding-bottom: 0.2rem;
    .header {
      width: 100%;
      @include fja();
      height: pxTorem(118);
      color: #2c2c2c;
      font-size: pxTorem(30);
      position: relative;
      box-sizing: border-box;
      border-right: 1px solid #E5E5E5;
      border-bottom: 1px solid #E5E5E5;
      img {
        width: 50%;
        height: 80%;
      }
    }
    .content {
      flex: 1;
      width: 100%;
      @include fja();
      flex-direction: column;
      height: 100%;
      border-right: 1px solid #E5E5E5;

      .item {
        @include fja();
        width: pxTorem(80);
        height: pxTorem(77);
        flex: 1;
        font-size: pxTorem(26);
        box-sizing: border-box;
        white-space: nowrap;
        border-bottom: 1px solid #e5e5e5;
        position: relative;
        .bj {
          position: absolute;
          display: block;
          width: 22vw;
          height: pxTorem(77);
          line-height: pxTorem(77);
          text-align: left;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }

      .btn {
        border: solid 1px #bd081c;
        color: #bd081c;
      }
      .addCart, .btn {
        width: pxTorem(122);
        height: pxTorem(56);
        @include fja();
        border-radius: pxTorem(8);
        font-size: pxTorem(28);
        margin-top: 0.2rem;
      }
      .addCart {
        color: #fff;
        background: #bd081c;
      }
    }
  }
</style>
