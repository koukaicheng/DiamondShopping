<template>
  <div class="">
    <ts-header title="卖家协议" back></ts-header>
    <page>
      <div class="wrap">

        <div ref="wrap">

        </div>

        <div class="btn">
          <ds-button width="230" height="80" type="default" plain @click="status(false)" > <span style="font-size: 0.36rem">不同意</span> </ds-button>
          <ds-button width="230" height="80" type="primary" @click="status(true)" ><span style="font-size: 0.36rem">确定</span> </ds-button>
        </div>
      </div>

    </page>


  </div>
</template>

<script>
  import {SELL_AGREEMENT_STATUS} from '../../../store/mutations/mutations-types'
  import {Agreement} from '../../../assets/js/api'

  export default {
    naem:"sellerAgreement",
    data () {
      return {}
    },
    created () {
      this.seller()
    },
    methods: {
      status(val){
        this.$store.commit(SELL_AGREEMENT_STATUS,val)
        this.$router.goBack()
      },
      async seller(){
        let json = await this.$http.get(Agreement,{doc_code:'seller'},{show:true,type:'mini'})
        this.$refs.wrap.innerHTML = json.datas.doc_content
        console.log(json)
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
  .btn {
    position: fixed;
    left: 10%;
    bottom: pxTorem(20);
    width: 80%;
    @include fja();
    justify-content: space-between;
  }
</style>
