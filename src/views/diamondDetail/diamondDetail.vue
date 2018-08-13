<template>
  <div class="" :key="fullPath">
    <ts-header back title="商品详情" rightIcon="icon-diandiandianshu" @headerEvent="headOff"></ts-header>
    <page>
      <div class="wrap" @touchstart.stop="kkc">
        <cube-scroll ref="scroll"
                     listenScroll :bounce="false" @scrollEnd="scrollEnd" @scroll="scroll_" @touchEnd="touchEnd">
          <div class="swiper border-1px">
            <ds-swiper :data="items" :auto-play="items.length>1" :loop="items.length>1">
              <template slot="dots" slot-scope="props">
                <div class="dots">
                  <div>
                    {{props.current+1}}/{{items.length}}
                  </div>
                </div>
              </template>
            </ds-swiper>
          </div>
          <div class="good-content">
            <div class="goods-info border-1px">
              <div class="goods-class">
                <div class="text">{{goods_info.goods_name}}</div>
                <!--<div class="share">-->
                  <!--<icon font-name="icon-fenxiang" size="40"></icon>-->
                <!--</div>-->
              </div>

              <div class="goods-price">
                <div class="money_num">
                  <div class="num">
                    ¥{{goods_info.goods_price}}
                  </div>
                  <div class="lv">
                    <lv :num="level"></lv>
                  </div>
                </div>
                <!--<div class="original-price ">¥{{goods_info.goods_promotion_price}}</div>-->
                <div class="service_price">服务费：{{goods_info.service_price}}</div>
              </div>

              <div class="bottom">
                <div class="left-btn">
                  <div class="btn">{{affiliated.is_new==='1'?'全新':'二手'}}</div>
                  <div class="btn">{{affiliated.delivery_time}}日</div>
                </div>
                <div class="collection-num" @click="favorate">
                  <icon :font-name="favorateName" size="40" :color="favorateColor"></icon>

                  <span class="num" v-show="goods_info.goods_collect!='0'">{{goods_info.goods_collect}}</span>
                </div>
              </div>

            </div>
            <div class="brand border-1px">
              <div class="brand-name">卖家: 艾福瑞卡钻石</div>
              <!--<div class="btn-box">-->
              <!--<div class="btn">-->
              <!--保-->
              <!--</div>-->
              <!--</div>-->
              <!--<div class="brand-grande">-->
              <!--<icon font-name="icon-zuanshi1" size="40"></icon>-->
              <!--</div>-->
            </div>
            <div class="collection-data">
              <div class="item">
                <interval :text="['L','K','J','I','H','G','F','E','D']" :val="affiliated.color"></interval>
                <interval title="净度" :text="['SI2','SI1','VS2','VS1','VV2','VV1','IF','FL']"
                          :val="affiliated.clarity"></interval>
              </div>
              <div class="item">
                <interval title="切工" :text="['F','G','VG','EX' ]" :val="affiliated.cut"></interval>
                <interval title="荧光" :text="['VS','S','M','F','N']" :val="affiliated.fluorescence"></interval>
              </div>
            </div>

            <div class="tbody">
              <div class="status border-1px" @click="boxStatus">
                <icon font-name="icon-jiantou-copy" size="36" color="#a7a7a7"></icon>
              </div>
              <div :class="{'hide':off===false,'box':off===true}" class="all-box">
                <div class="item border-1px">
                  <div class="title">形状</div>
                  <div class="val" v-html="shapeText(affiliated.shape)"></div>
                </div>
                <div class="item border-1px">
                  <div class="title">重量</div>
                  <div class="val">{{affiliated.carat_weight}}ct</div>
                </div>
                <div class="item border-1px">
                  <div class="title">颜色</div>
                  <div class="val">{{affiliated.color}}</div>
                </div>
                <div class="item border-1px">
                  <div class="title">净度</div>
                  <div class="val">{{affiliated.clarity}}</div>
                </div>
                <div class="item border-1px">
                  <div class="title">切工</div>
                  <div class="val">{{affiliated.cut}}</div>
                </div>
                <div class="item border-1px">
                  <div class="title">抛光</div>
                  <div class="val">{{affiliated.polish}}</div>
                </div>
                <div class="item border-1px">
                  <div class="title">对称</div>
                  <div class="val">{{affiliated.symmetry}}</div>
                </div>
                <div class="item border-1px">
                  <div class="title">荧光</div>
                  <div class="val">圆形</div>
                </div>
                <div class="item border-1px">
                  <div class="title">尺寸</div>
                  <div class="val">{{affiliated.measurements}}</div>
                </div>
                <div class="item border-1px">
                  <div class="title">奶绿咖</div>
                  <div class="val">{{affiliated.color_type}}</div>
                </div>
                <div class="item border-1px">
                  <div class="title">包裹体</div>
                  <div class="val">{{affiliated.inclusion}}</div>
                </div>
                <div class="item">
                  <div class="title">所在地</div>
                  <div class="val"></div>
                </div>
              </div>
            </div>
            <div class="back"></div>

            <div class="title-heade">
              <div class="text">证书</div>
              <div class="right" @click="certificateQuery(affiliated.report_no)">
                <div class="num">GIA {{affiliated.report_no}}</div>
                <div class="text">查看</div>
                <div class="icon">
                  <icon font-name="icon-fanhui" size="22" color="#b4b4b4"></icon>
                </div>
              </div>
            </div>
            <div class="back"></div>
            <div class="goods-money">
              <ds-head name="估价"
                       border-all="none"
                       more-name="详情"
                       @tap="detail('/evaluation',affiliated.report_no)"></ds-head>
              <div class="silder-box">
                <vue-slider @callback="silderChange" v-bind="opciton" v-model="opciton.value"></vue-slider>
              </div>
              <div class="tip">
                估价结果包含交易产生的税费
              </div>

            </div>

            <div class="back"></div>

            <div class="process">
              <ds-head name="交易流程"
                       border-all="none"
                       more-name=" "
                       :more=false>

              </ds-head>

              <div class="box">
                <div class="item">
                  <div class="circular">
                    <div class="raing">
                      <icon font-name="icon-Group" color="#bd081c" size="40"></icon>
                    </div>
                    <div class="text">买家下单付款</div>
                  </div>
                  <div class="icon">
                    <icon font-name="icon-jiantou22" size="40" color="#999999"></icon>
                  </div>
                  <div class="circular">
                    <div class="raing">
                      <icon font-name="icon-zhengshu" color="#bd081c" size="50"></icon>
                    </div>
                    <div class="text">卖家送检</div>
                  </div>
                  <div class="icon">
                    <icon font-name="icon-jiantou22" size="40" color="#999999"></icon>
                  </div>
                  <div class="circular">
                    <div class="raing">
                      <icon font-name="icon-zuanjie21" color="#bd081c" size="50"></icon>
                    </div>
                    <div class="text">镶嵌</div>
                  </div>
                </div>
                <div class="item2">
                  <div class="icon">
                    <icon font-name="icon-jiantou22-copy" size="40" color="#999999"></icon>
                  </div>
                </div>
                <div class="item">
                  <div class="circular">
                    <div class="raing">
                      <icon font-name="icon-qianbao1" color="#bd081c" size="50"></icon>
                    </div>
                    <div class="text">结算</div>
                  </div>
                  <div class="icon">
                    <icon font-name="icon-jiantou22-copy-copy" size="40" color="#999999"></icon>
                  </div>
                  <div class="circular">
                    <div class="raing">
                      <icon font-name="icon-xiangzi" color="#bd081c" size="50"></icon>
                    </div>
                    <div class="text">确认收货</div>
                  </div>
                  <div class="icon">
                    <icon font-name="icon-jiantou22-copy-copy" size="40" color="#999999"></icon>
                  </div>
                  <div class="circular">
                    <div class="raing">
                      <icon font-name="icon-logistics-jf" color="#bd081c" size="50"></icon>
                    </div>
                    <div class="text">发货给买家</div>
                  </div>
                </div>
                <div class="tip">
                  <div class="icon">
                    <icon font-name="icon-gantanhao" color="#bd081c" size="30"></icon>
                  </div>
                  <div class="text">
                    检测未通过，将退款至您的账户
                  </div>
                </div>
              </div>

            </div>
            <div class="back"></div>

            <div class="pro-moudle">
              <div class="item">
                <div class="img">
                  <img src="../../assets/imgs/zhang.png" alt="">
                </div>
                <span>卖家审核</span>
              </div>
              <div class="item">
                <div class="img">
                  <img src="../../assets/imgs/fangda.png" alt="">
                </div>
                <span>前置检测</span>
              </div>
              <div class="item">
                <div class="img">
                  <img src="../../assets/imgs/dun.png" alt="">
                </div>
                <span>担保交易 </span>
              </div>
              <div class="item">
                <div class="img">
                  <img src="../../assets/imgs/san.png" alt="">
                </div>
                <span>全程保险</span>
              </div>
            </div>

            <div class="back"></div>

            <ds-cell title="品质保障"
                     link="/quality"
                     icon="icon-icon6"></ds-cell>
            <ds-cell title="价值保障"
                     link="/valueGuarantee"
                     icon="icon-icon6"></ds-cell>
            <ds-cell title="投诉与反馈" isLink mode="edit"
                     icon="icon-icon6" @click="complaintAsk(goods_info.goods_id)"></ds-cell>
            <div class="back"></div>
            <div class="goods-list">
              <ds-head name="精选推荐" border-all=" " @tap="link('diamondsList')"></ds-head>
              <slide ref="slide" slide :list="List" @addordel="addordel" @addCart="addCart"></slide>
            </div>
            <div class="back"></div>
          </div>
        </cube-scroll>
      </div>
    </page>
    <transition name="fade">
      <div class="recommend" v-show="footerStatus">
        <ds-head name="推荐款式" border-all=" " more-name=" " :more=false></ds-head>
        <div class="box">
          <div class="list">
            <div class="goods-item" v-for="(item,index) in inlay_commend_list" :key="index"
                 @click="cutoffDetails(item.goods_id)">
              <img :src="item.goods_image" alt="">
            </div>
          </div>
          <div class="icon" @click="lnlayService">
            <icon font-name="icon-fanhui" color="#ababab" size="36"></icon>
          </div>
        </div>
      </div>
    </transition>
    <div class="footer">
      <div class="cell border-1px">
        <div @click="linkList">
          <span class="text">以此钻石挑选款式</span>
          <icon font-name="icon-fanhui" color="#ababab" size="30"></icon>
        </div>
      </div>
      <div class="box">
        <div class="left">
          <div class="item" @click="linkre('cart')">
            <i class="iconfont icon-gouwuche2"></i>
            <span class="title">购物车</span>
            <span v-if="cartListLength>0" class="contrastLength">{{cartListLength}}</span>
          </div>
          <div class="item" @click="link('diamondContrast')">
            <span class="vs">vs</span>
            <span class="title">对比</span>
            <span v-if="contrastLength>0" class="contrastLength">{{contrastLength}}</span>
          </div>
        </div>
        <div class="right">
          <div class="btn" @click="addordel(goods_info.goods_id)">
            <span>加入对比</span>
          </div>
          <div class="btn" @click="addCart(goods_info.goods_id)">
            <span>加入购物车</span>
          </div>
        </div>
      </div>
    </div>
    <head-modal v-model="headStatus"></head-modal>
  </div>
