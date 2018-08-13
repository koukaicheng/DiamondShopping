<template>
  <div class="">
    <ts-header title="钻石信息" back :rightText="rightText" rightColor="#bd081c" @headerEvent="edit"></ts-header>
    <page>
      <div class="wrap">
        <div class="tip-header border-1px">本平台只出售GIA分级的钻石</div>
        <edit-enterprise reportNumS :edit="editStatus" :info="info" :textinfo="textinfo"></edit-enterprise>
        <div class="autoHeight">
          <div class="content-item">
            <span class="name">添加照片</span>
            <span class="tip" v-show="editStatus">请依照范例添加钻石照片</span>
            <div class="look" v-show="editStatus">
              查看范例
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
            <li class="img">
              <div class="img-box">
                <div class="img-item add" v-show="editStatus" @click="prod===true?addImg($event,'image_all'):''">
                  <input v-show="!prod" ref="uload" type="file" id="upload"
                         style="position:absolute;width: 100%;height: 100%;opacity: 0"
                         accept="image/png, image/jpeg, image/gif, image/jpg"
                         @change="addImg($event,'image_all')">
                  <!--<img :src="item" alt="" v-show="localImage.length!==0" v-for="(item,index) in localImage">-->
                  <icon font-name="icon-jiahao" size="70" color="#c3c3c3"></icon>
                </div>
              </div>
            </li>
          </ul>
          <div class="footer-tip">
            出售钻石时请将购买凭证及发票与钻石一同送检
          </div>
        </div>
        <div class="submit" v-show="editStatus">
          <ds-button type="primary" size="large" :disabled="!valid" @click="next()">下一步</ds-button>
        </div>
      </div>
    </page>
  </div>
