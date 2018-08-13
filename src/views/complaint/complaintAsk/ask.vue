<template>
  <div class="">
    <ts-header back title="投诉"></ts-header>
    <page>
      <div class="wrapper">
        <div class="top">
          <div class="head">
            <img :src="list.affiliated.img_url" alt="">
          </div>
          <div class="head-content">
            <p class="title">{{list.goods_info.goods_name}}</p>
            <p>证书编号：{{list.affiliated.report_no}}</p>
          </div>
        </div>
        <div class="info-box">
          <div class="info-title">
            请选择投诉问题的类型
          </div>
          <ul class="info-content">
            <li v-for="(item,index) in inform" :key="index">
              <label :for="'id'+item.inform_subject_id" class="border-1px">
                <p>{{item.inform_subject_type_name}}</p>
                <div class="radio">
                  <div class="label " :class="item.inform_subject_id ===  fromData.inform_subject ?'active':''">
                    <input :id="'id'+item.inform_subject_id " type="radio" :value="item.inform_subject_id"
                           v-model="fromData.inform_subject">
                  </div>
                </div>
              </label>
            </li>

          </ul>

        </div>
        <div class="info-box">
          <div class="info-title">
            问题描述
          </div>
          <div class="info-content-box">
            <textarea class="" v-model="fromData.inform_content" @input="textarea"
                      placeholder="请填写10个字以上的问题描述以便我们提供更好的帮助"></textarea>
            <p>{{num}}/200</p>
          </div>

        </div>
        <div class="autoHeight" style="background-color: #fff;margin-top: 0.2rem">
          <div class="content-item">
            <span class="name">图片(选填，请提供问题截图)</span>

            <div class="" style="padding-right: 0.2rem">
              {{localImage.length}}/3
            </div>
          </div>
          <ul class="content">
            <li class="img" v-for="(item,index) in localImage" :key="index">
              <div class="img-box">
                <div class="img-item">
                  <icon font-name="icon-shanchu21" size="40" color="#c3c3c3" @click="deleteImg(index)"></icon>
                  <img :src="item.url" alt="">
                </div>
              </div>
            </li>
            <li class="img" v-show="localImage.length<3">
              <div class="img-box">
                <div class="img-item add" @click="prod===true?addImg($event,'image_all'):''">
                  <input v-show="!prod" ref="uload" type="file" id="upload"
                         style="position:absolute;width: 100%;height: 100%;opacity: 0"
                         accept="image/png, image/jpeg, image/gif, image/jpg"
                         @change="addImg($event,'image_all')">
                  <icon font-name="icon-jiahao" size="70" color="#c3c3c3"></icon>
                </div>
              </div>
            </li>
          </ul>
          <!--<div class="footer-tip">-->
          <!--出售钻石时请将购买凭证及发票与钻石一同送检-->
          <!--</div>-->
        </div>
        <div class="button">
          <ds-button type="primary" size="large" @click="next">提交</ds-button>
        </div>
      </div>
    </page>
  </div>
</template>

