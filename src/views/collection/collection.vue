<template>
  <div class="">
    <ts-header title="我的收藏" back></ts-header>
    <page>
      <div>
        <Refresh  @refresh="refresh" @loadmore="loadmore($event)">
          <slide :edit="isEdit" :list="list"></slide>
          <no-data v-show="list.length===0" tip="您还没有收藏，先去看看钻石吧"></no-data>
        </Refresh>
      </div>
    </page>
  </div>
</template>

<script>
  import Refresh from '../../components/module/Refresh/Refresh'
  import NoData from '../../components/uiModule/NoData/noData'
  import { FavoritesList } from '../../assets/js/api'
  import { uploadMixins } from '../../utils/mixins.js'
  export default {
    name:'collection',
    data () {
      return {
        list: [],
        isEdit: false
      }
    },

    created () {},
    mixins:[uploadMixins],
    methods: {
      async requestUploadData(type) {
        let getBrowseList = await this.$http.post(FavoritesList, {
          get: {
            page: 10,
            curpage: this.a_page // 必须
          }
        })
        // console.log(getBrowseList)
        // 必须
        this._mixinsRequestData(
          type,
          getBrowseList,
          getBrowseList.datas.favorites_list
        )
      },
    },
    components: {
      Refresh,
      NoData
    },
    computed: {}
  }
</script>

<style lang="scss" scoped>

</style>
