<template>
  <div v-show="maskShow"
       class="choice-wrapper"
       :class="{'active':bgActive}"
       @click="closeMask">
    <div class="choice-wrap"
         :class="{'active':maskActive}"
         @click.stop="">
      <div class="title border-1px">
        <div class="button"
             @click="closeMask">取消</div>
        <p class="-word">选择地区</p>
        <div class="button"
             @click="confirm">确定</div>
      </div>
      <ul class="tab-wraper border-1px">
        <li v-for="(item ,index) in tab"
            :key="index"
            class="tab-item "
            :class="{'active':selIndex === index}"
            @click="selCity(index)">{{item.name}}</li>

      </ul>
      <ul class="content">
        <li v-for="(item , index) in list"
            :key="index"
            @click="choice(item.area_name ,index ,item.area_id)"
            class="content-item"
            :class="{'active':cityIndex === index}">
          <span>{{item.area_name}}</span>
          <icon class="icon"
                font-name="icon-choice"
                color="#d81e06"></icon>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { AreaList } from "../../../assets/js/api";

export default {
  name: "cityChoice",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    activeTab: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      maskShow: false,
      maskActive: false,
      bgActive: false,
      selIndex: 0,
      cityIndex: "",
      cacheData: [],
      tab: [
        {
          name: "请选择",
          index: 0
        },
        {
          name: "",
          index: 1
        },
        {
          name: "",
          index: 2
        }
      ],
      list: []
    };
  },
  created() {
    this.getRequest(0);
  },
  methods: {
    open() {
      this.firstOpen();
      this.maskShow = true;
      setTimeout(() => {
        this.maskActive = true;
        this.bgActive = true;
      }, 20);
    },
    closeMask() {
      this.maskActive = false;
      setTimeout(() => {
        this.bgActive = false;
        setTimeout(() => {
          this.maskShow = false;
        }, 100);
      }, 200);
    },
    confirm() {
      let obj = [];
      if (this.tab[0].area_id && this.tab[1].area_id && this.tab[2].area_id) {
        obj = this.tab;
      }
      this.$emit("change", obj);
      this.closeMask();
    },
    selCity(index) {
      this.selIndex = index;
      this.cityIndex = this.tab[this.selIndex].cityIndex;
      this.list = this.cacheData[index];
    },
    choice(name, index, id) {
      this.cityIndex = index;
      this.tab[this.selIndex].name = name;
      this.tab[this.selIndex].cityIndex = index;
      this.tab[this.selIndex].area_id = id;
      if (this.selIndex === 0) {
        this.tab[this.selIndex + 1].name = "请选择";
        this.tab[this.selIndex + 2].name = "";
        this.tab[this.selIndex + 1].area_id = "";
        this.tab[this.selIndex + 2].area_id = "";
      }
      if (this.selIndex === 1) {
        this.tab[this.selIndex + 1].name = "请选择";
        this.tab[this.selIndex + 1].area_id = "";

      }
      if (this.selIndex === 2) {
        // this.$emit("change", false, this.tab);
      }
      if (this.selIndex < 2) {
        this.selIndex = this.selIndex + 1;
        this.getRequest(id);
      }
    },
    /**
     * 获取地址信息
     */
    async getRequest(id, index) {
      this.cityIndex = "";

      let getAreaListData = await this.$http.post(AreaList, {
        get: {
          area_id: id
        }
      });
      if (getAreaListData.code === 200) {
        if (index === 0 || index === 1 || index === 2) {
          this.cacheData[index] = getAreaListData.datas.area_list;
          for (let i = 0, len = this.cacheData[index].length; i < len; i++) {
            if (this.cacheData[index][i].area_id == this.tab[index].area_id) {
              this.tab[index].cityIndex = i;
            }
          }
          this.cityIndex = this.tab[0].cityIndex;
          this.list = this.cacheData[0];
        } else {
          this.list = getAreaListData.datas.area_list;
          this.cacheData[this.selIndex] = getAreaListData.datas.area_list;
        }
      }
    },

    firstOpen() {
      // console.log(this.activeTab);
      if (!this.tab[0].area_id) {
        for (let i = 0, len = this.activeTab.length; i < len; i++) {
          this.tab[i].area_id = this.activeTab[i].id;
          this.tab[i].name = this.activeTab[i].name;
          if (i === 0) {
            this.getRequest(0, i);
          } else {
            this.getRequest(this.activeTab[i - 1].id, i);
          }
        }
      }
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
@import "../../../assets/css/mixin.scss";
.choice-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba($color: #000000, $alpha: 0.6);
  z-index: 9999;
  transition: opacity 0.1s;
  opacity: 0;
  &.active {
    opacity: 1;
  }
  .choice-wrap {
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 70%;
    background: #fff;
    font-size: pxTorem(26);
    transition: transform 0.2s;
    transform: translateY(100%);
    &.active {
      transform: translateY(0);
    }
    .title {
      display: flex;
      justify-content: space-between;
      flex-shrink: 0;
      width: 100%;
      line-height: pxTorem(90);
      font-size: pxTorem(30);
      text-align: center;
      .button {
        width: pxTorem(120);
        height: 100%;
        font-size: pxTorem(26);
      }
    }
    .tab-wraper {
      flex-shrink: 0;
      display: flex;
      .tab-item {
        padding: pxTorem(20) pxTorem(20);
        font-size: pxTorem(26);
        &.active {
          color: #d81e06;
          border-bottom: 2px #d81e06 solid;
        }
      }
    }
    .content {
      margin-top: 1px;
      padding: pxTorem(10) 0;
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      .content-item {
        display: flex;
        align-items: center;
        padding: pxTorem(10) pxTorem(20);
        .icon {
          display: none;
          margin-left: pxTorem(10);
          margin-top: pxTorem(5);
        }
        &.active {
          color: #d81e06;
          .icon {
            display: block;
          }
        }
      }
    }
  }
}
</style>
