<template>
  <div class="">
    <ts-header title="乐检学院"></ts-header>
    <page>
      <div class="wrapper">
        <div class="box-wrapper">
          <!--<div class="search">-->
            <!--<div class="box" @click="toasts">-->
              <!--<div class="content">-->
                <!--&lt;!&ndash;<i class="iconfont icon-search"></i>&ndash;&gt;-->
                <!--<icon font-name="icon-search" size="32" color="#9d9d9d"></icon>-->
                <!--<span>搜索</span>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
          <div class="box-wrap">
            <div class="tab">
              <div class="item" :class="{'current':tabindex=== '0'}" @click="tab('0')">
                <i class="iconfont  icon-zhishi"></i>
                <span>知识</span>
              </div>
              <div class="item" :class="{'current':tabindex==='1'}" @click="tab('1')">
                <i class="iconfont icon-zixun"></i>
                <span>资讯</span>
              </div>
              <div class="item " :class="{'current':tabindex==='2'}" @click="tab('2')">
                <i class="iconfont  icon-banshizhinan"></i>
                <span>指南</span>
              </div>
            </div>
          </div>
          <div class="box-content">
            <keep-alive>
              <college-list :listData="knowledge" v-if="tabindex=== '0'"></college-list>
            </keep-alive>
            <div v-if="tabindex=== '1'" class="consultation">
              <Refresh @refresh="refresh" @loadmore="loadmore($event)">
                <div v-for="(item, index) in information" v-bind:key='index' class="consultation-item border-1px" @click="detail(item.article_id)">
                  <div class="head">
                    <img :src="item.article_img" alt="">
                  </div>
                  <div class="content">
                    <div class="title">{{item.article_title}}</div>
                    <div class="time">{{item.article_time}}</div>
                  </div>
                  <div class="icon">
                    <icon font-name="icon-fanhui" size='30' color="#b4b4b4"></icon>
                  </div>
                </div>
              </Refresh>
            </div>
            <keep-alive>
              <college-list :listData="guide" v-if="tabindex=== '2'"></college-list>
            </keep-alive>
          </div>

        </div>

      </div>
    </page>
    <!--<router-view class="router"></router-view>-->
    <ds-footer></ds-footer>
  </div>
</template>
<script>
import Refresh from '../../components/module/Refresh/Refresh'
import CollegeList from '../../components/uiModule/CollegeList/CollegeList'
import { ArticleList } from '../../assets/js/api'

export default {
  name:'college',
  data() {
    return {
      tabindex: '1',
      knowledge: [],
      guide: [],
      information: [],
      page: 1,
      isLoad: true
    }
  },
  created() {
    this.getArticleListList(true)
  },
  mounted() {},
  methods: {
    detail(id) {
      this.$router.push({path: '/articleDetails', query: {id}})
    },
    tab(index) {
      // console.log(index);
      this.tabindex = index

      if (index === '1') {
        this.getArticleListList()
        return
      }
      if (this.knowledge.length === 0 || this.guide.length === 0) {
        this.getArticleListList()
      }
    },
    refresh(loaded) {
      this.page = 1
      this.getArticleListList(true)
      loaded.loaded('done')
    },
    loadmore(loaded) {
      if (this.isLoad) {
        this.getArticleListList(false)

        loaded.loaded('done')
        console.log(1111)
      } else {
        loaded.loaded('fail')
        console.log(2222)
      }
    },
    toasts() {},
    async getArticleListList(type) {
      let data = {}

      if (this.tabindex === '0') {
        data = {
          type: 'knowledge'
        }
      } else if (this.tabindex === '2') {
        data = {
          type: 'guide'
        }
      } else {
        data = {
          type: 'information',
          page: this.page
        }
      }
      let getArticleListList = await this.$http.get(ArticleList, data)
      if (getArticleListList.code === 200) {
        if (this.tabindex === '0') {
          this.knowledge = getArticleListList.datas
        } else if (this.tabindex === '2') {
          this.guide = getArticleListList.datas
        } else {
          let newData = this.information
          let page_total = getArticleListList.datas.page_total
          let current_page = getArticleListList.datas.current_page
          if (type) {
            newData = []
            this.isLoad = true
          }
          // 已经是最后一页了
          if (page_total === current_page) {
            this.isLoad = false
            this.information = [
              ...newData,
              ...getArticleListList.datas.article_list
            ]
            return
          } else {
            this.page++
          }
          this.information = [
            ...newData,
            ...getArticleListList.datas.article_list
          ]
        }
      }
    }
  },
  components: {
    CollegeList,
    Refresh
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin';
@import '../../assets/css/icon.css';
.wrapper {
}
.box-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
   background: #fff;
  .search {
    flex-shrink: 0;
    height: pxTorem(100);
    @include fja(center, center);
    .box {
      width: 9rem;
      height: 1rem;
      background: #fff;
      border-radius: 5px;
      @include fja(center, center);
      .content {
        @include fja(space-between, center);
        padding: 0.1rem 0.3rem;
        .iconfont {
          font-size: 0.6rem;
          color: #9d9d9d;
        }
        span {
          margin-left: 0.1rem;
          font-size: pxTorem(28);
          color: #9c9c9c;
          line-height: 1.5;
        }
      }
    }
  }
  .box-wrap {
    border-bottom: 1px #e0e0e0 solid;
    flex-shrink: 0;
    background: #f8f8f8;
    // height: 100%;
    .tab {
      margin-top: pxTorem(6);
      @include fja(center, center);
      .item {
       padding-bottom: 0.1rem;
        flex: 1;
        box-sizing: border-box;
        @include fja(center, center);
        .iconfont {
          font-size: 0.4rem;
          color: inherit;
        }
        span {
          font-size: pxTorem(28);
          margin-left: 0.1rem;
          color: inherit;
        }
        &.current {
          color: #bd081c;
          border-bottom: 2px #bd081c solid;
        }
      }
    }
  }
  .box-content {
    position: relative;
    height: 100%;
    overflow: hidden;

    // border: 1px red solid;
    .consultation {
      position: relative;
      height: 100%;
      overflow: hidden;
      // background: #fff;

      .consultation-item {
        display: flex;
        align-items: center;
        font-size: pxTorem(30);
        color: #191919;
        padding: pxTorem(20) 0;
        margin: 0 pxTorem(25);
        box-sizing: border-box;

        .head {
          flex-shrink: 0;
          width: pxTorem(120);
          height: pxTorem(120);
          img {
            width: 100%;
            height: 100%;
          }
        }
        .content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-left: pxTorem(30);
          width: 100%;
          height: pxTorem(120);
          overflow: hidden;
          .title {
            font-size: 0.37333rem;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
          .time {
            font-size: pxTorem(22);
            color: #a1a5a8;
          }
        }
        .icon {
          flex-shrink: 0;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          width: pxTorem(40);
          height: pxTorem(120);
        }
      }
    }
  }
}
</style>
