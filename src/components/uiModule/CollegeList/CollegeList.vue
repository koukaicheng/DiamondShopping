<template>

  <div class="content-wrap" ref="wrapHeight">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item ,index ) in listData" :key="index" class="menu-item sub-list-hook" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
          {{item.article_type_name}}
        </li>

      </ul>
    </div>
    <div class="sub-wrapper " ref="subWrapper">
      <ul>
        <li v-for="(item , index) in listData" :key="index" class="sub-list sub-list-hook">
          <h1 class="title">{{item.article_type_name}}</h1>
          <ul>
            <li v-for="(items ,idx ) in item.article_list" :key="idx" class="sub-item" @click="detail(items.article_id)">
              <div class="sub-item-content">
                <span>{{items.article_title}}</span>
                <icon font-name="icon-fanhui" size='36' color="#b4b4b4"></icon>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>

</template>
<script>
import Bscroll from 'better-scroll'

export default {
  name: 'CollegeList',
  props: {
    listData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      active: '1',
      listHeight: [],
      scrollY: 0,
      listY: 0,
      listIndex: 0,
      pos: {
        start: 0,
        end: 0,
        isRun: true,
        isTop: false
      },
      selectedFood: {},
      options: {
        pullDownRefresh: {
          threshold: 90,
          stop: 40,
          txt: '加载成功'
        },
        pullUpLoad: {
          threshold: 0,
          txt: {
            more: 'Load more',
            noMore: 'No more data'
          }
        }
      }
    }
  },
  created() {},
  mounted() {
    this._initScroll()
    this._calculateHeight()
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (this.pos.isTop) {
          return this.listIndex
        }
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          this.listIndex = i
          return i
        }
      }
      return 0
    }
  },
  methods: {
    detail(id) {
      this.$router.push({path: '/articleDetails', query: {id}
      })
    },
    selectMenu(index, event) {
      if (!event._constructed) {
        return
      }
      let subList = this.$refs.subWrapper.getElementsByClassName(
        'sub-list-hook'
      )
      let el = subList[index]
      this.pos.isRun = false
      this.foodsScroll.scrollToElement(el, 300)
    },
    _initScroll() {
      this.menuScroll = new Bscroll(this.$refs.menuWrapper, {
        click: true,
        probeType: 3,
        preventDefault: true,
        preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ }
      })
      this.foodsScroll = new Bscroll(this.$refs.subWrapper, {
        click: true,
        probeType: 3,
        preventDefault: true,
        preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ }
      })
      this.foodsScroll.on('scroll', pos => {
        this.scrollY = Math.abs(Math.round(pos.y))
        if (pos.y > 0) {
          this.pos.isTop = true
        } else {
          this.pos.isTop = false
        }
        this._leftListHeight()
      })
      this.menuScroll.on('scroll', pos => {
        this.pos.start = Math.abs(Math.round(pos.y))
      })
      this.foodsScroll.on('scrollEnd', () => {
        this.pos.isRun = true
      })
    },
    _calculateHeight() {
      let subList = this.$refs.subWrapper.getElementsByClassName(
        'sub-list-hook'
      )
      this.listHeight = []
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < subList.length; i++) {
        let item = subList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    _leftListHeight() {
      let wrapHeight = this.$refs.wrapHeight.clientHeight
      let height = this.$refs.menuWrapper.getElementsByClassName(
        'sub-list-hook'
      )[0].clientHeight
      let index = this.listIndex
      let currentPos = height * (index + 1)
      this.pos.end = this.pos.start + wrapHeight
      if (!this.pos.isRun) {
        return
      }
      if (currentPos >= this.pos.end) {
        this.menuScroll.scrollTo(0, wrapHeight - currentPos, 300)
      }
      if (height * index <= this.pos.start) {
        this.menuScroll.scrollTo(0, -height * index, 300)
      }
    }
  },
  watch: {
    listData() {
      setTimeout(() => {
        this._calculateHeight()
      }, 1000)
    }
  },
  components: {
    // 'cube-scroll': scroll,
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin';
@import '../../../assets/css/icon.css';

.content-wrap {
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  font-size: pxTorem(26);
  color: #191919;
  background: #fff;
  .menu-wrapper {
    flex: 0 0 80px;
    width: pxTorem(225);
    background: #fff;
    .menu-item {
      text-align: center;
      line-height: pxTorem(106);
      &.current {
        background: #e6e6e6;
      }
    }
  }
  .sub-wrapper {
    flex: 1;
    border-left: 1px #e0e0e0 solid;
    .title {
      position: relative;
      height: pxTorem(77);
      line-height: pxTorem(77);
      border-bottom: 1px solid #e0e0e0;
      padding-left: pxTorem(50);
      color: #bd081c;
      margin-bottom: pxTorem(20);
      &:after {
        content: '';
        position: absolute;
        left: pxTorem(32);
        width: pxTorem(5);
        height: pxTorem(30);
        top: 0;
        bottom: 0;
        margin: auto;
        background: red;
      }
    }
    .sub-item {
      width: 100%;
      line-height: pxTorem(80);
      padding-left: pxTorem(50);
      padding-right: pxTorem(20);

      .sub-item-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      }
    }
  }
}
</style>
