<template>
    <div class="profile">
        <van-nav-bar
          title="个人资料"
          left-arrow
          @click-left="goBack"
        />
        <van-cell-group>
          <van-cell title="单元格" value="内容" />
          <van-cell title="单元格" value="内容" label="描述信息" />
          <van-field
            v-model="mobile"
            label="手机号"
            placeholder="请输入手机号"
            input-align="right"
          />
          <van-number-keyboard
            v-model="mobile"
            :show="kbShow"
            :maxlength="11"
            @blur="show = false"
            @input="onInput"
            @delete="onDelete"
          />
        </van-cell-group>
    </div>
</template>

<script>
import '@vant/touch-emulator';

export default {
    name: 'Profile',
    data() {
      return {
        kbShow: true,
        mobile: ''
      }
    },
    created() {
      this.mobile = this.$store.state.userInfo.mobile;
    },
    methods: {
      goBack() {
        this.$router.back();
      },
      onInput(value) {
        this.$store.dispatch('changeMobile', this.mobile + value);
      },
      onDelete(){
        this.$store.dispatch('changeMobile', this.mobile.substr(0, this.mobile.length-1));
      }
    }
}
</script>

<style lang="scss" scoped>
    @import "../../../assets/scss/mixins";
    
    .profile {
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        z-index: $product-z-index;
        width: 100%;
        height: 100%;
        background-color: $bgc-theme;
    }
</style>
