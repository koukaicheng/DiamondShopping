<template>
  <mt-popup v-model="visible" position="bottom" style="width:100%;">
    <div class="mint-datetime" ref="genderPicker">
      <mt-picker class="mint-datetime-picker"
                 :slots="slots"
                 value-key="text"
                 :visible-item-count="visibleItemCount"
                 @change="onValuesChange"
                 showToolbar>
          <span class="mint-datetime-action mint-datetime-cancel"
                @click="handleClose">{{ cancelText }}</span>
        <span class="mint-datetime-action mint-datetime-confirm"
              @click="fillGender">{{ confirmText }}</span>
      </mt-picker>
    </div>
  </mt-popup>
</template>

<script>
  export default {
    name: 'GenderPicker',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      gender: Number,
      visibleItemCount: {
        type: Number,
        default: 5
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      confirmText: {
        type: String,
        default: '确定'
      },
      options: {
        type: Array,
        default: [{text: '男', value: 1}, {text: '女', value: 2}]
      }
    },
    data() {
      return {
        visible: false,
        slots: [{
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center',
        }],
        genders: this.options,
        checkedGender: {},
      }
    },
    mounted() {
      this.slots[0].values = this.genders;
      this.$refs.genderPicker.getElementsByClassName('picker-center-highlight')[0]
        .className += ' temp-picker-border'
    },
    methods: {
      onValuesChange(picker, val) {
        if (val[0])
          this.checkedGender = val[0];
      },
      handleClose() {
        this.$emit('pickerClose', (this.visible = false))
      },
      fillGender(evt) {
        this.handleClose();
        this.$emit('complete', this.checkedGender)
      }
    },
    watch: {
      value(val) {
        this.visible = val;
      },
      visible(val) {
        this.$emit('input', val);
      },
      options(val){
        this.genders = val;
        this.slots[0].values = this.genders;
        // console.log(val)
      }
    }
  }
</script>

<style lang="scss">
  .temp-picker-border {
    @mixin bgColor {
      $bgVar: left, #FAFAFA, #5F5F5F, #FAFAFA;
      background: -moz-linear-gradient($bgVar);
      background: -o-linear-gradient($bgVar);
      background: -webkit-linear-gradient($bgVar);
    }
    &:before, &:after {
      @include bgColor;
    }
  }

</style>
