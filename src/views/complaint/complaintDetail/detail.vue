<template>
  <div class="">
    <ts-header back title="投诉详情"></ts-header>
    <page>
      <div class="wrapper">
        <div class="top">
          <div class="head">
            <img :src="HttpImgUrl+goods_info.goods_image" alt="">
          </div>
          <div class="head-content">
            <p class="title">{{goods_info.goods_name}}</p>
            <p>证书编号：1252123365</p>
          </div>
        </div>
        <div class="info-box">
          <div class="info-title">
            {{inform_info.inform_subject_content}}
          </div>
          <div class="info-content">
            问题描述：{{inform_info.inform_content||'您没有填写具体描述'}}
          </div>
          <ul class="detail-img" v-if="inform_info.inform_pic1">
            <li>
              <div class="img-box">
                <div class="img-item">
                  <img :src="HttpImgUrl+inform_info.inform_pic1" alt="">
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="info-box">
          <div class="info-title">
            官方回复
          </div>
          <div class="info-content">
            问题描述：如果你无法简洁的表达你的想法，那只说明你还 不够了解他。
          </div>
        </div>

      </div>
    </page>
  </div>
</template>

<script>
  import { InformInfo, HttpImgUrl } from '../../../assets/js/api'

  export default {
    data () {
      return {
        goods_info: {},
        inform_info: {},
        HttpImgUrl
        // inform_id: ''
      }
    },
    created () {
      let inform_id = this.$route.query.id
      this.infoDetail(inform_id)
    },
    mounted () {},

    methods: {
      async infoDetail (inform_id) {
        let json = await this.$http.get(InformInfo, {inform_id}, {show: true, type: 'mini'})
        if (json.code === 200) {
          [this.goods_info, this.inform_info] = [json.datas.goods_info, json.datas.inform_info]
        }
      },
    },
    components: {}
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/icon.css";
  @import "../../../assets/css/mixin";

  .wrapper {
    font-size: pxTorem(28);
    .top {
      display: flex;
      align-items: center;
      padding: pxTorem(30) pxTorem(40);
      background: #fff;
      .head {
        width: pxTorem(60);
        height: pxTorem(60);
        img {
          width: 100%;
          height: 100%;
        }
      }
      .head-content {
        margin-left: pxTorem(30);
        font-size: pxTorem(26);
        color: #a1a5a8;

        .title {
          font-size: pxTorem(26);
          color: #2a2a2a;
          margin-bottom: pxTorem(20);
        }
      }
    }
    .info-box {
      margin-top: pxTorem(20);
      background: #fff;
      .info-title {
        padding: pxTorem(30);
        border-bottom: 1px #dedede solid;
      }
      .info-content {
        padding: pxTorem(30);
        min-height: pxTorem(180);
        font-size: pxTorem(26);
        line-height: 1.5;
        color: #999999;
      }
      .detail-img {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        padding: pxTorem(30) pxTorem(15);
        &:after {
          content: "";
          position: absolute;
          top: 0;
          left: pxTorem(30);
          right: pxTorem(30);
          height: 1px;
          background: #dedede;
        }
        li {
          position: relative;
          width: pxTorem(120);
          height: pxTorem(120);
          .img-box {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            padding: pxTorem(15);
            .img-item {
              width: 100%;
              height: 100%;
              border-radius: pxTorem(16);
              img{
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
    }
  }
</style>
