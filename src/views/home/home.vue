<template>
  <div class="wrapper-page">
    <div class="search"
         :style="{'background':'rgba(255,255,255,'+opacity+')' , 'border-bottom':'1px solid rgba(219,219,219,'+opacity+')'}">
      <search-box off :messgeNum="messgeNum">
        <span class="trans" :class="{'color':opacity  > 0}" :style="{'color':opacity>=1?'#000':'#9c9c9c'}">乐检</span>
      </search-box>
    </div>
    <page>
      <div>
        <div class="ch-one">
          <div class="swiper-box">
            <swipe :auto="autoPlay" @change="swipeChage">
              <swipe-item v-for="(item, index) in items" :key="index" class="swipe-item">
                <div class="swipe-item-mask"></div>
                <img :src="item.image" :class="{'active':item.isTran}" :style="{transform:'scale('+tran+')'}" alt="">
              </swipe-item>
            </swipe>
          </div>
        </div>
        <div class="mescroll" id="mescroll" @touchmove.stop="">
          <div ref="wrap" class="wrap-box">

            <div class="top-box">
              <div class="top-box-wrap">
                <div class="top-box-item" @click="subPage('/sellDrill')">卖钻石</div>
                <div class="top-box-item" @click="subPage('/buyDrill')">买钻石</div>
              </div>
              <div class="top-button" @click="subPage('./certificateQuery')">
                证书查询
              </div>
              <div class="top-button-group">
                <div class="button-group-item" @click="subPage('./evaluation')">
                  <div class="button-box">
                    <img src="../../assets/imgs/icon/gujia.png" alt="">
                  </div>
                  <div class="button-title">估价</div>
                </div>
                <div class="button-group-item" @click="link('/testing')">
                  <div class="button-box">
                    <img src="../../assets/imgs/icon/jiance.png" alt="">
                  </div>
                  <div class="button-title">检测</div>
                </div>
                <div class="button-group-item" @click="link('/lnlayService')">
                  <div class="button-box">
                    <img src="../../assets/imgs/icon/xiangqian.png" alt="">
                  </div>
                  <div class="button-title">镶嵌</div>
                </div>
                <div class="button-group-item" @click="link('/valueGuarantee')">
                  <div class="button-box">
                    <img src="../../assets/imgs/icon/baozhang.png" alt="">
                  </div>
                  <div class="button-title">保障</div>
                </div>
              </div>
            </div>
            <ds-head name="乐检学院" @tap="link('/college')"></ds-head>
            <div class="list-wrapper">
              <div v-for="(item ,index) in article" :key="index" class="list-item" @click="detail(item.article_id)">
                <div class="list-title">{{item.ancestry_ac.name}}</div>
                <div class="list-info">{{item.article_title}}</div>
              </div>
            </div>
            <ds-head name="精选推荐" @tap="link('/diamondsList')"></ds-head>
            <slide :list="goodsList"></slide>
          </div>
        </div>
      </div>
    </page>
    <ds-footer></ds-footer>
  </div>
