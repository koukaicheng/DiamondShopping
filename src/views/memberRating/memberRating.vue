<template>
  <div class="">
    <ts-header title="会员等级"
               back></ts-header>
    <page>
      <div>
        <div class="header">
          <div class="header-wraper">
            <div class="content border-1px">
              <div class="head-box">
                <div class="icon">
                  <icon class="icon-v"
                        font-name="icon-vip5"
                        color="#bd081c"
                        size="60"></icon>
                  <span class="lv-num">{{info.level}}</span>
                </div>
              </div>
              <div class="name" v-show="info.feereduce!=='0'">享{{info.feereduce}}折扣</div>

              <div class="lv">
                <div class="progress-box" ref="progressBox">
                  <div class="progress-item" ref="progressItem"></div>
                </div>
              </div>
              <p>当前积分：{{info.less_exppoints}} 提升至下一个等级</p>

            </div>
            <div class="achievement">
              <span class="title">我的成就</span>
              <div class="achievement-box">
                <div class="badge" v-for=" value in info.badge" v-if="value.level!=='0'">
                  <img :src="value.img" alt="">
                </div>
                <!--<div v-for="item in 5"-->
                <!--class="achievement-box-icon">-->
                <!--<icon font-name="icon-_xunzhang_icon"-->
                <!--color="#141317"-->
                <!--size="60"></icon>-->
                <!--</div>-->

              </div>
            </div>
          </div>

        </div>
        <div class="invitation">
          <div class="invitation-box">
            <div class="head-img-box">
              <icon font-name="icon-iconfontyaoqingzhuce"
                    color="#fff"
                    size="55"></icon>
            </div>
            <div class="inv-content">
              <p>邀请新用户注册</p>
              <p class="info">每成功邀请1人奖励200积分</p>
            </div>
            <div class="inv-button">
              <button @click="share">去邀请</button>
            </div>
          </div>
          <div class="invitation-box">

            <div class="head-img-box">
              <icon font-name="icon-goumai"
                    color="#fff"
                    size="55"></icon>
            </div>
            <div class="inv-content">
              <p>邀请新用户购买钻石</p>
              <p class="info">购买订单金额 = 奖励积分数</p>
            </div>
            <div class="inv-button">
              <button @click="share">去邀请</button>
            </div>
          </div>
        </div>
        <div class="list">
          <div class="item border-1px" @click="tolink('/memberRating/pointAgreement')">
            <div class="head">
              <img src="../../assets/imgs/icon/guize.png"
                   alt="">
            </div>
            <p class="title">积分及等级规则</p>
            <div class="right-icon">
              <icon font-name="icon-fanhui"
                    color="#ababab"
                    size="35"></icon>
            </div>
          </div>
          <div class="item" @click="tolink('/upgradeDetails')">
            <div class="head">
              <img src="../../assets/imgs/icon/mingxi.png"
                   alt="">
            </div>
            <p class="title">升级明细</p>
            <div class="right-icon">
              <icon font-name="icon-fanhui"
                    color="#ababab"
                    size="35"></icon>
            </div>
          </div>
        </div>

      </div>

    </page>
    <transition name="slide-child">
      <router-view class="child-route"></router-view>
    </transition>
  </div>
</template>
<script>
  import { MemberRank } from '../../assets/js/api'
  import { shareMixins } from '../../utils/mixins'

  export default {
    data () {
      return {
        info: {}
      }
    },
    mixins:[shareMixins],
    methods: {
      tolink (url) {
        this.$router.push(url)
      },
      async memberNum () {
        let json = await this.$http.get(MemberRank, {}, {show: true, type: 'mini'})
        if (json.code === 200) {
          this.info = json.datas
          this.progressWidth()
        }
      },
      detail (url) {
        this.$router.push(url)
      },
      progressWidth () {
        let {progressBox, progressItem} = this.$refs
        let {member_points, upgrade_exppoints} = this.info
        let averageVal = parseInt(upgrade_exppoints) / progressBox.clientWidth
        let progressItemWidth = parseInt(member_points) / averageVal
        progressItem.style.width = `${progressItemWidth}px`
      },
      share () {
        if ($prod) {
          this.shareHref()
        }
      },
    },
    created () {
      this.memberNum()
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/icon.css";
  @import "../../assets/css/mixin";
  @import "../../assets/css/module";

  .header {
    width: 100%;
    position: relative;
    z-index: 10;
    background-size: 100% 100%;
    font-size: pxTorem(28);
    .header-wraper {
      width: 100%;
      height: 100%;
      background: #fff;
      .content {
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding: pxTorem(40) 0;
        padding-bottom: pxTorem(30);
        margin: 0 pxTorem(25);
        //   width: 100%;
        align-items: center;
        text-align: center;
        line-height: 1.3;
        font-size: pxTorem(30);
        color: #141317;
        //   margin-bottom: pxTorem(30);
        .head-box {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: pxTorem(50);
          .icon {
            position: relative;
            left: pxTorem(15);
            top: pxTorem(20);
            .icon-v {
              position: absolute;
              bottom: pxTorem(-2);
              left: pxTorem(-40);
              margin: auto;
            }
            .lv-num {
              color: #bd081c;
              font-size: pxTorem(40);
            }
          }
        }
        .name {
          color: #bd081c;
        }
        .icon-group {
          display: flex;
          align-items: center;
        }
        .lv {
          margin: pxTorem(25) 0;
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
      .achievement {
        display: flex;
        padding: 0 pxTorem(50);
        .title {
          flex-shrink: 0;
          line-height: pxTorem(117);
        }
        .achievement-box {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          width: 100%;
          margin-left: pxTorem(20);
          .badge {
            width: pxTorem(50);
            height: pxTorem(50);
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }

  .invitation {
    margin-top: pxTorem(45);
    background: #fff;
    font-size: pxTorem(30);
    color: #2c2c2c;
    .invitation-box {
      display: flex;
      align-items: center;
      padding: pxTorem(25) pxTorem(30);
      .head-img-box {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        width: pxTorem(80);
        height: pxTorem(80);
        border-radius: pxTorem(8);
        background: #ffbc02;
      }
      &:last-child {
        .head-img-box {
          background: #01b2c6;
        }
      }
      .inv-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: pxTorem(24);
        width: 100%;
        height: pxTorem(80);
        line-height: 1.3;

        .info {
          font-size: pxTorem(26);
          color: #999;
        }
      }
      .inv-button {
        flex-shrink: 0;
        button {
          width: pxTorem(152);
          height: pxTorem(50);
          line-height: pxTorem(50);
          font-size: pxTorem(24);
          color: #4b4b4b;
          border: 1px #d8d8d8 solid;
          border-radius: pxTorem(8);
          background: #fff;
        }
      }
    }
  }

  .list {
    margin-top: pxTorem(25);
    font-size: pxTorem(28);
    color: #2c2c2c;
    background: #fff;
    .item {
      display: flex;
      align-items: center;
      margin: 0 pxTorem(25);
      padding: 0 pxTorem(28);
      height: pxTorem(100);
      .head {
        flex-shrink: 0;
        width: pxTorem(45);
        height: pxTorem(45);
        img {
          width: 100%;
          height: 100%;
        }
      }
      .title {
        padding-left: pxTorem(40);
        width: 100%;
      }
      .right-icon {
        width: pxTorem(100);
        text-align: right;
      }
    }
  }
</style>
