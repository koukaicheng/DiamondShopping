<template>
  <div class="">
    <ts-header back title="身份认证" :rightText="rightText" rightColor="#bd081c" @headerEvent="edit"
               v-if="formData.allow_edit"></ts-header>
    <ts-header back title="身份认证" v-else></ts-header>

    <page>
      <div class="wrapper">
        <div class="wrap-top">
          <div>认证状态: {{formData.joinin_state_str}}</div>
          <!--<p class="title" :class="{'active':tabIndex === 0}" @click="tab(0)">企业认证</p>-->
          <!--<p class="title" :class="{'active':tabIndex === 1}" @click="tab(1)"> 个人认证</p>-->
        </div>
        <div v-if="tabIndex === 0" class="content-box">
          <div class="content-item border-1px">
            <span class="name">企业名称</span>
            <input class="input" type="text" :disabled="!editStatus" v-model="formData.company_name"
                   placeholder="请输入企业名称"/>
          </div>
          <div class="content-item border-1px">
            <span class="name">社会统一信用代码</span>
            <input class="input" type="text" :disabled="!editStatus" v-model="formData.business_licence_number"
                   placeholder="请输入社会统一信用代码"/>
          </div>
          <div class="content-item border-1px">
            <span class="name">负责人</span>
            <input class="input" type="text" :disabled="!editStatus" v-model="formData.contacts_name"
                   placeholder="请输入负责人"/>
          </div>
          <div class="content-item border-1px">
            <span class="name">电话</span>
            <input class="input" type="number" :disabled="!editStatus" v-model="formData.contacts_phone"
                   placeholder="请输入电话"/>
          </div>
          <div class="content-item border-1px" @click="pickerFn(0)">
            <span class="name">纳税资质</span>
            <p class="right">
              <span>
                <template v-if="formData.store_class_commis_rates == 1">小规模纳税人</template>
                <template v-if="formData.store_class_commis_rates == 2">一般纳税人</template>
              </span>
              <icon class="moreicon" font-name="icon-fanhui" size="30"></icon>
            </p>

          </div>
          <div class="content-item border-1px" @click="pickerFn(1)">
            <span class="name">进口资质</span>
            <p class="right">
              <span>
                <template v-if="formData.paying_money_certificate == 0">无</template>
                <template v-if="formData.paying_money_certificate == 1">钻交会所</template>
                <template v-if="formData.paying_money_certificate == 2">其他</template>
              </span>
              <icon class="moreicon" font-name="icon-fanhui" size="30"></icon>
            </p>
          </div>
          <div class="content-item border-1px" @click="pickerFn(2)">
            <span class="name">二手钻石经营资质</span>
            <p class="right">
              <span>
                <template v-if="formData.paying_money_certif_exp == 0">无</template>
                <template v-if="formData.paying_money_certif_exp == 1">有</template>
              </span>
              <icon class="moreicon" font-name="icon-fanhui" size="30"></icon>
            </p>
          </div>
          <div class="autoHeight border-1px">
            <div class="content-item">
              <span class="name">营业执照</span>
              <p class="look" @click="previewImage('q')">
                查看范例
              </p>
            </div>
            <ul class="content">
              <li class="img">
                <div class="img-box">
                  <div class="img-item add" @click="prod===true?addImg('',0,'business_licence_number_elc'):''">
                    <!--<input class="input-file" type="file" name="" multiple="multiple" @change="addImg($event)">-->
                    <input v-show="!prod" ref="uload" type="file" id="upload"
                           style="position:absolute;width: 100%;height: 100%;opacity: 0"
                           accept="image/png, image/jpeg, image/gif, image/jpg"
                           @change="addImg($event,0,'business_licence_number_elc')">
                    <img :src="localImage[0].url" alt="" v-show="formData.business_licence_number_elc!==''">
                    <!--<img :src="localImage[0].url" alt="" >-->
                    <icon font-name="icon-jiahao" size="70" color="#c3c3c3"
                          v-show="formData.business_licence_number_elc===''"></icon>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div v-else="tabIndex===1" class="content-box">
          <div class="content-item border-1px">
            <span class="name">真实姓名</span>
            <input class="input" type="text" :disabled="!editStatus" v-model="formData.person_contacts_name"
                   placeholder="请输入真实姓名"/>
          </div>
          <div class="content-item border-1px">
            <span class="name">联系电话</span>
            <input class="input" type="number" :disabled="!editStatus" v-model="formData.person_contacts_phone"
                   placeholder="请输入联系电话"/>
          </div>
          <div class="content-item border-1px">
            <span class="name">身份证号码</span>
            <input class="input" type="text" min="18" :disabled="!editStatus"
                   v-model="formData.person_business_licence_number"
                   placeholder="请输入身份证号码"/>
          </div>
          <div class="autoHeight border-1px">
            <div class="content-item">
              <span class="name">身份证照片</span>
              <p class="look" @click="previewImage('g')">
                查看范例
              </p>
            </div>
            <ul class="content">
              <li class="shenfenzheng">
                <label class="img-box" @click="prod===true?addImg({},1,'person_general_taxpayer'):''">
                  <input v-if="!prod" ref="uload" type="file"
                         style="position:absolute;width: 100%;height: 100%;opacity: 0"
                         accept="image/png, image/jpeg, image/gif, image/jpg"
                         @change="addImg($event,1,'person_general_taxpayer')">
                  <div v-show="formData.person_general_taxpayer===''" class="img-item add ">
                    <icon font-name="icon-jiahao" size="70" color="#c3c3c3"></icon>
                    <p>身份证人像面</p>
                  </div>
                  <div v-show="formData.person_general_taxpayer!==''" class="add-img-box">
                    <img :src="localImage[1].url" alt="">
                  </div>

                </label>
              </li>
              <li class="shenfenzheng">
                <label class="img-box" @click="prod===true?addImg($event,2,'person_organization_code_electronic'):''">
                  <input v-if="!prod" ref="uload" type="file"
                         style="position:absolute;width: 100%;height: 100%;opacity: 0"
                         accept="image/png, image/jpeg, image/gif, image/jpg"
                         @change="addImg($event,2,'person_organization_code_electronic')">
                  <div v-show="formData.person_organization_code_electronic===''" class="img-item add ">
                    <icon font-name="icon-jiahao" size="70" color="#c3c3c3"></icon>
                    <p>身份证国徽面</p>
                  </div>
                  <div class="add-img-box" v-show="formData.person_organization_code_electronic!==''">
                    <img :src="localImage[2].url" alt="">
                  </div>

                </label>
              </li>
              <li class="shenfenzheng">
                <label class="img-box" @click="prod===true?addImg($event,3,'person_business_licence_number_elc'):''">
                  <input v-if="!prod" ref="uload" type="file"
                         style="position:absolute;width: 100%;height: 100%;opacity: 0"
                         accept="image/png, image/jpeg, image/gif, image/jpg"
                         @change="addImg($event,3,'person_business_licence_number_elc')">
                  <div v-show="formData.person_business_licence_number_elc===''" class="img-item add ">
                    <icon font-name="icon-jiahao" size="70" color="#c3c3c3"></icon>
                    <p>手持身份证人像照片</p>
                  </div>
                  <div class="add-img-box" v-show="formData.person_business_licence_number_elc!==''">
                    <img :src="localImage[3].url" alt="">
                  </div>

                </label>
              </li>
            </ul>
          </div>
        </div>
        <div class="submit" @click="submit" v-show="editStatus">
          <ds-button type="primary" size="large" :disabled="!valid">保存</ds-button>
        </div>
      </div>
      <picker ref="nashui" :values="nashui" @confirm="confirmNashui"></picker>
      <picker ref="chukou" :values="chukou" @confirm="confirmChukou"></picker>
      <picker ref="ershou" :values="ershou" @confirm="confirmErshou"></picker>
    </page>
  </div>
