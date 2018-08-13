<template>
  <div class="">
    <page>
      <div>
        <cube-scroll ref="scroll"
                     listenScroll :bounce="false">
          <div class="header">
            <img class="backGroud" src="../../assets/imgs/proBg.png" alt=""/>
            <div class="menu_icon">
              <div class="icon setting" @click="link('/settings')">
                <i class="iconfont icon-shezhi"></i>
              </div>
              <div class="icon msg" @click="link('/message')">
                <i class="iconfont icon-xiaoxi2" style="font-size:0.65rem"></i>
                <span class="red_di" v-show="messgeNum>0"></span>
              </div>
            </div>
            <div class="header-wraper">
              <div class="content" v-show="key">
                <router-link class="content-userinfo" to="/userinfo">
                  <div class="head-box">
                    <img :src="fromData.member_avatar" alt="">
                  </div>

                  <div class="name">{{userinfo.member_truename}}</div>
                  <div class="icon-group">
                    <div class="badge" v-for=" value in badge" v-if="value.level!=='0'">
                      <img :src="value.img" alt="">
                    </div>
                    <!--<icon font-name="icon-_xunzhang_icon" color="#141317" size="40"></icon>-->
                    <!--<icon font-name="icon-medal" color="#141317" size="40"></icon>-->
                  </div>
                  <p>积分 {{fromData.member_points}}/{{fromData.upgrade_exppoints}}</p>
                </router-link>
                <div class="lv" @click="memberRating">
                  <div class="icon">
                    <icon class="icon-v" font-name="icon-vip5" color="#bd081c" size="32"></icon>
                    <span class="lv-num">
                    {{fromData.level}}
                  </span>
                  </div>
                  <div class="progress-box" ref="progressBox">
                    <div class="progress-item" ref="progressItem"></div>
                  </div>
                </div>
              </div>
              <div class="login" v-show="!key" @click="link('/login')">
                <icon font-name="icon-morentouxiang" size="88"></icon>
                <div class="tip">请登录</div>
              </div>
            </div>
            <div class="enterprise" v-show="key" @click="detail()">
              身份认证
            </div>
          </div>

          <div class="box">
            <div class="class-fication">
              <div class="item" @click="link('/diamondContrast')">
                <div class="num">{{contrastLength}}</div>
                <div class="title">对比</div>
              </div>
              <div class="item" @click="link('/cart')">
                <div class="num">{{cartListLength ||0}}</div>
                <div class="title">购物车</div>
              </div>
              <div class="item" @click="link('/footprint')">
                <div class="num">{{fromData.goods_browse_num||0}}</div>
                <div class="title">足迹</div>
              </div>
            </div>
            <!-- <div class="backGray"></div> -->
            <ds-head name="我买的钻石" border-all="false" more-name="查看全部" @tap="orderList('/diamondOrder',0,0)"></ds-head>

            <div class="order-status">
              <div class="item" @click="orderList('diamondOrder',0,1)">
                <icon font-name="icon-daifukuan" size="55" color="#999"></icon>
                <div class="title">待付款</div>
              </div>
              <div class="item" @click="orderList('diamondOrder',0,2)">
                <icon font-name="icon-zuanshi-" size="55" color="#999"></icon>
                <div class="title">待检测</div>
              </div>
              <div class="item" @click="orderList('diamondOrder',0,3)">
                <icon font-name="icon-daifahuo" size="55" color="#999"></icon>
                <div class="title">待发货</div>
              </div>
              <div class="item" @click="orderList('diamondOrder',0,4)">
                <icon font-name="icon-wuliu" size="55" color="#999"></icon>
                <div class="title">待签收</div>
              </div>
              <div class="item" @click="orderList('diamondOrder',0,5)">
                <icon font-name="icon-dingdan" size="55" color="#999"></icon>
                <div class="title">已完成</div>
              </div>
            </div>
            <!-- <div class="backGray"></div> -->
            <ds-head name="我卖的钻石" border-all="false" more-name="查看全部" @tap="orderList('/diamondOrder',1,0)"></ds-head>
            <div class="order-status">
              <div class="item" @click="orderList('diamondOrder',1,1)">
                <icon font-name="icon-shenhe1" size="55" color="#999"></icon>
                <div class="title">审核中</div>
              </div>
              <div class="item" @click="orderList('diamondOrder',1,2)">
                <icon font-name="icon-zuanjie" size="55" color="#999"></icon>
                <div class="title">展示中</div>
              </div>
              <div class="item" @click="orderList('diamondOrder',1,3)">
                <icon font-name="icon-songhuoshijian1" size="55" color="#999"></icon>
                <div class="title">待送检</div>
              </div>
              <div class="item" @click="orderList('diamondOrder',1,4)">
                <icon font-name="icon-jiaoyizhongxin-01" size="55" color="#999"></icon>
                <div class="title">交易中</div>
              </div>
              <div class="item" @click="orderList('diamondOrder',1,5)">
                <icon font-name="icon-dingdan" size="55" color="#999"></icon>
                <div class="title">已完成</div>
              </div>
            </div>
            <ds-head name="我的钱包" border-all="false" @tap="link('/wallet')">
              <span class="my-wallet">￥{{fromData.available_predeposit||'0.00'}}</span>
            </ds-head>
            <ds-head name="我的投诉/反馈" border-all="false" more-name="" @tap="link('/complaint')"></ds-head>
            <ds-head name="我的收藏" border-all="none" more-name="" @tap="link('/collection')"></ds-head>
            <div class="backGray"></div>

            <ds-head name="精选推荐" @tap="link('/diamondsList')"></ds-head>
            <slide ref="slide" slide :list="goodsList" @addordel="addordel" @addCart="addCart"></slide>
            <!--<ds-cell title="登陆" link="/login" icon="icon-icon6"></ds-cell>-->
            <!--<ds-cell title="镶嵌服务" link="/lnlayService" icon="icon-icon6"></ds-cell>-->
          </div>
        </cube-scroll>
      </div>

    </page>
    <ds-footer></ds-footer>
  </div>