</template>

<script>
  import scroll from '../../components/module/Scroll/Scroll'
  import Lv from '../../components/uiModule/DiamondsLv/DiamondsLv'
  import Interval from '../../components/uiModule/Interval/Interval'
  import { GoodsDetail, GoodsList, Price, CartAdd, CartCount, FavoritesAdd, FavoritesFel } from '../../assets/js/api'
  import { shape } from '../../utils/currency'
  import { TEMPORARY_INFO } from '../../store/mutations/mutations-types'
  import { mapMutations } from 'vuex'
  import { CONTRASTLIST, ADD_CARTLIST } from '../../store/mutations/mutations-types'

  export default {
    // name: 'diamondDetailtwo',
    data () {
      return {
        headStatus: false,
        footerStatus: true,
        posY: 0,
        off: false,
        List: [],
        goods_id: '',
        goodsList: [],
        affiliated: {},
        goods_info: {},
        inlay_commend_list: [],
        level: 0,
        cartListLength: '',
        is_favorate: false,
        store_info: {},
        goods_image: '',
        items: [],
        opciton: {
          valSatus: true,
          clickable: false,
          width: '8rem',
          processStyle: {
            'display': 'none'
          },
          tooltip: 'always',
          formatter: '¥{value}',
          tooltipStyle: {
            'background': 'none',
            'border': 'none',
            'marginTop': '-18px',
            'color': '#bd081c',
            'fontSize': '0.36rem'
          },
          sliderStyle: {
            'top': '-0.74rem',
            'display': 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            'background': 'none',
            'boxShadow': 'none'
          }
        },
      }
    },
    created () {
      let {goods_id} = this.$route.query
      this.goods_id = goods_id
      this.goodDetail(goods_id)
      this.getGoddsList()
      if (this.$store.state.userinfo) {
        this.level = this.$store.state.userinfo.level
      }
    },
    methods: {
      ...mapMutations([CONTRASTLIST, ADD_CARTLIST]),
      linkre (url) {
        this.$router.replace({name: url})
      },
      link (name) {
        this.$router.push({
          name: name
        })
      },
      detail (url, report_no) {
        this.$router.push({path: url, query: {report_no}})
      },
      lnlayService () {
        this.$router.push({name: 'lnlayService'})
      },
      cutoffDetails (goodsId) {
        this.$router.push({path: '/cutoffDetails', query: {goods_id: goodsId}})
      },
      certificateQuery (num) {
        this.$router.push({path: '/certificateQuery', query: {num}})
      },
      async goodDetail (goods_id) {
        let json = await this.$http.get(GoodsDetail, {goods_id}, {show: true, type: 'mini'})
        let banners = json.datas.goods_image
        banners.forEach((item, index, arr) => {
          this.items.push({image: item})
        })
        let {affiliated, goods_info, store_info, goods_image, is_favorate} = json.datas;
        [this.affiliated, this.goods_info, this.store_info, this.goods_image, this.is_favorate] = [affiliated, goods_info, store_info, goods_image, is_favorate]
        this.inlay_commend_list = json.datas.inlay_commend_list
        this.goodsList.push(this.affiliated)
        this.sectionVal(this.affiliated.report_no)
      },
      async getGoddsList () {
        let json = await this.$http.get(GoodsList, {curpage: this.curpage}, {})
        if (json.code === 200) {
          this.List = json.datas.goods_list
        }
      },
      async sectionVal (num) {
        let json = await this.$http.get(Price, {report_no: num, color_type: '', is_new: ''}, {})
        if (json.code === 200 && json.datas.low) {
          let low = parseInt(json.datas.low)
          let high = parseInt(json.datas.high)
          let val = parseInt((high - low) / 5)
          let min = low - val
          let max = high + val
          this.opciton.min = min
          this.opciton.max = max
          this.opciton.value = low + 200
          this.opciton.section = {
            minSectionVal: low,
            maxSectionVal: high
          }
        }
      },
      async addCart (index) {
        let json = await this.$http.post(CartAdd, {
          post: {
            quantity: 1,
            goods_id: index
          }
        }, {show: true, type: 'mini'})
        if (json.code !== 200) {
          this.$toast({
            message: json.datas.error,
            position: 'bottom'
          })
        } else {
          this.$toast({
            message: '加入成功',
            position: 'bottom'
          })
          this.cartLength()
        }
      },
      async favorate () {
        let url = this.is_favorate ? FavoritesFel : FavoritesAdd
        let obj = this.is_favorate ? {fav_id: this.goods_id} : {goods_id: this.goods_id}
        let json = await this.$http.post(url, {post: obj}, {}, {
          show: true,
          type: 'mini'
        })
        if (json.code === 200) {
          this.is_favorate = !this.is_favorate
        }
      },
      addordel (id) {
        let item = this.goodsList.filter((i) => i.goods_id === id)[0]
        this[CONTRASTLIST](item)
      },
      linkList () {
        let {goods_name, goods_price, service_price, goods_id} = this.goods_info
        let {is_new, delivery_time, img_url} = this.affiliated
        let obj = {goods_name, img_url, goods_price, service_price, is_new, delivery_time, goods_id}
        this.$store.commit(TEMPORARY_INFO, obj)
        this.$router.push({path: '/lnlayService'})
      },
      async cartLength () {
        if (this.$store.state.key) {
          let json = await this.$http.post(CartCount, {}, {})
          this.cartListLength = json.datas.cart_count
        }
      },
      shapeText (str) {
        return shape(str)
      },
      complaintAsk (goods_id) {
        this.$router.push({path: '/complaintAsk', query: {goods_id}})
      },
      boxStatus () {
        this.off = !this.off
      },
      kkc () {
        if (this.headStatus) {
          this.headStatus = false
        }
      },
      silderChange (val) {
        this.opciton.value = val
      },
      headOff () {
        this.headStatus = !this.headStatus
      },
      scroll_ (pos) {
        let posY = pos.y
        if (posY <= this.posY && this.posY !== 0) {
          this.footerStatus = false
          this.posY = posY
        } else {
          this.footerStatus = true
          this.posY = posY
        }
      },
      scrollEnd (pos) {
        let posY = pos.y
        this.posY = posY
      },
      touchEnd (pos) {
        let posY = pos.y
        if (posY <= this.posY && posY !== 0) {
          this.footerStatus = false
          this.posY = posY
        } else {
          this.footerStatus = true
          this.posY = posY
        }
      },
    },
    components: {
      'ds-swiper': () => import('../../components/module/Swiper/Swiper.vue'),
      'vueSlider': () => import('../../components/module/Silder/Silder.vue'),
      'head-modal': () => import('../../components/uimodule/HeadModal/HeadModal.vue'),
      Lv,
      Interval,
      'cube-scroll': scroll,
    },
    computed: {
      fullPath () {
        return this.$route.fullPath
      },
      contrastLength () {
        if (!this.$store.state.contrastList.list) return 0
        return this.$store.state.contrastList.list.length
      },
      favorateColor () {
        let is_favorate = this.is_favorate
        return is_favorate ? '#bd081c' : '#666'
      },
      favorateName () {
        let is_favorate = this.is_favorate
        return is_favorate ? 'icon-shoucang' : 'icon-xin-xian'
      }
    },
    watch: {
      fullPath (val) {
        let {goods_id} = this.$route.query
        this.goodDetail(goods_id)
        this.getGoddsList()
        if (this.$store.state.userinfo) {
          this.level = this.$store.state.userinfo.level
        }
      },
      is_favorate (val) {
        if (val) {
          let num = Number(this.goods_info.goods_collect)
          this.goods_info.goods_collect = num += 1
        } else {
          this.goods_info.goods_collect -= 1
        }
      }
    }
  }

</script>
<style lang="scss" scoped>
  @import "detail";
</style>
