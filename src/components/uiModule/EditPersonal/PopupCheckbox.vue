<template>
  <div class="">
    <mt-popup v-model="visible" position="bottom" style="width:100%;">
      <div class="mint-datetime" ref="genderPicker">
        <div class="border-1px" style="overflow: hidden">
            <span class="mint-datetime-action mint-datetime-cancel"
                  @click="handleClose">取消</span>
          <span class="mint-datetime-action mint-datetime-confirm"
                @click="fillGender">确定</span>
        </div>
        <div class="checkbox">
          <div class="chekbox_">
            <div class="item">
              <div class="text">无</div>
              <ds-checkbox v-model="checked"></ds-checkbox>
            </div>
            <div class="item">
              <div class="text">奶</div>
              <ds-checkbox v-model="checked1"></ds-checkbox>
            </div>
            <div class="item">
              <div class="text">绿</div>
              <ds-checkbox v-model="checked1"></ds-checkbox>
            </div>
            <div class="item">
              <div class="text">咖</div>
              <ds-checkbox v-model="checked1"></ds-checkbox>
            </div>
          </div>

        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>

  export default {
    name: 'PopupCheckbox',
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        visible: true,
        checked: false,
        checked1: false
      };
    },
    created() {
    },
    methods: {
      handleClose() {
        this.$emit('pickerClose', (this.visible = false))
      },
      fillGender(evt) {
        this.handleClose();
        this.$emit('complete')
      }
    },
    components: {},
    computed: {},
    watch: {
      value(val) {
        this.visible = val;
        console.log(val)
      },
      visible(val) {
        this.$emit('input', val);
      },
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/mixin";

  .checkbox {
    @include fja();
    .chekbox_{
      flex: 1;
      @include fja();
      .item{
        @include fja();
        flex-direction: column;
        flex: 1;
        .text{
          color: #1b1b1b;
          font-size: pxTorem(28);
        }
      }
    }
   height: pxTorem(200);
  }
</style>