</template>
<script>
  import { mapState, mapMutations } from 'vuex'
  import { CONTRASTLIST } from '../../store/mutations/mutations-types'
  import { GoodsList, CartAdd, Unread, Member, StoreInfo } from '../../assets/js/api'
  import scroll from '../../components/module/Scroll/Scroll'

  function required (val) {
    if (val instanceof Array) {
      return val.length > 0
    }
    return val !== undefined && val !== null && (val + '').trim() !== ''
  }

  export default {
    name: 'profile',
    data () {
      return {
        fristOff: true,
        goodsList: [],
        cartListLength: 0,
        fromData: {},
        loginStatus: true,
        badge: null,
        messgeNum: 0,
        is_person: ''
      }
    },
    activated () {
      if (this.key) {
        this.getUserInfo()
        this.getUnread()
        this.storeData()
      } else {
        this.fromData = {}
        this.cartListLength = 0
      }
    },
    created () {
      this.getGoddsList()
    },
    mounted () {
    },
    methods: {
      ...mapMutations([CONTRASTLIST]),
      tolink (url) {
        this.$router.push(url)
      },
      async getUserInfo () {
        let obj = this.fristOff ? {show: true, type: 'mini'} : {}
        let json = await this.$http.get(Member, {}, obj)
        if (json.code === 200) {
          this.fromData = json.datas
          this.progressWidth()
          this.cartListLength = json.datas.cart_count
          this.fromData.member_avatar = json.datas.member_avatar + `?time=${Math.random()}`
          this.fristOff = false
          this.badge = json.datas.badge
        }
      },
      async getUnread () {
        let json = await this.$http.get(Unread, {}, {})
        if (json.code === 200) {
          let num = parseInt(json.datas)
          this.messgeNum = num
        }
      },
      async getGoddsList () {
        let json = await this.$http.get(GoodsList, {type: 'recommend'}, {})
        if (json.code === 200) {
          this.goodsList = json.datas.goods_list
        }
      },
      async storeData () {
        let json = await this.$http.post(StoreInfo, {}, {})
        if (json.code === 200 && required(json.datas)) {
          this.is_person = json.datas.is_person
        }
      },
      progressWidth () {
        let {progressBox, progressItem} = this.$refs
        let {member_points, upgrade_exppoints} = this.fromData
        let averageVal = parseInt(upgrade_exppoints) / progressBox.clientWidth
        let progressItemWidth = parseInt(member_points) / averageVal
        progressItem.style.width = `${progressItemWidth}px`
      },
      link(url){
        this.$router.push(url)
      },
      detail () {
        let url = this.is_person !== ''? '/certificationDetails':'/enterpriseCertification'
          this.$router.push({path:url})
      },
      orderList (path, types, index) {
        this.$router.push({path, query: {types, index}})
      },
      addordel (id) {
        let item = this.goodsList.filter((i) => i.goods_id === id)[0].affiliated
        console.log(item)
        this[CONTRASTLIST](item)
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
          this.cartListLength += 1
        }
      },
      memberRating(){
        let code = this.userinfo.invitation_code
        this.$router.push({path:'/memberRating',query:{code}})
        console.log(code)
      },
    },
    computed: {
      ...mapState(['userinfo', 'key']),
      level () {
        return this.userinfo.level_name.replace('V', '')
      },
      contrastLength () {
        if (!this.$store.state.contrastList.list) return 0
        return this.$store.state.contrastList.list.length
      }
    },
    components: {
      'cube-scroll': scroll,
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/css/icon.css';
  @import '../../assets/css/mixin';
  @import '../../assets/css/module';
  @import "../../assets/css/variables";

  .header {
    width: 100%;
    height: 5.722rem;
    position: relative;
    z-index: 10;
    /*background: url('../../assets/imgs/proBg.png') no-repeat;*/
    /*background-size: 100% 100%;*/
    .backGroud {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
    .enterprise {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      width: pxTorem(139);
      height: pxTorem(47);
      font-size: pxTorem(24);
      color: #fff;
      text-align: center;
      line-height: pxTorem(47);
      border-top-left-radius: pxTorem(23);
      border-bottom-left-radius: pxTorem(23);
      background: rgba(0, 0, 0, 0.3);
    }
    .menu_icon {
      position: relative;
      display: flex;
      justify-content: space-between;
      padding: 0 0.3rem;
      z-index: 100;
      .icon {
        padding: 0.1rem 0.2rem;
        position: relative;
        i {
          font-size: pxTorem(40);
          color: #999999;
        }
        span {
          position: absolute;
          width: pxTorem(12);
          height: pxTorem(12);
          background: #ee0b24;
          border-radius: 50%;
          top: pxTorem(24);
          right: pxTorem(8);
        }
      }
    }
    .header-wraper {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      .content {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        text-align: center;
        line-height: 1.3;
        font-size: pxTorem(30);
        color: #141317;
        margin-bottom: pxTorem(30);
        .content-userinfo {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        .head-box {
          width: pxTorem(118);
          height: pxTorem(118);
          background: #ccc;
          border-radius: 50%;
          margin-bottom: pxTorem(18);
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .icon-group {
          display: flex;
          align-items: center;
          .badge {
            width: pxTorem(50);
            height: pxTorem(50);
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .lv {
          display: flex;
          align-items: center;
          margin-top: pxTorem(10);

          .icon {
            display: flex;
            position: relative;
            margin-right: pxTorem(13);
            .icon-v {
            }
            .lv-num {
              display: flex;
              align-items: flex-end;
              margin-left: pxTorem(-10);
              color: #bd081c;
              font-size: pxTorem(24);
            }
          }
          .progress-box {
            width: pxTorem(280);
            height: pxTorem(8);
            background: #dad8de;
            border-radius: 10px;
            overflow: hidden;
            .progress-item {
              /*width: 50%;*/
              height: 100%;
              background: #bd081c;
            }
          }
        }
      }
      .login {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        .tip {
          font-size: pxTorem(36);
        }
      }
    }
  }

  .box {
    background: #fff;
    .my-wallet {
      padding-right: pxTorem(10);
      font-size: pxTorem(34);
      color: #bd081c;
    }
    .class-fication {
      border-bottom: pxTorem(18) #f5f5f5 solid;
      @include fja(center, center);
      .item {
        position: relative;
        padding: 0.3rem 0;
        &:nth-child(2)::after {
          content: '';
          position: absolute;
          top: pxTorem(25);
          bottom: pxTorem(25);
          left: 0;
          width: 1px;
          background: #dbdbdb;
        }
        &:nth-child(2)::before {
          content: '';
          position: absolute;
          top: pxTorem(25);
          bottom: pxTorem(25);
          right: 0;
          width: 1px;
          background: #dbdbdb;
        }
        flex: 1;
        @include fja(center, center);
        flex-direction: column;
        .num {
          color: #bd081c;
          font-size: pxTorem(36);
        }
        .title {
          font-size: pxTorem(26);
          color: #292929;
        }
      }
    }
    .order-status {
      @include fja(center, center);
      padding: pxTorem(28) 0.12rem;
      border-bottom: pxTorem(18) #f5f5f5 solid;
      .item {
        @include fja(center, center);
        flex-direction: column;
        flex: 1;
        img {
          width: 0.6rem;
          height: 0.6rem;
        }
        .title {
          font-size: pxTorem(26);
          color: #191919;
          margin-top: pxTorem(18);
        }
      }
    }
  }

  .backGray {
    height: pxTorem(18);
  }
</style>
