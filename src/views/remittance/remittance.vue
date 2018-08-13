<template>
  <div class="">
    <ts-header title="汇款转账" back></ts-header>
    <page>
      <div class="wrap">
        <div class="money-tip">
          <div class="top">
            <div class="title">订单金额：</div>
            <div class="money-num">￥{{info.amount}}</div>
          </div>
          <div class="bottom">

          </div>
        </div>

        <div class="content">
          <div class="top border-1px">
            <div class="title">你可以使用手机银行、网银转账或银行柜台汇款</div>
            <div class="account account-title">账户名称：{{info.account_name}}</div>
            <div class="account account-num">账号：{{info.bank_account}}</div>
            <div class="account opening-bank">开户行：{{info.bank_of_deposit}}</div>
          </div>
          <div class="bottom">
            <!--<uploader :show="true" title="上传汇款凭证">-->
            <!--</uploader>-->
            <div class="autoHeight border-1px">
              <h4>上传汇款凭证</h4>
              <ul class="contents">
                <li class="img">
                  <div class="img-box">
                    <div class="img-item add" @click="prod===true?addImg('',0):''">
                      <input v-show="!prod" ref="uload" type="file" id="upload"
                             style="position:absolute;width: 100%;height: 100%;opacity: 0"
                             accept="image/png, image/jpeg, image/gif, image/jpg" @change="addImg($event,0)">
                      <img :src="localImage" alt="" v-show="localImage!==''"/>
                      <!--<img :src="localImage[0].url" alt="" >-->
                      <icon font-name="icon-jiahao" size="70" color="#c3c3c3" v-show="localImage===''"></icon>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div class="submit">
              <ds-button type="primary" size="large" @click="next">下一步</ds-button>
            </div>
          </div>
        </div>

        <div class="remittance-explain">
          <div class="item">付款须知</div>
          <div class="item">1、请务必在汇款时将订单编号填到备注中</div>
          <div class="item">2、汇款转账完成后，请到“我的”-“我买的钻石”，找到对应的订单，点击“确认汇款”完成操作。确认后我们会审核您的汇款，审核通过后通知卖家发货。</div>
          <div class="item">3、如果检测未通过，退款到该账户的钱包</div>
        </div>
      </div>
    </page>
  </div>
</template>

