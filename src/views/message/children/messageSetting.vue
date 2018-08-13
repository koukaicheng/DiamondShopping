<template>
  <div>
    <ts-header back
               title="消息设置"></ts-header>
    <page>
      <div>
        <div class="list-box">
          <div class="list-item border-1px">
            <div class="title">新消息通知</div>
            <div class="right">
              <mt-switch v-model="value"></mt-switch>
            </div>
          </div>
          <div class="list-item border-1px" @click="readMsg">
            <div class="title">全部标记已读</div>

          </div>
          <div class="list-item" @click="delmsg">
            <div class="title">清空消息列表</div>
          </div>
        </div>

      </div>
    </page>
  </div>
</template>

<script>
  import mtSwitch from '../../../components/module/MtSwitch/switch'
  import { Emptymsg, ReadMessage } from '../../../assets/js/api'

  export default {
    data () {
      return {
        value: true
      }
    },
    methods: {
      async delmsg () {
        let json = await this.$http.get(Emptymsg, {drop_type: 'msg_system'}, {show: true, type: 'mini'})
        if (json.code === 200) {
          this.$toast('删除成功')
        }
      },
      async readMsg () {
        let json = await this.$http.get(ReadMessage, {}, {show: true, type: 'mini'})
        console.log(json)
        if(json.code===200){

        }

      },
    },
    created () {},
    components: {mtSwitch}
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/mixin";

  .list-box {
    background: #fff;
    font-size: pxTorem(30);

    .list-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: pxTorem(35) pxTorem(15);
      margin: 0 pxTorem(25);
      .title {
        width: 100%;
      }
      .right {
        flex-shrink: 0;
        //   width: pxTorem(100);
      }
    }
  }

  .mint-switch-input:checked + .mint-switch-core {
    border-color: red;
    background: red;
  }
</style>
