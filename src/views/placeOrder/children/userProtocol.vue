<template>
    <div >
      <ts-header title="用户交易协议" back></ts-header>
      <page>
        <div class="wrap" ref="wrap">

        </div>
      </page>
    </div>
</template>

<script>
  import {Agreement} from '../../../assets/js/api'
  export default {
    name:'pointAgreement',
    data () {
      return {

      }
    },
    created () {
      this.getAgreementData()
    },
    methods: {
      async getAgreementData(){
        let json = await this.$http.get(Agreement,{doc_code:'agreement'},{show:true,type:'mini'})
        this.$refs.wrap.innerHTML = json.datas.doc_content
      },
    },
    components: {},
    computed: {}
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/variables";
  @import "../../../assets/css/mixin";
  .wrap{
    background: #fff;
    padding: 0.5rem 0.8rem;
    font-size: 20px;
  }
</style>