<script>
  import { dataURLtoBlob, get_suffix } from '../../../utils/currency'
  import { InformSubject, GoodsDetail, GetToken, HttpImgUrl, InformSave } from '../../../assets/js/api'

  export default {
    name: 'complaintAsk',
    data () {
      return {
        picker: '',
        inform: [],
        list: {
          goods_info: {},
          spec_image: [],
          affiliated: {}
        },
        fromData: {
          inform_content: '',
          inform_subject: '',
          inform_goods_id: '',
          inform_pic: []
        },
        num: 0,
        localImage: []
      }
    },

    mounted () {},
    created () {
      let id = this.$route.query.goods_id
      this.getInformSubject()
      this.getGoodsDetail(id)
    },
    methods: {
      async next () {
        let inform_pic = this.fromData.inform_pic.join()
        let {inform_content, inform_subject, inform_goods_id} = this.fromData
        if (inform_subject) {
          let obj = {inform_content, inform_subject, inform_goods_id, inform_pic}
          let json = await this.$http.post(InformSave, {post: obj}, {}, {show: true, type: 'mini'})
          if (json.code === 200) {
            this.$toast('提交成功')
            setTimeout(() => {
              this.$router.replace({path: '/complaint'})
            }, 1000)
          }
        }else{
          this.$toast('请选择投诉问题的类型')
        }

      },
      // 获取文本域字数
      textarea () {
        console.log(this.fromData.inform_content.length > 200)
        if (this.fromData.inform_content.length > 200) {
          this.fromData.inform_content = this.fromData.inform_content.substr(0, 200)
        }
        this.num = this.fromData.inform_content.length
      },
      // 请求分类
      async getInformSubject () {
        let InformSubjectData = await this.$http.get(InformSubject, {})
        if (InformSubjectData.code === 200) {
          this.inform = InformSubjectData.datas
        }
      },
      // 获取商品详情
      async getGoodsDetail (goods_id) {
        this.fromData.inform_goods_id = goods_id
        let GoodsDetailtData = await this.$http.get(GoodsDetail, {
          goods_id
        })
        if (GoodsDetailtData.code === 200) {
          this.list = GoodsDetailtData.datas
        }
      },
      async addImg (e) {
        let self = this
        if (this.prod) {
          plus.gallery.pick((p) => {
            plus.zip.compressImage({
              src: p,
              dst: '_doc/kkc.jpg',
              overwrite: true,
              quality: 70,
              width: 'auto',
              height: 'auto',
              rotate: 0
            }, (i) => {
              plus.nativeUI.showWaiting()
              let reader = new window.plus.io.FileReader()
              reader.onloadend = function (e) {
                let blob = dataURLtoBlob(e.target.result)
                self.getGetTokenData(blob, p)
              }
              reader.readAsDataURL(i.target)
            })
          }, (e) => { plus.nativeUI.alert(e)}, {filter: 'image'})
        } else {
          let file = e.target.files[0]
          let filesName = file.name
          if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
            this.$toast('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
            return false
          }
          let oFReader = new FileReader()
          oFReader.readAsDataURL(file)
          oFReader.onload = async (oFREvent) => {
            const noCropAvatar = oFREvent.target.result
            let blob = dataURLtoBlob(noCropAvatar)
            this.getGetTokenData(blob, filesName)
          }
        }
      },
      async getGetTokenData (file, filesName) {
        let getGetTokenData = await this.$http.get(GetToken, {
          type: 'auth'
        })
        if (getGetTokenData.code === 200) {
          this.plusUpload(getGetTokenData, file, filesName)
        }
      },
      // 上传操作
      async plusUpload (resData, file, filesName) {
        let suffix1 = get_suffix(filesName)
        await this.$http.post(resData.datas.host, {
          key: resData.datas.dir + suffix1,
          policy: resData.datas.policy,
          success_action_status: '200',
          OSSAccessKeyId: resData.datas.accessid,
          signature: resData.datas.signature,
          callback: resData.datas.callback,
          file,
        }).then((res) => {
          console.log(res)
          this.fromData.inform_pic.push(res.filename)
          this.localImage.push({url: HttpImgUrl + res.filename})
          if ($prod) {
            plus.nativeUI.closeWaiting()
          }
        })
      },
      deleteImg (index) {
        this.fromData.inform_pic.splice(index, 1)
        this.localImage.splice(index, 1)
      },

    },

    components: {},
    computed: {
      prod () {
        return $prod
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../assets/css/icon.css';
  @import '../../../assets/css/mixin';
  @import "../../../assets/css/upload";

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
        background: #ccc;
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
      .info-title {
        font-size: pxTorem(26);
        color: #999999;
        padding: pxTorem(22) pxTorem(30);
      }
      .info-content {
        background: #fff;
        li {
          label {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            // padding: 0 pxTorem(30);
            margin: 0 pxTorem(30);
            height: pxTorem(88);
            font-size: pxTorem(28);
            color: #2a2a2a;
            .radio {
              display: flex;
              justify-content: flex-end;
              align-items: center;
              width: pxTorem(88);
              height: 100%;
              box-sizing: border-box;
              .label {
                position: relative;
                display: block;
                width: pxTorem(50);
                height: pxTorem(50);
                border-radius: 50%;
                border: 1px #c1c1c1 solid;
                box-sizing: border-box;
                &.active {
                  border: 1px #bd081c solid;
                }
                &.active::after {
                  content: '';
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  // margin:0 auto;
                  // top: 0px;
                  // right: 0;
                  // bottom: 0;
                  // left: 0px;
                  width: pxTorem(20);
                  height: pxTorem(20);
                  background: #bd081c;
                  border-radius: 50%;
                  // box-sizing: border-box;
                }
              }
            }
            &:last-child:after {
              height: 0;
            }
            &:after {
              content: '';
              position: absolute;
              bottom: 0;
              left: pxTorem(30);
              right: pxTorem(30);
              height: 1px;
              background: #dedede;
            }
          }
        }
      }
      .info-content-box {
        padding: pxTorem(30);
        width: 100%;
        font-size: pxTorem(26);
        line-height: 1.5;
        color: #999999;
        background: #fff;
        border: none;
        textarea {
          width: 100%;
          min-height: pxTorem(180);
          border: none;
        }
        p {
          text-align: right;
        }
      }
    }
    .bottom-img {
      margin-top: pxTorem(25);
      padding: pxTorem(25) pxTorem(10);
      width: 100%;
      background: #fff;
      .img-num {
        float: right;
      }
    }
    .button {
      padding: pxTorem(50) pxTorem(30);
    }
  }
</style>
