<template>
    <me-navbar class="header" title="商品详情">
        <i class="iconfont icon-back" slot="left" @click="goBack"></i>
        <i class="iconfont icon-msg" slot="right"></i>
    </me-navbar>
</template>

<script>
import MeNavbar from '@/base/navbar/index';
// import MeSearchBox from '../../base/search-box/index';

export default {
    name: 'ProductHeader',
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
