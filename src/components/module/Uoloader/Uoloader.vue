<template>
  <div class="ts-uploader">
    <section class="auth-upload">
      <div class="upload-header">
        <label class="title" :style="{fontSize:labelSize}">{{title}}<span v-show="required===true" class="badge"></span></label>
        <span class="tips" v-text="headTips"></span>
        <slot name="tipBtn"></slot>
      </div>
      <div class="upload-body">
        <ul class="img-preview">
          <li class="img-list" v-for="(data,index) in imgsBase64" :style="{
          background:'url('+getImgUrl(data)+')',
          backgroundPosition:'center center',
          backgroundSize:'cover'}" :key="index">
            <!--<img @click="$emit('deleteImg',index)" v-show="chose" class="delete-icon" src="../../../assets/imgs/delete.png"/>-->
           <div class="icon">
             <icon font-name="icon-shanchu2" size="30" color="#c3c3c3" @click="$emit('deleteImg',index)" v-show="chose"></icon>
           </div>
          </li>
        </ul>
        <div class="camera-btn" @click="$emit('loadImageUpload')" v-show="off">
          <!--<img class="camera-icon" src="../../../assets/imgs/camera.png"/>-->
          <icon font-name="icon-jia" size="70" color="#c3c3c3"></icon>
          <span class="upd-tips" v-text="updTips"></span>
        </div>
      </div>
    </section>
    <p class="upd-warn" v-text="footTips"></p>
  </div>
</template>

<script>
  import {CheckUrl} from '../../../utils/commonUtils'

  export default {
    name: 'Uploader',
    props: {
      title: String,
      headTips: String,
      footTips: String,
      updTips: String,
      required: {type: Boolean, default: true},
      mode: {type: String, default: 'DATA_URL'},
      labelSize: {type: String, default: '.38rem'},
      value: Array,
      off: {type: Boolean, default: true},
      chose: {type: Boolean, default: true}
    },
    data() {
      return {
        imgsBase64: this.value
      }
    },
    methods: {
      getImgUrl(data) {
        if (!CheckUrl(data)) {
          return 'data:image/jpeg;base64,' + data;
        }
        return data;
      }
    },
    watch: {
      value(val) {
        this.imageBase64 = val;
      },
      imageBase64(val) {
        this.emit('input', val);
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/css/variables";
  @import "../../../assets/css/mixin";

  .ts-uploader {
    background-color: #ffffff;
    overflow-x: hidden;
    .auth-upload {
      &:after {
        content: '';
        clear: both;
        display: block;
      }
      .upload-header {
        padding: 0 .28rem .28rem;
        .title {
          @include sc(.28rem, #020202);
          .badge {
            color: #E91321;
          }
        }
        .tips {
          margin-left: .20rem;
          @include sc(pxTorem(26), #7a7a7a);
        }
      }
      .upload-body {
        padding: 0 .36rem;
        margin-right: -.20rem;
        &:after {
          content: '';
          clear: both;
          display: block;
        }
        .img-preview {
          .img-list {
            position: relative;
            border: 1px solid #e5e5e5;
            display: inline-block;
            text-align: right;
            float: left;
            vertical-align: middle;
            margin-right: .20rem;
            margin-bottom: .20rem;
            @include wh(1.60rem, 1.60rem);
            border-radius: 3px;
            .icon{
              position: absolute;
              top: -.64rem;
              left: -.2rem;
            }
          }
        }
        .camera-btn {
          float: left;
          @include fja();
          flex-direction: column;
          @include wh(1.60rem, 1.60rem);
          border: dashed 2px #c3c3c3;
          border-radius: 3px;
          margin-bottom: .20rem;
          &:active {
            background-color: #E5E5E5;
          }
          .camera-icon {
            width: .60rem;
          }
          .upd-tips {
            margin-top: .06rem;
            @include sc(.2333rem, #909090);
          }
        }
      }
    }
    .upd-warn {
      text-align: center;
      padding: .25rem .25rem .20rem;
      @include sc(.26rem, #878787);
    }
  }
</style>
