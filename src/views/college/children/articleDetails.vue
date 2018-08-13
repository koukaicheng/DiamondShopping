<template>
  <div class="">
    <ts-header back :title="listDetail.ac_name||'文章详情'" rightIcon="icon-fenxiang" @headerEvent="share"></ts-header>
    <page>
      <div class="wrapper">
        <div class="head">
          <div class="title">{{listDetail.ac_name}}</div>
          <div class="kkc">
            <span>{{listDetail.article_time}}</span>
            <div>
              <icon class="icon" font-name="icon-yanjing" size="32"></icon>
              <span>{{listDetail.article_show}}</span>
            </div>
          </div>
        </div>
        <div class="box-info" v-html="listDetail.article_content" ref="box">
        </div>
      </div>
    </page>
  </div>
</template>
<script>
  import { ArticleShow } from '../../../assets/js/api'
  import {shareMixins} from '../../../utils/mixins'
  export default {
    data () {
      return {
        listDetail: {},
      }
    },
    methods: {
      async getArticleListList (article_id) {
        let getArticleListList = await this.$http.get(ArticleShow, {article_id})
        console.log(getArticleListList)
        if (getArticleListList.code === 200) {
          this.listDetail = getArticleListList.datas
          console.log('我是成功请求了接口的')
        }
      },
      share(){
        if($prod){
          this.shareHref()
        }
      }
    },
    mixins:[shareMixins],
    mounted () {
     setTimeout(()=>{
       let imgAarr = this.$refs.box.getElementsByTagName('img')
       for (let i = 0; i < imgAarr.length; i++) {
         imgAarr[i].style.width = '100%'
       }
     },200)
    },
    created () {
      // console.log(this.$route.params.id)
      this.getArticleListList(this.$route.query.id)
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../assets/css/icon.css';
  @import '../../../assets/css/mixin';

  .kkc {
    @include fja();
    justify-content: space-between;
  }

  .wrapper {
    background: #fff;
    font-size: pxTorem(28);
    .head {
      margin: 0 pxTorem(30);
      padding: pxTorem(25) pxTorem(10);
      border-bottom: 1px #dedede solid;
      color: #a1a5a8;
      .title {
        margin-bottom: pxTorem(25);
        font-size: pxTorem(30);
        color: #030303;
      }
      p {
        .icon {
          margin: 0 pxTorem(10);
        }
      }
    }

    .box-info {
      margin: pxTorem(30) pxTorem(30);
      font-family: 'PingFang-SC-Medium';
      font-size: pxTorem(28);
      line-height: 2;
      letter-spacing: 0px;
      color: #000000;
      overflow: hidden;
    }
  }
</style>