</template>
<script>
  import Picker from '../../components/module/Picker/Picker'
  import { GetToken, Step2, HttpImgUrl, StoreInfo } from '../../assets/js/api'
  import { dataURLtoBlob, get_suffix } from '../../utils/currency'
  import verify from '../../utils/verify'

  export default {
    data () {
      return {
        tabIndex: 0,
        values: [],
        nashui: [{id: 1, name: '小规模纳税人'}, {id: 2, name: '一般纳税人'}],
        chukou: [{id: 0, name: '无'}, {id: 1, name: '钻交所会员'}, {id: 2, name: '其他'}],
        ershou: [{id: 0, name: '无'}, {id: 1, name: '有'}],
        formData: {
          is_person: 0, //0企业 1个人
          contacts_phone: '', //电话
          company_name: '', //公司名称
          contacts_name: '', //公司负责人
          store_class_commis_rates: 1, //纳税资质  1小规模纳税人  2一般纳税人
          paying_money_certificate: 0, //进口资质 0无 1钻交会所 2其他
          paying_money_certif_exp: 0, //二手钻石经验资格  0无 1有
          business_licence_number: '',  //社会统一信用代码
          business_licence_number_elc: '',//营业执照图片

          person_contacts_name: '', // 姓名（个人）
          person_contacts_phone: '', //电话（个人）
          person_business_licence_number: '',//身份证号（个人）
          person_business_licence_number_elc: '',//手持身份证照片（个人)
          person_organization_code_electronic: '',//身份证背面照（个人）
          person_general_taxpayer: '', //身份证正面照（个人）
        },
        localImage: [{url: '',}, {url: '',}, {url: '',}, {url: '',}],
        editStatus: false,
        rightText: '编辑'
      }
    },
    created () {
      this.storeInfo()
    },
    mounted () {},
    methods: {
      pickerFn (type) {
        if (!this.editStatus) return
        if (type === 0) {
          this.$refs.nashui.open()
        } else if (type === 1) {
          this.$refs.chukou.open()
        } else if (type === 2) {
          this.$refs.ershou.open()
        }
      },
      edit () {
        this.editStatus = !this.editStatus
        this.rightText = this.editStatus ? '取消' : '编辑'
      },
      async storeInfo () {
        let json = await this.$http.post(StoreInfo, {}, {}, {})
        if (json.code === 200) {
          this.formData = json.datas
          this.formData.is_person = parseInt(this.formData.is_person)
          this.tabIndex = this.formData.is_person
          // this.rightText = !this.formData.allow_edit ? '编辑' : '取消'
          if (this.tabIndex === 0) {
            [this.formData.store_class_commis_rates, this.formData.paying_money_certificate, this.formData.paying_money_certif_exp, this.localImage[0].url] = [1, 0, 0, this.formData.business_licence_number_elc]
          } else {
            [this.localImage[3].url, this.localImage[2].url, this.localImage[1].url] = [this.formData.person_business_licence_number_elc, this.formData.person_organization_code_electronic, this.formData.person_general_taxpayer]
          }
        }
      },
      confirmNashui (val) {
        this.formData.store_class_commis_rates = val
      },
      confirmChukou (val) {
        this.formData.paying_money_certificate = val
      },
      confirmErshou (val) {
        this.formData.paying_money_certif_exp = val
      },
      previewImage (type) {
        console.log(`${HttpImgUrl}static/example/report.jpg`, `${HttpImgUrl}static/example/id_card.jpg`)
        if (!$prod) return
        if (type === 'q') {
          let url = `${HttpImgUrl}static/example/report.jpg`
          plus.nativeUI.previewImage([url])
        } else {
          let url = `${HttpImgUrl}static/example/id_card.jpg`
          plus.nativeUI.previewImage([url])
        }
      },
      async addImg (e, num, key) {
        let self = this
        if (!this.editStatus) return
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
                self.getGetTokenData(blob, p, key)
                self.localImage[num].url = p
              }
              reader.readAsDataURL(i.target)
            })
          }, (e) => { console.log('没有选择图片')}, {filter: 'image'})
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
            this.getGetTokenData(blob, filesName, key)
            this.localImage[num].url = noCropAvatar
          }
        }
      },
      delImage (index) {
        this.localImage.splice(index, 1)
      },
      submit () {
        this.getStep2Data()
      },
      ergodicImage () {
        let img = []
        for (let i = 0, len = this.localImage.length; i < len; i++) {
          img.push(this.localImage[i].name)
        }
        return img
      },
      // 获取oss 信息
      async getGetTokenData (file, filesName, key) {
        let getGetTokenData = await this.$http.get(GetToken, {
          type: 'auth'
        })
        if (getGetTokenData.code === 200) {
          this.plusUpload(getGetTokenData, file, filesName, key)
        }
      },
      // 上传操作
      async plusUpload (resData, file, filesName, key) {
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
          this.formData[key] = res.filename
          if ($prod) {
            plus.nativeUI.closeWaiting()
          }
        })
      },
      async getStep2Data () {
        if (this.tabIndex === 1) {
          if (!this.formFillter.isValid) {
            this.$toast(this.formFillter.message)
            return
          }
        }
        let getStep2Data = await this.$http.post(Step2, {
          post: this.formData
        })
        if (getStep2Data.code === 200) {
          this.$toast('认证已发送')
          setTimeout(() => {
            this.editStatus = false
            this.$router.goBack()
          }, 1000)
        }
      },
    },
    beforeRouteLeave (to, from, next) {
      if (this.editStatus) {
        this.$modal({message: '是否保存', lock: true, cancel: true}).then(async action => {
          let getStep2Data = await this.$http.post(Step2, {
            post: this.formData
          })
          if (getStep2Data.code === 200) {
            this.editStatus = false
            this.$toast('认证已发送')
            next()
          }
        }, () => {
          next(false)
        })
      } else {
        console.log(this.editStatus, 3)
        next()
      }
    },
    watch: {
      editStatus (val) {
        if (!val) {
          this.storeInfo()
        }
      },
    },
    computed: {
      prod () {
        return $prod
      },
      // rightText () {
      //   return !this.formData.allow_edit ? '编辑' : '取消'
      // },
      valid () {
        let obj = {}
        let index = this.tabIndex
        if (index === 0) {
          let {contacts_phone, company_name, contacts_name, business_licence_number, business_licence_number_elc} = this.formData
          obj = {contacts_phone, company_name, contacts_name, business_licence_number, business_licence_number_elc}
        } else {
          let {person_contacts_name, person_contacts_phone, person_business_licence_number, person_business_licence_number_elc, person_organization_code_electronic, person_general_taxpayer} = this.formData
          obj = {
            person_contacts_name,
            person_contacts_phone,
            person_business_licence_number,
            person_business_licence_number_elc,
            person_organization_code_electronic,
            person_general_taxpayer
          }
        }
        return verify.requiredObjProp(obj).isValid
      },
      formFillter () {
        if (!verify.idCard(this.formData.person_business_licence_number)) {
          return {
            isValid: false,
            message: '身份证为18位数字或17位数字+字母',
            duration: 3000,
            key: 'person_business_licence_number'
          }
        }
        return {isValid: true}
      }
    },
    components: {
      Picker
    }
  }
</script>

<style lang="scss" scoped>
  @import "entercation";

  input {
    background: none;
  }

</style>