</template>
<script>
  import editEnterprise from '../../components/uiModule/EditEnterprise/EditEnterprise'
  import verify from '../../utils/verify'
  import { dataURLtoBlob, get_suffix } from '../../utils/currency'
  import { GetToken, GoodsInfo, HttpImgUrl, GoodsEdit } from '../../assets/js/api'

  export default {
    name: 'enterpriseSubmission',
    data () {
      return {
        rightText: '编辑',
        editStatus: false,
        info: {
          // cate_id: 560,
          // cate_name: '珠宝手表 >钻石饰品 >裸钻',
          // g_name: '1234阿萨德发送到123123',
          // b_id: 0,
          // g_price: 1234,
          // g_marketprice: 1234,
          // g_costprice: 1234,
          // g_discount: 100,
          // image_all: [],
          // g_storage: 1,
          // g_alarm: 1,
          // g_body: 1234,
          // m_body: 12345,
          // starttime: '2017-03-27',
          // starttime_H: '00',
          // starttime_i: '05',
          // province_id: 0,
          // freight: 0,
          // plate_top: 0,
          // plate_bottom: 0,
          // g_freight: 0,
          // g_vat: 0,
          // g_state: 1,
          // g_commend: 1,
          // is_gv: 0,
          // g_vlimit: 0,
          // g_vinvalidrefund: 0,
          // sup_id: 0,
          // type_id: 0,
          // delivery_time: null, //送检时间
          // report_no: '', //GIA报告编号
          // inclusion: 0, //内涵物
          // color_type: 0, //奶绿咖
          // area: 1, // 地区  境内:1  境外:2
          // city_id: '', //城市id
        },
        textinfo: {
          report: {},
          textData: {
            is_new: '',
            inclusion: '',
            color_type: '无',
            delivery_time: '',
            is_inlay: '',
            inlay_deal: '',
            voucher: '',
            bid: '',
            city: '',
            cityYC: ''
          },
          SearchData: {
            carat_weight: '',
            clarity: '',
            shape: '',
            measurements: '',
            cut: '',
            polish: '',
            symmetry: '',
            fluorescence: '',
          },
        },
        localImage: [],
        // image_all: []
      }
    },
    created () {
      this.commonid = this.$route.query.id
      this.goodsInfo(this.commonid)
    },
    watch: {
      editStatus (val) {
        if (!val) {
          this.goodsInfo(this.commonid)
        }
      },
      localImage (val) {
        let arr = []
        val.forEach((i) => {arr.push(i.url)})
        this.info.image_all = arr.join()
      }
    },
    beforeRouteLeave (to, from, next) {
      if (this.editStatus) {
        this.$modal({message: '是否保存', lock: true, cancel: true}).then(async action => {
          let json = await this.$http.post(GoodsEdit, {post: this.info}, {}, {})
          if (json.code === 200) {
            this.editStatus = false
            this.$toast('提交成功')
            setTimeout(() => {
              next()
            }, 1000)
          }
        }, () => {
          next(false)
        })
      } else {
        next()
      }
    },
    methods: {
      async next () {
        let json = await this.$http.post(GoodsEdit, {post: this.info}, {}, {})
        if (json.code === 200) {
          this.editStatus = false
          this.$toast('提交成功')
          this.back()
        }
      },
      async goodsInfo (goods_commonid) {
        let json = await this.$http.post(GoodsInfo, {post: {goods_commonid}}, {}, {})
        if (json.code === 200) {
          this.localImage = []
          this.info = json.datas.goodscommon_info
          this.textinfo.textData = json.datas.goodscommon_info.map_str
          this.info.image_all.split(',').forEach((item, index) => {this.localImage.push({url: item})})
        }
      },
      edit () {
        this.editStatus = !this.editStatus
        this.rightText = this.editStatus ? '取消' : '编辑'
      },
      back () {
        setTimeout(() => {
          this.$router.goBack()
        }, 1000)
      },
      async addImg (e) {
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
                self.getGetTokenData(blob, p)
              }
              reader.readAsDataURL(i.target)
            })
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
            this.localImage.push({url: noCropAvatar})
          }
        }
      },
      // 获取oss 信息
      async getGetTokenData (file, filesName) {
        let getGetTokenData = await this.$http.get(GetToken, {
          type: 'diamond'
        })
        if (getGetTokenData.code === 200) {
          this.plusUpload(getGetTokenData, file, filesName)
        }
      },
      // 上传操作
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
          this.info.image_all.push(res.filename)
          this.localImage.push({url: HttpImgUrl + res.filename})
          if ($prod) {
            plus.nativeUI.closeWaiting()
          }
        })
      },
      deleteImg (index) {
        // this.info.image_all.splice(index,1)
        this.localImage.splice(index, 1)
      },
    },
    components: {
      editEnterprise
    },
    computed: {
      valid () {
        return verify.requiredObjProp(this.info).isValid
      },
      prod () {
        return $prod
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/mixin";
  @import "../../assets/css/variables";

  .wrap {
    background: #fff;
    padding: 0 pxTorem(25);
    .tip-header {
      color: $themeColor;
      font-size: pxTorem(24);
      text-align: center;
      padding: 0.4rem 0.28rem;
      position: relative;
      // @include borderScale('bottom');
    }
    .submit {
      margin-top: 0.4rem;
      padding-bottom: 0.6rem;
    }
  }

  .autoHeight {
    padding-bottom: pxTorem(70);
    .content-item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 pxTorem(15);
      height: pxTorem(90);
      .name {
        font-size: pxTorem(28);
        color: #2c2c2c;
      }
      .tip {
        color: #7a7a7a;
        font-size: pxTorem(26);
      }
      .look {
        padding: pxTorem(8) pxTorem(20);
        font-size: pxTorem(18);
        color: #4b4b4b;
        border: 1px #d8d8d8 solid;
        border-radius: pxTorem(8);
      }
    }
    .content {
      display: flex;
      flex-wrap: wrap;
      padding: pxTorem(10) 0;
      .img {
        width: pxTorem(140);
        height: pxTorem(140);
        margin-left: pxTorem(10);
        position: relative;
        flex-shrink: 1;
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
            .icon-shanchu21 {
              position: absolute;
              top: pxTorem(-18);
              left: pxTorem(-10);
            }
            &.add {
              display: flex;
              border: 1px #c3c3c3 dashed;
            }
            img {
              border-radius: pxTorem(16);
              height: 100%;
              width: 100%;
            }
          }
          img {
            width: 100%;
          }
        }
      }
    }
    .footer-tip {
      padding-top: pxTorem(40);
      text-align: center;
      color: #878787;
      font-size: pxTorem(26);
    }
  }
</style>
