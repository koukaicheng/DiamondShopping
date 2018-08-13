<template>
  <div class="">
    <Header class="ts-header">
      <div class="ts-wrapper">
        <div class="ts-left" @click="goBack">
          <i class="ts-svg iconfont icon-jiantou"></i>
        </div>
        <div class="middle-title">
          <div class="input-box">
            <div class="search-icon">
              <icon font-name="icon-search" size="32" color="#9c9c9c"></icon>
            </div>
            <input type="search" placeholder="搜索" v-model="keyword" @keyup.enter="search">
          </div>
        </div>
      </div>
    </Header>
    <page>

      <div class="wrapper">

        <!-- 热搜 -->

        <div class="hot-search">
          <div class="hot-box">
            <p class="title">最近搜索</p>
            <ul class="hot-content" v-for="{item,index} in his_list" v-show="his_list.length>0">
              <li>{{item}}</li>
            </ul>
            <ul class="hot-content" v-show="his_list.length===0">
              <li>您最近没有记录</li>
            </ul>
          </div>
          <div class="hot-box">
            <p class="title">热搜</p>
            <ul class="hot-content">
              <li v-for="(item,index) in list" :kek="index" @click="cliSearch(item)">{{item}}</li>
            </ul>
          </div>
        </div>

      </div>

    </page>
  </div>
</template>
<script>
  import { searchKeyList } from '../../assets/js/api'

  export default {
    name: 'search',
    data () {
      return {
        list: [],
        his_list: [],
        keyword: ''
      }
    },
    methods: {
      goBack () {
        this.$router.goBack()
      },
      search () {
        let fromData = {
          keyword: this.keyword,
          is_new: {
            new: true, old: true
          }
        }
        this.$router.push({name: 'diamondsList', params: {fromData}})
      },
      cliSearch (text) {
        this.keyword = text
        this.search()
      },
      async searchList () {
        let json = await this.$http.get(searchKeyList, {});
        [this.list, this.his_list] = [json.datas.list, json.datas.his_list]
      }
    },
    created () {
      this.searchList(0)
    },
    beforeRouteUpdate (to, from, next) {
      console.log(to, from)
      next()
    },
    // beforeRouteLeave  (to, from, next) {
    //   console.log(to, from)
    //   next()
    // },
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/css/mixin';
  @import '../../assets/css/variables';
  @import '../../assets/css/icon.css';

  .iconfont {
    font-size: 0.6rem;
    color: #ababab;
  }

  .ts-header {
    position: relative;
    z-index: $headerZIndex;
    background: #ffffff;
    margin-bottom: 0.03rem;
    box-shadow: 0 0 0 0.03rem #f0f0f0;
    height: pxTorem(100);
    .ts-wrapper {
      .ts-left {
        @include sc(0.3rem, $themeColor);
        color: #3194fb;
        left: 0.24rem;
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        z-index: 999;
        .ts-svg {
          @include wh(0.18rem, 0.36rem);
        }
      }
      .middle-title {
        display: flex;
        align-items: center;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        padding: pxTorem(15) pxTorem(88);
        //   left: 50%;
        //   transform: translate(-50%, 0%);
        .input-box {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          border-radius: pxTorem(8);
          background-color: #f5f5f5;
          .search-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: pxTorem(90);
          }
          input {
            width: 100%;
            height: 100%;
            background: none;
            border: none;
            font-size: pxTorem(28);
          }
        }
      }
    }
  }

  .wrapper {
    .hot-search {
      .hot-box {
        padding: pxTorem(30);
        margin-bottom: pxTorem(20);
        width: 100%;
        color: #757a80;
        background: #fff;
        .title {
          font-size: pxTorem(30);
          color: #030303;
        }
        .hot-content {
          font-size: pxTorem(26);
          li {
            margin-top: pxTorem(15);
          }
        }
      }
    }
    .list-wrapper {
      border-top: 1px solid #dedede;
    }
  }
</style>