<script>
  import uploader from '../../components/module/Uoloader/Uoloader'
  import { TransferPay, GetToken } from '../../assets/js/api'
  import { dataURLtoBlob, get_suffix } from '../../utils/currency'

  export default {
    data () {
      return {
        info: {},
        localImage: '',
        time: 1800,
        cInterval:null,
        fromData: {
          pay_sn: '',
          payment_img: ''
        }
      }
    },
    created () {
      this.info = this.$route.params.info
      this.fromData.pay_sn = this.$route.params.info.pay_sn
    },
    mounted(){
      this.timeChange()
    },
    methods: {
      timeChange () {
        this.cInterval = window.setInterval(() => {
          this.time = this.time-1
          if(this.time===0){
            window.clearInterval(this.cInterval);
            this.cInterval = null;
          }
        }, 1000);
      },
      async next () {
        let json = await this.$http.post(TransferPay, {post: this.fromData}, {}, {show: true, type: 'mini'})
        if (json.code === 200) {
          this.$router.replace({name: 'diamondOrder', params: {type: 0, id: 0}})
        }
      },
      addImg (e) {
        let self = this
        if (this.prod) {
          plus.gallery.pick((p) => {
            plus.nativeUI.showWaiting()
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
                self.localImage[num].url = ''
                self.getGetTokenData(blob, p)
                self.localImage[num].url = p
              }
              reader.readAsDataURL(i.target)
            })
            //
            //
            //
            // self.convertImgToDataURLviaCanvas(p, (blob) => {
            //   self.localImage[num].url = ''
            //   self.getGetTokenData(blob, p)
            //   self.localImage[num].url = p
            // })
          }, (e) => { plus.nativeUI.alert(e)}, {filter: 'image'})
        } else {
          let file = e.target.files[0]
          let filesName = file.name
          if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
            alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
            return false
          }
          let oFReader = new FileReader()
          oFReader.readAsDataURL(file)
          oFReader.onload = async (oFREvent) => {
            const noCropAvatar = oFREvent.target.result
            let blob = dataURLtoBlob(noCropAvatar)
            this.getGetTokenData(blob, filesName)
            this.localImage = noCropAvatar
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
      async plusUpload (resData, file, filesName) {
        let suffix1 = get_suffix(filesName) //文件后缀  例如   .jpg
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
          this.fromData.payment_img = res.filename
          if ($prod) {
            plus.nativeUI.closeWaiting()
          } else {
            this.$toast('上传成功')
          }
        })
      },
    },
    components: {
      uploader
    },
    beforeDestroy(){
      window.clearInterval(this.cInterval);
      this.cInterval = null;
    },
    computed: {
      prod () {
        return $prod
      },
      minute(){
        return parseInt(this.time/60);
      },
      second(){
        return parseInt(this.time%60);
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/mixin";
  @import "../../assets/css/variables";

  .wrap {
    background-color: #f5f5f5;
    .money-tip {
      background: #fff;
      @include fja(center, flex-start);
      flex-direction: column;
      .top {
        padding: pxTorem(38) pxTorem(32) pxTorem(28) pxTorem(32);
        @include fja();
        font-size: pxTorem(28);
        .title {
          color: #191919;
        }
        .money-num {
          color: $themeColor;
        }
      }
      .bottom {
        padding: 0 pxTorem(32) pxTorem(38) pxTorem(32);
        font-size: pxTorem(26);
        color: #a1a5a8;
      }
    }
    .content {
      margin-top: pxTorem(20);
      height: pxTorem(700);
      background-color: #ffffff;
      .top {
        margin: 0 pxTorem(32);
        @include fja(center, flex-start);
        flex-direction: column;
        .title {
          padding-top: pxTorem(36);
          font-size: pxTorem(28);
          color: #191919;
        }
        .account {
          padding-top: pxTorem(28);
          font-size: pxTorem(26);
          color: #7a7a7a;
        }
        .opening-bank {
          padding-bottom: pxTorem(36);
        }
      }
      .bottom {
        .submit {
          padding: 0 pxTorem(28);
        }
      }
    }
    .remittance-explain {
      padding: 0 pxTorem(36);
      font-size: pxTorem(26);
      color: #878787;
      .item {
        line-height: pxTorem(50);
        &:first-child {
          padding-top: pxTorem(20);
        }
        &:last-child {
          padding-bottom: pxTorem(20);
        }
      }
    }
  }

  .autoHeight {
    height: auto;
    h4 {
      color: #191919;
      font-size: pxTorem(26);
      padding: pxTorem(12) pxTorem(26);
    }
    .contents {
      display: flex;
      flex-wrap: wrap;
      padding: pxTorem(10) pxTorem(20);
      .img {
        position: relative;
        flex-shrink: 0;
        width: 20%;
        height: 0;
        padding-top: 20%;
        .img-box {
          position: absolute;
          top: 0;
          left: 0;
          padding: pxTorem(10);
          width: 100%;
          height: 100%;
          .close-icon {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            right: 0;
            top: 0;
            width: pxTorem(40);
            height: pxTorem(40);
            background: rgba($color: #000000, $alpha: 0.5);
            border-radius: 50%;
            z-index: 999;
          }
          .img-item {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            border: 1px #c3c3c3 solid;
            border-radius: pxTorem(16);
            overflow: hidden;
            .input-file {
              position: absolute;
              z-index: -1;
              opacity: 0;
            }
            img {
              width: 100%;
              height: 100%;
              border-radius: pxTorem(8);
            }
            &.add {
              border: 1px #c3c3c3 dashed;
            }
          }
        }
      }
      .shenfenzheng {
        position: relative;
        width: 50%;
        height: pxTorem(230);
        padding: pxTorem(10);
        .img-box {
          display: block;
          position: relative;
          width: 100%;
          height: 100%;
          border: 1px #c3c3c3 dashed;
          border-radius: pxTorem(16);
          overflow: hidden;
          .add-img-box {
            width: 100%;
            height: 100%;
            background: #fff;
            img {
              width: 100%;
              padding: 0;
              height: 100%;
            }
          }
          input {
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
            opacity: 0;
          }
          .img-item {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #666;
          }
          img {
            width: 100%;
          }
        }
      }
    }
  }
</style>
