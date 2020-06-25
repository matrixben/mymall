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
        </van-cell-group>
    </div>
</template>

<script>
export default {
    name: 'Profile',
    methods: {
        goBack() {
          this.$router.back();
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
