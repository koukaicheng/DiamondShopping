<template>
  <div class="slider-wrapper-box">

    <div class="slider-wrapper" :class="{'blocks':block!==true}">
      <div v-if="block" class="block">
        <ul>
          <li v-for="(item,index) in newValues" :class="{'active':item.type}">{{item.name}}</li>
        </ul>
      </div>
      <div ref="wrap" class="slider-bottom">
        <div ref="moveleft" class="left" :class="{'trans':trans}" @touchstart.stop="start('left',$event)"
             @touchmove.stop="moveing('left',$event)" @touchend.stop="end('left',$event)">
          <div v-if="!block" class="value-style">{{leftValue}}{{leftVal}}{{rightValue}}</div>
        </div>
        <div ref="active" :class="{'trans':trans}" class="active"></div>
        <div ref="moveright" class="right" :class="{'trans':trans}" @touchstart.stop="start('right',$event)"
             @touchmove.stop="moveing('right',$event)" @touchend.stop="end('right',$event)">
          <div v-if="!block" class="value-style">{{leftValue}}{{rightVal}}{{rightValue}}</div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  let len = 10
  import { toDecimal2 } from '../../../utils/currency'
  import transfer from '../../../utils/transfer'

  export default {
    name: 'double-slider',
    props: {
      // 是否开启磁力吸引
      block: {
        type: Boolean,
        default: false
      },
      defVal: {
        type: Array,
        default: () => [0, 100]
      },
      // 最小值
      min: {
        type: Number,
        default: 0
      },
      // 最大值
      max: {
        type: Number,
        default: 100
      },
      // 差值
      diff: {
        type: Number,
        default: 0
      },
      leftValue: {
        type: String,
        default: '￥'
      },
      rightValue: {
        type: String,
        default: ''
      },
      toFixedNum: {
        type: Number,
        default: 0
      },
      // 数组数据
      values: {
        type: Array,
        default: () => ['0', '1', '2', '0', '1', '2']
      }
    },
    data () {
      return {
        // values: ['F', 'G', 'VG', 'EX'],
        index: 0,
        leftVal: this.min,
        rightVal: this.max,
        trans: false,
        width: 0,
        slide: {},
        move: {
          type: 'left',
          slide: [
            {
              startX: 0,
              moveX: 0,
              endX: 0,
              min: 0,
              max: 0,
              index: 0
            },
            {
              startX: 0,
              moveX: 0,
              endX: 0,
              min: 0,
              max: 0,
              index: 0
            }
          ]
        },
        newValues: []
      }
    },
    methods: {
      start (type, e) {
        this.slide = this.move.slide[type === 'left' ? 0 : 1]
        this.slide.startX = e.touches[0].clientX
        this.move.type = type
        // 禁止动画
        this.trans = false
        this.slideCollision()
      },
      moveing (type, e) {
        let x = e.touches[0].clientX
        let moveNum = x - this.slide.startX + this.slide.endX
        // 边界判断
        if (this.move.type === 'left') {
          if (moveNum < this.slide.min) {
            this.slideMove(0)
            return
          }
          if (moveNum > this.slide.max) {
            this.slideMove(this.slide.max)
            return
          }
        } else {
          if (moveNum > this.slide.min) {
            this.slideMove(0)
            return
          }
          if (moveNum < -this.slide.max) {
            this.slideMove(-this.slide.max)
            return
          }
        }
        // 正常移动
        this.slideMove(moveNum)
      },
      end (type, e) {
        this.slide.endX = this.slide.moveX
        if (this.block) {
          this.nearJump(this.slide.endX)
          let val = []
          this.newValues.forEach((item, index, arr) => {
            if (item.type) {
              val.push(item.name)
            }
          })
          this.$emit('sliderChange', val)
        } else {
          this.$emit('sliderChange', [Number(this.leftVal), Number(this.rightVal)])
        }
        // 获取下标
      },

      /**
       * 移动
       */
      transfrom (x) {
        return 'translateX(' + x + 'px)'
      },
      init () {
        // let min = this.defVal[0]
        // let max = this.defVal[1]
        this.$refs.moveleft.className += ' trans'
        this.$refs.active.className += ' trans'
        this.$refs.moveright.className += ' trans'
        let min = this.min
        let max = this.max
        this.width = this.$refs['wrap'].offsetWidth
        // if (!this.block) {
        let leftMoveNum =
          (min - this.min) /
          (this.max - this.min - this.diff) *
          (this.width - 30)
        let rightMoveNum =
          (this.max - max) /
          (this.max - this.min - this.diff) *
          (this.width - 30)
        this.slideMove(Math.abs(leftMoveNum), 'left')
        this.slideMove(Math.abs(rightMoveNum), 'right')

        setTimeout(() => {
          this.$refs.moveleft.className = 'left'
          this.$refs.active.className = 'active'
          this.$refs.moveright.className = 'right'
        }, 200)
        // }
      },
      /**
       * 移动距离
       * @augments
       */
      slideMove (moveNum, type) {
        if (type === 'left') {
          this.move.slide[0].endX = moveNum
          this.move.type = 'left'
          this.slide = this.move.slide[0]
          this.$refs['active'].style.left = moveNum + 'px'
          this.$refs.moveleft.style.transform = this.transfrom(moveNum)
          this.$refs.moveleft.style.webkitTransform = this.transfrom(moveNum)
        } else if (type === 'right') {
          this.move.slide[1].endX = -moveNum
          this.move.type = 'right'
          this.slide = this.move.slide[1]
          this.$refs['active'].style.right = moveNum + 'px'
          this.$refs.moveright.style.transform = this.transfrom(-moveNum)
          this.$refs.moveright.style.webkitTransform = this.transfrom(-moveNum)
        } else {
          this.$refs['active'].style[this.move.type] = Math.abs(moveNum) + 'px'
          this.$refs['move' + this.move.type].style.transform = this.transfrom(
            moveNum
          )
          this.$refs['move' + this.move.type].style.webkitTransform = this.transfrom(
            moveNum
          )
        }

        this.slide.moveX = moveNum

        if (this.move.type === 'left') {
          let num = Math.abs(moveNum) /
            (this.width - 30) *
            (this.max - this.min - this.diff)
          this.leftVal = (this.min + num).toFixed(this.toFixedNum)

          // this.defVal[0] = Number(this.leftVal);
        } else {
          let num = Math.abs(moveNum) /
            (this.width - 30) *
            (this.max - this.min - this.diff)
          this.rightVal = (this.max - num).toFixed(this.toFixedNum)

          // this.defVal[1] = Number(this.rightVal);
        }
        this.slide.index = parseInt(
          moveNum / (this.width / this.newValues.length)
        )
        let leftValues = this.move.slide[0].index
        let rightValues = this.newValues.length + this.move.slide[1].index - 1
        for (let i = 0, len = this.newValues.length; i < len; i++) {
          this.newValues[i].type = false
        }
        for (let i = 0, len = this.newValues.length; i < len; i++) {
          if (leftValues <= i && i <= rightValues) {
            this.newValues[i].type = true
          }
        }
        this.slideCollision()
      },
      /**@augments
       * 计算碰撞
       */
      slideCollision () {
        this.width = this.$refs['wrap'].offsetWidth
        // let offsetLeft = this.$refs["wrap"].getBoundingClientRect().left;
        //
        if (this.move.type === 'left') {
          this.move.slide[0].min = 0
          this.move.slide[0].max =
            this.width - Math.abs(this.move.slide[1].endX) - 30
        } else {
          this.move.slide[1].min = 0
          this.move.slide[1].max =
            this.width - Math.abs(this.move.slide[0].endX) - 30
        }
      },
      nearJump (end) {
        let numWidth = this.width / this.newValues.length
        let current = numWidth * Math.abs(this.slide.index)
        let isBig = Math.abs(end) - current <= numWidth / 2
        this.trans = true
        if (this.move.type === 'left') {
          if (isBig) {
            this.slide.endX = numWidth * this.slide.index
          } else {
            if (
              this.move.slide[0].index + Math.abs(this.move.slide[1].index) ===
              this.newValues.length - 1
            ) {
              this.slide.endX = numWidth * this.slide.index
            } else {
              this.slide.endX = numWidth * (this.slide.index + 1)
            }
          }
        } else {
          if (isBig) {
            this.slide.endX = -(numWidth * Math.abs(this.slide.index))
          } else {
            if (
              this.move.slide[0].index + Math.abs(this.move.slide[1].index) ===
              this.newValues.length - 1
            ) {
              this.slide.endX = -(numWidth * Math.abs(this.slide.index))
            } else {
              this.slide.endX = -(numWidth * (Math.abs(this.slide.index) + 1))
            }
          }
        }
        setTimeout(() => {
          this.slideMove(this.slide.endX)
        }, 100)
      }
    },
    created () {
      let arr = []
      if (this.values.length !== 0) {
        for (let i = 0, len = this.values.length; i < len; i++) {
          arr.push({
            name: this.values[i],
            type: true
          })
        }
      }
      this.newValues = arr
    },
    mounted () {
      this.init()
      transfer.$on('INIT', () => {
        this.init()
        if (this.block) {
          let val = []
          this.newValues.forEach((item, index, arr) => {
            if (item.type) {
              val.push(item.name)
            }
          })
          this.$emit('sliderChange', val)
        } else {
          this.$emit('sliderChange', [Number(this.leftVal), Number(this.rightVal)])
        }
      })
    },
    watch: {
      max (val) {
        this.init()
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../assets/css/mixin';

  .slider-wrapper-box {
    background: #fff;
    .slider-wrapper {
      &.blocks {
        margin-top: pxTorem(80);
      }
      padding: 0 20px;
      /*padding-top: 20px;*/
      /*overflow: hidden;*/
      .block {
        margin-top: pxTorem(10);
        font-size: 14px;
        ul {
          display: flex;
          li {
            width: 100%;
            text-align: center;
            flex-shrink: 1;
            border-right: 1px #ccc solid;
            box-sizing: border-box;
            &.active {
              color: #bd081c;
            }
            &:last-child {
              border: none;
            }
          }
        }

      }
      .slider-bottom {
        position: relative;
        width: 100%;
        height: pxTorem(6);
        margin: 15px 0;
        background: #ccc;
        &::after,
        &::before {
          content: '';
          position: absolute;
          top: pxTorem(-10);
          width: pxTorem(24);
          height: pxTorem(24);
          background: #ccc;
          border-radius: 50%;
          z-index: 2;
        }
        &::after {
          left: -6px;
        }
        &::before {
          right: -6px;
        }

        .left,
        .right {
          position: absolute;
          top: 0;
          bottom: 0;
          margin: auto;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 22px;
          width: 30px;
          height: 30px;
          background: #fff;
          border: 1px #e2e2e2 solid;
          border-radius: 50%;
          z-index: 10;
          &.trans {
            transition: transform 0.3s;
          }
          .value-style {
            color: #898989;
            background: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            bottom: 35px;
            /*left: 0;*/
            /*right: 0;*/
            margin: auto;
            font-size: 12px;
          }
        }
        .left {
          left: -15px;
          .value-style {
            z-index: 10;
            right: pxTorem(10);
          }
        }
        .right {
          right: -15px;
          .value-style {
            z-index: 30;
            left: 0;
          }
        }
        .active {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          background: #bd081c;
          &.trans {
            transition: left 0.3s, right 0.3s;
          }
        }
      }
    }
  }
</style>
