<template>
  <pull-to :top-load-method="refresh" :bottom-load-method="loadmore" @top-state-change="stateChange"
           @bottom-state-change="stateChange" :bottom-config="BOTTOM_DEFAULT_CONFIG">
    <template slot="top-block" slot-scope="props">
      <div class="top-load-wrapper">
        <!-- <p class="iconfont my-icon" :class="[{
                'icon-arrow': props.state === 'trigger',
                'icon-loading': props.state === 'loading',
             },iconLink]"></p> -->
        <p class="my-word">
          {{ props.stateText }}
        </p>
      </div>
    </template>
    <ul class="ht-list-container">
      <slot></slot>
    </ul>
    <template slot="bottom-block" slot-scope="props">
      <div class="bottom-load-wrapper">
        <!-- <p class="iconfont my-icon" :class="[{
                'icon-arrow': props.state === 'trigger',
                'icon-loading': props.state === 'loading',
             },iconLink]"></p> -->
        {{ props.stateText }}
      </div>
    </template>
  </pull-to>
</template>

<script>
  import PullTo from 'vue-pull-to'

  export default {
    name: 'Refresh',
    props: {},
    data () {
      return {
        iconLink: '',
        TOP_DEFAULT_CONFIG: {
          pullText: '下拉刷新', // 下拉时显示的文字
          triggerText: '释放更新', // 下拉到触发距离时显示的文字
          loadingText: '加载中...', // 加载中的文字
          doneText: '加载完成', // 加载完成的文字
          failText: '', // 加载失败的文字
          loadedStayTime: 400, // 加载完后停留的时间ms
          stayDistance: 50, // 触发刷新后停留的距离
          triggerDistance: 70 // 下拉刷新触发的距离
        },
        BOTTOM_DEFAULT_CONFIG: {
          pullText: '上拉加载',
          triggerText: '释放更新',
          loadingText: '加载中...',
          doneText: '加载完成',
          failText: '没有更多数据',
          loadedStayTime: 400,
          stayDistance: 50,
          triggerDistance: 70
        }
      }
    },
    watch: {},
    methods: {
      refresh (loaded) {
        setTimeout(() => {
          this.$emit('refresh', {loaded})
        }, 1000)
      },
      loadmore (loaded) {
        // console.log(loaded)
        // loaded('fail')
        setTimeout(() => {
          this.$emit('loadmore', {loaded})
        }, 1000)
      },
      stateChange (state) {
        if (state === 'pull' || state === 'trigger') {
          this.iconLink = 'icon-jiantou22'
        } else if (state === 'loading') {
          this.iconLink = 'icon-shuaxinzhongjieban'
        } else if (state === 'loaded-done') {
          this.iconLink = 'icon-yiwancheng'
        }
      }
    },
    components: {
      PullTo
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../assets/css/mixin';
  @import '../../../assets/css/icon';

  .ht-list-container {
    /*background: #dbdbdb;*/
  }

  .top-load-wrapper,
  .bottom-load-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: pxTorem(100);
    height: pxTorem(100);
    text-align: center;
    font-size: pxTorem(28);
    .my-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: pxTorem(10);
      width: pxTorem(40);
      height: pxTorem(40);
      line-height: pxTorem(40);
      font-size: pxTorem(30);
    }
    .my-word {
      height: pxTorem(40);
      line-height: pxTorem(40);
    }
    .icon-arrow {
      transition: 0.2s;
      transform: rotate(180deg);
    }
  }

  .bottom-load-wrapper {
    .icon-jiantou22 {
      transform: rotate(180deg);
    }
    .icon-arrow {
      transition: 0.2s;
      transform: rotate(0);
    }
    .icon-arrow {
      transition: 0.2s;
      transform: rotate(0);
    }
  }

  .icon-loading {
    transform: rotate(0deg);
    animation-name: loading;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  @keyframes loading {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
