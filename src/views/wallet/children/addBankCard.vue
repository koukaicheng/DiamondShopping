<template>
  <div class="">
    <ts-header back title="添加支付宝"></ts-header>
    <!--<Page>-->
    <div class="wrap">
      <p class="title">请绑定支付宝</p>
      <ul class="list">
        <li class="list-item border-1px">
          <span class="name">用户姓名</span>
          <input type="text" class="input" v-model="fromData.true_name" placeholder="请输入用户姓名">
        </li>
        <li class="list-item">
          <span class="name">支付宝账号</span>
          <input type="text" class="input" v-model="fromData.card_number" placeholder="请输入支付宝账号">
        </li>
        <!--<li class="list-item border-1px">-->
          <!--<span class="name">开户行</span>-->
          <!--<input type="text" class="input" v-model="fromData.bank_name" placeholder="请输入开户行">-->
        <!--</li>-->
      </ul>
      <div class="button" @click="sumbit">
        <ds-button type="primary" size="large">提交</ds-button>
      </div>
    </div>
    <!--</Page>-->
  </div>
</template>
<script>
import { CardAdd } from '../../../assets/js/api'

export default {
  data() {
    return {
      fromData: {}
    }
  },
  methods: {
    // 提交
    sumbit() {
      this.getCardAdd()
    },
    async getCardAdd() {
      let getCardAddData = await this.$http.post(CardAdd, {
        post: this.fromData
      })
      console.log(getCardAddData)
      if (getCardAddData.code === 200) {
        // transfer.$emit('RefreshPage')
        this.$toast(getCardAddData.datas)
        setTimeout(() => {
          this.$router.goBack()
        }, 1000)
      }
    }
  },
  created() {}
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin';

.wrap {
  height: 100%;
  font-size: pxTorem(28);
  .title {
    padding: pxTorem(25);
    padding-left: pxTorem(50);
    color: #999;
  }
  .list {
    background: #fff;
    .list-item {
      display: flex;
      align-items: center;
      margin: 0 pxTorem(25);
      padding: 0 pxTorem(25);
      height: pxTorem(100);
      color: #2c2c2c;

      .name {
        flex-shrink: 0;
        font-size: pxTorem(30);
      }
      .input {
        font-size: pxTorem(28);
        padding-left: pxTorem(40);
        border: none;
        width: 100%;
      }
    }
  }
  .button {
    padding: 0 pxTorem(30);
    margin-top: pxTorem(97);
  }
}
</style>