</template>
<script>
  import PullTo from 'vue-pull-to'
  import { Swipe, SwipeItem, Loadmore, spinner } from 'mint-ui'
  import SearchBox from '../../components/uiModule/SearchBox/SearchBox'
  import { Index, GoodsList, Unread } from '../../assets/js/api'
  import MeScroll from 'mescroll.js'

  export default {
    name: 'index',
    data () {
      return {
        slide: false,
        spinnerSize: 18,
        tran: 1,
        messgeNum: 0,
        goodsList: [],
        article: [],
        items: [],
        autoPlay: 100000,
        topStatus: '',
        current: 0,
        iconLink: '',
        iconWord: '下拉刷新',
        opacity: 0
      }
    },
    mounted () {
      let self = this
      setTimeout(() => {
        self.mescroll = new MeScroll('mescroll', {
          down: {
            callback: self.down,
          },
          up: {
            // use:false,
            isBounce: false,
            callback: self.getListData
          }
        })
        document.getElementsByClassName('mescroll-downwarp')[0].style.top =
          4.66 + 'rem'
        document.getElementsByClassName('mescroll-upwarp')[0].style.display =
          'none'
        self.mescroll.optUp.onScroll = function (mescroll, y, isUp) {
          self.opacity = y / 100
        }
        self.mescroll.optDown.onMoving = function (mescroll, rate, downHight) {
          self.items[self.current].isTran = false
          self.translateChange(downHight)
        }
      }, 200)
    },
    created () {
      this.getIndex()
      this.getGoddsList()
    },
    methods: {
      link (url) {
        this.$router.push({path: url})
      },
      async getGoddsList () {
        let goodsList = await this.$http.get(GoodsList, {type: 'recommend'}, {
          show: true,
          type: 'mini'
        })
        this.goodsList = goodsList.datas.goods_list
      },
      down () {
        this.getIndex()
        let self = this
        if (self.items.length === 0) {
          self.mescroll.endErr()
          this.tran = 1
        }
        self.items[self.current].isTran = true
        this.tran = 1
        setTimeout(() => {
          self.mescroll.endErr()
          this.tran = 1
        }, 1500)
      },
      detail (id) {
        this.$router.push({path: '/articleDetails', query: {id}})
      },
      getListData () {
        let self = this
        setTimeout(() => {
          self.mescroll.endErr()
        }, 1000)
      },
      subPage (url) {
        this.$router.push(url)
      },
      abc (type) {
        // console.log(type)
      },
      swipeChage (current) {
        this.current = current
      },
      translateChange (e) {
        if (e / 1000 + 1 >= 1) {
          this.tran = e / 1000 + 1
        }
      },
      async getIndex () {
        let getIndexData = await this.$http.get(Index, {
          goods_id: '',
          article_num: 4
        })
        if (getIndexData.code === 200) {
          this.items = getIndexData.datas[0].adv_list.item
          this.article = getIndexData.datas.article
        }
      },
      async getUnread () {
        if (!this.key) return
        let json = await this.$http.get(Unread, {}, {})
        if (json.code === 200) {
          let num = parseInt(json.datas)
          this.messgeNum = num
        }
      },
    },
    watch: {},
    computed: {
      key () {
        return this.$store.state.key
      }
    },
    components: {
      SearchBox,
      PullTo,
      Swipe,
      SwipeItem,
      Loadmore,
      spinner
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/css/mixin';

  .mescroll-downwarp {
    top: 4.66rem !important;
  }

  .wrapper-page {
    background: #f5f5f5;
    .search {
      position: fixed;
      // top: 0.2rem;
      padding: 0.2rem 0;
      left: 0;
      width: 100%;
      // background: rgba(0,0,0,0.8);
      z-index: 101;
      .trans {
        transition: color 0.3s;
        &.color {
          color: #9c9c9c;
        }
      }
    }
    .swiper-box {
      position: fixed;
      top: 0;
      width: 100%;
      height: 50%;
      overflow: hidden;
      .swipe-item {
        .swipe-item-mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 10;
        }
        img {
          transform: scale(1);
        }
        .active {
          transition: transform 0.3s;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .wrap-box {
      position: relative;
      top: pxTorem(350);
    }
    .height {
      height: 200px;
      border: 1px red solid;
    }
    .top-box {
      position: relative;
      // top: -10px;
      padding: pxTorem(25) 0;
      box-sizing: border-box;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      // opacity: 0.9;
      z-index: 100;
      background: #fff;
      border-bottom: pxTorem(18) #f5f5f5 solid;
      .top-box-wrap {
        display: flex;
        // width: 100%;
        box-sizing: border-box;
        margin: 0 pxTorem(30);

        .top-box-item {
          position: relative;
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
          padding-right: pxTorem(23);
          padding-bottom: pxTorem(23);
          width: 100%;
          height: pxTorem(143);
          box-sizing: border-box;
          border-radius: pxTorem(8);
          font-size: pxTorem(48);
          color: #fff;
          background: #bd081c;
          opacity: 0.9;
          z-index: 2;
          &:first-child {
            margin-right: pxTorem(18);
          }
          &:after {
            position: absolute;
            right: pxTorem(23);
            bottom: pxTorem(0);
            font-family: Roboto-Light;
            font-size: pxTorem(110);
            /*opacity: 0.2;*/
            color: #ce2538;
            z-index: -1;
          }
          &:nth-child(1):after {
            content: 'Sell';
          }
          &:nth-child(2):after {
            content: 'Buy';
          }
        }
      }
      .top-button {
        position: relative;
        z-index: 100;
        margin: 0 pxTorem(30);
        margin-top: pxTorem(20);
        margin-bottom: pxTorem(25);
        // width: 100%;
        height: pxTorem(70);
        line-height: pxTorem(70);
        background-color: #ffffff;
        border-radius: pxTorem(8);
        border: solid 1px #bd081c;
        font-size: pxTorem(28);
        color: #bd081c;
        text-align: center;
      }
      .top-button-group {
        position: relative;
        z-index: 100;
        border-top: pxTorem(18) #f5f5f5 solid;
        display: flex;
        /*justify-content: space-between;*/
        padding-top: pxTorem(42);
        font-size: pxTorem(28);
        .button-group-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          .button-box {
            width: pxTorem(90);
            height: pxTorem(90);
            background: #f6f6f6;
            border-radius: 50%;
            padding: pxTorem(10);
            img {
              width: 100%;
              height: 100%;
            }
          }
          .button-title {
            margin-top: pxTorem(5);
          }
        }
      }
    }

    .list-wrapper {
      position: relative;
      z-index: 100;
      background: #fff;
      border: 1px #fff solid;
      border-bottom: pxTorem(18) #f5f5f5 solid;

      .list-item {
        display: flex;
        align-items: center;
        font-size: pxTorem(26);
        padding: 0;
        margin: pxTorem(25) pxTorem(20);
        .list-title {
          flex-shrink: 0;
          padding: pxTorem(4) pxTorem(12);
          border-radius: pxTorem(8);
          border: solid 1px #d8d8d8;
          font-size: pxTorem(22);
          color: #4b4b4b;
        }
        .list-info {
          padding-left: pxTorem(16);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }

  .mint-loadmore-top {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: pxTorem(28);
    .mint-loadmore-word {
      color: #bd081c;
      padding-left: pxTorem(10);
      font-size: pxTorem(34);
    }
    span {
      display: inline-block;
      transition: 0.2s linear;
      vertical-align: middle;
      color: #bd081c;
      &.is-rotate {
        transform: rotate(180deg);
      }
    }
  }
</style>
