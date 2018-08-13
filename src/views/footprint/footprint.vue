<template>
  <div class="">
    <ts-header back title="足迹" :right-text="list.length >0?(isEdit?'完成':'编辑'):''" right-color="#030303" @headerEvent="headerEvent"></ts-header>
    <page>
      <div class="wrapper">
        <Refresh  @refresh="refresh" @loadmore="loadmore($event)">
          <slide :edit="isEdit" :list="list"></slide>
          <no-data v-show="list.length===0" tip="您还没有足迹，先去看看钻石吧"></no-data>
        </Refresh>


      </div>
    </page>
    <div v-if="isEdit" class="footer">
      <div class="checkbox" @click="selection">
        <ds-checkbox v-model="checked"></ds-checkbox>
        <span class="word">全选</span>
      </div>
      <div class="button" @click="deletes">
        <button>删除</button>
      </div>
    </div>
  </div>
</template>
<script>
import Refresh from '../../components/module/Refresh/Refresh'
import { uploadMixins } from '../../utils/mixins.js'

import { BrowseList, BrowseDel } from '../../assets/js/api'
import NoData from '../../components/uiModule/NoData/noData'
export default {
  name:'footprint',
  data() {
    return {
      list: [],
      isEdit: false
    }
  },
  created() {},
  mixins: [uploadMixins],
  methods: {
    async requestUploadData(type) {
      let getBrowseList = await this.$http.post(BrowseList, {
        get: {
          page: 10,
          curpage: this.a_page // 必须
        }
      })
      // 必须
      this._mixinsRequestData(
        type,
        getBrowseList,
        getBrowseList.datas.goodsbrowse_list
      )
    },
    // 删除足迹
    async getBrowseDel(ids) {
      let getBrowseDel = await this.$http.post(BrowseDel, {
        post: {
          ids
        }
      })
      if (getBrowseDel.code !== 200) {
        return
      }
      this.$toast('删除成功')
      this.list = this.list.filter((d, i) => d.checked !== true)
      if(this.list.length === 0 ){
        this.isEdit = false
      }

      console.log(getBrowseDel)
    },
    selection() {
      // let checkedS = this.checked;
      if (this.checked) {
        this.list.forEach((item, index, arr) => (item.checked = false))
      } else {
        this.list.forEach((item, index, arr) => (item.checked = true))
      }
    },
    headerEvent() {
      if (this.isEdit) {
        this.isEdit = false
      } else {
        this.isEdit = true
      }
    },
    deletes() {
      let orderList = []
      let list = this.list.filter((d, i) => d.checked === true)
      console.log(list)
      list.forEach((item, index, arr) => {
        orderList.push(item.goods_id)
      })

      this.$modal({
        title: '提示',
        message: `是否删除足迹？删除后不可恢复。`
      }).then(res => {
        if (res === 'confirm') {
          this.getBrowseDel(orderList)
        }
      })
    }
  },
  computed: {
    checked: {
      get() {
        return this.list.length > 0 && this.list.every(i => i.checked === true)
      },
      set(val) {}
    }
  },
  watch: {},
  components: {
    NoData,
    Refresh
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin';
.wrapper {
  background: #fff;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 pxTorem(30);
  width: 100%;
  height: pxTorem(100);
  .checkbox {
    display: flex;
    align-items: center;
    font-size: pxTorem(26);
    color: #2a2a2a;
    .word {
      padding-left: pxTorem(10);
    }
  }
  .button button {
    width: pxTorem(152);
    height: pxTorem(60);
    border: none;
    border-radius: pxTorem(8);
    background: #bd081c;
    color: #fff;
  }
}
</style>
