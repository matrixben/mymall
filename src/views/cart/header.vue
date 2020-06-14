<template>
    <me-navbar class="header" title="购物车">
        <i class="iconfont icon-back" slot="left" @click="goBack"></i>
        <i class="iconfont icon-msg" slot="right"></i>
    </me-navbar>
</template>

<script>
import MeNavbar from '@/base/navbar/index';

export default {
    name: 'CartHeader',
    components: {
        MeNavbar
    },
    methods: {
        goBack() {
          this.$router.back();
        }
    }
}
</script>

<style lang="scss" scoped>
    @import  "../../assets/scss/mixins";
    
    .header {
        &.mine-navbar {
            background-color: red;
            color: white;
        }
        
        .iconfont {
            color: $icon-color-default;
            font-size: $icon-font-size;
        }
    }
</style>
