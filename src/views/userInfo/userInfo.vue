<template>
  <div class="">
    <ts-header title="基本资料"
               back></ts-header>
    <page>
      <div class="wrap">
        <div class="content">
          <div class="ds-cell border-1px" @click="prod===true?changeAvatar($event):''">
            <!--@click="selHead"-->
            <div class="title">
              <div class="img">
                <img src="../../assets/imgs/icon/touxiang.png"
                     alt="">
              </div>
              <div class="text">头像</div>
            </div>
            <div class="value">
              <div class="val">
                <div class="avatar">
                  <img :src="formData.member_avatar"
                       alt="">
                </div>
              </div>
              <icon font-name="icon-fanhui"
                    color="#ababab"
                    size="32"></icon>
            </div>
            <input ref="uload" type="file" v-show="!prod" id="upload"
                   style="position:absolute;width: 100%;height: 100%;opacity: 0"
                   accept="image/png, image/jpeg, image/gif, image/jpg" @change="changeAvatar($event)">
          </div>

          <div class="ds-cell border-1px">
            <div class="title">
              <div class="img">
                <img src="../../assets/imgs/icon//nicheng.png"
                     alt="">
              </div>
              <div class="text">昵称</div>
            </div>
            <div class="value">
              <div class="val">
                <input type="text"
                       placeholder="请输入昵称"
                       v-model="formData.member_truename"/>
              </div>
              <!--<icon font-name="icon-fanhui" color="#ababab" size="36"></icon>-->
            </div>
          </div>

          <div class="ds-cell border-1px"
               @click="selSex">
            <div class="title">
              <div class="img">
                <img src="../../assets/imgs/icon/xingbie.png"
                     alt="">
              </div>
              <div class="text">性别</div>
            </div>
            <div class="value">
              <div class="val">
                <p>{{isSex}}</p>
              </div>
              <icon font-name="icon-fanhui"
                    color="#ababab"
                    size="32"></icon>
            </div>
          </div>

          <div class="ds-cell border-1px"
               @click="birthday">
            <div class="title">
              <div class="img">
                <img src="../../assets/imgs/icon/shengri.png"
                     alt="">
              </div>
              <div class="text">生日</div>
            </div>
            <div class="value">
              <div class="val">
                <p>{{formData.member_birthday}}</p>
              </div>
              <icon font-name="icon-fanhui"
                    color="#ababab"
                    size="32"></icon>
            </div>
          </div>

          <div class="ds-cell"
               @click="city">
            <div class="title">
              <div class="img">
                <img src="../../assets/imgs/icon/dizhi.png"
                     alt="">
              </div>
              <div class="text">所在城市</div>
            </div>
            <div class="value">
              <div class="val">
                <p>{{formData.member_areainfo}}</p>
              </div>
              <icon font-name="icon-fanhui"
                    color="#ababab"
                    size="32"></icon>
            </div>
          </div>
        </div>

        <div class="submit"
             @click="submit">
          <ds-button type="primary"
                     size="large">保存
          </ds-button>
        </div>
      </div>
      <picker ref="sex"
              :values="values"
              @confirm="confirmSex"></picker>

      <datetime-picker ref="picker"
                       type="date"
                       :startDate="startDate"
                       @confirm="confirm"
                       v-model="pickerValue">
      </datetime-picker>
      <city-choice ref='choice'
                   :active-tab="activeTab"
                   @change="cityChange"></city-choice>
    </page>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import { SET_USER } from '../../store/mutations/mutations-types'
  import { DatetimePicker } from 'mint-ui'
  import Picker from '../../components/module/Picker/Picker'
  import { Member, TIMESTAMP, HttpImgUrl } from '../../assets/js/api'
  import cityChoice from '../../components/module/CityChoice/CityChoice'
  import transfer from '../../utils/transfer'

  export default {
    name: 'userinfo',

    data () {
      return {
        ll: '',
        avatar: '',
        startDate: new Date('1900-01-01'),
        pickerValue: new Date(),
        member_sex: '男',
        formData: {
          member_truename: '', //昵称
          member_sex: '1', //1男 2女 3保密
          member_birthday: '', // 生日 必须10位
          area_ids: '', //省id，市id，区id
          member_areainfo: '', //汉字字符串地区
          member_avatar: '' //头像
        },
        status: false,
        activeTab: [],
        values: [
          {
            id: 1,
            name: '男'
          },
          {
            id: 2,
            name: '女'
          },
          {
            id: 3,
            name: '保密'
          }
        ]
      }
    },
    activated () {
      transfer.$on('avatar', (val) => {
        this.formData.member_avatar = HttpImgUrl + val.filename + `?time=${Math.random()}`
        this.avatar = HttpImgUrl + val.filename + `?time=${Math.random()}`
      })
      if (this.status) {
        this.userCreated()
      }
    },
    created () {
      this.userCreated()
    },
    methods: {
      ...mapMutations([SET_USER]),
      selSex () {
        this.$refs.sex.open()
      },
      changeAvatar (e) {
        let self = this
        if ($prod) {
          plus.gallery.pick((noCropAvatar) => {
              plus.zip.compressImage({
                src: noCropAvatar,
                dst: '_doc/kkc.jpg',
                overwrite: true,
                quality: 70,
                width: 'auto',
                height: 'auto',
                rotate: 0
              }, (i) => {
                let reader = new window.plus.io.FileReader()
                reader.onloadend = function (e) {
                  self.$router.push({
                    name: 'userInfoHead',
                    params: {noCropAvatar: e.target.result, name: noCropAvatar}
                  })
                }
                reader.readAsDataURL(i.target)
              })
            }, (error) => {
              this.$toast('请正确选择图片')
            }, {filter: 'image'}
          )
        } else {
          let file = e.target.files[0]
          let name = file.name
          if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
            alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
            return false
          }
          let oFReader = new FileReader()
          oFReader.readAsDataURL(file)
          oFReader.onload = (oFREvent) => {
            const noCropAvatar = oFREvent.target.result
            setTimeout(() => {
              this.$router.push({name: 'userInfoHead', params: {noCropAvatar, name}})
            }, 200)
          }
        }
      },
      confirmSex (val) {
        this.formData.member_sex = val
      },
      userCreated () {
        this.formData.member_truename = this.userinfo.member_truename || ''
        this.formData.member_sex = this.userinfo.member_sex || ''
        if (this.userinfo.member_provinceid && this.userinfo.member_cityid && this.userinfo.member_areaid) {
          this.formData.area_ids = this.userinfo.member_provinceid +
            ',' +
            this.userinfo.member_cityid +
            ',' +
            this.userinfo.member_areaid
        } else {
          this.formData.area_ids = ''
        }
        this.formData.member_areainfo = this.userinfo.member_areainfo || ''
        this.formData.member_birthday = this.userinfo.member_birthday || ''
        this.formData.member_avatar = this.userinfo.member_avatar
        this.pickerValue = new Date(this.userinfo.member_birthday)
        if (this.userinfo.member_areainfo) {
          let cityName = this.userinfo.member_areainfo.split(' ')
          this.activeTab = [{id: this.userinfo.member_provinceid, name: cityName[0]}, {
            id: this.userinfo.member_cityid,
            name: cityName[1]
          }, {id: this.userinfo.member_areaid, name: cityName[2]}
          ]
        }
      },
      birthday () {
        this.$refs.picker.open()
      },
      confirm (val) {
        this.formData.member_birthday = this.getNowFormatDate(val)
      },
      city () {
        this.$refs.choice.open()
      },
      cityChange (obj) {
        if (obj.length > 0) {
          this.formData.member_areainfo =
            obj[0].name + ' ' + obj[1].name + ' ' + obj[2].name
          this.formData.area_ids =
            obj[0].area_id + ',' + obj[1].area_id + ',' + obj[2].area_id
        } else {
          this.formData.member_areainfo = ''
          this.formData.area_ids = ''
        }
      },
      submit () {
        if (this.formData.member_truename === '') {
          this.$toast('请输入昵称')
          return
        }
        if (this.formData.member_birthday.length !== 10) {
          this.$toast('请选择生日')
          return
        }
        if (this.formData.member_areainfo === '') {
          this.$toast('请选择地区')
          return
        }

        this.getMemberData(this.formData)
      },
      async getMemberData (fromData) {
        let getMemberData = await this.$http.post(Member, {
          post: fromData
        })
        if (getMemberData.code === 200) {
          this.$toast(`用户信息保存成功`)
          this.getUserInfo()
          setTimeout(() => {
            this.$router.goBack()
          }, 1000)
        }
      },
      async getUserInfo () {
        let getUserInfoData = await this.$http.get(Member, {
          u_id: 3,
          t: TIMESTAMP
        })
        if (getUserInfoData.code === 200) {
          this[SET_USER](getUserInfoData.datas)
        }
      },
      async getGetTokenData () {},
      getNowFormatDate (time) {
        let date = new Date(time)
        let seperator1 = '-'
        let month = date.getMonth() + 1
        let strDate = date.getDate()
        if (month >= 1 && month <= 9) {
          month = '0' + month
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = '0' + strDate
        }
        let currentdate =
          date.getFullYear() + seperator1 + month + seperator1 + strDate
        return currentdate
      }
    },
    computed: {
      ...mapState(['userinfo']),
      isSex () {
        let str = ''
        if (this.formData.member_sex == 1) {
          str = '男'
        }
        if (this.formData.member_sex == 2) {
          str = '女'
        }
        if (this.formData.member_sex == 3) {
          str = '保密'
        }
        return str
      },
      prod () {
        return $prod
      }
    },
    watch: {
      userinfo (val) {
        this.status = true
      },
    },
    components: {
      DatetimePicker,
      Picker,
      cityChoice
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/mixin";

  .wrap {
    .content {
      background: #fff;
    }

    .ds-cell {
      margin: 0 pxTorem(25);
      //  padding: pxTorem(30) 0;
      height: pxTorem(100);
      @include fja(space-between);
      .title,
      .value {
        @include fja();
      }
      .title {
        .img {
          // background: #f5f5f5;
          width: pxTorem(40);
          height: pxTorem(40);
          overflow: hidden;
          padding: 0;
          img {
            width: 100%;
            height: 100%;
            margin: 0;
            vertical-align: top;
          }
        }
        .text {
          padding-left: pxTorem(22);
          font-size: pxTorem(28);
          color: #2c2c2c;
        }
      }
      .value {
        .val {
          @include fja();
          margin-right: pxTorem(20);
          .avatar {
            width: pxTorem(78);
            height: pxTorem(78);
            background-color: #cfcfcf;
            border-radius: 50%;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          input {
            display: inline-block;
            border: none;
            text-align: right;
          }
          p {
            font-size: pxTorem(26);
            color: #999;
            margin-top: pxTorem(-4);
          }
        }
      }
    }
    .box {
      @include fja();
      justify-content: flex-end;
      .avatar {
        margin-right: pxTorem(30);
        width: pxTorem(78);
        height: pxTorem(78);
        background-color: #cfcfcf;
        border-radius: 50%;
      }
      input {
        border: none;
        text-align: right;
        background: rgba(0, 0, 0, 0);
      }
    }
  }

  .submit {
    margin-top: pxTorem(98);
    padding: 0 pxTorem(28);
  }
</style>
