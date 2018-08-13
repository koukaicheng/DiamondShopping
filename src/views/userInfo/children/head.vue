<template>
  <div class="">
    <ts-header title="选择头像"
               back
               right-text="使用"
               right-color="#bd081c"
               @headerEvent="getImgBase64"></ts-header>
    <page>
      <div class="mask-wrapper">
        <vue-cropper ref="cropper"
                     autoCrop
                     :canMoveBox="cropper.canMoveBox"
                     :info="cropper.info"
                     :autoCropWidth="cropper.autoCropWidth"
                     :autoCropHeight="cropper.autoCropHeight"
                     fixedBox
                     :img="cropper.img"></vue-cropper>
      </div>
    </page>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import VueCropper from 'vue-cropper'
  import { GetToken } from '../../../assets/js/api'
  import transfer from '../../../utils/transfer'
  import { dataURLtoBlob, get_suffix } from '../../../utils/currency'

  export default {
    data () {
      return {
        cropper: {
          img: '',
          canMoveBox: false, // 剪裁框是否可以拖动
          info: false, //显示剪裁框信息
          autoCropWidth: 300,
          autoCropHeight: 300,
          client: '',
          fileSize: 500000
        }
      }
    },
    created () {
      // console.log($('.mask-wrapper'))
      this.cropper.img = this.$route.params.noCropAvatar
    },
    methods: {
      getImgBase64 () {
        //获取截图的base64 数据
        this.$refs.cropper.getCropData(data => {
          this.$router.isBack = true
          // let {name} = this.$route.params
          // name = get_suffix(name)
          // console.log(name)
          this.getGetTokenData(data, '.jpg')
        })
      },
      async getGetTokenData (data, name) {
        let file = dataURLtoBlob(data)
        let getGetTokenData = await this.$http.get(GetToken, {
          type: 'header'
        })
        await this.$http.post(getGetTokenData.datas.host, {
          key: getGetTokenData.datas.dir + name,
          policy: getGetTokenData.datas.policy,
          success_action_status: '200',
          OSSAccessKeyId: getGetTokenData.datas.accessid,
          signature: getGetTokenData.datas.signature,
          callback: getGetTokenData.datas.callback,
          file,
        }).then((res) => {
          let {filename} = res
          transfer.$emit('avatar', {filename, file: data})
          this.$router.goBack()
        })
      }
    },
    components: {},
    computed: {},
    components: {
      VueCropper
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/mixin";

  .mask-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #cccccc;
    z-index: 999;
    .vue-cropper {
      background: #000;
    }
  }
</style>
